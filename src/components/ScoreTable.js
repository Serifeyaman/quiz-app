import React from "react";

const ScoreTable = ({score, questionCount}) => {
  return (
    <div>
      <h2>Quiz Finished!</h2>
      <p>
        Your score: {score} out of {questionCount}
      </p>
    </div>
  );
};

export default ScoreTable;
