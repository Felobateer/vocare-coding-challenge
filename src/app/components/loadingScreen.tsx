import React from "react";

const LoadingScreen: React.FC = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-white">
    <svg
      className="animate-spin"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="#6a7282"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="210"
        strokeDashoffset="40"
      />
    </svg>
  </div>
);

export default LoadingScreen;
