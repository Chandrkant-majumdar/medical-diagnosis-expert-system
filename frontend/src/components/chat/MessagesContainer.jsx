import React from "react";

const MessagesContainer = ({ messages, isTyping, messagesEndRef }) => (
  <div className="space-y-6 max-w-3xl mx-auto">
    {/* Welcome Card at the top with an improved gradient */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg transform transition-all animate-fadeIn">
      <div className="flex items-start">
        <div className="bg-white/20 rounded-xl p-3 mr-4 backdrop-blur-sm">
          <div className="text-3xl">🩺</div>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-2 flex items-center">
            Medical Diagnostic Assistant
            <span className="ml-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
              AI Powered
            </span>
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            I'll help you identify potential health conditions based on your
            symptoms. Select from the symptom options below or use the search
            box to find specific symptoms.
          </p>
        </div>
      </div>
    </div>

    {/* Messages with improved styling and animations */}
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex animate-fadeIn transition-all duration-300 ease-in-out ${
          message.sender === "system" ? "justify-start" : "justify-end"
        }`}
      >
        {message.sender === "system" && (
          <div className="text-3xl mr-3 flex-shrink-0 self-end">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-11 w-11 rounded-full flex items-center justify-center shadow-sm">
              <span role="img" aria-label="robot">
                🤖
              </span>
            </div>
          </div>
        )}
        <div
          className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-2xl shadow-sm transition-all duration-300 ease-out ${
            message.sender === "system"
              ? "bg-white text-gray-800 border border-gray-100"
              : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
          }`}
        >
          <div className="text-sm font-normal leading-relaxed whitespace-pre-line">
            {message.text.split("\n").map((line, i) => {
              // Handle bullet points with better styling
              if (line.startsWith("• ")) {
                return (
                  <div key={i} className="flex items-start my-1.5">
                    <span className="mr-2 text-xs mt-1">
                      {message.sender === "system" ? "•" : "○"}
                    </span>
                    <span>{line.substring(2)}</span>
                  </div>
                );
              }
              // Handle 🔍 Possible Conditions: with better styling
              if (line.startsWith("🔍 Possible Conditions:")) {
                return (
                  <div
                    key={i}
                    className={`font-medium my-2.5 ${
                      message.sender === "system"
                        ? "text-blue-700"
                        : "text-white"
                    }`}
                  >
                    {line}
                  </div>
                );
              }
              // Regular text
              return line ? (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ) : (
                <br key={i} />
              );
            })}
          </div>
          {message.timestamp && (
            <span
              className={`block text-xs font-normal tracking-wide mt-2 ${
                message.sender === "system" ? "text-gray-400" : "text-blue-100"
              }`}
            >
              {message.timestamp}
            </span>
          )}
        </div>
        {message.sender === "user" && (
          <div className="text-3xl ml-3 flex-shrink-0 self-end">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 h-11 w-11 rounded-full flex items-center justify-center shadow-sm text-white">
              <span role="img" aria-label="user">
                👤
              </span>
            </div>
          </div>
        )}
      </div>
    ))}

    {/* Typing indicator with improved animation */}
    {isTyping && (
      <div className="flex justify-start animate-fadeIn">
        <div className="text-3xl mr-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-11 w-11 rounded-full flex items-center justify-center shadow-sm">
            <span role="img" aria-label="robot">
              🤖
            </span>
          </div>
        </div>
        <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="flex space-x-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
            ></div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
            ></div>
            <div
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 animate-bounce"
              style={{ animationDelay: "600ms", animationDuration: "0.8s" }}
            ></div>
          </div>
          <span className="ml-3 text-sm text-gray-500 font-medium">
            Analyzing symptoms...
          </span>
        </div>
      </div>
    )}

    <div ref={messagesEndRef} className="h-1" />
  </div>
);

export default MessagesContainer;
