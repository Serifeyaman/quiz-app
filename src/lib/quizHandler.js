function handleQuestionOption(question, questions) {
  const options = questions[question].body
    .split("\n")
    .map((option, index) => `${String.fromCharCode(65 + index)}) ${option}`);
  return options;
}

let quizHandler = {
  handleQuestionOption,
};

export default quizHandler;
