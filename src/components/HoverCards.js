import React, { useState, useRef, useEffect } from 'react';
import Web3Page from './Web3Page';
import FullStackPage from './FullStackPage';
import PokerPage from './PokerPage';
import styles from './HoverCards.module.css';

const HoverCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardDetailRef = useRef(null);

  const handleMouseEnter = (card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (cardDetailRef.current && cardDetailRef.current.contains(event.target)) {
        event.stopPropagation();
      }
    };

    const currentRef = cardDetailRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [hoveredCard]);

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
      <div className={styles.right}>
        {hoveredCard && (
          <div className={`${styles.cardDetail} ${styles.fadeIn}`} ref={cardDetailRef}>
            {hoveredCard === 'Web3' && <Web3Page />}
            {hoveredCard === 'FullStack' && <FullStackPage />}
            {hoveredCard === 'Poker' && <PokerPage />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverCards;
