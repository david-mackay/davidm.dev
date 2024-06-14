// src/components/PokerQuestionnaire.js
import React, { useState } from 'react';
import styles from './Questionnaire.module.css';

const questions = [
  { question: 'What is a Royal Flush?', answer: 'A poker hand' },
  { question: 'What is a Full House?', answer: 'A poker hand with three of a kind and a pair' },
  // Add more questions as needed
];

const PokerQuestionnaire = ({ onUnlock }) => {
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

export default PokerQuestionnaire;
