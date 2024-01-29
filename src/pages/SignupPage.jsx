// SignupPage.jsx
import React, { useState } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module

const SignupPage = () => {
  return (
    <div className={styles.signupPage}>
      <RegistrationForm />
      <Character />
    </div>
  );
};

const RegistrationForm = () => {
    const [selectedRole, setSelectedRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Process the selectedRole state as needed
    };
    
    return (
        <div className={styles.registrationForm}>
            <h2>Welcome to Archimedes</h2>
            <p>Create an account to save your progress!</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.roleSelection}>
                    {['Student', 'Teacher', 'Parent'].map((role) => (
                    <button
                        type="button"
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`${styles.roleButton} ${selectedRole === role ? styles.active : ''}`}
                    >
                        {role}
                    </button>
                    ))}
                </div>
            <input type="hidden" name="role" value={selectedRole} />
            </form>
        <div className={styles.formGroup}>
            <label htmlFor="dob">What is your date of birth?</label>
            <div className={styles.dobInputs}>
            <input type="text" id="month" placeholder="Jan" />
            <input type="text" id="day" placeholder="16" />
            <input type="text" id="year" placeholder="1994" />
            </div>
        </div>
        <button type="submit" className={styles.continueButton}>Continue</button>
        <a href="/login" className={styles.loginLink}>Already have an account?</a>
        </div>
    );
};

const Character = () => {
  return (
    <div className={styles.characterContainer}>
      <img src="/path-to-character-image.png" alt="Archimedes character" className={styles.characterImage} />
      <SpeechBubble />
    </div>
  );
};

const SpeechBubble = () => {
  return (
    <div className={styles.speechBubble}>
      <p>Ooooo... A new student!?</p>
    </div>
  );
};

export default SignupPage;
