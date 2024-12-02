"use client";
import { useBrainrot } from "@/context/BrainrotContext";

export default function Results() {
  const brainrotContext = useBrainrot();
  const brainrotData = brainrotContext ? brainrotContext.brainrotData : null;

  if (!brainrotData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-purple-800 text-white">
        <h1 className="text-6xl font-extrabold animate-pulse">ERROR!</h1>
        <p className="text-2xl mt-4 animate-bounce">
          The Brainrot Overlords have abandoned you. Try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-400 via-purple-500 to-indigo-900 text-white">
      <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 animate-gradient">
        ☠️ BRAINROT ☠️
      </h1>
      <p className="text-3xl mb-6 animate-spin-slow">
        Your Score: <span className="text-yellow-400">{brainrotData.score}</span>
      </p>
      <div className="w-full max-w-2xl p-6 rounded-lg border border-yellow-300 bg-black/50 backdrop-blur-md shadow-2xl">
        <h2 className="text-2xl font-bold underline mb-4">☠ Suggestions ☠</h2>
        <div className="space-y-3 text-lg">
          <div
            className="p-4 border border-dashed border-pink-500 rounded-md bg-black/30 text-center"
          >
            <span className="italic text-red-400">"{brainrotData.roast}"</span>
          </div>
          {Object.keys(brainrotData)
            .filter((key) => key.startsWith("suggestion"))
            .map((key, index) => (
              <div
                key={index}
                className="p-4 border border-dashed border-pink-500 rounded-md bg-black/30"
              >
                <span className="italic">{brainrotData[key]}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="absolute bottom-4 text-xs text-gray-400 animate-pulse">
        Brainrot Data © 2024. Consume Responsibly.
      </div>
    </div>
  );
}
