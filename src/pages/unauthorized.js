import React from "react";
import styles from "../../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Unauthorized</h2>
      <p className={styles.description}>
        You don't have access to view this page
      </p>
    </div>
  );
}
