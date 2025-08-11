// src/components/HarmonyChecker.jsx
// 색 조합 조화성 평가 (입력 UI 제거, 부모에서 받은 colors만 분석)

import React, { useEffect, useState } from "react";
import HarmonyResultBox from "./HarmonyResultBox";
import { analyzeHarmony } from "../utils/colorUtils";
import styles from "./HarmonyChecker.module.css";

const HarmonyChecker = ({ colors = [] }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (Array.isArray(colors) && colors.length >= 2) {
      setResult(analyzeHarmony(colors));
    } else {
      setResult(null);
    }
  }, [colors]);

  return (
    <div className={styles.harmonyChecker}>
      {/* 입력 영역은 부모(Harmony.jsx)에서 렌더링합니다 */}
      {result && <HarmonyResultBox result={result} />}
      {!result && <p className={styles.help}>최소 두 가지 색상을 선택하면 분석합니다.</p>}
    </div>
  );
};

export default HarmonyChecker;
