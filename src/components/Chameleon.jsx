import React, { useEffect, useState } from "react";
import { useAppData } from "../contexts/AppContext";

const Chameleon = React.forwardRef(({ chameleonColors }, ref) => {
  const [headColor, setHeadColor] = useState("");
  const [legsColor, setLegsColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [tailColor, setTailColor] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const {setChameleonActiveColor} = useAppData()

  const handleShufleFunction = () => {
    const randomNum = (Math.random() * 10).toString()[0]
    return Number(randomNum) % 3
  }

  useEffect(() => {
    if (chameleonColors && chameleonColors.length) {
      const randomIndex = Math.floor(handleShufleFunction()) % 3;
      const colorSet = chameleonColors[randomIndex];
      setHeadColor(colorSet.head);
      setLegsColor(colorSet.legs);
      setBodyColor(colorSet.base);
      setTailColor(colorSet.tail);
      setSelectedColor(colorSet.base); // used in data-color-id
      setChameleonActiveColor(colorSet.tail)
    }
  }, [chameleonColors]);

  return (
    <div
      ref={ref}
      data-color-id={selectedColor}
      id="chameleon"
      className="chameleon relative w-12 h-30 pb-[3px]"
    >
      {/* Head */}
      <div className={`absolute w-7 h-7 rounded-full top-0 left-2 ${headColor}`}></div>

      {/* Eyes */}
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-2 flex justify-center items-center">
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-2 flex justify-center items-center">
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>

      {/* Body */}
      <div className={`absolute w-10 h-16 rounded-full top-6 left-1 ${bodyColor}`}></div>

      {/* Legs */}
      <div className={`absolute w-2 h-2 rounded-full left-0 top-8 ${legsColor}`}></div>
      <div className={`absolute w-2 h-2 rounded-full right-0 top-8 ${legsColor}`}></div>
      <div className={`absolute w-2 h-2 rounded-full left-0 top-14 ${legsColor}`}></div>
      <div className={`absolute w-2 h-2 rounded-full right-0 top-14 ${legsColor}`}></div>

      {/* Tail */}
      <div className={`absolute w-5 h-5 rounded-full bottom-[3px] left-3 border-[3px] ${tailColor}`}></div>
    </div>
  );
});

export default Chameleon;
