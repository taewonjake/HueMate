/*메인 베너 영역*/
// src/components/HeroSection.jsx
import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>HueMate, 컬러 조합을 도와주는 친구</h1>
      <p className={styles.subtitle}>당신만의 완벽한 색상 매치를 찾아보세요</p>
      <div className={styles.keyPhrases}>
        <p>👕 이 옷들이 어울릴까? 어떤 옷이 어울릴까?</p>
        <p>🎨 전문가 수준의 색상 조합을 쉽고 빠르게</p>
      </div>
    </section>
  );
};

export default HeroSection;
