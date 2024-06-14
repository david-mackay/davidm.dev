import React from 'react';
import styles from './HoverCards.module.css';

const HoverCards = ({ setHoveredCard, setActiveQuestionnaire }) => {
  const handleMouseEnter = (card) => {
    setHoveredCard(card);
    setActiveQuestionnaire(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div
          className={styles.card}
          onMouseEnter={() => handleMouseEnter('Web3')}
          onMouseLeave={handleMouseLeave}
        >
          Web3
        </div>
        <div
          className={styles.card}
          onMouseEnter={() => handleMouseEnter('FullStack')}
          onMouseLeave={handleMouseLeave}
        >
          FullStack
        </div>
        <div
          className={styles.card}
          onMouseEnter={() => handleMouseEnter('Poker')}
          onMouseLeave={handleMouseLeave}
        >
          Poker
        </div>
      </div>
    </div>
  );
};

export default HoverCards;
