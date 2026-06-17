import { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

export default function QuestionInput() {
  const { addQuestion } = useContext(QuizContext);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || options.some((opt) => !opt) || !correctAnswer) {
      alert('Please fill out all fields');
      return;
    }
    if (!options.includes(correctAnswer)) {
      alert('Correct answer must be one of the options');
      return;
    }

    addQuestion({
      question,
      options,
      correctAnswer,
    });

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <div className="quiz-container">
      <h3>Add a New Question</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Question Content"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Question
        </button>
      </form>
    </div>
  );
}
