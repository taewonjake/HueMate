//사용자가 톤 조합 유형 선택: 톤온톤, 톤인톤, 무채색 등
import React from "react";
import styles from "./ToneSelector.module.css";

const ToneSelector = ({ toneType, setToneType }) => {
    const options = [
    { value: "analogic", label: "톤온톤" },
    { value: "monochrome", label: "톤인톤" },
    { value: "complement", label: "보색(무채색)" }
  ];

  return (
    <div className={styles.toneSelector}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.toneButton} ${toneType === option.value ? styles.active : ""}`}
          onClick={() => setToneType(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;