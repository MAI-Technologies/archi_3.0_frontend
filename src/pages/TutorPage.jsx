// TutorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TutorData from '../components/Tutor/TutorData';
import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./TutorPage.module.css";

const TutorPage = () => {
  const tutors = TutorData.slice(0, 3);
  return (
    <ContentWrapper>
			<div className={styles.content}>
        <div className={styles.contentInner}>
          <h1> Pick Your Math Tutor! </h1>
          <div className={styles.tutors}>
            {tutors.map((tutor) => (
              <figure>
              <Link key={tutor.id} to={`/chatbot/${tutor.id}`} style={{textDecoration: 'none'}}>
                <button type="tutor-button">
                  <img src={`${tutor.imageSrc}`} alt="info"></img>
                </button>
                <figcaption style={{ textDecoration: 'none' }}> {tutor.name} </figcaption>
              </Link>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default TutorPage;
