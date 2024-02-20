import React from 'react';
import SignoutButton from '../SignoutButton/SignoutButton';
import TutorData from '../Tutor/TutorData';
import styles from './Navbar.module.css';
import { logout } from '../../utils/auth';

function conditionalNav() {
	async function logoutHandler() {
		try {
			await logout();
			console.log(`logout successful`);
		} catch (err) {
			console.log(err);
		}
	}
  
    // Extract the last part of the URL
    const lastPath = window.location.pathname.split('/').pop();
	console.log(lastPath);

    // Find the tutor data based on the last part of the URL
    const tutor = TutorData.find(t => t.id === lastPath);
    
    if (tutor) {
        // If tutor exists, return navbar with background image and SignoutButton with themeColor
        return (
            <div className={styles.bar} style={{ backgroundImage: `url(/img/${tutor.id}Header.png)` }}>
                <SignoutButton color={`${tutor.themeColor}`} filter={`${tutor.filter}`}></SignoutButton>
            </div>
        );
    } else if (window.location.pathname === "/tutor") {
        // Specific case for tutor main page
        return (
            <div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}>
                <SignoutButton></SignoutButton>
            </div>
        );
    } else {
        // Default case where only the navbar is rendered
        return (
            <div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}></div>
        );
    }
};

const Navbar = () => {
	return (
		<>
			<div className={styles.content}>
				{conditionalNav()}
				{/* <a href='/'>
					<div className={styles.clickableArea}>
					</div>
				</a> */}
			</div>
		</>
	);
};

export default Navbar;