"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // Words to float around the screen
  const floatingWords = [
    "skibidi", "gyatt", "rizz", "sigma", "alpha", "beta", "omega", "grindset",
    "amogus", "sus", "imposter", "sussy", "impostor", "suspect", "amongus",
    "gooning", "goon", "gooner", "kpop",
    "boomer", "doomer", "zoomer",
    "copium", "cope", "seethe", "mald", "cringe", "based", "redpilled",
    "bluepilled", "blackpilled", "blud", "dawg", "ishowspeed", "bussing", "poggers",
    "glizzy", "thug", "slatt", "twin",
  ];

  const [floatingStyles, setFloatingStyles] = useState<
    { left: string; top: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    // Only generate random values after the component is mounted
    const styles = floatingWords.map(() => ({
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      animationDelay: `${Math.random() * 2}s`, // Random delay up to 2 seconds
    }));
    setFloatingStyles(styles);
  }, []); // Run only once on mount

  // Reference to audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileInputClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-purple-900 via-black to-green-900 opacity-30 mix-blend-difference" />

      {/* Floating Words */}
      <div className="absolute inset-0 z-100 pointer-events-none">
        {floatingStyles.length > 0 &&
          floatingWords.map((word, index) => (
            <div
              key={index}
              className="floating-word text-white text-lg font-bold absolute z-10"
              style={{
                left: floatingStyles[index]?.left,
                top: floatingStyles[index]?.top,
                animationDelay: floatingStyles[index]?.animationDelay,
              }}
            >
              {word}
            </div>
          ))}
      </div>

      {/* Glitch Banner */}
      <div className="w-full h-[300px] relative overflow-hidden z-1">
        <Image
          src="/image.webp" // Path to the image inside the public folder
          alt="Brainrot Banner"
          width={1920}
          height={1080}
          layout="intrinsic"
          objectFit="cover"
          className="animate-glitch"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50 mix-blend-overlay pointer-events-none" />
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10">
        {/* Title Section with Glitch Effect */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white relative before:content-[''] before:absolute before:-top-0.5 before:left-0 before:right-0 before:h-full before:bg-gradient-to-r from-purple-500 via-red-500 to-green-500 before:blur-md before:opacity-50 animate-glitch-text">
          Brainrot Scanner
        </h1>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* File Dropbox Section */}
        <div className="flex flex-col gap-4 items-center justify-center border-2 border-white rounded-lg p-8 bg-gray-800 text-white relative group hover:shadow-[0_0_10px_rgba(255,0,255,0.8)] transition-shadow duration-300">
          <p className="animate-flicker">Drag and drop your files here</p>
          <input
            type="file"
            className="border-2 border-white rounded-md p-2 bg-transparent text-white relative z-10 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300"
            onClick={handleFileInputClick}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-red-500 to-green-700 opacity-10 blur-md group-hover:opacity-50 group-hover:blur-xl" />
        </div>
      </main>

      {/* Glitch Banner */}
      <div className="w-full h-[300px] relative overflow-hidden z-1">
        <Image
          src="/image.webp" // Path to the image inside the public folder
          alt="Brainrot Banner"
          width={1920}
          height={1080}
          layout="intrinsic"
          objectFit="cover"
          className="animate-glitch"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-50 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="brainrot-theme.mp3" preload="auto" />
    </div>
  );
}

