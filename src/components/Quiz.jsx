import { useEffect, useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';

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
      <div className="quiz-container">
        <div className="score-container">
          <h2 className="score-title">Quiz Completed!</h2>
          <div className="score-display">{score}</div>
          <p className="score-feedback">Your score: {score} out of {quizData.length}</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1} of {quizData.length}</h2>
      <h3>{currentQuestion.question}</h3>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              borderColor: selectedAnswer === option ? 'var(--accent)' : 'var(--border)',
              background: selectedAnswer === option ? 'var(--accent-bg)' : 'var(--social-bg)',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={nextQuestion}
        disabled={!selectedAnswer}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '12px',
          background: selectedAnswer ? 'var(--accent)' : 'gray',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: selectedAnswer ? 'pointer' : 'not-allowed'
        }}
      >
        {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
}
