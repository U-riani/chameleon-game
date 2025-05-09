import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [resetBreaks, setResetBreaks] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [chameleonActiveColor, setChameleonActiveColor] = useState(false);
  const [moveChameleon, setMoveChameleon] = useState(false);

  const handleBreaksReset = (reset) => {
    if (reset) {
      setResetBreaks(true);
    } else {
      setResetBreaks(false);
    }
  };
  const handleScoreUpdate = (reset = false) => {
    if (reset) {
      setScore(0);
    } else {
      if (score + 1 > record) {
        setRecord(score + 1);
      }
      setScore(score + 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        start,
        setStart,
        score,
        handleScoreUpdate,
        record,
        setRecord,
        resetBreaks,
        handleBreaksReset,
        gameOver,
        setGameOver,
        chameleonActiveColor,
        setChameleonActiveColor,
        moveChameleon,
        setMoveChameleon
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = () => useContext(AppContext);
