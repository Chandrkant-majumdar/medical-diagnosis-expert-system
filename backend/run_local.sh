#!/bin/bash
set -e

echo "===== Flask Local Development Server ====="

# Check for Python installation
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed or not in PATH"
    echo "Please install Python 3 and try again"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ] || [ ! -f "venv/bin/activate" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv || python -m venv venv
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create virtual environment"
        exit 2
    fi
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "Error: Failed to activate virtual environment"
    exit 3
fi

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 4
fi

# Start Flask application
echo "Starting Flask application..."
echo "Access the application at http://127.0.0.1:5000/"
python app.py

# This will execute when script is interrupted with Ctrl+C
trap 'echo "Flask server stopped."; deactivate' EXIT
