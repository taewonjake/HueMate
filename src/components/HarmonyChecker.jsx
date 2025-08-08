//색 조합 조화성 평가

import React, { useState, useEffect } from "react";
import ColorMultiInput from "./ColorMultiInput";
import HarmonyResultBox from "./HarmonyResultBox";
import { analyzeHarmony } from "../utils/colorUtils";
import styles from "./HarmonyChecker.module.css";

const HarmonyChecker = () => {
  const [colorList, setColorList] = useState(["#000000", "#ffffff"]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (colorList.length >= 2) {
      const analysis = analyzeHarmony(colorList);
      setResult(analysis);
    }
  }, [colorList]);

  return (
    <div className={styles.harmonyChecker}>
      <ColorMultiInput colorList={colorList} setColorList={setColorList} />
      {result && <HarmonyResultBox result={result} />}
    </div>
  );
};

export default HarmonyChecker;