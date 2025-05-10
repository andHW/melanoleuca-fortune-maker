import { createContext } from "react";
import type { FortuneContextType } from "./FortuneProvider";

export const FortuneContext = createContext<FortuneContextType | undefined>(
  undefined
);
