import React, { useState } from 'react';
import { questions } from './questions';
import styles from './Questionnaire.module.css';

const emotions = ["😊", "😢", "😡", "😂", "😱"]; // Example emotions

const getRandomEmotion = () => {
  return emotions[Math.floor(Math.random() * emotions.length)];
};

const Web3Questionnaire = ({ setEmoji }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const randomEmotion = getRandomEmotion();
    setEmoji(randomEmotion);

    setTimeout(() => {
      setEmoji("👁️👁️"); // Return to default eyes emoji
    }, 1000); // Display emotion for 1 second

    const newResponse = {
      question: questions[currentQuestionIndex].question,
      answer: userAnswer,
      emotion: randomEmotion
    };

    setResponses([...responses, newResponse]);
    setUserAnswer("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Questionnaire completed!");
    }
  };

  return (
    <div className={styles.questionnaire}>
      <form onSubmit={handleSubmit}>
        <p>{questions[currentQuestionIndex].question}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Web3Questionnaire;
