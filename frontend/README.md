# Disease Diagnosis Expert System Frontend

A modern web application for diagnosing diseases based on user symptoms using an expert system backend built with CLIPS.

## Features

- **Symptom Selection**: Choose symptoms from categorized lists for accurate diagnosis
- **Chat Interface**: Interactive chat experience for symptom collection
- **Disease Diagnosis**: AI-powered diagnosis based on selected symptoms
- **Knowledge Base**: Access to medical knowledge and disease information
- **File Upload**: Upload medical records for enhanced diagnosis
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React 18**: Modern UI library for building the interface
- **Vite**: Next-generation frontend build tool
- **TailwindCSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **React Router DOM**: For application routing
- **Axios**: HTTP client for API communication
- **React Dropzone**: For file upload functionality

## Project Structure

```
src/
  ├── assets/          # Static assets like CSS and images
  ├── components/      # Reusable UI components
  │   ├── chat/        # Chat interface components
  │   ├── diagnosis/   # Diagnosis display components
  │   ├── layout/      # Layout components like footer
  │   └── symptoms/    # Symptom selection components
  ├── constants/       # Application constants
  ├── context/         # React context providers
  ├── data/            # Static data definitions
  ├── hooks/           # Custom React hooks
  ├── layouts/         # Page layout templates
  ├── pages/           # Top-level page components
  ├── services/        # API services and backend communication
  └── types/           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (>= 18.x, <= 22.x)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd my-disease-diagnosis-vite-app
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm run start` - Start the production build for deployment

## Deployment

This application is configured for easy deployment to platforms like Heroku. The necessary configuration files (`Procfile` and `static.json`) are included.

### Heroku Deployment

```bash
heroku create
git push heroku main
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- CLIPS (C Language Integrated Production System) for the expert system backend
- React and Vite communities for excellent documentation and tools
