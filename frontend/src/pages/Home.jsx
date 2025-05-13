import { Link } from "react-router-dom";
import { Footer } from "../components";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-darkBlue mb-6">
            Medical & Homeopathy Diagnosis Expert System
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            An intelligent system using CLIPS for accurate disease diagnosis
            with both modern medicine and homeopathic recommendations
          </p>

          {/* Dual Button Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/chat"
              className="inline-block bg-codyBlue text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <span className="mr-2">🏥</span>
              Medical Diagnosis
            </Link>

            <Link
              to="/upload"
              className="inline-block bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              <span className="mr-2">📁</span>
              Upload CSV
            </Link>

            <Link
              to="/knowledge-base"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">📚</span>
              Knowledge Base
            </Link>

            <a
              href="http://localhost:8000/"
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <span className="mr-2">🌿</span>
              Homeopathy Consultant
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl border border-lightBlue">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-darkBlue mb-2">
              Expert System
            </h3>
            <p className="text-gray-600">
              Powered by CLIPS rule-based system for intelligent diagnosis
            </p>
          </div>
          <div className="p-6 rounded-xl border border-lightBlue">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-darkBlue mb-2">
              Symptom Analysis
            </h3>
            <p className="text-gray-600">
              Advanced pattern matching for accurate disease identification
            </p>
          </div>
          <div className="p-6 rounded-xl border border-lightBlue">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-bold text-darkBlue mb-2">
              Treatment Suggestions
            </h3>
            <p className="text-gray-600">
              Evidence-based recommendations for diagnosed conditions
            </p>
          </div>

          {/* New Homeopathy Feature */}
          <div className="p-6 rounded-xl border border-lightBlue">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-darkBlue mb-2">
              Homeopathic Care
            </h3>
            <p className="text-gray-600">
              Alternative medicine suggestions based on holistic healing
              principles
            </p>
          </div>
        </div>
      </div>

      {/* Using the Footer component */}
      <Footer />
    </div>
  );
}
