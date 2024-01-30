// SignupPage.jsx
import React, { useState } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module

const SignupPage = () => {
    const [currentSection, setCurrentSection] = useState(1); // State to manage the current section
    const [role, setRole] = useState(''); // State to track the selected role in section 1
    const [dob, setDob] = useState({ month: '', day: '', year: '' }); // State to track date of birth in section 1
    const [characterImageSrc, setCharacterImageSrc] = useState('/img/archi_amazed.png'); // State for character image source


    const handleNextSection = () => {
        if (currentSection === 1) {
            // Validate the fields in section 1
            if (!role) {
                alert('Please select a role before proceeding.');
                return;
            }
            if (!dob.month || !dob.day || !dob.year) {
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
                {currentSection === 2 && <CreateAccountForm setCharacterImageSrc={setCharacterImageSrc} />}
                <Character imageSrc={characterImageSrc} /> {/* Pass the image source as a prop */}
            </div>
        </div>
    );
};

const RegistrationForm = ({ currentSection, role, setRole, dob, setDob, handleNextSection }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for empty fields and validate in section 1
        if (!role) {
            alert('Please select a role before proceeding.');
            return;
        }
        if (!dob.month || !dob.day || !dob.year) {
            alert('Please fill out the date of birth before proceeding.');
            return;
        }
        
        // Process the selectedRole state as needed

        // After processing, move to the next section
        handleNextSection();
    };
    
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
                                {['Student', 'Teacher', 'Parent'].map((roleOption) => (
                                <button
                                    type="button"
                                    key={roleOption}
                                    onClick={() => setRole(roleOption)}
                                    className={`${styles.roleButton} ${role === roleOption ? styles.active : ''}`}
                                >
                                    {roleOption}
                                </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dob">What is your date of birth?</label>
                    <div className={styles.dobInputs}>
                        <input
                            type="text"
                            id="month"
                            placeholder="Jan"
                            value={dob.month}
                            onChange={(e) => setDob({ ...dob, month: e.target.value })}
                        />
                        <input
                            type="text"
                            id="day"
                            placeholder="16"
                            value={dob.day}
                            onChange={(e) => setDob({ ...dob, day: e.target.value })}
                        />
                        <input
                            type="text"
                            id="year"
                            placeholder="1994"
                            value={dob.year}
                            onChange={(e) => setDob({ ...dob, year: e.target.value })}
                        />
                    </div>
                </div>
                <button 
                    type="button" 
                    onClick={handleSubmit} // Handle the click event
                    className={styles.continueButton}>
                    Continue
                </button>
                <a href="/login" className={styles.loginLink}>Already have an account?</a>
            </>
            )}
        </div>
    );
};

const Character = ({imageSrc}) => {
  return (
    <div className={styles.characterContainer}>
        <SpeechBubble />
        <img src={imageSrc} alt="Archimedes character" className={styles.characterImage} />
    </div>
  );
};

const SpeechBubble = () => {
  return (
    <div className={styles.speechBubble}>
        <img src="/img/text_bubble.png" alt="Blank text bubble" className={styles.textBubbleImage} />
        <p>Ooooo... A new student!?</p>
    </div>
  );
};

const CreateAccountForm = ({setCharacterImageSrc}) => {
    // State to manage the hint and image source
    const [passwordHint, setPasswordHint] = useState('');

    // Function to show the password hint and change the image
    const showPasswordHint = () => {
        setPasswordHint('Passwords should be at least 8 characters long and should contain a mixture of letters, numbers, and other characters');
        setCharacterImageSrc('/img/archi.png'); // Update with the path to your new image
    };

    // Function to clear the password hint and reset the image
    const clearPasswordHint = () => {
        setPasswordHint('');
        setCharacterImageSrc('/img/archi_amazed.png'); // Reset to the initial image
    };
    
    return (
      <div className={styles.registrationForm}>
            <div class="signup-container">
                <form class="signup-form">
                    <h2>Sign Up</h2>
                    <div class="input-group">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" name="first_name" required/>
                    </div>
                    <div class="input-group">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last_name" required/>
                    </div>
                    <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                    </div>
                    <div class="input-group">
                    <label for="password">Password</label>
                    <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onFocus={showPasswordHint}
                            onBlur={clearPasswordHint}
                        />
                        {passwordHint && <div className={styles.passwordHint}>{passwordHint}</div>}
                    </div>
                    <div class="submit-group">
                    <button type="submit" class="signup-button">Sign Up</button>
                    <p>---- or ----</p>
                    <button type="button" class="google-signin-button">Sign in with Google</button>
                    </div>
                    <div class="login-link">
                    Already have an account? <a href="/login">Log in</a>
                    </div>
                    <p> By signing up for Archimedes, you agree to our Terms of Service and Privacy Policy.</p>
                </form>
            </div>

      </div>
    );
};

export default SignupPage;
