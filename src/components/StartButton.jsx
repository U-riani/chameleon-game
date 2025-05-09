import { useAppData } from "../contexts/AppContext";

const StartButton = () => {
  const { setStart, handleScoreUpdate, handleBreaksReset, setGameOver, setMoveChameleon } = useAppData();

  const handleStartClick = () => {
    handleScoreUpdate(true); // optional: you may want to reset the score in context here
    handleBreaksReset(true);
    setGameOver(false);
    setStart(true);
    setMoveChameleon(true)
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <button
          onClick={handleStartClick}
          className="bg-cyan-200 px-4 py-1 text-[2rem] text-orange-400 cursor-pointer"
        >
          START
        </button>
      </div>
    </div>
  );
};

export default StartButton;
