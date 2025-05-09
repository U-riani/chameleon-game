import React, { useEffect, useRef, useState } from "react";
import Chameleon from "../components/Chameleon";
import Breaks from "../components/Breaks";
import StartButton from "../components/StartButton";
import { useAppData } from "../contexts/AppContext";

const Game = () => {
  const {
    start,
    setStart,
    score,
    handleScoreUpdate,
    record,
    resetBreaks,
    handleBreaksReset,
    gameOver,
    setGameOver,
    chameleonActiveColor,
    moveChameleon,
    setMoveChameleon
  } = useAppData();

  const breaksRef = useRef(null);
  const chameleonRef = useRef(null);
  const gameRef = useRef(null);
  const moveY = useRef(0);
  const moveX = useRef(0);
  const animationFrame = useRef(null);

  const [previousMove, setPreviousMove] = useState(0);
  const [speed, setSpeed] = useState(4);
  const [hasCollided, setHasCollided] = useState(false);
  const [colors, setColors] = useState([
    {
      base: "bg-pink-500",
      head: "bg-pink-600",
      legs: "bg-pink-700",
      tail: "border-pink-500",
    },
    {
      base: "bg-blue-500",
      head: "bg-blue-600",
      legs: "bg-blue-700",
      tail: "border-blue-500",
    },
    {
      base: "bg-green-500",
      head: "bg-green-600",
      legs: "bg-green-700",
      tail: "border-green-500",
    },
  ]);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const animate = () => {
    if (!start) return;

    const gameHeight = gameRef.current?.clientHeight || 0;
    if (resetBreaks) {
      handleBreaksReset(false);
      moveY.current = 0;
    }

    if (breaksRef.current && chameleonRef.current) {
      moveY.current += speed;

      const breaksRect = breaksRef.current.getBoundingClientRect();
      const chameleonRect = chameleonRef.current.getBoundingClientRect();

      const isOverlapping =
        breaksRect.bottom >= chameleonRect.top &&
        breaksRect.top <= chameleonRect.top;

      if (isOverlapping && !hasCollided) {
        setHasCollided(true);

        const relativeLeft = chameleonRect.left - breaksRect.left;
        const sectionWidth = breaksRef.current.clientWidth / 3;

        const chameleonColor = chameleonRef.current.dataset.colorId;
        const breakColors = [
          breaksRef.current.children[0].dataset.colorId,
          breaksRef.current.children[1].dataset.colorId,
          breaksRef.current.children[2].dataset.colorId,
        ];

        let sectionIndex = Math.floor(relativeLeft / sectionWidth);
        sectionIndex = Math.min(Math.max(sectionIndex, 0), 2);

        if (chameleonColor === breakColors[sectionIndex]) {
          handleScoreUpdate();
        } else {
          setGameOver(true);
          setStart(false);
          setMoveChameleon(false)
          return;
        }
      }

      if (moveY.current > gameHeight) {
        moveY.current = 0;
        setSpeed((prev) => prev + 0.5);
        setColors(shuffleArray(colors));
        setHasCollided(false);
      }

      breaksRef.current.style.transform = `translateY(${moveY.current}px)`;
    }

    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (start) {
      setHasCollided(false);
      moveY.current = 0;
      moveX.current = 0;
      chameleonRef.current.style.transform = `translateX(${moveX.current}px)`;
      setPreviousMove(0);
      setSpeed(4);
    }
  }, [start]);

  useEffect(() => {
    const sectionWidth = breaksRef.current.clientWidth / 3;

    const handleKeyDown = (event) => {
      if (chameleonRef.current && breaksRef.current) {
        if (event.key === "ArrowRight" && previousMove < sectionWidth) {
          moveX.current += sectionWidth;
          setPreviousMove(moveX.current);
        } else if (event.key === "ArrowLeft" && previousMove > -sectionWidth) {
          moveX.current -= sectionWidth;
          setPreviousMove(moveX.current);
        }
        chameleonRef.current.style.transform = `translateX(${moveX.current}px)`;
      }
    };

    const HandleTouchScreen = (e) => {
      if (!chameleonRef.current || !breaksRef.current) return;

      const touchX = e.touches[0].clientX;
      const screenWidth = gameRef?.current?.clientWidth || 0;
      const sectionWidth = breaksRef.current.clientWidth / 3;

      if (touchX < screenWidth / 2 && previousMove > -sectionWidth) {
        moveX.current -= sectionWidth;
        setPreviousMove(moveX.current);
        console.log("++", start);
      } else if (touchX >= screenWidth / 2 && previousMove < sectionWidth) {
        console.log("--", start);
        moveX.current += sectionWidth;
        setPreviousMove(moveX.current);
      }

      // ✅ Apply movement visually
      chameleonRef.current.style.transform = `translateX(${moveX.current}px)`;

      // ✅ Optional: debug
      console.log("Moved to:", moveX.current);
    };

    if (moveChameleon) {
      console.log("0/0")
      window.addEventListener("touchstart", HandleTouchScreen);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", HandleTouchScreen);
    };
  }, [previousMove, moveChameleon, start]);
  console.log(chameleonActiveColor);

  useEffect(() => {
    if (start) {
      animationFrame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame.current);
    }
    return () => cancelAnimationFrame(animationFrame.current);
  }, [start, speed, resetBreaks]);

  return (
    <div
      ref={gameRef}
      className="game w-full h-full flex justify-center overflow-hidden"
    >
      <div className=" w-[90px] pe-[5px]">
        <p className="text-right">Record: {record}</p>
      </div>
      <div
        className={`main-screen min-w-[200px] max-w-md bg-cyan-100 border-l-4 border-r-4 ${chameleonActiveColor} flex flex-col justify-between items-center`}
      >
        <Breaks colors={colors.map((c) => c.base)} ref={breaksRef} />
        {(!start || gameOver) && <StartButton />}
        <Chameleon ref={chameleonRef} chameleonColors={colors} />
      </div>
      <div className="ps-[5px] w-[90px]">
        <p className="text-left">Score: {score}</p>
      </div>
    </div>
  );
};

export default Game;
