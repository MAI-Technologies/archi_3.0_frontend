/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatInputBar.module.css';
import CalculatorButton from '../CalculatorButton/CalculatorButton.jsx';


const ChatInputBar = ({ tutorColor, sendMessageHandler }) => {
  const [message, setMessage] = useState('');
  const chatInputRef = useRef(null); // Create a ref for the input field
  const [cursorPosition, setCursorPosition] = useState(null);
  const [isCalculatorExpanded, setIsCalculatorExpanded] = useState(false);

  const toggleCalculator = () => {
    setIsCalculatorExpanded(!isCalculatorExpanded);
  };

  const sendMessage = () => {
    if (!message) return;
    // Handle the sending message
    console.log(message); // For now, just log it to the console
    setMessage(''); // Clear the input field
    sendMessageHandler(message)
    if (isCalculatorExpanded) {
      toggleCalculator(); // Close the calculator if it's open
    }
  };

  // Function to focus the chat input
  const focusChatInput = () => {
    setTimeout(() => { // Delay ensures updates happen after state changes
      if (chatInputRef.current) {
        chatInputRef.current.focus();
        chatInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0); // Delay ensures this happens after the DOM has been updated
  };

  // Function to handle shortcut button click
  const handleShortcut = (shortcutText) => {
    setMessage(shortcutText);
    sendMessageHandler(shortcutText); // Send the message immediately
    setMessage(''); // Optionally clear the message
    if (isCalculatorExpanded) {
      toggleCalculator(); // Close the calculator if it's open
    }
  };

  // Update the cursor position whenever the input changes
  useEffect(() => {
    // Ensures the cursor is correctly positioned after message changes
    if (chatInputRef.current && message && typeof cursorPosition === 'number') {
      // Ensure DOM updates have occurred
      requestAnimationFrame(() => {
        chatInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  }, [message, cursorPosition]); // Depend on message and cursorPosition to re-run

  // Listen to cursor movements
  const updateCursorPosition = () => {
    if (chatInputRef.current) {
      setCursorPosition(chatInputRef.current.selectionStart);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topElements}>
          <div className={styles.calculator}>
            <CalculatorButton 
            outputValue={message} 
            setOutputValue={setMessage} 
            chatInputRef={chatInputRef}
            cursorPosition={cursorPosition} // Pass the cursor position to CalculatorButton
            setCursorPosition={setCursorPosition} // Pass the setCursorPosition to CalculatorButton
            isExpanded={isCalculatorExpanded} 
            toggleCalculator={toggleCalculator}
            focusChatInput={focusChatInput} // Pass focus function as prop
            />
          </div>
          <div className={styles.shortcuts}>
            <button 
              className={styles.shortcut} 
              style={{ color: tutorColor }}
              onClick={() => handleShortcut("Got It!")}>
              Got It!
            </button>
            <button 
              className={styles.shortcut} 
              style={{ color: tutorColor }}
              onClick={() => handleShortcut("More Hints")}>
              More Hints
            </button>
            <button 
              className={styles.shortcut} 
              style={{ color: tutorColor }}
              onClick={() => handleShortcut("Examples")}>
              Examples
            </button>
          </div>
        </div>
        <div className={styles.chatInputContainer}>
          <input
            ref={chatInputRef} // Attach the ref to the input
            type="text"
            className={styles.chatInput}
            placeholder="Your message"
            value={message}
            autoFocus={true}
            onChange={(e) => {
              setMessage(e.target.value);
              updateCursorPosition();
            }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            onClick={updateCursorPosition} // Update cursor position when the input field is clicked
            onKeyUp={updateCursorPosition} // Update cursor position when key is released
          />
          <button className={styles.sendButton} onClick={sendMessage}>
            <img src="/img/arrow.png" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInputBar;