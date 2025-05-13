import re

# Function to load rules from a file
def load_rules(file_path):
    """Load the rules from the given file path."""
    try:
        with open(file_path, 'r') as file:
            rules = file.read()
            print(f"Loaded rules from {file_path}")
            return rules
    except FileNotFoundError:
        print(f"Rules file not found at path: {file_path}")
        return ""

# Function to parse rules and extract disease-symptom relationships
def parse_rules(rules_text):
    """Parse the rules text to extract symptoms and diseases."""
    print("Parsing rules...")
    # Extract disease rules using regular expressions
    rules = re.findall(r'\(defrule is_it_(\w+)(.*?)=>', rules_text, re.DOTALL)
    disease_symptoms = {}

    for disease, rule in rules:
        # Extract symptoms for each disease
        symptoms = re.findall(r'\(has_symptom (\w+)\)', rule)
        disease_symptoms[disease] = set(symptoms)
        print(f"Parsed disease '{disease}' with symptoms: {symptoms}")

    return disease_symptoms

# Function to get all unique symptoms from the rules
def get_all_symptoms_from_rules(disease_symptoms):
    """Extract all unique symptoms from the rules."""
    print("Extracting all symptoms from parsed rules...")
    all_symptoms = set()
    for symptoms in disease_symptoms.values():
        all_symptoms.update(symptoms)
    print(f"All symptoms: {sorted(list(all_symptoms))}")
    return sorted(list(all_symptoms))

# Function to filter symptoms not selected yet for possible diseases
def filter_remaining_symptoms(possible_diseases, disease_symptoms, selected_symptoms):
    """Get relevant symptoms for possible diseases that haven't been selected yet."""
    if not possible_diseases:
        print("No possible diseases found, returning empty symptom list.")
        return []

    relevant_symptoms = set()
    for disease in possible_diseases:
        # Get the symptoms specific to this disease
        disease_specific_symptoms = disease_symptoms[disease]
        # Filter out already selected symptoms
        remaining = disease_specific_symptoms - set(selected_symptoms)
        relevant_symptoms.update(remaining)
    print(f"Remaining symptoms: {sorted(list(relevant_symptoms))}")
    return sorted(list(relevant_symptoms))

# Function to calculate match percentages for each disease
def calculate_disease_matches(possible_diseases, disease_symptoms, selected_symptoms):
    """Calculate match percentages for each disease."""
    print("Calculating disease match percentages...")
    matches = []
    for disease in possible_diseases:
        required_symptoms = disease_symptoms[disease]
        matched = len(set(selected_symptoms).intersection(required_symptoms))
        total = len(required_symptoms)
        match_percentage = (matched / total) * 100 if total > 0 else 0
        print(f"Disease '{disease}' match: {match_percentage}% ({matched}/{total} symptoms matched)")
        matches.append({
            'disease': disease,
            'match_percentage': match_percentage,
            'matched_symptoms': matched,
            'total_symptoms': total
        })
    return sorted(matches, key=lambda x: x['match_percentage'], reverse=True)

def load_symptoms_from_clp(clp_file_path):
    """
    Load disease-symptom relationships from a CLIPS file.
    
    Args:
        clp_file_path (str): Path to the CLIPS file
    
    Returns:
        dict: Dictionary mapping disease names to sets of symptoms
    """
    try:
        print(f"Loading symptoms from CLIPS file: {clp_file_path}")
        
        # Initialize dictionary to store disease-symptom relationships
        disease_symptoms = {}
        
        # Read the CLIPS file
        with open(clp_file_path, 'r') as file:
            content = file.read()
        
        # Extract disease rules using regex
        disease_pattern = r'\(defrule\s+is_it_([A-Za-z0-9_-]+)\s+(.*?)\s*=>'
        disease_matches = re.finditer(disease_pattern, content, re.DOTALL)
        
        for match in disease_matches:
            disease_name = match.group(1).replace('_', ' ')
            symptom_pattern = r'\(has_symptom\s+([A-Za-z0-9_-]+)\)'
            symptoms = re.findall(symptom_pattern, match.group(2))
            
            # Store disease with its symptoms
            disease_symptoms[disease_name] = set(symptoms)
            print(f"Loaded {len(symptoms)} symptoms for disease: {disease_name}")
        
        print(f"Successfully loaded {len(disease_symptoms)} diseases with their symptoms")
        return disease_symptoms
    
    except Exception as e:
        import traceback
        print(f"ERROR: Failed to load symptoms from CLIPS file: {str(e)}")
        print(traceback.format_exc())
        return {}
