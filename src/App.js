import React, { useState, useEffect, useRef } from "react";
import { Question, Timer, ScoreTable } from "./components";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
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

    // startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (quizStarted) {
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
        correctAnswer: questions[currentQuestion].correctAnswer,
        userAnswer: selectedOption,
      },
    ]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setIsAnswered(false);
    setTimeLeft(30);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };
console.log("answers", answers)
  if (!quizStarted) {
    return <button onClick={startQuiz}>Start Quiz</button>;
  }

  return (
    <div>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <>
          <Timer time={timeLeft} />
          <Question
            questions={questions}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            disabled={timeLeft >= 20}
          />
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswered || timeLeft > 20}
          >
            Next
          </button>
        </>
      ) : (
        <ScoreTable score={score} questionCount={questions.length} />
      )}
    </div>
  );
};

export default App;
