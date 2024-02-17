import React, { useState } from 'react';
import styles from './SignoutButton.module.css'; // Import your CSS file

function SignoutButton({ color }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    console.log(color);

    // Determine the button's className based on its state
    const buttonClass = `
        ${styles.buttonBase} 
        ${isHovered ? styles.buttonHovered : ''}
        ${!isHovered && !isClicked ? styles.buttonNotHoveredNotClicked : ''}
        ${isClicked ? styles.buttonClicked : ''}
    `.trim();

    // Dynamic inline styles based on props and state
    const dynamicStyles = {
        color: isHovered || isClicked ? color: '#FFFFFF', // Text color changes on hover or click
    };

    if (isHovered) {
        dynamicStyles.backgroundColor = '#FFFFFF'; // Replace 'lightenColor' with actual color for hover
        dynamicStyles.borderColor = color; // Replace 'lightenBorderColor' with actual border color for hover
    }

    if (isClicked) {
        dynamicStyles.backgroundColor = color; // Replace 'darkenColor' with actual color for click
        dynamicStyles.borderColor = '#FFFFFF'; // Replace 'darkenBorderColor' with actual border color for click
    }

    return (
        <button
            className={buttonClass}
            style={dynamicStyles}
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
