//색상 조합별 설명 + 코디 버튼
import React from "react";
import styles from "./StylingTip.module.css";

const StylingTip = ({ title, description, pinterestKeyword }) => (
  <div className={styles.stylingTip}>
    <h4>{title}</h4>
    <p>{description}</p>
    <button
      className={styles.stylingButton}
      onClick={() =>
        window.open(pinterestKeyword)
      }
    >
      코디 보기
    </button>
  </div>
);

export default StylingTip;
