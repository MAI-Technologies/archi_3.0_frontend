// SignupPage.jsx
import React, { useState } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module

const SignupPage = () => {
    const [currentSection, setCurrentSection] = useState(1); // State to manage the current section
    const [role, setRole] = useState(''); // State to track the selected role in section 1
    const [dob, setDob] = useState({ month: '', day: '', year: '' }); // State to track date of birth in section 1


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

    // Character image source based on the current section
    const characterImageSrc = currentSection === 1
      ? '/img/archi_amazed.png' // Character image for section 1
      : '/img/archi.png'; // Different image for section 2

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
                {currentSection === 2 && <AnotherForm />}
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

const AnotherForm = () => {
    return (
      <div className={styles.registrationForm}>
          {/* Include your form fields for section 2 here */}
          <h1> FORM! </h1>
      </div>
    );
};

export default SignupPage;
