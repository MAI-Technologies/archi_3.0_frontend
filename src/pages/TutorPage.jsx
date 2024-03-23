// TutorPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TutorData from '../components/Tutor/TutorData';
// import { ContentWrapper } from "../components/Navbar/NavbarElements";
import styles from "./TutorPage.module.css";
import { UserContext } from '../contexts/UserContext';
import { authenticateUser } from '../utils/auth';

const TutorPage = () => {
  const tutors = TutorData.slice(0, 3);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [selectedTutorIndex, setSelectedTutorIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser().then((user) => {
      console.log(user);
      if (user == null) return navigate("/login");
      setUser(user);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      navigate("/login");
    })
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.content}>
      <h1> Now Pick Your Tutor! </h1>
      <div className={styles.tutors}>
        {tutors.map((tutor, i) => (
          <div className={styles.tutorWithDes} key={i}>
            <div className={styles.tutorStack}>
              <Link key={tutor.id} to={`/chatbot/${tutor.id}`} style={{ textDecoration: 'none' }}>
                <button type="tutor-planet">
                  <img src={`${tutor.planetImgSrc}`} alt="planet img"></img>
                </button>
                <button type="tutor-button">
                  <img src={`${tutor.imageSrc}`} alt="profile img"></img>
                </button>
              </Link>
            </div>

            <div
              className={styles.tutorDes}>
              <h3 style={{ color: `${tutor.themeColor}` }}>{tutor.name}</h3> {/* Apply color to h3 */}
              <p style={{color: `${tutor.themeColor}`}}>{tutor.description}</p> {/* Apply color to p */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorPage;
