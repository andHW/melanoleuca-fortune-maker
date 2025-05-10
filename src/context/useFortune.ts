import { useContext } from "react";
import { FortuneContext } from "./FortuneContextInstance";

export const useFortune = () => {
  const context = useContext(FortuneContext);
  if (!context) {
    throw new Error("useFortune must be used within a FortuneProvider");
  }
  return context;
};
