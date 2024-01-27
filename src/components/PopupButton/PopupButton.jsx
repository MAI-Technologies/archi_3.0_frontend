import React, { useState } from 'react';
import styles from './PopupButton.module.css';

const PopupButton = ({ buttonText, alignLeft, buttonTextColor, text, extraContent }) => {
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const popupClass = alignLeft ? styles.popupLeft : styles.popupRight;

    return (
        <div className={styles.popupContainer}>
            <button className={styles.question} onClick={togglePopup} style={{ color: buttonTextColor }}>
                {buttonText}
            </button>

            {showPopup && (
               <div className={`${styles.popup} ${popupClass}`}>
               <div className={styles.popupInner}>
                   <span className={styles.boldText}>{text}</span> <br></br><br></br>
                   <span className={styles.regularText}>{extraContent}</span>
               </div>
           </div>
            )}
        </div>
    );
};

export default PopupButton;
