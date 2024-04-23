import React from "react";

const Question = ({
  currentQuestion,
  questions,
  selectedOption,
  handleOptionSelect,
  disabled,
}) => {
  function handleQuestionOption(question) {
    return questions[question].body.split("\n");
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1} / {questions.length}</h2>
      <h3>{questions[currentQuestion].title}</h3>
      <ul>
        {handleQuestionOption(currentQuestion).map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={option === selectedOption}
                onChange={() => handleOptionSelect(option)}
                disabled={disabled}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
