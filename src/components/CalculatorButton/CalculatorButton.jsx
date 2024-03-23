import React, { useState, useRef } from 'react';
import * as math from 'mathjs';
import styles from './CalculatorButton.module.css'; // Adjust the path as needed
import { increaseCalculatorClicksRequest } from '../../requests/increaseCalculatorClicksRequest';

const CalculatorButton = ({ outputValue, setOutputValue, chatInputRef, cursorPosition, setCursorPosition, isExpanded, toggleCalculator, focusChatInput }) => {

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
      setCursorPosition(newPosition);
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus(); // Focus the chat input
          chatInputRef.current.setSelectionRange(newPosition, newPosition); // Set cursor position
        }
      }, 0);
    } else {
      const newOutputValue = outputValue + content;
      setOutputValue(newOutputValue);
      setCursorPosition(newOutputValue.length);
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
          chatInputRef.current.setSelectionRange(newOutputValue.length, newOutputValue.length);
        }
      }, 0);
    }
  };

  const calculateResult = () => {
    try {
      const result = math.evaluate(outputValue);
      setOutputValue(result.toString());
      setCursorPosition(result.toString().length);
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
          chatInputRef.current.setSelectionRange(result.toString().length, result.toString().length);
        }
      }, 0); // Correctly managing focus and cursor after calculation
    } catch (error) {
      setOutputValue('Error');
      setCursorPosition(5); // 'Error' length
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.focus();
          chatInputRef.current.setSelectionRange(5, 5);
        }
      }, 0); // Fixed the typo here, changing 'fsetTimeout' to 'setTimeout'
    }
  };

  const clearScreen = () => {
    setOutputValue('');
    setCursorPosition(0);
    setTimeout(() => {
      if (chatInputRef.current) {
        chatInputRef.current.focus();
        chatInputRef.current.setSelectionRange(0, 0);
      }
    }, 0); // Ensuring focus and cursor reset after screen clear
  };

  async function onClickHandler() {
    if (isExpanded) return;

    try {
      await increaseCalculatorClicksRequest();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.buttonContainer} onClick={onClickHandler}>
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
