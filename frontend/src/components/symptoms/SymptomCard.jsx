import React from "react";
import {
  categoryColors,
  categoryIcons,
} from "../../data/symptomCategoriesData";

function SymptomCard({ symptom, category, onClick, isSelected, showCategory }) {
  return (
    <div
      className={`group p-3.5 rounded-xl transition-all duration-200 cursor-pointer relative ${
        isSelected
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 shadow-md"
          : "bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30"
      }`}
      onClick={onClick}
    >
      {/* Add a subtle interaction effect */}
      <div
        className={`absolute inset-0 rounded-xl ${
          isSelected
            ? "bg-blue-400/5"
            : "bg-transparent group-hover:bg-blue-100/10"
        } transition-all duration-200`}
      ></div>

      <div className="flex items-start relative z-10">
        {/* If showCategory is true, show the category indicator */}
        {showCategory && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2 ${
              categoryColors[category] || "bg-gray-100 text-gray-800"
            }`}
          >
            {categoryIcons[category] || "•"}{" "}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        )}

        <div className="flex-1 flex items-center">
          {!showCategory && (
            <div className="mr-2.5 opacity-70 text-sm">
              {categoryIcons[category] || "•"}
            </div>
          )}
          <p
            className={`text-sm font-medium ${
              isSelected
                ? "text-blue-800"
                : "text-gray-800 group-hover:text-blue-700"
            } transition-colors duration-200`}
          >
            {symptom}
          </p>
        </div>

        {/* Add a checkmark for selected items */}
        {isSelected && (
          <div className="ml-1.5 bg-blue-500 rounded-full p-0.5 flex-shrink-0">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomCard;
