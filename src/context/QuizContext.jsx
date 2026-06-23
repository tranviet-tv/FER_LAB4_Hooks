import { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: "useEffect"
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const addQuestion = (newQuestion) => {
    setQuizData([...quizData, newQuestion]);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        quizData,
        currentQuestionIndex,
        selectedAnswers,
        isCompleted,
        score,
        handleAnswer,
        nextQuestion,
        addQuestion,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
