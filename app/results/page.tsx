"use client";
import { useBrainrot } from "@/context/BrainrotContext";

export default function Results() {
  const brainrotContext = useBrainrot();
  const brainrotData = brainrotContext ? brainrotContext.brainrotData : null;

  if (!brainrotData) {
    return <p>No data available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Brainrot Results</h1>
      <p className="text-2xl">Brainrot Score: {brainrotData.score}</p>
      <div className="mt-4 space-y-4">
        <h2 className="text-xl font-semibold">Suggestions:</h2>
        {Object.keys(brainrotData)
          .filter((key) => key.startsWith("suggestion"))
          .map((key, index) => (
            <p key={index} className="text-lg">
              {brainrotData[key]}
            </p>
          ))}
      </div>
      <p className="mt-8 text-gray-400 italic">{brainrotData.roast}</p>
    </div>
  );
}
