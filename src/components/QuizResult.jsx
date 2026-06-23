import React from 'react';

export default function QuizResult({ score, quizData, selectedAnswers }) {
  return (
    <div className="quiz-container" style={{ maxWidth: '600px' }}>
      <div className="score-container">
        <h2 className="score-title">Quiz Completed!</h2>
        <div className="score-display">{score}</div>
        <p className="score-feedback">Your score: {score} out of {quizData.length}</p>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'left' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '20px' }}>Detailed Results</h3>
        {quizData.map((item, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === item.correctAnswer;
          
          return (
            <div 
              key={index} 
              style={{ 
                marginBottom: '16px', 
                padding: '16px', 
                borderRadius: '8px', 
                background: 'var(--social-bg)', 
                borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}` 
              }}
            >
              <p style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-h)' }}>
                Câu {index + 1}: {item.question}
              </p>
              <p style={{ margin: '4px 0', fontSize: '15px', color: isCorrect ? '#10b981' : '#ef4444' }}>
                <strong>Đáp án của bạn:</strong> {userAnswer || 'Chưa chọn'} {isCorrect ? '✓' : '✗'}
              </p>
              {!isCorrect && (
                <p style={{ margin: '4px 0', fontSize: '15px', color: '#10b981' }}>
                  <strong>Đáp án đúng:</strong> {item.correctAnswer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
