// hooks/useShufleArrayHook.js
import { useMemo } from "react";

const useShufleArrayHook = (array) => {
  return useMemo(() => {
    if (!array || array.length === 0) return [];
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, [array]);
};

export default useShufleArrayHook;
