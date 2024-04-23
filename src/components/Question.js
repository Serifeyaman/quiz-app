import React from "react";
import quizHandler from "../lib/quizHandler";
import classNames from "classnames";

const Question = ({
  currentQuestion,
  questions,
  selectedOption,
  handleOptionSelect,
  disabled,
}) => {
  // function handleQuestionOption(question) {
  //   return questions[question].body.split("\n");
  // }

  return (
    <div>
      <ul>
        {quizHandler
          .handleQuestionOption(currentQuestion, questions)
          .map((option, index) => (
            // {handleQuestionOption(currentQuestion).map((option, index) => (
            <li key={index} className="space-y-5">
              <label
                className={classNames(
                  "flex mr-2 mb-4 capitalize text-base font-semibold text-gray-700 py-3 px-3 hover:shadow-md hover:rounded-md hover:bg-white w-full",
                  { "shadow-md rounded-md bg-white": option === selectedOption }
                )}
              >
                <input
                  className="mr-2"
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
