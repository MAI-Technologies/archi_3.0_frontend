import React from 'react';
import styles from './Navbar.module.css';

function conditionalNav() {
	if (window.location.pathname === "/chatbot/archi") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/archiHeader.png)" }}></div>;
	} else if (window.location.pathname === "/chatbot/hypatia") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/hypatiaHeader.png)" }}></div>;
	} else if (window.location.pathname === "/chatbot/mary_j") {
		return <div className={styles.bar} style={{ backgroundImage: "url(/img/mjHeader.png)" }}></div>;
	} else {
		return (<div className={styles.bar} style={{ backgroundImage: "url(/img/mainHeader.png)" }}> 

			<button type="getStartedBar" className={styles.getStartedBarBtn} onClick={() => window.location.href = '/'}>
				Get Started
			</button>
		
		</div>);
	}
};

const Navbar = () => {
	return (
		<>
			<div className={styles.content}>
				{conditionalNav()}
			</div>
		</>
	);
};

export default Navbar;