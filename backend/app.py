from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re

# Import functionality from modules
from modules.routes import setup_routes
from modules.diagnosis import load_rules, parse_rules, get_all_symptoms_from_rules, filter_remaining_symptoms, calculate_disease_matches

app = Flask(__name__)
CORS(app)

# File paths
RULES_FILE_PATH = 'data/disease-symptoms.clp'
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')

# Create required directories
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Configure app
app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['ALLOWED_EXTENSIONS'] = {'csv'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limit upload size to 16MB

# Load rules at startup
rules_text = load_rules(RULES_FILE_PATH)
app.disease_symptoms = parse_rules(rules_text)
print(f"Loaded {len(app.disease_symptoms)} diseases from rules")

# Setup routes using the function
setup_routes(app)

@app.route('/')
def home():
    return jsonify({
        'status': 'online', 
        'message': 'Medical Expert System API is running',
        'endpoints': {
            'diagnosis': '/api/diagnose',
            'symptoms': '/api/get_initial_symptoms',
            'csv_upload': '/api/upload_csv',
            'knowledge_base': '/api/knowledge_base'
        }
    })

@app.route('/api/healthcheck', methods=['GET'])
def healthcheck():
    """Health check endpoint to verify server status"""
    try:
        return jsonify({
            'status': 'ok',
            'message': 'Server is running'
        }), 200
    except Exception as e:
        print(f"ERROR: Health check failed: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
