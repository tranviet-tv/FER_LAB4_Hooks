import React, { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

export default function QuizResult({ score, quizData, selectedAnswers }) {
  const { addQuestion, restartQuiz } = useContext(QuizContext);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    // Check if correct answer matches one of the options
    if (![option1, option2, option3, option4].includes(correctAnswer)) {
      alert('Đáp án đúng phải trùng khớp chính xác với 1 trong 4 lựa chọn!');
      return;
    }
    
    const newQ = {
      question: newQuestion,
      options: [option1, option2, option3, option4],
      correctAnswer: correctAnswer
    };
    
    addQuestion(newQ);
    
    // Reset form
    setNewQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setCorrectAnswer('');
    
    alert('Đã thêm câu hỏi thành công! Bạn có thể "Làm lại bài Quiz" để xem câu hỏi mới.');
  };

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

      <div className="add-question-container">
        <h3 className="add-question-title">Thêm câu hỏi mới</h3>
        <form onSubmit={handleAddQuestion} className="add-question-form">
          <input 
            type="text" 
            placeholder="Câu hỏi" 
            value={newQuestion} 
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          
          <div className="options-grid">
            <input 
              type="text" 
              placeholder="Lựa chọn 1" 
              value={option1} 
              onChange={(e) => setOption1(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Lựa chọn 2" 
              value={option2} 
              onChange={(e) => setOption2(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Lựa chọn 3" 
              value={option3} 
              onChange={(e) => setOption3(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Lựa chọn 4" 
              value={option4} 
              onChange={(e) => setOption4(e.target.value)}
            />
          </div>

          <input 
            type="text" 
            placeholder="Đáp án đúng (phải trùng khớp với 1 trong 4 lựa chọn trên)" 
            value={correctAnswer} 
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="correct-answer-input"
          />
          <button type="submit" className="submit-btn">
            Thêm câu hỏi
          </button>
        </form>
      </div>

      <button 
        onClick={restartQuiz} 
        className="restart-btn"
      >
        Làm lại bài Quiz
      </button>
    </div>
  );
}
