//분석 결과 카드

import React from "react";
import styles from "./HarmonyResultBox.module.css";

const HarmonyResultBox = ({ result }) => {
  const { score, message, tips } = result;

  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50"; // green
    if (score >= 50) return "#FFC107"; // yellow
    return "#F44336"; // red
  };

  return (
    <div className={styles.resultBox}>
      <h4>조화도 분석 결과</h4>
      <p>
        <strong style={{ color: getScoreColor(score), fontSize: "1.5rem" }}>
          점수: {score}점
        </strong>
      </p>
      <p className={styles.message}>{message}</p>
      <p className={styles.tip}><em>{tips}</em></p>
    </div>
  );
};

export default HarmonyResultBox;