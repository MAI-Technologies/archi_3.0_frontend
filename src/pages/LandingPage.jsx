import React from 'react';
import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<ContentWrapper>
			<div className={styles.content}>
				<div className={styles.innerContent}>
				<img src="img/archimedes.jpg" alt="archi"></img>
				{/* take users to chatbot from landing page */}
				<button type="try" onClick={() => window.location.href = '/tutor'}>
					Try ArchI
				</button>
				<h1>
					Your Personal Math Tutor
				</h1>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default LandingPage;
