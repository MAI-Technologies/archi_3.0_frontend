// TutorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TutorData from '../components/Tutor/TutorData';
// import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./TutorPage.module.css";

const TutorPage = () => {
  const tutors = TutorData.slice(0, 3);
  return (
    <div className={styles.content}>
        <h1> Now Pick Your Tutor! </h1>
        <div className={styles.tutors}>
          {tutors.map((tutor) => (
            <div className={styles.tutorWithDes}>
              <div className={styles.tutorStack}>
                <Link key={tutor.id} to={`/chatbot/${tutor.id}`} style={{textDecoration: 'none'}}>
                  <button type="tutor-planet">
                    <img src={`${tutor.planetImgSrc}`} alt="planet img"></img>
                  </button>
                  <button type="tutor-button">
                    <img src={`${tutor.imageSrc}`} alt="profile img"></img>
                  </button>
                </Link>
              </div>

              <div className={styles.tutorDes}>
                <h3>{tutor.name}</h3>
                <p>{tutor.description}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default TutorPage;
