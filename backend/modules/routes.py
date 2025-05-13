"""
Routes module for the Flask application.
Defines all API routes and handlers.
"""
from flask import request, jsonify
import os
import csv
import traceback
import re
from werkzeug.utils import secure_filename
from modules.diagnosis import get_all_symptoms_from_rules, filter_remaining_symptoms, calculate_disease_matches

def setup_routes(app):
    """Setup all routes for the application"""
    
    # File paths
    DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    CLP_FILE_PATH = os.path.join(DATA_DIR, 'disease-symptoms.clp')
    SYMPTOMS_FILE_PATH = os.path.join(DATA_DIR, 'symptoms.txt')
    UPLOAD_DIR = app.config['UPLOAD_FOLDER']

    def reload_disease_symptoms():
        """Reload disease-symptoms data from the CLIPS file and update app context"""
        try:
            from modules.diagnosis import load_symptoms_from_clp
            print("DEBUG: Reloading disease symptoms from CLIPS file")
            
            if os.path.exists(CLP_FILE_PATH):
                app.disease_symptoms = load_symptoms_from_clp(CLP_FILE_PATH)
                print(f"DEBUG: Successfully reloaded {len(app.disease_symptoms)} diseases with symptoms")
            else:
                print(f"WARNING: CLP file not found at {CLP_FILE_PATH}, cannot reload symptoms")
                app.disease_symptoms = {}
            
            return get_all_symptoms_from_rules(app.disease_symptoms)
        except Exception as e:
            print(f"ERROR: Failed to reload disease symptoms: {str(e)}")
            print(traceback.format_exc())
            return []
    
    @app.route('/api/upload_csv', methods=['POST'])
    def upload_csv():
        print("DEBUG: Upload CSV endpoint accessed")

        if 'file' not in request.files:
            print("ERROR: No file part in the request")
            return jsonify({'message': 'No file part in the request'}), 400

        file = request.files['file']
        print(f"DEBUG: File received: {file.filename}")

        if file.filename == '':
            print("ERROR: No selected file")
            return jsonify({'message': 'No selected file'}), 400

        if not file or not allowed_file(file.filename, app.config['ALLOWED_EXTENSIONS']):
            print(f"ERROR: Invalid file type: {file.filename}")
            return jsonify({'message': 'Invalid file type. Only CSV files are allowed.'}), 400

        try:
            # Create upload folder if it doesn't exist
            os.makedirs(UPLOAD_DIR, exist_ok=True)
            print(f"DEBUG: Upload directory ensured: {UPLOAD_DIR}")

            # Secure and save the file
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_DIR, filename)
            file.save(file_path)
            print(f"DEBUG: File saved at: {file_path}")

            # Verify file exists and has content
            if not os.path.exists(file_path):
                print(f"ERROR: File not found after save: {file_path}")
                return jsonify({'message': 'File upload failed or file is empty'}), 400

            file_size = os.path.getsize(file_path)
            print(f"DEBUG: File size: {file_size} bytes")
            if file_size == 0:
                print("ERROR: Uploaded file is empty")
                return jsonify({'message': 'File upload failed or file is empty'}), 400

            # Process the CSV file and generate CLIPS rules
            os.makedirs(DATA_DIR, exist_ok=True)
            print(f"DEBUG: Data directory ensured: {DATA_DIR}")

            print("DEBUG: Starting CSV to CLP conversion")
            result = convert_csv_to_clp(file_path, CLP_FILE_PATH, SYMPTOMS_FILE_PATH)
            print(f"DEBUG: Conversion completed successfully: {result}")

            # Reload disease symptoms after updating the knowledge base
            all_symptoms = reload_disease_symptoms()
            
            return jsonify({
                'message': f'File uploaded and processed successfully! Generated rules for {result["diseases_count"]} diseases with {result["symptoms_count"]} unique symptoms.',
                'details': {
                    'diseasesCount': result["diseases_count"],
                    'symptomsCount': result["symptoms_count"],
                    'symptomsSample': result["symptoms"],
                    'all_symptoms': all_symptoms
                }
            }), 200
        except Exception as e:
            error_trace = traceback.format_exc()
            print(f"ERROR: Exception in upload_csv: {str(e)}")
            print(error_trace)
            return jsonify({
                'message': f'Failed to process file: {str(e)}',
                'error_detail': error_trace
            }), 500
        
    @app.route('/api/knowledge_base', methods=['GET'])
    def get_knowledge_base():
        """Fetch all diseases and their symptoms from the CLIPS file"""
        try:
            # Check if file exists
            if not os.path.exists(CLP_FILE_PATH):
                print(f"DEBUG: Knowledge base file not found at {CLP_FILE_PATH}")
                return jsonify([]), 200

            # Read the CLIPS file
            with open(CLP_FILE_PATH, 'r') as file:
                content = file.read()
                print(f"DEBUG: Loaded CLIPS file, size: {len(content)} bytes")

            # Parse the rules to extract diseases and their symptoms
            knowledge_base = []
            print("DEBUG: Extracting diseases and symptoms from CLIPS rules")

            # More flexible regex pattern to handle different formatting in the file
            disease_pattern = r'\(defrule\s+is_it_([A-Za-z0-9_-]+)\s+(.*?)\s*=>'
            disease_matches = re.finditer(disease_pattern, content, re.DOTALL)

            disease_count = 0
            for idx, match in enumerate(disease_matches):
                disease_count += 1
                disease_id = idx + 1
                disease_name = match.group(1).replace('_', ' ')
                symptom_pattern = r'\(has_symptom\s+([A-Za-z0-9_-]+)\)'
                symptoms = re.findall(symptom_pattern, match.group(2))

                print(f"DEBUG: Found disease #{disease_id}: {disease_name} with {len(symptoms)} symptoms")

                knowledge_base.append({
                    'id': disease_id,
                    'disease': disease_name,
                    'symptoms': symptoms
                })

            print(f"DEBUG: Total diseases extracted: {disease_count}")

            # Check for potential missed patterns
            all_rules = re.findall(r'\(defrule\s+is_it_([A-Za-z0-9_-]+)', content)
            print(f"DEBUG: Total 'is_it_' rules found in file: {len(all_rules)}")

            if len(all_rules) > disease_count:
                print(
                    f"DEBUG: Warning! Not all diseases were captured. Found {len(all_rules)} rule definitions but only extracted {disease_count}")

            return jsonify(knowledge_base), 200
        except Exception as e:
            print(f"ERROR: Failed to fetch knowledge base: {str(e)}")
            print(traceback.format_exc())
            return jsonify({'error': str(e)}), 500
        
    @app.route('/api/add_symptom', methods=['POST'])
    def add_symptom():
        """Add a symptom to a disease"""
        try:
            data = request.get_json()
            disease_id = data.get('diseaseId')
            symptom = data.get('symptom', '').replace(' ', '')

            if not symptom:
                return jsonify({'error': 'Symptom cannot be empty'}), 400

            # Parse knowledge base directly instead of using test client
            if not os.path.exists(CLP_FILE_PATH):
                return jsonify({'error': 'Knowledge base file not found'}), 404
                
            # Read the CLIPS file
            with open(CLP_FILE_PATH, 'r') as file:
                content = file.read()

            # Extract diseases and symptoms directly
            knowledge_base = []
            disease_pattern = r'\(defrule\s+is_it_([A-Za-z0-9_-]+)\s+(.*?)\s*=>'
            disease_matches = re.finditer(disease_pattern, content, re.DOTALL)

            for idx, match in enumerate(disease_matches):
                disease_name = match.group(1).replace('_', ' ')
                symptom_pattern = r'\(has_symptom\s+([A-Za-z0-9_-]+)\)'
                symptoms = re.findall(symptom_pattern, match.group(2))
                knowledge_base.append({
                    'id': idx + 1,
                    'disease': disease_name,
                    'symptoms': symptoms
                })

            # Find the disease by ID
            disease = next((d for d in knowledge_base if d['id'] == disease_id), None)
            if not disease:
                return jsonify({'error': f'Disease with ID {disease_id} not found'}), 404

            # Format disease name for the rule pattern
            rule_disease_name = disease['disease'].replace(' ', '_')

            # Find the complete disease rule with a more robust pattern
            pattern = rf'\(defrule is_it_{re.escape(rule_disease_name)}([\s\S]*?)=>\s*([\s\S]*?)\)'
            rule_match = re.search(pattern, content, re.DOTALL)

            if not rule_match:
                return jsonify({'error': f'Disease rule for {disease["disease"]} not found'}), 404

            # Check if symptom already exists
            symptom_pattern = rf'\(has_symptom\s+{re.escape(symptom)}\)'
            if re.search(symptom_pattern, rule_match.group(0)):
                return jsonify({'status': 'info', 'message': f'Symptom {symptom} already exists for {disease["disease"]}'}), 200

            # Get the whole rule and parts for reconstruction
            whole_rule = rule_match.group(0)
            before_arrow = rule_match.group(1)
            after_arrow = rule_match.group(2)

            # Create updated rule with new symptom
            new_rule = f'(defrule is_it_{rule_disease_name}{before_arrow}  (has_symptom {symptom})\n=>{after_arrow})'

            # Replace the old rule with the updated one
            updated_content = content.replace(whole_rule, new_rule)

            # Write back to file
            with open(CLP_FILE_PATH, 'w') as file:
                file.write(updated_content)

            # Reload disease symptoms after modification
            all_symptoms = reload_disease_symptoms()

            return jsonify({
                'status': 'success',
                'message': f'Added symptom {symptom} to {disease["disease"]}',
                'all_symptoms': all_symptoms
            }), 200
        except Exception as e:
            print(f"Error adding symptom: {str(e)}")
            print(traceback.format_exc())
            return jsonify({'error': str(e)}), 500
        
    @app.route('/api/remove_symptom', methods=['POST'])
    def remove_symptom():
        """Remove a symptom from a disease"""
        try:
            data = request.get_json()
            disease_id = data.get('diseaseId')
            symptom = data.get('symptom')

            # Parse knowledge base directly instead of using test client
            if not os.path.exists(CLP_FILE_PATH):
                return jsonify({'error': 'Knowledge base file not found'}), 404
                
            # Read the CLIPS file
            with open(CLP_FILE_PATH, 'r') as file:
                content = file.read()

            # Extract diseases and symptoms directly
            knowledge_base = []
            disease_pattern = r'\(defrule\s+is_it_([A-Za-z0-9_-]+)\s+(.*?)\s*=>'
            disease_matches = re.finditer(disease_pattern, content, re.DOTALL)

            for idx, match in enumerate(disease_matches):
                disease_name = match.group(1).replace('_', ' ')
                symptom_pattern = r'\(has_symptom\s+([A-Za-z0-9_-]+)\)'
                symptoms = re.findall(symptom_pattern, match.group(2))
                knowledge_base.append({
                    'id': idx + 1,
                    'disease': disease_name,
                    'symptoms': symptoms
                })

            # Find the disease by ID
            disease = next((d for d in knowledge_base if d['id'] == disease_id), None)
            if not disease:
                return jsonify({'error': f'Disease with ID {disease_id} not found'}), 404

            # Format disease name for rule matching
            rule_disease_name = disease['disease'].replace(' ', '_')

            # Pattern to match the symptom line in the specific disease rule
            symptom_pattern = rf'(\(defrule is_it_{rule_disease_name}\s*[^=]*)(\n\s*\(has_symptom\s+{symptom}\))(.*=>)'
            updated_content = re.sub(symptom_pattern, r'\1\3', content, flags=re.DOTALL)

            # Check if the content was actually modified
            if content == updated_content:
                print(f"WARNING: No changes made when removing symptom '{symptom}' from disease '{disease['disease']}'")
                # Try an alternative pattern with different whitespace
                alt_pattern = rf'(\(defrule is_it_{rule_disease_name}[^=]*)(\s+\(has_symptom\s+{symptom}\))(.*=>)'
                updated_content = re.sub(alt_pattern, r'\1\3', content, flags=re.DOTALL)

            # Write updated content back
            with open(CLP_FILE_PATH, 'w') as file:
                file.write(updated_content)

            # Reload disease symptoms after modification
            all_symptoms = reload_disease_symptoms()

            return jsonify({
                'status': 'success', 
                'message': f'Removed symptom {symptom} from {disease["disease"]}',
                'all_symptoms': all_symptoms
            }), 200
        except Exception as e:
            print(f"Error removing symptom: {str(e)}")
            print(traceback.format_exc())  # Add full traceback for better debugging
            return jsonify({'error': str(e)}), 500
        
    @app.route('/api/add_disease', methods=['POST'])
    def add_disease():
        """Add a new disease with symptoms"""
        try:
            data = request.get_json()
            disease_name = data.get('name', '').strip()
            symptoms = [s.strip().replace(' ', '') for s in data.get('symptoms', []) if s.strip()]

            if not disease_name or not symptoms:
                return jsonify({'error': 'Disease name and at least one symptom are required'}), 400

            # Format disease name for CLIPS
            rule_disease_name = disease_name.replace(' ', '_')

            # Format symptoms for the rule
            symptoms_text = "\n  ".join([f"(has_symptom {symptom})" for symptom in symptoms])

            # Create the new disease rule
            new_rule = f"""
(defrule {rule_disease_name}
  (disease_is {rule_disease_name})
  =>
  (printout t "{disease_name}" crlf)
)

(defrule is_it_{rule_disease_name}
  {symptoms_text}
  =>
  (assert (disease_is {rule_disease_name}))
)
"""

            # Append the new rule to the file
            with open(CLP_FILE_PATH, 'a') as file:
                file.write(new_rule)

            # Reload disease symptoms after adding a new disease
            all_symptoms = reload_disease_symptoms()

            return jsonify({
                'status': 'success',
                'message': f'Added new disease: {disease_name} with {len(symptoms)} symptoms',
                'all_symptoms': all_symptoms
            }), 200
        except Exception as e:
            print(f"Error adding disease: {str(e)}")
            return jsonify({'error': str(e)}), 500
        
    @app.route('/api/feedback', methods=['POST'])
    def process_feedback():
        """Process user feedback on diagnoses"""
        try:
            data = request.get_json()

            # Extract data from request
            disease_name = data.get('disease')
            is_satisfied = data.get('isSatisfied')
            missed_symptoms = data.get('missedSymptoms', '')

            print(f"Processing feedback for {disease_name}, satisfied: {is_satisfied}")

            # If satisfied or no missed symptoms, just log and return success
            if (is_satisfied or not missed_symptoms):
                return jsonify({
                    'status': 'success',
                    'message': 'Feedback recorded successfully'
                })

            # Convert disease name to expected format in rules
            rule_disease_name = disease_name.replace(' ', '_')

            # Path to the rules file
            clp_file_path = CLP_FILE_PATH

            # Read the current file content
            with open(clp_file_path, 'r') as file:
                content = file.read()

            # Find the disease rule
            pattern = rf'(\(defrule is_it_{rule_disease_name}\s*[^=]*=>)'
            rule_match = re.search(pattern, content, re.DOTALL)

            if not rule_match:
                return jsonify({
                    'status': 'error',
                    'message': f'Disease rule for {disease_name} not found'
                }), 404

            # Process the symptoms to add - properly handle comma separated values
            raw_symptoms = [s.strip() for s in missed_symptoms.split(',') if s.strip()]
            # Format symptoms according to CLIPS rules (replace spaces with nothing)
            symptoms_to_add = [f"{symptom.replace(' ', '')}" for symptom in raw_symptoms]

            # Generate symptom lines to add
            symptom_lines = '\n  '.join([f"(has_symptom {symptom})" for symptom in symptoms_to_add])

            # Insert the new symptoms before the "=>" part
            current_rule = rule_match.group(1)
            insertion_point = current_rule.rfind(')')
            updated_rule = current_rule[:insertion_point + 1] + f"\n  {symptom_lines}" + current_rule[insertion_point + 1:]

            # Replace the old rule with the updated one
            updated_content = content.replace(rule_match.group(1), updated_rule)

            # Write the updated content back to the file
            with open(clp_file_path, 'w') as file:
                file.write(updated_content)

            # Reload disease symptoms after adding new symptoms via feedback
            all_symptoms = reload_disease_symptoms()

            return jsonify({
                'status': 'success',
                'message': f'Added {len(symptoms_to_add)} symptoms to {disease_name}',
                'added_symptoms': symptoms_to_add,
                'all_symptoms': all_symptoms
            })

        except Exception as e:
            print(f"Error processing feedback: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500

    # API endpoint to get the initial list of symptoms
    @app.route('/api/get_initial_symptoms', methods=['GET'])
    def get_initial_symptoms():
        """Return initial set of symptoms."""
        try:
            # Always reload symptoms from file to get the latest changes
            all_symptoms = reload_disease_symptoms()
            print("Returning latest symptoms list from reloaded data.")
            
            return jsonify({
                'status': 'success',
                'all_symptoms': all_symptoms,
                'total_symptoms': len(all_symptoms),
                'last_updated': os.path.getmtime(CLP_FILE_PATH) if os.path.exists(CLP_FILE_PATH) else None
            })
        except Exception as e:
            print(f"Error loading initial symptoms: {str(e)}")
            print(traceback.format_exc())  # Add full traceback for better debugging
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500

    # API endpoint to process selected symptoms and return possible diagnoses
    @app.route('/api/diagnose', methods=['POST'])
    def diagnose():
        """Process symptoms and return diagnosis with filtered symptoms."""
        try:
            data = request.get_json()
            selected_symptoms = set(data.get('symptoms', []))
            print(f"Selected symptoms for diagnosis: {selected_symptoms}")

            # Find diseases that match current symptoms
            possible_diseases = []
            for disease, symptoms in app.disease_symptoms.items():
                if selected_symptoms.issubset(symptoms):  # Check if all selected symptoms match this disease
                    possible_diseases.append(disease)
                    print(f"Possible disease found: {disease}")

            # Calculate matches and confidence
            matches = calculate_disease_matches(
                possible_diseases,
                app.disease_symptoms,
                selected_symptoms
            )

            # Get remaining symptoms only if we have possible diseases
            remaining_symptoms = []
            if possible_diseases:
                remaining_symptoms = filter_remaining_symptoms(
                    possible_diseases,
                    app.disease_symptoms,
                    selected_symptoms
                )

            response = {
                'possible_diseases': [m['disease'] for m in matches],
                'remaining_symptoms': remaining_symptoms,
                'is_final_diagnosis': len(remaining_symptoms) == 0 and len(possible_diseases) > 0,
                'matched_symptoms': len(selected_symptoms),
                'matches': matches,
                'symptoms_per_disease': {
                    d: list(app.disease_symptoms[d])
                    for d in possible_diseases
                } if possible_diseases else {}
            }

            print(f"Diagnosis result: {response}")
            return jsonify(response)

        except Exception as e:
            print(f"Error in diagnosis: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': str(e),
                'possible_diseases': [],
                'remaining_symptoms': [],
                'matches': [],
                'symptoms_per_disease': {}
            }), 500

# Helper function for allowed file types
def allowed_file(filename, allowed_extensions):
    """Check if uploaded file has allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def convert_csv_to_clp(csv_file_path, clp_file_path, symptoms_file_path):
    """Convert CSV data to CLIPS rule format and append to existing file if present"""
    print(f"DEBUG: Starting conversion from CSV to CLP")
    print(f"DEBUG: Input CSV: {csv_file_path}")
    print(f"DEBUG: Output CLP: {clp_file_path}")
    print(f"DEBUG: Output symptoms: {symptoms_file_path}")

    # Create output directories if they don't exist
    os.makedirs(os.path.dirname(clp_file_path), exist_ok=True)
    os.makedirs(os.path.dirname(symptoms_file_path), exist_ok=True)

    clp_note = """; ------------------------------------------------------------------------------
; this file is generated using Python
; dataset: https://www.kaggle.com/itachi9604/disease-symptom-description-dataset
; ------------------------------------------------------------------------------
"""

    # Collect all symptoms (start with existing ones if available)
    all_symptoms = set()
    diseases_processed = 0
    max_symptoms_count = 0

    # Load existing symptoms if symptoms file exists
    if os.path.exists(symptoms_file_path):
        print(f"DEBUG: Loading existing symptoms from {symptoms_file_path}")
        try:
            with open(symptoms_file_path, 'r') as symptoms_file:
                existing_symptoms = symptoms_file.read().split(",\n")
                all_symptoms.update([s for s in existing_symptoms if s])
                print(f"DEBUG: Loaded {len(all_symptoms)} existing symptoms")
        except Exception as e:
            print(f"WARNING: Error loading existing symptoms: {str(e)}")

    # Check if CLP file exists and determine write mode
    file_exists = os.path.exists(clp_file_path)
    open_mode = 'a' if file_exists else 'w'
    print(f"DEBUG: CLP file {'exists' if file_exists else 'does not exist'}, opening in {open_mode} mode")

    try:
        with open(csv_file_path, 'r') as csvfile:
            # Read CSV data
            print(f"DEBUG: Reading CSV file: {csv_file_path}")
            csv_reader = csv.reader(csvfile)
            headers = next(csv_reader)  # Skip header row
            print(f"DEBUG: CSV headers: {headers}")
            print(f"DEBUG: Total symptom columns available: {len(headers) - 1}")  # -1 for disease column

            with open(clp_file_path, open_mode) as clp_file:
                # Write the header note only if creating a new file
                if not file_exists:
                    clp_file.write(clp_note)
                    print("DEBUG: Wrote header note to new CLP file")

                for line_number, row in enumerate(csv_reader, 1):
                    print(f"DEBUG: Processing row {line_number}: {row}")
                    
                    # Extract disease name (first column)
                    if not row or not row[0].strip():
                        print("DEBUG: Empty disease name, skipping row")
                        continue
                    
                    disease_name = row[0].strip()
                    
                    # Extract all non-empty symptoms (all columns except the first)
                    symptoms = []
                    for symptom in row[1:]:
                        if symptom.strip():
                            # Remove spaces from symptoms for CLIPS format
                            symptoms.append(symptom.strip().replace(' ', ''))
                    
                    if not symptoms:
                        print(f"DEBUG: No symptoms found for disease '{disease_name}', skipping")
                        continue

                    # Update max symptoms count statistic
                    max_symptoms_count = max(max_symptoms_count, len(symptoms))
                    
                    disease = {
                        "name": disease_name,
                        "nameWithUnderscore": disease_name.replace(" ", "_"),
                        "symptoms": symptoms
                    }
                    
                    print(f"DEBUG: Disease '{disease['name']}' has {len(symptoms)} symptoms")

                    # Format symptoms for CLIPS rule
                    symptoms_text = "\n  ".join([f"(has_symptom {symptom})" for symptom in disease["symptoms"]])
                    print(f"DEBUG: Created symptom entries for CLIPS rule")

                    clp_format = f"""
(defrule {disease["nameWithUnderscore"]}
  (disease_is {disease["nameWithUnderscore"]})
  =>
  (printout t "{disease["name"]}" crlf)
)

(defrule is_it_{disease["nameWithUnderscore"]}
  {symptoms_text}
  =>
  (assert (disease_is {disease["nameWithUnderscore"]}))
)
"""
                    print(f"DEBUG: Appending CLP rule for {disease['name']}")
                    clp_file.write(clp_format)
                    diseases_processed += 1

                    # Add to symptoms set
                    for symptom in disease["symptoms"]:
                        all_symptoms.add(symptom)

                print(f"DEBUG: Processed {diseases_processed} diseases in total")
                print(f"DEBUG: Maximum number of symptoms for any disease: {max_symptoms_count}")

        # Write symptoms file (always overwrite to ensure consistency)
        print(f"DEBUG: Writing {len(all_symptoms)} unique symptoms to {symptoms_file_path}")
        with open(symptoms_file_path, 'w') as symptoms_file:
            symptoms_file.write(",\n".join(sorted(all_symptoms)))
            print("DEBUG: Symptoms file written successfully")

        result = {
            'diseases_count': diseases_processed,
            'symptoms_count': len(all_symptoms),
            'max_symptoms_per_disease': max_symptoms_count,
            'symptoms': sorted(list(all_symptoms))[:10]  # Return first 10 for preview
        }
        print(f"DEBUG: Conversion completed with result: {result}")
        return result
    except Exception as e:
        print(f"ERROR: Exception in convert_csv_to_clp: {str(e)}")
        print(traceback.format_exc())
        error_message = f"Error converting CSV to CLP: {str(e)}"
        raise ValueError(error_message)