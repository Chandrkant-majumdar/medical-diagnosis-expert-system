import { QuickLinks, ResourceLinks, LegalLinks } from "./LinkSection";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-lightBlue pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Project Info */}
          <div className="col-span-1 md:col-span-6">
            <Logo size="lg" showTagline={true} className="mb-5" />
            <p className="text-gray-600 mb-4 leading-relaxed">
              {/* An intelligent virtual doctor system powered by CLIPS
              rule-based engine that combines modern medicine with homeopathic
              approaches for comprehensive healthcare guidance and diagnosis. */}
              {/* Your personal AI medical assistant that helps identify potential
              health issues and provides guidance based on your symptoms and
              medical history. */}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Developed as part of academic research in artificial intelligence
              and expert systems under the guidance of
              <a
                href="https://www.iitism.ac.in/faculty-details?faculty=haider"
                className="font-semibold text-codyBlue hover:text-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Prof. Haider Banka
              </a>
              , IIT (ISM Dhanbad).
            </p>

            {/* Awards and Recognitions */}
            {/* <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-blue-50 text-codyBlue px-3 py-1 rounded-full text-xs font-medium">
                AI-Powered
              </span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                24/7 Assistance
              </span>
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                Research-Backed
              </span>
              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                Digital Health
              </span>
            </div> */}
          </div>

          {/* Links Container */}
          <div className="col-span-1 md:col-span-3">
            <div>
              {/* Quick Links Section */}
              {/* <div className="mb-8">
                <QuickLinks />
              </div> */}

              {/* Resources Section */}
              <div>
                <ResourceLinks />
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="col-span-1 md:col-span-3">
            <div>
              <h3 className="font-semibold text-darkBlue mb-4 text-lg">
                Development Team
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="bg-codyBlue text-white p-2 rounded-full mr-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-darkBlue">
                      Chandrakant Majumdar
                    </p>
                    <p className="text-sm text-gray-600">
                      Expert System Developer
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="bg-yellow-600 text-white p-2 rounded-full mr-3 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-darkBlue">Ankit Raj</p>
                    <p className="text-sm text-gray-600">
                      Medical Chatbot Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <Logo size="sm" className="mr-2" />
              <span className="mx-2 text-gray-400">•</span>
              <p className="text-gray-600 text-sm">
                © {currentYear} e-Doctor: AI-Powered Medical Diagnosis System
              </p>
            </div>
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
