// src/components/FullStackQuestionnaire.js
import React, { useState } from 'react';
import styles from './Questionnaire.module.css';

const questions = [
  { question: 'What is a REST API?', answer: 'An application programming interface' },
  { question: 'What is Node.js?', answer: 'A JavaScript runtime' },
  // Add more questions as needed
];

const FullStackQuestionnaire = ({ onUnlock }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setMessage('Correct!');
      onUnlock();
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
    } else {
      setMessage('Incorrect answer. Try again!');
    }
  };

  return (
    <div className={styles.questionnaire}>
      {currentQuestion < questions.length ? (
        <div>
          <p>{questions[currentQuestion].question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <p>{message}</p>
        </div>
      ) : (
        <p>All questions answered! Check out my resume below.</p>
      )}
    </div>
  );
};

export default FullStackQuestionnaire;
