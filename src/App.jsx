import React, { useState, useCallback } from 'react';
import './App.css'
import styles from './components/PopupButton/InfoButton.module.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import MetricsPage from './pages/MetricsPage';
import TutorPage from './pages/TutorPage';
import ChatbotPage from './pages/ChatbotPage';
import SignupPage from './pages/SignupPage';
import PopupButton from './components/PopupButton/PopupButton';

function App() {
  // State for tracking popup visibility
  const [setIsPopupVisible] = useState(false);

  // State for tracking "info" popup button visibillity
  const [showPopupButton, setShowPopupButton] = useState(true);

  // Function to toggle popup visibility
  const handlePopupToggle = (isVisible) => {
    console.log("Popup visibility changed to:", isVisible);
    setIsPopupVisible(isVisible);
  };

  // Function for toggling "info" popup button visibillity
  const handlePopupVisibility = useCallback((isVisible) => {
    setShowPopupButton(isVisible);
  }, []);

  return (

    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/metrics' element={<MetricsPage />} />
          <Route exact path='/tutor' element={<TutorPage />} />
          <Route exact path='/chatbot/:tutorId' element={<ChatbotPage onPopupVisibility={handlePopupVisibility} />} />
          <Route exact path='/signup' element={<SignupPage />} />
        </Routes>
        {showPopupButton && (
          <div className={styles.info}>
            <PopupButton onToggle={handlePopupToggle} buttonText="i" alignLeft buttonTextColor='#749AAB' text="Who's ArchI?" extraContent= "ArchI is an AI math tutor that you can consult to help solve your math homework!" >
            </PopupButton>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
