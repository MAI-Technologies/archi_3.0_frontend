import React from "react";
import styles from "./DividerWithText.module.css";

const DividerWithText = ({ children }) => {
    return (
      <div className={styles.container}>
        <div className={styles.borderLeft} />
        <span className={styles.content}>
          {children}
        </span>
        <div className={styles.borderRight} />
      </div>
    );
  };

export default DividerWithText;