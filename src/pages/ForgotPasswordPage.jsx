import React, { useRef } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module

function ForgotPasswordPage() {
    const emailRef = useRef();

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
    return (
        <div className={styles.registrationForm}>

            <div className={styles.header}>
                <h2>Forgot Password?</h2>
                <p>Reset your password below.</p>
            </div>

            <div className={styles.signupContainer}>
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
                        />
                    </div>
                </form>
            </div>

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
    )
}

export default ForgotPasswordPage;