import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import HoverCards from './HoverCards';
import Web3Questionnaire from './Web3Questionnaire';
import FullStackQuestionnaire from './FullStackQuestionnaire';
import PokerQuestionnaire from './PokerQuestionnaire';
import styles from './AnimatedSection.module.css';

const SectionWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #282c34;
  color: white;
  font-size: 2rem;
  text-align: center;
  perspective: 1000px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AnimatedText = styled(animated.div)`
  font-size: 4rem;
  font-weight: bold;
  position: absolute;
  z-index: 2;
`;

const BackgroundLayer = styled(animated.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(107,115,255,0.5) 0%, rgba(0,13,255,0.5) 100%);
  will-change: transform;
  z-index: 1;
`;

const AnimatedSection = () => {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeQuestionnaire, setActiveQuestionnaire] = useState(null);
  const [{ xy, bg }, api] = useSpring(() => ({
    xy: [0, 0],
    bg: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const calc = (x, y) => [(window.innerHeight / 2 - y) / 20, (x - window.innerWidth / 2) / 20];
  const trans = (x, y) => `rotateX(${x}deg) rotateY(${y}deg)`;
  const bgTrans = (x, y) => `translate(${x / 5}px, ${y / 5}px)`;

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    api.start({ xy: calc(x, y), bg: [x - window.innerWidth / 2, y - window.innerHeight / 2] });

    const ripple = document.createElement('div');
    ripple.className = styles.ripple;
    ripple.style.left = `${x - 25}px`;
    ripple.style.top = `${y - 25}px`;
    sectionRef.current.appendChild(ripple);

    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.removeChild(ripple);
      }
    }, 600); // Ensure this is a function
  };

  const getEmoji = () => {
    switch (hoveredCard) {
      case 'Web3':
        return '🌐';
      case 'FullStack':
        return '💻';
      case 'Poker':
        return '🃏';
      default:
        return '👁️👁️';
    }
  };

  return (
    <SectionWrapper ref={sectionRef} onMouseMove={handleMouseMove}>
      <BackgroundLayer style={{ transform: bg.to(bgTrans) }} />
      <AnimatedText style={{ transform: xy.to(trans) }}>
        {getEmoji()}
      </AnimatedText>
      <HoverCards setHoveredCard={setHoveredCard} setActiveQuestionnaire={setActiveQuestionnaire} />
      <div className={styles.questionnaireContainer}>
        {activeQuestionnaire === 'Web3' && <Web3Questionnaire />}
        {activeQuestionnaire === 'FullStack' && <FullStackQuestionnaire />}
        {activeQuestionnaire === 'Poker' && <PokerQuestionnaire />}
      </div>
    </SectionWrapper>
  );
};

export default AnimatedSection;
