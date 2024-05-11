// LoginPage.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import DividerWithText from '../components/DividerWithText/DividerWithText';
import styles from './LoginPage.module.css'; // Import your CSS module
import { authenticateUser, forgotPassword, loginWithEmailAndPassword, loginWithGoogle, registerUserWithEmailAndPassword } from '../utils/auth';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);    
    const [characterImageSrc, setCharacterImageSrc] = useState('/img/archi_amazed.png'); // State for character image source
    const [characterSpeechBubbleContent, setCharacterSpeechBubbleContent] = useState('Welcome back!'); // State for character speech bubble content
    const [showSpeechBubble, setShowSpeechBubble] = useState(true); // State for speech bubble visibility
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [imageStage, setImageStage] = useState('loaded'); // 'loading', 'loaded', 'moving'

    useEffect(() => {
        const auth = async () => {
            try {
                const user = await authenticateUser();

                // not logged in
                if (user == null) {
                    setLoading(false);
                    return;
                }

                console.log(user);
                setUser(user);
                navigate("/tutor");
            } catch (err) {
                console.log(err);
                setLoading(true);
            }
        }

        auth();

    }, []);

    return (
        <div className={styles.signupPage}>
            <div className="contentContainer">
                <LoginForm setCharacterImageSrc={setCharacterImageSrc} setShowSpeechBubble={setShowSpeechBubble}/>
                <Character
                    imageSrc={characterImageSrc} // Your final character image
                    speechBubbleContent={showSpeechBubble ? characterSpeechBubbleContent : ""}
                    className={styles.characterContainer} // This is your existing styling base class
                    imageStage={imageStage} // Pass the state controlling the image stage
                /> {/* Render the character image */}
            </div>
        </div>
    );
};

const Character = ({ imageSrc, speechBubbleContent, className, imageStage }) => {
    // Determine the image source based on the imageStage
    const currentImageSrc = imageStage === 'loading' ? '/img/archi_loading_from_cloud.gif' : imageSrc; // Adjust with your actual loading image path

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

const LoginForm = ({ setCharacterImageSrc, setShowSpeechBubble }) => {
    // State to manage the hint and image source
    const [passwordHint, setPasswordHint] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const tempRef = useRef();
    const navigate = useNavigate();

    // Function to show the password hint and change the image
    const showPasswordHint = () => {
        setPasswordHint('Passwords should be at least 8 characters long and should contain a mixture of letters, numbers, and other characters');
        setCharacterImageSrc('/img/archi_eyes_closed_flipped.png'); // Update with the path to your new image
        setShowSpeechBubble(false); // Hide speech bubble when password field is focused
    };

    // Function to clear the password hint and reset the image
    const clearPasswordHint = () => {
        setPasswordHint('');
        setCharacterImageSrc('/img/archi_amazed.png'); // Reset to the initial image
        setShowSpeechBubble(true); // Show speech bubble when password field loses focus
    };

    async function submitHandler(e) {
        e.preventDefault();

        const email = emailRef.current.value || null;
        const password = passwordRef.current.value || null;

        if (!email || !password) {
            alert('Please enter both email and password.'); // Alert if either email or password is missing
            return;
        }

        try {
            const user = await loginWithEmailAndPassword(email, password);
            console.log(user);
            navigate("/tutor"); // Navigate after successful login

        } catch (err) {
            console.log(err);
            if (err.code === 'auth/invalid-credential') {
                alert('Email or password incorrect. Please try again or sign up.'); // Alert the user if no user is found/ password incorrect
            } else {
                alert('Login failed. Please try again.'); // Generic alert for other errors
            }
        }
    }

    async function signInWithGoogleSubmitHandler(e) {
        e.preventDefault();

        try {
            const user = await loginWithGoogle();
            console.log(user);
            navigate("/tutor"); // Navigate after successful login
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.registrationForm}>

            <div className={styles.header}>
                <h2>Welcome back to Archimedes!</h2>
                <p>We are excited to meet you again!</p>
            </div>

            <div className="signup-container">
                <form className="signup-form" onSubmit={submitHandler}>
                    <div className={styles.inputGroup}>
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.longInput}
                            ref={emailRef}
                            required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.longInput}
                            ref={passwordRef}
                            required
                            onFocus={showPasswordHint}
                            onBlur={clearPasswordHint}
                        />
                        {passwordHint && <div className={styles.passwordHint}>{passwordHint}</div>}
                        <Link to="/forgot-password" className={styles.resetLink}>Forgot password?</Link>

                    </div>
                    <DividerWithText>or</DividerWithText>
                    <button type="button" className={styles.googleSigninButton} onClick={signInWithGoogleSubmitHandler}>
                        <img src="/img/signin_w_google_button.png" alt="Google Image" />
                    </button>
                    <div className={styles.navigate}>
                        <button type="submit" class={styles.continueButton}>Log In</button>
                        <a href="/signup" className={styles.loginLink}>Create a new account</a>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default LoginPage;