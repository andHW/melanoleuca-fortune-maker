import { createContext } from "react";
import type { Fortune } from "../types/fortuneTypes";

interface FortuneContextType {
  globalBrandName: string;
  setGlobalBrandName: (brandName: string) => void;
  globalFortuneText: string;
  setGlobalFortuneText: (fortuneText: string) => void;
  fortunes: Fortune[];
  setFortunes: (fortunes: Fortune[]) => void;
  handleAddFortune: () => void;
  handleRemoveFortune: () => void;
}

export const FortuneContext = createContext<FortuneContextType | undefined>(
  undefined
);
