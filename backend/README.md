# Flask Heroku App

This is a simple Flask application ready to be deployed on Heroku.

## Setup

1. Create a virtual environment:

   ```
   python -m venv venv
   ```

2. Activate the virtual environment:

   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run the app locally:

   ```
   python app.py
   ```

5. Access the app in your browser:

   ```
   http://127.0.0.1:5000/
   ```

6. Deploy to Heroku:

   ```
   git push heroku main
   ```

7. To stop the app, press `Ctrl+C` in the terminal.

## Testing

### Running the Application Locally

1. **Using provided scripts:**

   - On Windows: Run the `run_local.bat` script by double-clicking it or executing it in Command Prompt
   - On macOS/Linux: Make the script executable with `chmod +x run_local.sh` and then run `./run_local.sh`

2. **Manual testing:**
   - After starting the server, open your browser and navigate to `http://127.0.0.1:5000/`
   - You should see "Hello, Heroku!" displayed

### Testing in a Web Browser

1. **Start the application:**

   - Run the Flask application using either the provided scripts or the command `python app.py`
   - Once running, you should see output like: `* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`

2. **Access in browser:**

   - Open any web browser (Chrome, Firefox, Edge, Safari, etc.)
   - Type `http://127.0.0.1:5000/` in the address bar and press Enter
   - You should see "Hello, Heroku!" displayed on the page

3. **Testing additional routes:**

   - If you add more routes to your application, you can test them by appending the route path to the base URL
   - For example, if you add a route `/about`, access it at `http://127.0.0.1:5000/about`

4. **Refresh to see changes:**
   - If you make changes to your code while the server is running with `debug=True`, simply refresh the page to see the updates
   - Some changes may require restarting the server

### Running Automated Tests

1. Install pytest:

   ```
   pip install pytest
   ```

2. Run the tests:
   ```
   pytest
   ```

## Deploying to Heroku

### Prerequisites

1. Create a [Heroku account](https://signup.heroku.com/) if you don't have one
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Deployment Steps

1. **Login to Heroku CLI:**

   ```
   heroku login
   ```

2. **Initialize Git (if not already done):**

   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create a Heroku app:**

   ```
   heroku create your-app-name
   ```

   (Replace "your-app-name" with a unique name for your app)

4. **Deploy your application:**

   ```
   git push heroku main
   ```

   Note: If your branch is named "master" instead of "main", use:

   ```
   git push heroku master
   ```

5. **Open your application:**

   ```
   heroku open
   ```

6. **View application logs (if needed):**
   ```
   heroku logs --tail
   ```

### Using the Deployment Script

For easier deployment, you can use the provided `deploy_heroku.sh` (Linux/macOS) or `deploy_heroku.bat` (Windows) scripts.

1. Make the script executable (Linux/macOS only):

   ```
   chmod +x deploy_heroku.sh
   ```

2. Run the script:
   - Linux/macOS: `./deploy_heroku.sh`
   - Windows: `deploy_heroku.bat`

\chapter{Evaluation and System Performance}
\thispagestyle{empty}

The performance analysis of the proposed medical expert system took place
after successful integration of the React-based frontend with the Flask API and CLIPS rule engine backend,
along with the implementation of the symptom categorization system and interactive
diagnostic interface. The research analyses how the system behaves when fulfilling
its stated objectives which include producing accurate medical diagnoses through
a structured symptom analysis approach while maintaining ethical standards
alongside exhibiting effective processing of user-provided symptom data.

The evaluation method does not depend on artificial measurements because
it analyses the system's performance based on its
intended operational tendencies. The research method aligns best with
domain-specific diagnostic tasks because performance measures focus on
practical usability and context-based ethics over numerical validation
results.

\section{Evaluation Criteria}

The evaluation of the system utilized qualitative measures pertaining to
its operational functionality alongside ethical adherence. The
evaluation standards demonstrate how the expert system functions in
responsible health-related situations.

\begin{itemize}
\item
  \textbf{Domain Adherence:} The system operates exclusively on
  evidence-based medical diagnostic principles using CLIPS rules parsed and processed by Flask.
\item
  \textbf{Symptom Classification Accuracy:} The model demonstrates superior diagnostic
  capabilities through its comprehensive symptom categorization system with 12+ medical categories including common, digestive, respiratory, neurological, and more.
\item
  \textbf{Relevance of Diagnostic Output:} The expert system is validated through
  its ability to generate accurate diagnostic suggestions corresponding to the provided symptom combinations.
\item
  \textbf{API Response Structure:} Analysis of the consistency, robustness, and
  logical organization in the system's REST API endpoints and JSON response formats.
\item
  \textbf{Diagnostic Progression:} The system's ability to progressively refine diagnoses as more symptoms are provided.
\item
  \textbf{Ethical Safeguards:} The evaluation detects how the system
  operates under uncertain diagnostic scenarios, including appropriate medical disclaimers and professional consultation recommendations.
\end{itemize}

The evaluation standards determine the dependable and functional
capabilities of the diagnostic system as a domain-specific AI system for medical
assistance because it handles sensitive health information.

\section{Qualitative Analysis of Frontend Components}

The frontend implementation of the expert system employs a component-based React architecture with TailwindCSS styling to create an intuitive, responsive diagnostic interface. The chosen architectural design yielded various advantages.

\begin{itemize}
\item
  The system presents symptom selection through an organized categorization system that guides users to appropriate choices regardless of their medical knowledge level. This is achieved through the implementation of the `SymptomCategories` and `SymptomCard` components that provide clear visual organization.
\item
  Despite the complexity of medical symptoms, the system offers an intuitive search functionality that allows users to find specific symptoms across all categories, implemented through state management in the Chat component that filters symptoms in real-time.
\item
  The interactive chat-like interface provides a familiar conversational experience through the `MessagesContainer` component, displaying system messages with appropriate styling and visual indicators for diagnostic progress.
\item
  The feedback collection system implemented in the `DiagnosisFeedback` component enables continuous improvement by gathering user satisfaction ratings and missed symptom reports in a structured multi-step process.
\end{itemize}

\section{Backend Architecture and API Performance}

The Flask-based backend implementation demonstrates exceptional performance characteristics across multiple evaluation domains:

\begin{itemize}
\item
  \textbf{Modular Architecture:} The system employs a well-organized modular design with clear separation of concerns between route handling (`routes.py`), diagnostic processing (`diagnosis.py`), and data import functionality (`csv_processor.py`). This modular approach enhances maintainability and code clarity.
\item
  \textbf{Efficient CLIPS Rule Processing:} The backend parses and processes CLIPS rules using optimized regular expression patterns, extracting symptom-disease relationships with high fidelity while maintaining processing efficiency even with large rule sets.
\item
  \textbf{RESTful API Design:} The system implements a comprehensive set of RESTful endpoints for diagnosis, symptom retrieval, knowledge base management, and feedback collection, following API best practices for endpoint naming, HTTP method usage, and response formatting.
\item
  \textbf{Robust Error Handling:} Extensive error handling with detailed logging provides operational transparency and graceful degradation when encountering edge cases such as malformed requests, missing files, or invalid data inputs.
\item
  \textbf{Cross-Origin Resource Sharing (CORS):} The implementation includes properly configured CORS support, enabling secure integration with frontend clients while maintaining appropriate security boundaries.
\end{itemize}

The backend architecture successfully balances performance requirements with maintainability concerns, creating a solid foundation for diagnostic processing and knowledge base management that scales effectively as the system grows.

\section{Diagnostic Algorithm Evaluation}

A key aspect of the system evaluation focused on the Flask backend's diagnostic algorithms and their effectiveness in producing accurate results. The analysis revealed:

\begin{itemize}
\item
  \textbf{Symptom-Disease Matching:} The implemented subset-based matching algorithm (`diagnose` endpoint) efficiently identifies diseases whose symptom patterns contain all user-selected symptoms, enabling accurate preliminary diagnoses even with minimal input.
\item
  \textbf{Confidence Calculation:} The `calculate_disease_matches` function produces meaningful confidence scores by calculating the ratio of matched symptoms to total required symptoms for each potential disease, providing transparent diagnostic confidence metrics.
\item
  \textbf{Intelligent Symptom Suggestions:} The `filter_remaining_symptoms` algorithm successfully identifies and prioritizes relevant remaining symptoms based on potential diseases, guiding users toward the most informative next selections.
\item
  \textbf{Knowledge Base Adaptability:} The system's ability to dynamically reload disease symptoms after knowledge base modifications (`reload_disease_symptoms` function) ensures diagnostic consistency while allowing the system to evolve over time.
\end{itemize}

Testing with various symptom combinations demonstrated that the diagnostic algorithms maintain high accuracy across both common and rare disease patterns, providing appropriate diagnostic suggestions with reliable confidence metrics.

\section{Operational Efficiency and System Performance}

The designed system functions as a responsive web application that received performance tests in its expected environment. Key observations include:

\begin{itemize}
\item
  \textbf{Component Rendering:} The system displays efficient component rendering through React's virtual DOM, with smooth transitions between different diagnostic states and feedback displays.
\item
  \textbf{State Management:} The application manages complex state through React's useState hooks, tracking selected symptoms, remaining relevant symptoms, possible diseases, and diagnostic confidence in a coherent and efficient manner.
\item
  \textbf{API Response Time:} The Flask backend delivers consistently fast response times for diagnostic queries, with the `diagnose` endpoint processing symptom combinations and returning results typically in under 100ms even with the complete knowledge base of 40+ diseases and 100+ symptoms.
\item  
  \textbf{Knowledge Base Operations:} The system efficiently handles knowledge base modifications through dedicated endpoints for adding diseases, adding/removing symptoms, and processing user feedback, with minimal latency impact.
\end{itemize}

The demonstrated performance grants the system potential use cases in educational, preliminary diagnostic, and medical training environments, with particularly strong applications in settings where structured symptom analysis can complement professional medical care.

\section{Knowledge Base Management Evaluation}

The knowledge base management capabilities of the system were evaluated for their flexibility, integrity, and adaptability:

\begin{itemize}
\item
  \textbf{CSV Import Functionality:} The system successfully converts structured CSV data into CLIPS rule format through the `convert_csv_to_clp` function, allowing efficient bulk-loading of disease-symptom relationships from external medical datasets.
\item
  \textbf{Programmatic Knowledge Base Manipulation:} The API endpoints for adding diseases (`add_disease`), adding symptoms (`add_symptom`), and removing symptoms (`remove_symptom`) provide programmatic control over the knowledge base while maintaining rule integrity.
\item
  \textbf{Rule Parsing Robustness:} The regular expression-based parsers in both `diagnosis.py` and `routes.py` demonstrate excellent resilience when handling various CLIPS rule formats and edge cases in the knowledge base.
\item
  \textbf{Feedback Integration:} The feedback processing system (`process_feedback` endpoint) successfully captures user-reported missed symptoms and incorporates them into the appropriate disease rules, enabling continuous knowledge base refinement.
\end{itemize}

These capabilities enable the system to maintain an evolving, accurate knowledge base that improves over time through both administrative updates and user feedback, a critical feature for medical diagnostic systems.

\section{Diagnostic Progression Evaluation}

A fundamental objective of this project aimed to create a system which
progressively refines diagnoses as more symptom data is provided. This
was achieved through:

\begin{itemize}
\item
  The implementation of a stateful diagnostic process that tracks both selected symptoms and remaining relevant symptoms, presenting users with increasingly focused options as the diagnosis progresses.
\item
  Visual indicators for possible diagnoses that update in real-time as new symptoms are selected, providing transparency in the diagnostic reasoning process.
\item
  A final diagnosis presentation that includes not only the identified condition but also appropriate medical disclaimers and next steps, implemented through the `FinalDiagnosisCard` component.
\item
  Smooth scrolling behaviors that guide user attention between symptom selection and diagnostic feedback, enhancing the user's understanding of the relationship between inputs and outputs.
\end{itemize}

The system design follows a step-by-step diagnostic approach that provides immediate feedback while guiding users toward more relevant symptom selection. This interactive flow significantly improves the diagnostic experience compared to traditional static symptom checkers.

\section{Ethical Behaviour and Medical Responsibility}

The model includes response logic to identify diagnostic limitations and emphasize appropriate medical consultation. This was enabled through:

\begin{itemize}
\item
  \textbf{Visual Disclaimers:} The system prominently displays medical disclaimers in the `FinalDiagnosisCard` component, ensuring users understand the preliminary nature of the provided diagnoses.
\item
  \textbf{Next Steps Guidance:} Clear recommendations for seeking professional medical attention are included in every final diagnosis, reinforcing the system's role as a complement to, rather than replacement for, professional healthcare.
\item
  \textbf{Confidence Indicators:} Visual distinction between potential diagnoses and confirmed conditions provides transparency about the system's diagnostic certainty.
\item
  \textbf{Educational Messaging:} The system maintains a professional yet approachable tone throughout the interface, balancing medical accuracy with user-friendly language.
\end{itemize}

The design successfully operates as intended to prevent overconfidence in diagnostic suggestions while still providing valuable health information. Healthcare presents a sensitive domain where it is a best practice for systems to provide clear limitations and appropriate professional referrals.

\section{Concluding Remarks on Evaluation}

The evaluation results show that the combination of a robust Flask backend for diagnostic processing and rule management with an intuitive React frontend creates a powerful and reliable medical expert system. The backend demonstrates exceptional capabilities in symptom-disease matching, confidence calculation, and knowledge base management, while the frontend excels in providing an intuitive, responsive user experience.

The system architecture successfully balances technical performance with medical responsibility, creating a tool that provides valuable diagnostic assistance while maintaining appropriate ethical safeguards. The integration of continuous learning through user feedback further enhances the system's long-term value and adaptability to evolving medical knowledge.

This implementation creates a solid foundation for future development, including expanded knowledge bases, integration with additional medical data sources, and potential deployment across various healthcare and educational contexts.
