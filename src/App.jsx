import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  return (
    <QuizProvider>
      <div className="App" style={{ flexDirection: 'column', gap: '40px' }}>
        <h1>React Hooks Quiz App</h1>
        <div style={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '1100px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Quiz />
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;
