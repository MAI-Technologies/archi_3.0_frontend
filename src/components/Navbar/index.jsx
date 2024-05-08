import React, { useContext } from 'react';
import { TutorContext } from '../../contexts/TutorContext';
import SignoutButton from '../SignoutButton/SignoutButton';
import styles from './Navbar.module.css';
import { logout } from '../../utils/auth';

const Navbar = () => {
	const { tutor } = useContext(TutorContext);  // Access the tutor context

    async function logoutHandler() {
        try {
            await logout();
            console.log(`Logout successful`);
        } catch (err) {
            console.log(err);
        }
    }

    // Set the default or tutor-specific background image
    const backgroundImage = tutor ? `url(/img/${tutor.id}Header.png)` : "url(/img/mainHeader.png)";

    return (
        <div className={styles.content}>
            <div className={styles.bar} style={{ backgroundImage }}>
                {tutor ? 
                    <SignoutButton color={tutor.themeColor} filter={tutor.filter} onLogout={logoutHandler} />
                    :
                    <SignoutButton onLogout={logoutHandler} />
                }
                <a href='/'>
                    <div className={styles.clickableArea}></div>
                </a>
            </div>
        </div>
    );
};

export default Navbar;