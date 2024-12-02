"use client";

import React, { createContext, useContext, useState } from "react";

interface BrainrotContextType {
  brainrotData: any;
  setBrainrotData: React.Dispatch<React.SetStateAction<any>>;
}

const BrainrotContext = createContext<BrainrotContextType | null>(null);

export const BrainrotProvider = ({ children }: { children: React.ReactNode }) => {
  const [brainrotData, setBrainrotData] = useState(null);

  return (
    <BrainrotContext.Provider value={{ brainrotData, setBrainrotData }}>
      {children}
    </BrainrotContext.Provider>
  );
};

export const useBrainrot = () => useContext(BrainrotContext);
