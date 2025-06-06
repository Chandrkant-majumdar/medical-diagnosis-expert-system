# medical-diagnosis-expert-system

This project is a medical diagnosis expert system designed to assist users by providing potential diagnoses based on reported symptoms. It features a web-based interface for users to input their symptoms and receive diagnostic feedback. The system utilizes a rule-based approach for diagnosis, with a knowledge base that can be updated.

## Project Structure

The project is divided into two main parts:

*   **Frontend:** A React application providing the user interface.
*   **Backend:** A Flask (Python) application that handles the diagnostic logic and knowledge base management.

## Features

*   Interactive symptom input via a chat-like interface.
*   Categorized symptom selection.
*   Dynamic diagnostic suggestions based on user input.
*   Ability to upload and update the knowledge base (e.g., via CSV files).
*   RESTful API for communication between frontend and backend.

## Getting Started

### Prerequisites

*   Node.js and npm (for the frontend)
*   Python and pip (for the backend)
*   Git

### Installation and Running

**1. Clone the repository:**

```bash
git clone <repository-url>
cd medical-diagnosis-expert-system
```

**2. Backend Setup and Execution:**

Navigate to the backend directory:

```bash
cd backend
```

For detailed backend setup, testing, and deployment instructions, please refer to the `backend/README.md` file.

To run the backend server locally (typically on `http://127.0.0.1:5000/`):

```bash
# Create and activate a virtual environment (recommended)
python -m venv venv
# On Windows:
# venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python app.py
```

**3. Frontend Setup and Execution:**

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Run the development server (typically on `http://localhost:5173/` or a similar port):

```bash
npm run dev
```

Once both the backend and frontend servers are running, you can access the application in your web browser by navigating to the frontend's URL.

## Technologies Used

### Frontend

*   React
*   Vite (build tool)
*   JavaScript
*   HTML/CSS
*   Tailwind CSS
*   Axios (for API requests)
*   React Router DOM (for navigation)
*   React Dropzone (for file uploads)

### Backend

*   Flask (Python web framework)
*   CLIPS (C Language Integrated Production System) concepts for rule-based diagnosis
*   Gunicorn (WSGI HTTP Server for deployment)
*   Pytest (for testing)

## API Endpoints

The backend exposes several API endpoints for the frontend to interact with. Key endpoints include:

*   `/api/diagnose`: Submits selected symptoms and receives potential diagnoses.
*   `/api/get_initial_symptoms`: Fetches the list of initial symptoms for the user.
*   `/api/upload_csv`: Allows uploading a CSV file to update the knowledge base.
*   `/api/knowledge_base`: Provides access to view or manage the knowledge base.
*   `/api/healthcheck`: Verifies the server status.

(Refer to `backend/app.py` for more details on API routes and functionality).

## Evaluation

A detailed evaluation of the system's performance, architecture, diagnostic algorithms, and ethical considerations can be found in the `backend/README.md` file.
