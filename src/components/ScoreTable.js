import React from "react";

const ScoreTable = ({ score, questionCount, answers }) => {
  return (
    <div className="w-[300px] text-center">
      <h2 className="capitalize text-lg font-semibold text-gray-700 py-2 flex-1">
        Quiz Finished!
      </h2>
      <p className="mb-3">
        Your score: {score} out of {questionCount}
      </p>
      <ul className="grid grid-cols-2">
        {answers.map((item, index) => (
          <li>
            {index + 1} - {item.userAnswer === "" ? " *" : item.userAnswer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreTable;
