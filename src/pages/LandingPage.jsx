import React from 'react';
import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<ContentWrapper>
			<div className={styles.content}>

				<div className={styles.section1}>
					<div className={styles.visualBlock1}>
						<div className={styles.archiButtonBlock}>
							<img src="/img/archi_flipped_loop.gif" alt="archi gif"></img>
							<img 
								src="/img/getStarted.png" alt="get started button" /*
								onMouseOver={e => (e.currentTarget.src = "/img/getStartedHover.png")} 
								onMouseOut={e => (e.currentTarget.src = "/img/getStarted.png")} */
							/>
							<img src="/img/haveAcc.png" alt="have account button"></img>
						</div>
						<div className={styles.planetBlock}>
							<img src="/img/planet.png" alt="planet image"></img>
						</div>
					</div>
					
					<div className={styles.textBlock1}>
						<h2>Welcome to Archimedes, </h2>
						<h2>An AI tutor for mathematics!</h2>
						<h3>The free, fun, and effective way to learn math!</h3>
						<p>
							Technology has made learning math easier with the introduction of a personal AI math tutor.
							This tutor uses innovative algorithms to adapt to an individual's learning style, pace, and preferences,
							providing personalized solutions for complex equations and difficult mathematical concepts.
						</p>
					</div>
				</div>

				<div className={styles.section2}>
					<img src="/img/one_star.gif" alt="one star"></img>
					<div className={styles.textBlock2}>
						<h2>Who We Are</h2>
						<p>
							We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
							tutor, that they can not only utilize to answer their questions for various coursework, but 
							also to review material learned in previous courses.
						</p>
						<p>
							We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
							tutor, that they can not only utilize to answer their questions for various coursework, but 
							also to review material learned in previous courses.
						</p>

						<img src="/img/learn_more.png" alt="learn more button"></img>
					</div>
				</div>

				<div className={styles.section3}>
					<div className={styles.visualBlock2}>

					</div>
					<div className={styles.textBlock3}>
						<h2>How It Works</h2>
						<p>
							We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
							tutor, that they can not only utilize to answer their questions for various coursework, but 
							also to review material learned in previous courses.
						</p>

						<img src="/img/learn_more.png" alt="learn more button"></img>
					</div>
				</div>

				<div className={styles.section4}>
					<div className={styles.textBlock4}>
						<h2>FAQs</h2>
						<p>
							We are a team of ... Our goal is to provide all students with a custom, high-quality, 24/7 math 
							tutor, that they can not only utilize to answer their questions for various coursework, but 
							also to review material learned in previous courses.
						</p>

						<img src="/img/learn_more.png" alt="learn more button"></img>
					</div>
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
