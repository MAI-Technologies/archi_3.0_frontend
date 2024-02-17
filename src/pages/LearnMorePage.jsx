import React, { useEffect, useState } from 'react';
import styles from "./LearnMorePage.module.css";


const LearnMorePage = () => {


	return (
		<div className={styles.content}>
            <div>
                <button type="getStartedBarBtn" className={styles.getStartedBarBtn} onClick={() => window.location.href = '/signup'}>
                    Get Started
                </button>
            </div>

            <div className={styles.section1}>
                <div className={styles.accordion}>
                    <h2>Frequently Asked Questions</h2>

                    <div>
                        <input type="radio" name="rd" id="q1" className={styles.accordion_input}/>
                        <label for="q1" className={styles.accordion_label}>Can the AI tutor help with homework or preparing for exams?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            Yes the AI tutors are built specifically for this purpose. We recommend taking notes with pen-and-paper as the 
                            AI explains concepts to students, as this is helpful for longer term retention. Future versions will have study 
                            features dedicated to review for exams, but for now, we provide you with both an overview of your recent 
                            conversation history and a graphing calculator to easily converse with our tutors.
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q2" className={styles.accordion_input}/>
                        <label for="q2" className={styles.accordion_label}>What kind of math problems can I ask the AI tutor?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            As of December 2023, we've designed our tutors to be specialized to address queries in Algebra I. We're currently 
                            working on adding future subjects for more students, such as Algebra II and Geometry.
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q3" className={styles.accordion_input}/>
                        <label for="q3" className={styles.accordion_label}>Is the AI math tutor free to use?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            The AI math tutors are currently free to all students selected for testing. We hope to offer the chatbot to more 
                            students soon!
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q4" className={styles.accordion_input}/>
                        <label for="q4" className={styles.accordion_label}>How does the AI tutor help me understand math concepts better?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            When you ask the AI tutor a question, it will try to answer it in a manner that engages student thinking while also 
                            guiding student to the answer. We've curated this to make it close to a real-life tutor.
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q5" className={styles.accordion_input}/>
                        <label for="q5" className={styles.accordion_label}>What if I get stuck on a problem while using the AI tutor?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            If you are unable to progress with a problem with our one of our AI tutors, they will do their best to explain it in a 
                            different way!
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q6" className={styles.accordion_input}/>
                        <label for="q6" className={styles.accordion_label}>How does the AI tutor ensure privacy and data protection?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            As a group of highly motivated group of recently college graduates planning on registering as a nonprofit, we do 
                            not sell ANY of your data to third parties.
                        </p>
                        </div>
                    </div>
                    <div>
                        <input type="radio" name="rd" id="q7" className={styles.accordion_input}/>
                        <label for="q7" className={styles.accordion_label}>What types of courses will the AI tutors help with?</label>
                        <div className={styles.accordion_content}>
                        <p>
                            As of December 2023, our AI tutors specialize in Algebra I and II.
                        </p>
                        </div>
                    </div>
                </div>
            </div>

			<div className={styles.section2}>
                <div className={styles.mission}>
                    <h2>Our Mission Statement</h2>
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
                </div>
            </div>

            <div className={styles.section3}>
                <div className={styles.vision}>
                    <h2>Vision for the Future</h2>
                    <p>
                        We are a team of... Our goal is to provide all students with a custom, high-quality, 24/7 math 
                        tutor, that they can not only utilize to answer their questions for various coursework, but 
                        also to review material learned in previous courses.
                    </p>
                    <p>
                        We are a team of... Our goal is to provide all students with a custom, high-quality, 24/7 math 
                        tutor, that they can not only utilize to answer their questions for various coursework, but 
                        also to review material learned in previous courses.
                    </p>
                    <button type="tryArchi" className={styles.tryArchiBtn} onClick={() => window.location.href = '/signup'}>
						Try Archimedes
					</button>
                </div>
            </div>
		</div>
	);
};

export default LearnMorePage;
