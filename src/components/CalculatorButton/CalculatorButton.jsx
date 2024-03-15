import React, { useState, useRef } from 'react';
import * as math from 'mathjs';
import styles from './CalculatorButton.module.css'; // Adjust the path as needed

const CalculatorButton = ({ outputValue, setOutputValue, focusChatInput, cursorPosition, setCursorPosition, isExpanded, toggleCalculator }) => {

  const updateCursorPosition = () => {
    if (chatInputRef.current) {
      setCursorPosition(chatInputRef.current.selectionStart);
    }
  };
  
  const handleButtonPress = (content) => {
    if (cursorPosition !== null) {
      const newValue = 
        outputValue.substring(0, cursorPosition) + 
        content + 
        outputValue.substring(cursorPosition);
      setOutputValue(newValue);
      const newPosition = cursorPosition + content.length;
      // Call a function passed from the ChatInputBar to update cursor position
      setCursorPosition(newPosition);
      // After setting the value, ensure focus goes back to the chat input
      setTimeout(() => focusChatInput(), 0); // setTimeout ensures the focus call happens after state updates
    } else {
      // Fallback if cursorPosition is not available
      const newOutputValue = outputValue + content;
      setOutputValue(newOutputValue);
      setCursorPosition(newOutputValue.length);
      setTimeout(() => focusChatInput(), 0);
    }
  };

  const calculateResult = () => {
    try {
      const result = math.evaluate(outputValue);
      setOutputValue(result.toString()); // Update chat input bar with the result
      setCursorPosition(result.toString().length); // Move cursor to the end
      setTimeout(() => focusChatInput(), 0);
    } catch (error) {
      setOutputValue('Error'); // Update chat input bar with error message
      setCursorPosition('Error'.length); // Move cursor to the end of 'Error'
      fsetTimeout(() => focusChatInput(), 0);
    }
  };

  const clearScreen = () => {
    setOutputValue(''); // Clear the chat input bar
    setCursorPosition(0); // Reset cursor position
    setTimeout(() => focusChatInput(), 0);
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
