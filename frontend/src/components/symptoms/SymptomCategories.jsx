import React from "react";
import { categoryIcons } from "../../data/symptomCategoriesData";

function SymptomCategories({
  symptomCategories,
  categorizeSymptoms,
  remainingSymptoms,
  activeCategory,
  setActiveCategory,
}) {
  const categoryCounts = {};
  const categorizedSymptoms = categorizeSymptoms(remainingSymptoms);

  // Count symptoms in each category
  Object.keys(categorizedSymptoms).forEach((category) => {
    categoryCounts[category] = categorizedSymptoms[category].length;
  });

  // Get categories with at least one symptom
  const nonEmptyCategories = Object.keys(symptomCategories).filter(
    (category) => categoryCounts[category] > 0
  );

  // If current active category is now empty, switch to the first non-empty category
  React.useEffect(() => {
    if (nonEmptyCategories.length > 0 && categoryCounts[activeCategory] === 0) {
      setActiveCategory(nonEmptyCategories[0]);
    }
  }, [categoryCounts, activeCategory, nonEmptyCategories, setActiveCategory]);

  // If there are no categories with symptoms, show a message
  if (nonEmptyCategories.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50/50 rounded-xl border border-gray-200/50 backdrop-blur-sm">
        <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
          <span className="text-gray-500 text-xl">❓</span>
        </div>
        <p className="text-gray-500 font-medium">
          No symptom categories available
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Please try refreshing the symptoms database
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto py-1">
      <div className="flex space-x-2 pb-2 min-w-max">
        {nonEmptyCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all duration-200 
              ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
              }`}
          >
            <span className="text-lg">{categoryIcons[category] || "•"}</span>
            <span>{symptomCategories[category].name}</span>
            <span
              className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full 
              ${
                activeCategory === category
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {categoryCounts[category] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SymptomCategories;
