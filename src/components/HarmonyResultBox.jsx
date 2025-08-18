import React from "react";
import styles from "./HarmonyResultBox.module.css";

const getScoreColor = (score) => {//점수의 색깔 지정
  if (score >= 80) return "#0ea5e9";
  if (score >= 60) return "#22c55e";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
};

const HarmonyResultBox = ({ result }) => {//결과들 출력
  if (!result) return null;
  const { score = 0, message = "", tips = "", colors = [] } = result;

  return (
    <div className={styles.resultBox}>
      <h4 className={styles.title}>분석 결과</h4>

      {Array.isArray(colors) && colors.length >= 2 && (
        <div className={styles.combo}>
          {colors.slice(0, 2).map((c, i) => (
            <div key={i} className={styles.comboSwatch} style={{ background: c }} />
          ))}
        </div>
      )}

      <div className={styles.scoreWrap}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreText}>{score}</span>
        </div>
        <div className={styles.scoreLabel}>조화도 점수</div>
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(100, Math.max(0, score))}%`, background: getScoreColor(score) }}
          />
        </div>
      </div>

      <div className={styles.note}>
        {message || "분석 결과 메시지가 여기에 표시됩니다."}
      </div>

      {tips && <p className={styles.tip}><em>{tips}</em></p>}
    </div>
  );
};

export default HarmonyResultBox;
