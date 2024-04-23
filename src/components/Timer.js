import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ time }) => {
  const MAX_VALUE = 19;
  const MIN_VALUE = 9;
  const TIME = 30;
  const value = Math.round((100 / TIME) * time);

  const getProgressColor = (progressValue) => {
    if (progressValue > MAX_VALUE) {
      return "#142143";
    }
    return progressValue > MIN_VALUE ? "green" : "#f00";
  };

  return (
    <div className="w-[100px] h-[100px]">
      <CircularProgressbarWithChildren
        value={value}
        styles={buildStyles({
          pathColor: getProgressColor(time),
          textColor: "#fff",
          trailColor: "#d6d6d6",
        })}
      >
        <p className="text-base font-semibold">Time</p>
        <p className="text-base font-semibold">{time}</p>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Timer;
