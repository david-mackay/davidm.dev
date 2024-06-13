// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>Home</Link>
        <div className={`${styles.burger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
          <Link to="/" className={styles.menuItem} onClick={toggleMenu}>Home</Link>
          <Link to="/contact" className={styles.menuItem} onClick={toggleMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
