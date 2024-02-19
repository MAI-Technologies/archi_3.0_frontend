import React from 'react';
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


	if (window.location.pathname === "/chatbot/archi") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/archiHeader.png)" }}> <button type="submit" class={styles.logOutButton} onClick={logoutHandler}>Log Out</button></div>;
	} else if (window.location.pathname === "/chatbot/hypatia") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/hypatiaHeader.png)" }}><button type="submit" class={styles.logOutButton} onClick={logoutHandler}>Log Out</button></div>;
	} else if (window.location.pathname === "/chatbot/mary_j") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/mjHeader.png)" }}><button type="submit" class={styles.logOutButton} onClick={logoutHandler}>Log Out</button></div>;
	} else {
		// render button only on tutor page
		if (window.location.pathname === "/tutor") {
			return (<div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}><button type="submit" class={styles.logOutButton} onClick={logoutHandler}>Log Out</button></div>);
		}
		else {
			return (<div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}></div>);
		}

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