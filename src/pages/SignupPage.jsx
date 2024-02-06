// SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import DividerWithText from '../components/DividerWithText/DividerWithText';
import styles from './SignupPage.module.css'; // Import your CSS module

const SignupPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const [currentSection, setCurrentSection] = useState(1); // State to manage the current section
    const [role, setRole] = useState(''); // State to track the selected role in section 1
    const [dob, setDob] = useState({ month: '', day: '', year: '' }); // State to track date of birth in section 1
    const [characterImageSrc, setCharacterImageSrc] = useState('/img/archi_amazed.png'); // State for character image source
    const [characterSpeechBubbleContent, setCharacterSpeechBubbleContent] = useState('"Ooooo... A new student!"'); // State for character speech bubble content
    const [showSpeechBubble, setShowSpeechBubble] = useState(true); // State for speech bubble visibility

    const renderForms = () => {
        if (isLogin) {
            return <LoginForm setCharacterImageSrc={setCharacterImageSrc} setCharacterSpeechBubbleContent={setCharacterSpeechBubbleContent}
            setShowSpeechBubble={setShowSpeechBubble}/>;
        } else {
            return (
                <>
                    {currentSection === 1 && (
                        <RegistrationForm
                            currentSection={currentSection}
                            role={role}
                            setRole={setRole}
                            dob={dob}
                            setDob={setDob}
                            handleNextSection={handleNextSection}
                        />
                    )}
                    {currentSection === 2 && <CreateAccountForm setCharacterImageSrc={setCharacterImageSrc} setShowSpeechBubble={setShowSpeechBubble}/>}
                </>
            );
        }
    };

    const handleNextSection = () => {
        // Validate the fields in section 1
        if (currentSection === 1) {
            // Check if user entered role
            if (!role) {
                alert('Please select a role before proceeding.');
                return;
            }
            // Check if user entered dob if "Student" role is selected
            if (role === 'Student' && (!dob.month || !dob.day || !dob.year)) {
                alert('Please fill out the date of birth before proceeding.');
                return;
            }
        }
  
      // Move to the next section
      setCurrentSection(currentSection + 1);
    };

    return (
        <div className={styles.signupPage}>
            <div className="contentContainer">
                {renderForms()}
                <Character 
                    imageSrc={characterImageSrc} 
                    speechBubbleContent={showSpeechBubble ? characterSpeechBubbleContent : ""}
                /> {/* Render the character image */}
            </div>
        </div>
    );
};

const RegistrationForm = ({ currentSection, role, setRole, dob, setDob, handleNextSection }) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for empty fields and validate in section 1
        if (!role) {
            alert('Please select a role before proceeding.');
            return;
        }
        
        // Process the selectedRole state as needed

        // After processing, move to the next section
        handleNextSection();
    };

    // Style buttons based on order
    const getButtonClassName = (index) => {
        let className = "";
        if (index === 0) className += ` ${styles.firstButton}`;
        if (index === 1) className += ` ${styles.secondButton}`;
        if (index === 2) className += ` ${styles.thirdButton}`;
        return className;
    };

    // Arrays for dropdown options
    const months = Array.from({ length: 12 }, (e, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' }));
    const days = Array.from({ length: 31 }, (e, i) => i + 1);
    const years = Array.from({ length: 100 }, (e, i) => new Date().getFullYear() - i);

    
    return (
        <div className={styles.registrationForm}>
            {currentSection === 1 && (
            <>
                <h2>Welcome to Archimedes</h2>
                <p>Create an account to save your progress!</p>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.roleSelection}>
                            <label htmlFor="dob">Join Archimedes as a </label>
                            <div className={styles.dobInputs}>
                                {['Student', 'Teacher', 'Parent'].map((roleOption, index) => (
                                <button
                                    type="button"
                                    key={roleOption}
                                    onClick={() => {
                                        setRole(roleOption);
                                        setActiveButtonIndex(index); // Set the index of the active button
                                    }}
                                    className={`${styles.roleButton} ${getButtonClassName(index)} ${activeButtonIndex === index ? styles.active : ''}`}
                                >
                                    {roleOption}
                                </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                {role === 'Student' && (
                    <>
                        <div className={styles.formGroup}>
                            <label htmlFor="dob">What is your date of birth?</label>
                            <div className={styles.dobInputs}>
                                <select
                                    id="month"
                                    value={dob.month}
                                    onChange={(e) => setDob({ ...dob, month: e.target.value })}
                                    className={styles.firstInput}
                                >
                                    <option value="" disabled>Month</option>
                                    {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                    ))}
                                </select>
                                <select
                                    id="day"
                                    value={dob.day}
                                    onChange={(e) => setDob({ ...dob, day: e.target.value })}
                                    className={styles.secondInput}
                                >
                                    <option value="" disabled>Day</option>
                                    {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                    ))}
                                </select>
                                <select
                                    id="year"
                                    value={dob.year}
                                    onChange={(e) => setDob({ ...dob, year: e.target.value })}
                                    className={styles.thirdInput}
                                >
                                    <option value="" disabled>Year</option>
                                    {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}
                <div className={styles.navigate}>
                    <button 
                        type="button" 
                        onClick={handleSubmit} // Handle the click event
                        className={styles.continueButton}>
                        Continue
                    </button>
                    <a href="/login" className={styles.loginLink}>Already have an account?</a>
                </div>
            </>
            )}
        </div>
    );
};

const Character = ({imageSrc, speechBubbleContent}) => {
  return (
    <div className={styles.characterContainer}>
        {speechBubbleContent && <SpeechBubble content={speechBubbleContent} />} {/* Conditional rendering based on content */}
        <img src={imageSrc} alt="Archimedes character" className={styles.characterImage} />
    </div>
  );
};

const SpeechBubble = ({ content }) => {
  return (
    <div className={styles.speechBubble}>
        <img src="/img/text_bubble.png" alt="Blank text bubble"/>
        <p>{content}</p> {/* Render passed content */}
    </div>
  );
};

const CreateAccountForm = ({ setCharacterImageSrc, setShowSpeechBubble }) => {
    // State to manage the hint and image source
    const [passwordHint, setPasswordHint] = useState('');

    useEffect(() => {
        setShowSpeechBubble(false); // Hide speech bubble when this form is rendered
        return () => setShowSpeechBubble(true); // Show speech bubble when form is unmounted
    }, [setShowSpeechBubble]);

    // Function to show the password hint and change the image
    const showPasswordHint = () => {
        setPasswordHint('Passwords should be at least 8 characters long and should contain a mixture of letters, numbers, and other characters');
        setCharacterImageSrc('/img/archi_eyes_closed_flipped.png'); // Update with the path to your new image
    };

    // Function to clear the password hint and reset the image
    const clearPasswordHint = () => {
        setPasswordHint('');
        setCharacterImageSrc('/img/archi_amazed.png'); // Reset to the initial image
    };
    
    return (
      <div className={styles.registrationForm}>
            <div className={styles.signupContainer}>
                <h2>Sign Up</h2>
                <form className={styles.formContainer}>
                    <div className={styles.shortFormEntry}>
                        <div class="input-group">
                            <label for="first-name">First Name</label>
                            <input 
                                type="text" 
                                id="first-name" 
                                name="first_name" 
                                className={styles.longInput}
                                required
                                />
                        </div>
                        <div class="input-group">
                            <label for="last-name">Last Name</label>
                            <input 
                                type="text" 
                                id="last-name" 
                                name="last_name" 
                                className={styles.longInput}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={styles.longInput} 
                            required
                        />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.longInput} 
                                required
                                onFocus={showPasswordHint}
                                onBlur={clearPasswordHint}
                            />
                            {passwordHint && <div className={styles.passwordHint}>{passwordHint}</div>}
                    </div>
                    <DividerWithText>or</DividerWithText>
                    <button type="button" className={styles.googleSigninButton}>
                        <img src="./img/signin_w_google_button.png" alt="Google Image" />
                    </button>
                    <div className={styles.navigate}>
                        <button type="submit" class={styles.continueButton}>Sign Up</button>
                        <a href="/login" className={styles.loginLink}>Already have an account?</a>
                    </div>
                    <div className={styles.submitGroup}>
                        <p> By signing up for Archimedes, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                </form>
            </div>

      </div>
    );
};

const LoginForm = ({ setCharacterImageSrc, setCharacterSpeechBubbleContent, setShowSpeechBubble }) => {
    // State to manage the hint and image source
    const [passwordHint, setPasswordHint] = useState('');

    // Modify speech bubble content when the LoginForm is rendered
    useEffect(() => {
        setCharacterSpeechBubbleContent('"Welcome Back!"'); // Set new speech bubble content for login
        setShowSpeechBubble(true); // Show speech bubble when this form is rendered
        return () => {
            setCharacterSpeechBubbleContent(""); // Clear speech bubble content when unmounted
            setShowSpeechBubble(false); // Hide speech bubble when form is unmounted
        };
    }, [setCharacterSpeechBubbleContent, setShowSpeechBubble]);

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
    
    return (
      <div className={styles.registrationForm}>
            <div className="signup-container">
                <form className="signup-form">
                    <h2>Welcome back to Archimedes!</h2>
                    <p>We are excited to meet you again!</p>
                    <div className={styles.inputGroup}>
                        <label for="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={styles.longInput} 
                            required/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                name="password"
                                className={styles.longInput}
                                required
                                onFocus={showPasswordHint}
                                onBlur={clearPasswordHint}
                            />
                            {passwordHint && <div className={styles.passwordHint}>{passwordHint}</div>}
                        <p>Forgot password?</p>
                    </div>
                    <DividerWithText>or</DividerWithText>
                    <button type="button" className={styles.googleSigninButton}>
                        <img src="./img/signin_w_google_button.png" alt="Google Image" />
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

export default SignupPage;
