import React, { useState } from 'react';
import styles from './SignoutButton.module.css'; // Import your CSS file

function SignoutButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Determine the button's className based on its state
    const buttonClass = `
        ${styles.buttonBase} 
        ${isHovered ? styles.buttonHovered : ''}
        ${!isHovered && !isClicked ? styles.buttonNotHoveredNotClicked : ''}
        ${isClicked ? styles.buttonClicked : ''}
    `.trim();

    return (
        <button
            className={buttonClass}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                setIsClicked(!isClicked);
                // navigate back to landing page
                window.location.href = '/';
            }}
        >
            {(isHovered || isClicked) ? 'Sign Out' : ''}
        </button>
    );
}

export default SignoutButton;
