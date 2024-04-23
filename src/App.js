import React, { useState, useEffect, useRef } from "react";
import { Question, Timer, ScoreTable, Icons } from "./components";

const App = () => {
  const TIME_VALUE = 30;
  const ANSWERABLE_TIME = 19;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_VALUE);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timerRef.current);
          handleNextQuestion();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setQuestions(data.splice(0, 10)))
      .catch((error) => console.log(error));

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (quizStarted && answers.length !== 10) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      setScore(score + 1);
    }

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: questions[currentQuestion].title,
        userAnswer: selectedOption.split(")")[0],
      },
    ]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setTimeLeft(TIME_VALUE);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="w-[100%] h-[100vh] video-container">
        <video
          autoPlay
          loop
          muted
        >
          <source
            src="https://cdn.baykartech.com/media/upload/userFormUpload/KV6Lelt99my8D4aR4yU1nvnyLT60HX71.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="start main-div">
          <button className="bg-transparent rounded-full shadow-xl hover:bg-white p-3">
            <Icons.Play
              className="w-32 h-32 text-[#142143]"
              onClick={startQuiz}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="bg-gray-50 px-10 py-5 pb-10 rounded-lg shadow-lg shadow-blue-950">
        {questions.length > 0 && currentQuestion < questions.length ? (
          <>
            <div className="flex justify-between items-center space-x-4 w-[600px] mb-4">
              <div className="">
                <h2 className="capitalize text-lg font-bold text-gray-700">
                  Question {currentQuestion + 1} / {questions.length}
                </h2>
                <p className="capitalize text-base font-semibold line-clamp-2 text-ellipsis text-gray-700">
                  {questions[currentQuestion].title} ?
                </p>
              </div>
              <Timer time={timeLeft} />
            </div>
            <Question
              questions={questions}
              currentQuestion={currentQuestion}
              selectedOption={selectedOption}
              handleOptionSelect={handleOptionSelect}
              disabled={timeLeft > ANSWERABLE_TIME}
            />
            <div className="flex justify-end">
              <span className="w-[100px] flex justify-center">
                <button
                  className="bg-transparent justify-center flex p-2 text-base font-medium hover:bg-[#142143] text-[#142143] hover:text-white border border-gray-700 hover:border-transparent rounded-full"
                  onClick={handleNextQuestion}
                  disabled={!isAnswered || timeLeft > ANSWERABLE_TIME}
                >
                  <Icons.RightArrow className="w-6 h-6" />
                </button>
              </span>
            </div>
          </>
        ) : (
          <ScoreTable
            score={score}
            questionCount={questions.length}
            answers={answers}
          />
        )}
      </div>
    </div>
  );
};

export default App;
