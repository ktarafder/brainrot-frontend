// app/summary/page.tsx

"use client";

import { useState } from "react";

export default function SummaryPage() {
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState(["Suggestion 1", "Suggestion 2", "Suggestion 3"]);

  const generateBrainrot = () => {
    alert("Brainrot generated!");
  };

  return (
    <div style={{ backgroundColor: "blue", color: "white", height: "100vh", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Score</h1>
        <p>{score}</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h1>Suggestions</h1>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={generateBrainrot}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "white",
          color: "blue",
        }}
      >
        Generate Brainrot
      </button>
    </div>
  );
}
