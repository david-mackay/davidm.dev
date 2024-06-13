// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>Home</Link>
        <div className={`${styles.burger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link to="/web3" className={styles.navLink}>Web3</Link>
          <Link to="/fullstack" className={styles.navLink}>FullStack</Link>
          <Link to="/poker" className={styles.navLink}>Poker</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
