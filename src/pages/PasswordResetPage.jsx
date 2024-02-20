import React from 'react';
import styles from './PasswordResetPage.module.css';

const PasswordResetPage = () => {
    return (
        <div className={styles.registrationForm}>
    
            <div className={styles.header}>
                <h2>Reset Password</h2>
            </div>
    
            <div className="signup-container">
                <form className="signup-form">
                    <div className={styles.inputGroup}>
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={styles.longInput}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label for="password">Retype Password</label>
                        <input
                            type="password"
                            id="retypePassword"
                            name="retypePassword"
                            className={styles.longInput}
                            required
                        />
                    </div>
                    {/* <DividerWithText>or</DividerWithText> */}
                    <div className={styles.navigate}>
                        <button type="submit" class={styles.continueButton}>Reset</button>
                        <a href="/signup" className={styles.loginLink}>Create a new account</a>
                    </div>
                </form>
            </div>
    
        </div>
    );
};

export default PasswordResetPage;