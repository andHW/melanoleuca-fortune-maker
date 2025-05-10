import { useState, type ReactNode } from "react";
import { fortunes } from "../fortunes";
import { FortuneContext } from "./FortuneContextInstance";
import { type Fortune } from "../types/fortuneTypes";

export interface FortuneContextType {
  globalBrandName: string;
  setGlobalBrandName: (brandName: string) => void;
  globalFortuneText: string;
  setGlobalFortuneText: (fortuneText: string) => void;

  maxNumberOfFortunes: number;
  minNumberOfFortunes: number;

  fortunes: Fortune[];
  setFortunes: (fortunes: Fortune[]) => void;
  handleAddFortune: () => void;
  handleRemoveFortune: () => void;
}

export const FortuneProvider = ({ children }: { children: ReactNode }) => {
  const [globalBrandName, setGlobalBrandName] = useState("Ada Express");
  const [globalFortuneText, setGlobalFortuneText] = useState(fortunes[0]);

  // Helper function to get a random fortune
  const getRandomFortune = () =>
    fortunes[Math.floor(Math.random() * fortunes.length)];

  const [localFortunes, setLocalFortunes] = useState<Fortune[]>(
    Array.from({ length: 16 }, () => ({
      localBrandName: globalBrandName,
      localFortuneText: getRandomFortune(),
      applyLocalBrandName: false,
      applyLocalFortuneText: true,
    }))
  );

  // Add a new fortune
  const handleAddFortune = () => {
    if (localFortunes.length < 16) {
      setLocalFortunes([
        ...localFortunes,
        {
          localBrandName: globalBrandName,
          localFortuneText: getRandomFortune(),
          applyLocalBrandName: false,
          applyLocalFortuneText: true,
        },
      ]);
    }
  };

  // Remove the latest fortune
  const handleRemoveFortune = () => {
    if (localFortunes.length > 1) {
      setLocalFortunes(localFortunes.slice(0, -1));
    }
  };

  return (
    <FortuneContext.Provider
      value={{
        globalBrandName,
        setGlobalBrandName,
        globalFortuneText,
        setGlobalFortuneText,
        maxNumberOfFortunes: 16,
        minNumberOfFortunes: 1,
        fortunes: localFortunes,
        setFortunes: setLocalFortunes,
        handleAddFortune,
        handleRemoveFortune,
      }}
    >
      {children}
    </FortuneContext.Provider>
  );
};
