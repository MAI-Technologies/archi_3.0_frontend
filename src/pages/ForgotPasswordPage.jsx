import React, { useRef } from 'react';
import styles from './SignupPage.module.css'; // Import your CSS module
import { forgotPassword } from '../utils/auth';

function ForgotPasswordPage() {
    const emailRef = useRef();

    async function submitHandler(e) {
        e.preventDefault();

        const email = emailRef.current.value;

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
                <h2>Forgot Password</h2>
            </div>

            <div className={styles.signupContainer}>
                <form className={styles.formContainer} onSubmit={submitHandler}>
                    <input ref={emailRef} type='email' />
                    <div className={styles.navigate}>
                        <button type="submit" className={styles.continueButton}>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ForgotPasswordPage;