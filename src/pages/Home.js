// src/pages/Home.js
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import Section from '../components/Section';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Section className={styles.sectionOne}>
        <AnimatedSection />
      </Section>
    </div>
  );
};

export default Home;
