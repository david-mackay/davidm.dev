// src/components/AnimatedSection.js
import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
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

const Timer = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: white;
  z-index: 3; /* Ensure timer is above the text */
`;

const AnimatedSection = () => {
  const sectionRef = useRef(null);
  const [{ xy, bg }, api] = useSpring(() => ({
    xy: [0, 0],
    bg: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));
  const [timer, setTimer] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20];
  const trans = (x, y) => `rotateX(${x}deg) rotateY(${y}deg)`;
  const bgTrans = (x, y) => `translate(${x / 5}px, ${y / 5}px)`;

  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    api.start({ xy: calc(x, y), bg: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
    setMousePosition({ x, y });

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
      <Timer style={{ left: mousePosition.x + 10, top: mousePosition.y + 10 }}>
        {formatTime(timer)}
      </Timer>
    </SectionWrapper>
  );
};

export default AnimatedSection;
