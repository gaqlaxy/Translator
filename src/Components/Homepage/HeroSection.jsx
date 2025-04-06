import React from "react";

function HeroSection() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Learn Hindi</h1>
        <p className="text-gray-700 mb-6">
          Start your journey to mastering Hindi!
        </p>
        <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
          Login to Begin
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
