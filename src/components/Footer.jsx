//하단 정보
// src/components/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 HueMate. All rights reserved.</p>
      <p>Made with 💜 by your color assistant</p>
    </footer>
  );
};

export default Footer;
