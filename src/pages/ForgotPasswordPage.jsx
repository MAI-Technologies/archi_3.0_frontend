import React, { useState, useRef } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module

function ForgotPasswordPage() {
    const emailRef = useRef();
    const [characterImageSrc, setCharacterImageSrc] = useState('/img/archi_amazed.png'); // State for character image source
    const [showSpeechBubble, setShowSpeechBubble] = useState(true); // State for speech bubble visibility
    const [characterSpeechBubbleContent, setCharacterSpeechBubbleContent] = useState('"Forgot your password?"'); // State for character speech bubble content
    const [imageStage, setImageStage] = useState('loaded');

    async function submitHandler(e) {
        e.preventDefault();

        const email = emailRef.currentUser.value;

        try {
            await forgotPassword(email);
            alert("Please check your email");
        } catch (err) {
            console.log(err);
        }

    }

    // Function to show the password hint and change the image
    const showPasswordHint = () => {
        setCharacterImageSrc('/img/archi_eyes_closed_flipped.png'); // Update with the path to your new image'
    };

    // Function to clear the password hint and reset the image
    const clearPasswordHint = () => {
        setCharacterImageSrc('/img/archi_amazed.png'); // Reset to the initial image
    };

    const Character = ({ imageSrc, speechBubbleContent, className, imageStage }) => {
         // Determine the image source based on the imageStage
        const currentImageSrc = imageStage === 'loaded' ? '/img/archi_amazed.png' : imageSrc; // Adjust with your actual loading image path
    
        // Combine CSS classes based on the provided className and the current image stage
        const combinedClassName = `${styles.characterContainer} ${className} ${styles[imageStage] || ''}`;
    
        return (
            <div className={combinedClassName}>
                {speechBubbleContent && <SpeechBubble content={speechBubbleContent} />} {/* Conditional rendering based on content */}
                <img src={currentImageSrc} alt="Archimedes character" className={styles.characterImage} />
            </div>
        );
    };
    
    const SpeechBubble = ({ content }) => {
        return (
            <div className={styles.speechBubble}>
                <img src="/img/text_bubble.png" alt="Blank text bubble" />
                <p>{content}</p> {/* Render passed content */}
            </div>
        );
    };

    return (
        <><div className={styles.registrationForm}>

            <div className={styles.header}>
                <h2>Forgot Password?</h2>
                <p>Reset your password below.</p>
            </div>

            <form className={styles.formContainer} onSubmit={submitHandler}>
                <div className={styles.inputGroup}>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.longInput}
                        ref={emailRef}
                        required 
                        onFocus={showPasswordHint}
                        onBlur={clearPasswordHint}/>
                </div>   
            </form>
            
            <div className={styles.navigate}>
                <button
                    type="submit"
                    // onClick={handleSubmit} // Handle the click event
                    className={styles.continueButton}>
                    Submit
                </button>
                <a href="/login" className={styles.loginLink}>Already have an account?</a>
            </div>

            </div>
                <div className="contentContainer">
                    <Character
                        imageSrc={characterImageSrc} // Your final character image
                        speechBubbleContent={showSpeechBubble ? characterSpeechBubbleContent : ""}
                        className={styles.characterContainer} // This is your existing styling base class
                        imageStage={imageStage} // Pass the state controlling the image stage
                    /> {/* Render the character image */}
                </div>
        </>
    )
}

export default ForgotPasswordPage;