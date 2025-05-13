import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FinalDiagnosisCard from "../components/diagnosis/FinalDiagnosisCard";
import SymptomCard from "../components/symptoms/SymptomCard";
import SymptomCategories from "../components/symptoms/SymptomCategories";
import MessagesContainer from "../components/chat/MessagesContainer";
// Import the symptom categories from the new file
import { symptomCategories } from "../data/symptomCategoriesData";

// Initial system message
const initialMessages = [
  {
    sender: "system",
    text: "Welcome to the Medical Expert System Assistant. This system represents a thesis implementation of an AI-driven diagnostic tool utilizing CLIPS rule-based reasoning. Please begin by selecting your symptoms from the categorized list below. The system will analyze symptom patterns to suggest potential diagnoses based on its knowledge base. Note: This is an academic prototype for research purposes.",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

function Chat() {
  // State variables
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [remainingSymptoms, setRemainingSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [possibleDiseases, setPossibleDiseases] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinalDiagnosis, setIsFinalDiagnosis] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const [activeCategory, setActiveCategory] = useState("common"); // Add new state for active category
  const [searchTerm, setSearchTerm] = useState(""); // Add new state for search term
  const [isRefreshing, setIsRefreshing] = useState(false); // Add isRefreshing state

  // Refs for scrolling
  const messagesEndRef = useRef(null);
  const symptomsContainerRef = useRef(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = (ref = messagesEndRef, offset = 100) => {
    if (!ref.current) return;

    const scrollContainer = document.getElementById("chat-container");
    if (scrollContainer) {
      const targetPosition = ref.current.offsetTop - offset;
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the symptoms section
  const scrollToSymptoms = () => {
    if (!symptomsContainerRef.current) return;

    const container = document.getElementById("chat-container");
    if (!container) return;

    const currentScroll = container.scrollTop;
    const targetScroll = symptomsContainerRef.current.offsetTop - 150; // Add offset

    // Only scroll if we need to move more than 200px
    if (Math.abs(targetScroll - currentScroll) > 200) {
      container.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to fetch latest symptoms from backend
  const fetchLatestData = () => {
    setIsRefreshing(true);
    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/get_initial_symptoms`)
      .then((response) => {
        setAllSymptoms(response.data.all_symptoms);

        // If we're in the middle of a diagnosis, update remaining symptoms without overwriting selected ones
        if (selectedSymptoms.length > 0) {
          // Re-process symptoms to get the latest possible matches
          processSymptoms(selectedSymptoms);
        } else {
          // If no diagnosis in progress, just set all symptoms as remaining
          setRemainingSymptoms(response.data.all_symptoms);
        }

        addSystemMessage(
          "Symptom database has been refreshed with the latest information."
        );
      })
      .catch((err) => {
        console.error("Error fetching updated symptoms:", err);
        addSystemMessage(
          "Sorry, there was an error refreshing the symptom database. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  // Initial data fetching when component mounts
  useEffect(() => {
    fetchLatestData();
  }, []);

  // Function to add a user message
  const addUserMessage = (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // Function to add a system message
  const addSystemMessage = (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "system",
        text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // Handle symptom selection
  const handleSelectSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      addSystemMessage(
        `I noted that you've already mentioned experiencing ${symptom}. Are you experiencing any other symptoms?`
      );
      scrollToBottom();
      return;
    }

    const updatedSymptoms = [...selectedSymptoms, symptom];
    setSelectedSymptoms(updatedSymptoms);
    addUserMessage(`I'm having ${symptom}.`);
    setIsTyping(true);
    processSymptoms(updatedSymptoms);
  };

  // Process selected symptoms and get possible diseases
  const processSymptoms = (symptoms) => {
    setIsTyping(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/diagnose`, { symptoms })
      .then((response) => {
        const data = response.data;
        setPossibleDiseases(data.possible_diseases);

        console.log("---- Processing Details ----");
        console.log("Current Symptoms:", symptoms);
        console.log("Possible Diseases:", data.possible_diseases);

        if (data.possible_diseases.length === 1) {
          setIsFinalDiagnosis(true);
          addSystemMessage(
            `Based on the combination of symptoms you've described (${symptoms.join(
              ", "
            )}), I can now provide a likely diagnosis.`
          );
          addSystemMessage(
            `My analysis suggests you may have: ${data.possible_diseases[0]}`
          );
          addSystemMessage(
            "While this is a preliminary AI-based assessment, it's important to consult with a healthcare provider for proper evaluation and treatment."
          );
        } else if (data.possible_diseases.length > 1) {
          const symptomText =
            symptoms.length === 1
              ? `your symptom of ${symptoms[0]}`
              : `your symptoms (${symptoms.join(", ")})`;

          addSystemMessage(
            `I've analyzed ${symptomText} and found ${data.possible_diseases.length} possible conditions. Please select any additional symptoms you may be experiencing to help refine the diagnosis.`
          );
        } else {
          addSystemMessage(
            "I need more information to make an accurate assessment. Could you please select any other symptoms you're experiencing?"
          );
        }

        setRemainingSymptoms(data.remaining_symptoms);
        scrollToBottom();
        if (response.data.possible_diseases.length > 1) {
          setTimeout(scrollToSymptoms, 800);
        }
      })
      .catch((err) => {
        console.error("Error processing diagnosis:", err);
        addSystemMessage(
          "Sorry, there was an error processing your diagnosis. Please try again."
        );
      })
      .finally(() => {
        setIsTyping(false);
      });
  };

  // Handle final diagnosis
  const handleDiagnose = () => {
    if (possibleDiseases.length === 1) {
      addSystemMessage(`Final Diagnosis: ${possibleDiseases[0]}`);
    } else if (possibleDiseases.length > 1) {
      addSystemMessage(
        `Multiple possible diseases found: ${possibleDiseases.join(
          ", "
        )}. Please select more symptoms to narrow down.`
      );
    } else {
      addSystemMessage(
        "No matching diseases found based on the provided symptoms."
      );
    }
  };

  // Reset the diagnosis process
  const resetDiagnosis = () => {
    setMessages([
      {
        sender: "system",
        text: "Conversation has been reset. Please select your symptoms one by one.",
      },
    ]);
    setPossibleDiseases([]);
    setSelectedSymptoms([]);
    setRemainingSymptoms(allSymptoms); // Reset remaining symptoms
    setIsFinalDiagnosis(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle key press (Enter key)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Handle send button click
  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // You can add custom message handling here if needed
  };

  // Improved helper function to categorize symptoms
  const categorizeSymptoms = (symptoms) => {
    // Initialize result object with empty arrays for each category
    const result = Object.keys(symptomCategories).reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});

    // Process each symptom
    symptoms.forEach((symptom) => {
      const lowerSymptom = symptom.toLowerCase();
      let categorized = false;

      // Check each category (except 'other') for matches
      for (const [category, details] of Object.entries(symptomCategories)) {
        if (category === "other") continue;

        // Check if the symptom matches any pattern in the category
        if (
          details.patterns.some((pattern) => lowerSymptom.includes(pattern))
        ) {
          result[category].push(symptom);
          categorized = true;
          break; // Stop after first match
        }
      }

      // If no category matched, put in 'other'
      if (!categorized) {
        result.other.push(symptom);
      }
    });

    return result;
  };

  // New function to filter symptoms based on search term across all categories
  const getFilteredSymptoms = (symptoms, category) => {
    // When no search term is provided, just return the current category's symptoms
    if (!searchTerm.trim()) {
      return categorizeSymptoms(symptoms)[category];
    }

    // When searching, get results from all categories
    const lowerSearchTerm = searchTerm.toLowerCase();

    // If searching, gather matches from all categories
    const allCategoriesResult = [];
    const categorized = categorizeSymptoms(symptoms);

    Object.keys(categorized).forEach((categoryKey) => {
      const matchingSymptoms = categorized[categoryKey].filter((symptom) =>
        symptom.toLowerCase().includes(lowerSearchTerm)
      );

      // Add category information to each symptom
      matchingSymptoms.forEach((symptom) => {
        allCategoriesResult.push({
          text: symptom,
          category: categoryKey,
        });
      });
    });

    return allCategoriesResult;
  };

  // Helper function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Helper function to clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Main return statement
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* App Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🩺</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Medical Expert System
            </h1>
          </div>
          <button
            onClick={resetDiagnosis}
            className="text-sm px-3 py-1.5 border border-gray-200 rounded-full flex items-center gap-1.5 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clipRule="evenodd"
              />
            </svg>
            New Diagnosis
          </button>
        </div>
      </header>

      {/* Main scrollable container - Use a backdrop blur gradient for a fresher look */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-indigo-50/10 pointer-events-none" />

        <div
          className="h-full overflow-y-auto px-4 py-6"
          id="chat-container"
          style={{
            height: "calc(100vh - 30vh - 60px)", // Account for header height
            paddingBottom: "min(30vh, 300px)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Messages Container */}
            <MessagesContainer
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />

            {/* Symptoms Selection Area with cleaner styling */}
            <div
              ref={symptomsContainerRef}
              className="mb-20 max-w-5xl mx-auto mt-10 bg-white backdrop-blur-sm bg-opacity-90 rounded-3xl px-6 py-5 shadow-sm border border-gray-100"
            >
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-[3px] border-current border-t-transparent text-blue-500 mb-4"></div>
                  <p className="text-gray-500 font-medium">
                    Loading symptoms database...
                  </p>
                </div>
              ) : (
                <div className="space-y-7">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
                      Select Your Symptoms
                    </h2>
                    <p className="text-sm text-gray-500">
                      Choose all symptoms you're experiencing for an accurate
                      diagnosis
                    </p>
                  </div>

                  {/* Search and Refresh with improved UI */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Search symptoms..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-3 pl-10 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      {searchTerm && (
                        <button
                          onClick={clearSearch}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={fetchLatestData}
                      disabled={isRefreshing}
                      className={`p-3 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm
                        ${
                          isRefreshing
                            ? "bg-gray-100 text-gray-400 border border-gray-200"
                            : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        }`}
                      title="Refresh symptom database"
                    >
                      <svg
                        className={`w-5 h-5 ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  {/* Symptom Categories - Cleaner tabs */}
                  <SymptomCategories
                    symptomCategories={symptomCategories}
                    categorizeSymptoms={categorizeSymptoms}
                    remainingSymptoms={remainingSymptoms}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />

                  {/* Symptoms Grid with cleaner cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {getFilteredSymptoms(remainingSymptoms, activeCategory)
                      .length > 0 ? (
                      getFilteredSymptoms(
                        remainingSymptoms,
                        activeCategory
                      ).map((symptomData) => {
                        // ...existing symptom mapping logic...
                        const isSearching = searchTerm.trim() !== "";
                        const symptomText = isSearching
                          ? symptomData.text
                          : symptomData;
                        const symptomCategory = isSearching
                          ? symptomData.category
                          : activeCategory;

                        return (
                          <SymptomCard
                            key={
                              isSearching
                                ? `${symptomText}-${symptomCategory}`
                                : symptomText
                            }
                            symptom={symptomText}
                            category={symptomCategory}
                            onClick={() => handleSelectSymptom(symptomText)}
                            isSelected={selectedSymptoms.includes(symptomText)}
                            showCategory={isSearching}
                          />
                        );
                      })
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <svg
                            className="w-10 h-10 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <h3 className="text-gray-700 font-medium mb-1">
                          No matching symptoms
                        </h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                          Try a different search term or select another category
                          from the tabs above
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Final Diagnosis Card with improved styling */}
      {isFinalDiagnosis && possibleDiseases.length === 1 && (
        <FinalDiagnosisCard
          disease={possibleDiseases[0]}
          resetDiagnosis={resetDiagnosis}
        />
      )}

      {/* Bottom panel with cleaner styling */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 z-10 shadow-lg"
        style={{
          maxHeight: "min(30vh, 300px)",
          overflow: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="max-w-5xl mx-auto py-1">
          {/* Status Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Selected Symptoms Panel */}
            <div className="w-full">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-2xl p-3 h-full transition-all duration-300 ease-in-out hover:shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500/10 rounded-full p-1.5 mr-2">
                    <span className="text-blue-600 text-sm">🔍</span>
                  </div>
                  <h3 className="font-semibold text-blue-900 text-xs sm:text-sm">
                    Selected Symptoms
                  </h3>
                  <span className="ml-auto bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {selectedSymptoms.length}
                  </span>
                </div>
                <div
                  className="flex flex-wrap gap-1.5 overflow-y-auto pr-1"
                  style={{
                    maxHeight: selectedSymptoms.length > 10 ? "120px" : "auto",
                    minHeight: "30px",
                  }}
                >
                  {selectedSymptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 bg-white text-blue-700 rounded-full text-xs font-medium shadow-sm transition-all duration-200 hover:bg-blue-50 border border-blue-100"
                    >
                      {symptom}
                    </span>
                  ))}
                  {selectedSymptoms.length === 0 && (
                    <span className="text-blue-600/60 text-xs italic">
                      No symptoms selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Possible Conditions Panel */}
            <div className="w-full">
              <div className="bg-gradient-to-br from-green-50 to-green-100/70 rounded-2xl p-3 h-full transition-all duration-300 ease-in-out hover:shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500/10 rounded-full p-1.5 mr-2">
                    <span className="text-green-600 text-sm">🎯</span>
                  </div>
                  <h3 className="font-semibold text-green-900 text-xs sm:text-sm">
                    Possible Conditions
                  </h3>
                  <span className="ml-auto bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {possibleDiseases.length}
                  </span>
                </div>
                <div
                  className="flex flex-wrap gap-1.5 overflow-y-auto pr-1"
                  style={{
                    maxHeight: possibleDiseases.length > 10 ? "120px" : "auto",
                    minHeight: "30px",
                  }}
                >
                  {possibleDiseases.map((disease, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 bg-white text-green-700 rounded-full text-xs font-medium shadow-sm transition-all duration-200 hover:bg-green-50 border border-green-100"
                    >
                      {disease}
                    </span>
                  ))}
                  {possibleDiseases.length === 0 && (
                    <span className="text-green-600/60 text-xs italic">
                      No conditions identified yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
