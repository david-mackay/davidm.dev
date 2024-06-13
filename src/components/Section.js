// src/components/Section.js
import React from 'react';
import styles from './Section.module.css';

const Section = ({ children, className }) => {
  return <div className={`${styles.section} ${className}`}>{children}</div>;
};

export default Section;
