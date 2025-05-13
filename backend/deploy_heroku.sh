#!/bin/bash
set -e

echo "===== Deploying Flask App to Heroku ====="

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "Error: Heroku CLI is not installed or not in PATH"
    echo "Please install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if user is logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "You are not logged in to Heroku. Please log in:"
    heroku login
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed or not in PATH"
    echo "Please install Git and try again"
    exit 2
fi

# Check if git repository exists
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for Heroku deployment"
fi

# Ask for app name
read -p "Enter your Heroku app name (leave blank to create a random name): " app_name

# Create or use existing Heroku app
if [ -z "$app_name" ]; then
    echo "Creating a new Heroku app with a random name..."
    heroku create
else
    echo "Checking if app $app_name exists..."
    if ! heroku apps:info "$app_name" &> /dev/null; then
        echo "Creating Heroku app $app_name..."
        heroku create "$app_name"
    else
        echo "App $app_name already exists. Setting it as remote..."
        heroku git:remote -a "$app_name"
    fi
fi

# Push to Heroku
echo "Deploying to Heroku..."
if ! git push heroku main 2>/dev/null; then
    echo "Trying with master branch..."
    git push heroku master
fi

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    echo "Opening app in browser..."
    heroku open
    
    echo "You can view logs with: heroku logs --tail"
else
    echo "Deployment failed. Please check the error messages above."
fi

echo "Deployment process completed."
