// src/components/AnimatedSection.js
import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import HoverCards from './HoverCards'; // Import HoverCards component
import styles from './AnimatedSection.module.css';

const SectionWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #282c34;
  color: white;
  font-size: 2rem;
  text-align: center;
  perspective: 1000px;
`;

const AnimatedText = styled(animated.div)`
  font-size: 4rem;
  font-weight: bold;
  position: absolute;
  z-index: 2; /* Ensure text is above the background */
`;

const BackgroundLayer = styled(animated.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(107,115,255,0.5) 0%, rgba(0,13,255,0.5) 100%);
  will-change: transform;
  z-index: 1; /* Ensure background is behind the text */
`;

const AnimatedSection = () => {
  const sectionRef = useRef(null);
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
    ripple.style.left = `${x - 25}px`; // Adjust for ripple size (50px / 2)
    ripple.style.top = `${y - 25}px`;
    sectionRef.current.appendChild(ripple);

    setTimeout(() => {
      sectionRef.current.removeChild(ripple);
    }, 600); // Match the animation duration
  };

  return (
    <SectionWrapper ref={sectionRef} onMouseMove={handleMouseMove}>
      <BackgroundLayer style={{ transform: bg.to(bgTrans) }} />
      <AnimatedText style={{ transform: xy.to(trans) }}>
        👁️👁️
      </AnimatedText>
      <HoverCards /> {/* Add HoverCards component */}
    </SectionWrapper>
  );
};

export default AnimatedSection;
