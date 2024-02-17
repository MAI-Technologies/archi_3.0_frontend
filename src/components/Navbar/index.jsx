import React from 'react';
import styles from './Navbar.module.css';

function conditionalNav() {
	if (window.location.pathname === "/chatbot/archi") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/archiHeader.png)" }}> <button type="submit" class={styles.logOutButton}>Log Out</button></div>;
	} else if (window.location.pathname === "/chatbot/hypatia") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/hypatiaHeader.png)" }}><button type="submit" class={styles.logOutButton}>Log Out</button></div>;
	} else if (window.location.pathname === "/chatbot/mary_j") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/mjHeader.png)" }}><button type="submit" class={styles.logOutButton}>Log Out</button></div>;
	} else {
		// render button only on tutor page
		if (window.location.pathname === "/tutor") {
			return (<div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}><button type="submit" class={styles.logOutButton}>Log Out</button></div>);
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
				<a href = '/'>
					<div className={styles.clickableArea}>
					</div>
				</a>
			</div>
		</>
	);
};

export default Navbar;