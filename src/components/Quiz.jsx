import { useEffect, useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import QuizResult from './QuizResult';
import QuestionCard from './QuestionCard';

export default function Quiz() {
  const {
    quizData,
    currentQuestionIndex,
    selectedAnswers,
    isCompleted,
    score,
    handleAnswer,
    nextQuestion,
  } = useContext(QuizContext);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (quizData && quizData.length > 0) {
      setCurrentQuestion(quizData[currentQuestionIndex]);
    }
  }, [quizData, currentQuestionIndex]);

  if (isCompleted) {
    return (
      <QuizResult 
        score={score} 
        quizData={quizData} 
        selectedAnswers={selectedAnswers} 
      />
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <QuestionCard
      currentQuestion={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={quizData.length}
      selectedAnswer={selectedAnswer}
      handleAnswer={handleAnswer}
      nextQuestion={nextQuestion}
    />
  );
}
