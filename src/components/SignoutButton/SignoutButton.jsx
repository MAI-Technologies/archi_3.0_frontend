import React, { useState } from 'react';
import styles from './SignoutButton.module.css'; // Import your CSS file
import { onLog } from 'firebase/app';

function SignoutButton({ color, filter, onLogout }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    console.log(color, filter);

    // Determine the button's className based on its state
    const buttonClass = `
        ${styles.buttonBase} 
        ${isHovered ? styles.buttonHovered : ''}
        ${!isHovered && !isClicked ? styles.buttonNotHoveredNotClicked : ''}
        ${isClicked ? styles.buttonClicked : ''}
    `.trim();

    // Apply the filter only when the button is not hovered and not clicked
    const defaultStyle = !isHovered && !isClicked ? { filter: filter } : {};

    // Dynamic inline styles for different states
    const dynamicStyles = {
        ...defaultStyle,
        color: isHovered ? color : isClicked ? '#FFFFFF' : '#FFFFFF', 
    };

    if (isHovered) {
        dynamicStyles.backgroundColor = '#FFFFFF';
        dynamicStyles.borderColor = color; 
    }

    if (isClicked) {
        dynamicStyles.backgroundColor = color;
        dynamicStyles.borderColor = '#FFFFFF';
        dynamicStyles.color = '#FFFFFF';
    }

    return (
        <button
            className={buttonClass}
            style={dynamicStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                setIsClicked(!isClicked);
                // logout using firebase
                onLogout();
                // navigate back to landing page
                window.location.href = '/';
            }}
        >
            {(isHovered || isClicked) ? 'Sign Out' : ''}
        </button>
    );
}

export default SignoutButton;
