// src/components/Resume.js
import React from 'react';
import styles from './Resume.module.css';

const resumeSections = [
  { title: 'Education', content: 'Your education details here...' },
  { title: 'Experience', content: 'Your work experience here...' },
  { title: 'Skills', content: 'Your skills here...' },
  // Add more sections as needed
];

const Resume = ({ unlockedSections }) => (
  <div className={styles.resume}>
    {resumeSections.map((section, index) => (
      <div key={index} className={`${styles.resumeSection} ${unlockedSections > index ? styles.unlocked : styles.locked}`}>
        <h2>{section.title}</h2>
        <p>{section.content}</p>
      </div>
    ))}
  </div>
);

export default Resume;
