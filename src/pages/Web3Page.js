import React, { useEffect, useState } from 'react';
import styles from './Web3Page.module.css';

const Web3Page = () => {
  const [text, setText] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const generateRandomText = (totalChars, charsPerRow) => {
    let text = '';
    for (let i = 0; i < totalChars; i++) {
      text += `<span class="${styles.dynamicText}">${String.fromCharCode(33 + Math.random() * 94)}</span>`;
      if ((i + 1) % charsPerRow === 0) {
        text += '<br>'; // add a line break at the end of each row
      }
    }
    return text;
  };

  function generateWelcomeText(rows, charsPerRow) {
    const word = "WELCOME";
    const asciiArt = [];
    const wordLength = word.length;
    
    // ASCII art templates for each letter
    const asciiLetters = {
      'W': [
        'W   W ',
        'W   W ',
        'W W W ',
        'W W W ',
        ' W W  ',
      ],
      'E': [
        'EEEEE ',
        'E     ',
        'EEEE  ',
        'E     ',
        'EEEEE ',
      ],
      'L': [
        'L     ',
        'L     ',
        'L     ',
        'L     ',
        'LLLLL ',
      ],
      'C': [
        ' CCCC ',
        'C     ',
        'C     ',
        'C     ',
        ' CCCC ',
      ],
      'O': [
        ' OOO  ',
        'O   O ',
        'O   O ',
        'O   O ',
        ' OOO  ',
      ],
      'M': [
        'M   M ',
        'MM MM ',
        'M M M ',
        'M   M ',
        'M   M ',
      ]
    };
    
    // Calculate the maximum width of a letter
    const maxLetterWidth = Math.max(...Object.values(asciiLetters).map(template => template[0].length));
    
    // Calculate the scale factor based on the available width
    const scaleFactor = Math.floor(charsPerRow / (wordLength * maxLetterWidth));
    
    // Initialize the empty ascii art with spaces
    for (let i = 0; i < rows; i++) {
      asciiArt.push(new Array(charsPerRow).fill(' '));
    }
    
    // Function to print a letter in the ascii art
    const printLetter = (letter, startRow, startCol, scaleFactor) => {
      const template = asciiLetters[letter];
      if (!template) return;
    
      for (let row = 0; row < template.length; row++) {
        for (let col = 0; col < template[row].length; col++) {
          if (startRow + row * scaleFactor < rows && startCol + col * scaleFactor < charsPerRow) {
            for (let i = 0; i < scaleFactor; i++) {
              for (let j = 0; j < scaleFactor; j++) {
                asciiArt[startRow + row * scaleFactor + i][startCol + col * scaleFactor + j] = template[row][col];
              }
            }
          }
        }
      }
    };
    
    // Calculate the start position for the word
    const startRow = Math.floor((rows - 5 * scaleFactor) / 2);
    const startCol = Math.floor((charsPerRow - wordLength * maxLetterWidth * scaleFactor) / 2);
    
    // Print each letter in the word
    for (let i = 0; i < wordLength; i++) {
      printLetter(word[i], startRow, startCol + i * maxLetterWidth * scaleFactor, scaleFactor); // Adjust spacing between letters as needed
    }
    
    // Join the ascii art into a single string
    return asciiArt.map(row => row.join('')).join('<br>');
  }

  useEffect(() => {
    const updateText = () => {
      const charWidth = 12.1; // approximate width of a character in pixels
      const charHeight = 21; // approximate height of a character in pixels
      const width = window.innerWidth;
      const height = window.innerHeight;
      const charsPerRow = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);
      const totalChars = charsPerRow * rows;

      let text = '';
      if (!showWelcome) {
        text = generateRandomText(totalChars, charsPerRow);
      } else {
        text = generateWelcomeText(rows, charsPerRow);
      }

      setText(text);
    };

    updateText();
    window.addEventListener('resize', updateText);

    const interval = setInterval(() => {
      if (!showWelcome) {
        const elements = document.getElementsByClassName(styles.dynamicText);
        for (let element of elements) {
          if (Math.random() < 0.1) { // Change 10% of characters each tick
            element.textContent = String.fromCharCode(33 + Math.random() * 94);
          }
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateText);
    };
  }, [showWelcome, styles.dynamicText]);

  const handleLockClick = () => {
    setShowWelcome(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundText} dangerouslySetInnerHTML={{ __html: text }} />
      <button className={styles.lockButton} onClick={handleLockClick}>🔒</button>
    </div>
  );
};

export default Web3Page;
