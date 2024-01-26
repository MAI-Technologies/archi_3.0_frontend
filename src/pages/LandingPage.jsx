import React from 'react';
import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<ContentWrapper>
			<div className={styles.content}>

				<div className={styles.section1}>
					<div className={styles.visualBlock1}>
						<img src="/img/archi_flipped.gif" alt="archi gif"></img>
						<img src="/img/planet_shape.png" alt="planet image"></img>
					</div>
					
					<div className={styles.textBlock1}>
						<h2>Welcome to Archimedes, An AI tutor for mathematics!</h2>
						<h3>The free, fun, and effective way to learn math!</h3>
						<p>
							Technology has made learning math easier with the introduction of a personal AI math tutor.
							This tutor uses innovative algorithms to adapt to an individual's learning style, pace, and preferences,
							providing personalized solutions for complex equations and difficult mathematical concepts.
						</p>
					</div>
				</div>

				<div className={styles.section2}>
					<h2>Who We Are</h2>
					<p>
						We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
						tutor, that they can not only utilize to answer their questions for various coursework, but 
						also to review material learned in previous courses.
					</p>
				</div>

				<div className={styles.section3}>
					<h2>How It Works</h2>
					<p>
						We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
						tutor, that they can not only utilize to answer their questions for various coursework, but 
						also to review material learned in previous courses.
					</p>
				</div>

				<div className={styles.section4}>
					<h2>FAQs</h2>
					<p>
						We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
						tutor, that they can not only utilize to answer their questions for various coursework, but 
						also to review material learned in previous courses.
					</p>
				</div>
			</div>

			{/* old stuff
			<div className={styles.content}>
				<div className={styles.innerContent}>
				<img src="img/archimedes.jpg" alt="archi"></img>
				<button type="try" onClick={() => window.location.href = '/tutor'}>
					Try ArchI
				</button>
				<h1>
					Your Personal Math Tutor
				</h1>
				</div>
			</div>
			*/}
		</ContentWrapper>
	);
};

export default LandingPage;
