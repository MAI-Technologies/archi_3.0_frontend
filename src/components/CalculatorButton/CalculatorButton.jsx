import React, { useState } from 'react';
import * as math from 'mathjs';
import styles from './CalculatorButton.module.css'; // Adjust the path as needed

const CalculatorButton = ({ outputValue, setOutputValue, focusChatInput, isExpanded, toggleCalculator }) => {
  
  const handleButtonPress = (content) => {
    setOutputValue(outputValue + content); // Update the chat input bar
    focusChatInput(); // Call the function passed as prop to focus chat input
  };

  const calculateResult = () => {
    try {
      const result = math.evaluate(outputValue);
      setOutputValue(result.toString()); // Update chat input bar with the result
      focusChatInput(); // Also focus after calculating the result
    } catch (error) {
      setOutputValue('Error'); // Update chat input bar with error message
      focusChatInput(); // Focus even if there's an error
    }
  };

  const clearScreen = () => {
    setOutputValue(''); // Clear the chat input bar
    focusChatInput(); // Focus after clearing the screen
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${isExpanded ? styles.buttonClicked : ''}`} onClick={toggleCalculator}>
          <img className={styles.calc} src="/img/ios-calculator.png" alt="Calculator"></img>
          <img className={`${styles.expand} ${isExpanded ? styles.expandClicked : ''}`} src="/img/expand.png" alt="Expand"></img>
        </button>
      </div>
      {isExpanded && (
        <div className={`${styles.interface} ${isExpanded ? styles.active : ''}`}>
          <div className={styles.buttonPad}>
            {/* Render buttons here. Example: */}
              <button className={styles.calcButton} onClick={() => handleButtonPress('x')}>x</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('+')}>+</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('|a|')}>|a|</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('>')}>&gt;</button>
            {/* Add other rows of buttons */}
              <button className={styles.calcButton} onClick={() => handleButtonPress('y')}>y</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('-')}>-</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('π')}>π</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('<')}>&lt;</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('²')}>x²</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('×')}>×</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('√')}>√</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('≥')}>&ge;</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('^{b}')}>x<sup>b</sup></button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('/')}>÷</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('{n}√')}><sup>n</sup>√</button>
              <button className={styles.calcButton} onClick={() => handleButtonPress('≤')}>&le;</button>
            </div>
          </div>
        )}
      </>
  );
};

export default CalculatorButton;
