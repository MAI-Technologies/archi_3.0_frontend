import React, { useState } from 'react';
import styles from './SignoutButton.module.css'; // Import your CSS file

function SignoutButton({ color }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Determine the button's className based on its state
    const buttonClass = `
        ${styles.buttonBase} 
        ${isHovered ? styles.buttonHovered : ''}
        ${!isHovered && !isClicked ? styles.buttonNotHoveredNotClicked : ''}
        ${isClicked ? styles.buttonClicked : ''}
    `.trim();

    const buttonStyle = {
        backgroundColor: color, // Use the color prop for background color
    };

    return (
        <button
            className={buttonClass}
            style={buttonStyle}
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
