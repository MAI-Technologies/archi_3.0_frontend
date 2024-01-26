/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatInputBar.module.css';
import CalculatorButton from '../CalculatorButton/CalculatorButton.jsx';


const ChatInputBar = ({ tutorColor, sendMessageHandler }) => {
  const [message, setMessage] = useState('');
  const chatInputRef = useRef(null); // Create a ref for the input field

  const sendMessage = () => {
    if (!message) return;
    // Handle the sending message
    console.log(message); // For now, just log it to the console
    setMessage(''); // Clear the input field
    sendMessageHandler(message)
  };

  // Function to focus the chat input
  const focusChatInput = () => {
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  // Function to handle shortcut button click
  const handleShortcut = (shortcutText) => {
    setMessage(shortcutText);
    sendMessageHandler(shortcutText); // Send the message immediately
    setMessage(''); // Optionally clear the message
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topElements}>
          <div className={styles.calculator}>
            <CalculatorButton 
            outputValue={message} 
            setOutputValue={setMessage} 
            focusChatInput={focusChatInput} // Pass focus function as prop
            />
          </div>
          <div className={styles.shortcuts}>
            <button 
              className={styles.shortcut} 
              style={{ backgroundColor: tutorColor }}
              onClick={() => handleShortcut("Got It!")}>
              Got It!
            </button>
            <button 
              className={styles.shortcut} 
              style={{ backgroundColor: tutorColor }}
              onClick={() => handleShortcut("More Hints")}>
              More Hints
            </button>
            <button 
              className={styles.shortcut} 
              style={{ backgroundColor: tutorColor }}
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
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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