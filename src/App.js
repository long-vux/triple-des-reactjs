import React, { useState } from "react";
import TextEncryption from "./components/TextEncryption";
import FileEncryption from "./components/FileEncryption";
import "./index.css";

function App() {
  const [inputType, setInputType] = useState("Text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col items-center">
      {/* App Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Encryption App</h1>

      {/* Dropdown Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <label
          htmlFor="inputType"
          className="block text-gray-700 font-medium mb-2"
        >
          Select Input Type:
        </label>
        <select
          id="inputType"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-8">
        {inputType === "Text" ? (
          <TextEncryption />
        ) : (
          <FileEncryption fileType={inputType} />
        )}
      </div>
    </div>
  );
}

export default App;
