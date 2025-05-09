import React, { forwardRef } from "react";

const Breaks = forwardRef(({ height = "10px", colors }, ref ) => {
  const defaultColors = ["bg-pink-500", "bg-blue-500", "bg-green-500"];
  const usedColors = colors || defaultColors;
  // console.log(shufleColors)

  return (
    <div ref={ref} className={`breaks w-full h-[${height}] flex`}>
      {usedColors.map((el, i) => (
        <div
          key={i}
          data-color-id={el}
          className={`h-[10px] flex-auto ${el}`}
        ></div>
      ))}
    </div>
  );
});


export default Breaks;
