import React from 'react';

export default function QuestionCard({ 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions, 
  selectedAnswer, 
  handleAnswer, 
  nextQuestion 
}) {
  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1} of {totalQuestions}</h2>
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
        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
}
