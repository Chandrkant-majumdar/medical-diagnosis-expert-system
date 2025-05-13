import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ size = "md", showTagline = false, className = "" }) => {
  // Size classes mapping
  const sizeClasses = {
    sm: {
      container: "flex items-center",
      icon: "text-2xl mr-2",
      text: "text-lg font-bold",
    },
    md: {
      container: "flex items-center",
      icon: "text-3xl mr-2",
      text: "text-xl font-bold",
    },
    lg: {
      container: "flex items-center",
      icon: "text-4xl mr-3",
      text: "text-2xl font-bold",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`${selectedSize.container} ${className}`}>
      <div className={`${selectedSize.icon} text-codyBlue`}>
        {/* Medical stethoscope emoji */}
        🩺
      </div>
      <div>
        <div className={`${selectedSize.text} text-darkBlue`}>e-Doctor</div>
        {showTagline && (
          <div className="text-xs text-gray-500 -mt-1">
            AI-Powered Medical Assistant
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
