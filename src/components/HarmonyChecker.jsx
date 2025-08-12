import React, { useEffect, useState } from "react";
import HarmonyResultBox from "./HarmonyResultBox";
import { analyzeHarmony } from "../utils/colorUtils";
import styles from "./HarmonyChecker.module.css";

const HarmonyChecker = ({ colors = [], trigger = 0 }) => {
  const [result, setResult] = useState(null);
  const [lastColors, setLastColors] = useState([]);

  // 색이 바뀌면 결과 숨김
  useEffect(() => {
    const hexList = Array.isArray(colors) ? colors.filter(Boolean) : [];
    if (hexList.join(",") !== lastColors.join(",")) {
      setResult(null);
      setLastColors(hexList);
    }
  }, [colors, lastColors]);

  // 버튼을 눌러 trigger가 증가했을 때만 계산
  useEffect(() => {
    if (trigger <= 0) {
      setResult(null);
      return;
    }

    const valid = Array.isArray(colors) && colors.filter(Boolean).length >= 2;
    setResult(valid ? analyzeHarmony(colors) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className={styles.harmonyChecker}>
      {!result && (
        <p className={styles.help}>
          색상을 입력한 뒤 <strong>조화도 분석</strong> 버튼을 누르면 결과가 표시됩니다.
        </p>
      )}
      {result && <HarmonyResultBox result={result} />}
    </div>
  );
};

export default HarmonyChecker;
