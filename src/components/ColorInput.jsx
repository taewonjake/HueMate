//HEX 색상 입력창 또는 컬러 피커 UI, 입력된 색상을 상위(App)에 전달
import React, { useEffect, useState } from 'react';
import styles from "./ColorInput.module.css";
import { fetchColorName } from "../utils/api"; // 유틸 함수 import

const ColorInput = ({ baseColor, setBaseColor }) => {
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    async function getColorName() {
      if (baseColor) {
        const name = await fetchColorName(baseColor);
        setColorName(name);
      }
    }
    getColorName();
  }, [baseColor]);

  return (
    <div className={styles.Colorinput}>
      <label htmlFor="colorPicker" className={styles.colorLabel}>
        색상을 선택하세요
      </label>
      <input
        type="color"
        id="colorPicker"
        value={baseColor}
        onChange={(e) => setBaseColor(e.target.value)}
        className={styles.colorPicker}
      />
      <div className={styles.colorCode}>
        <span>{baseColor}</span>
        <span style={{ marginLeft: "0.5rem" }}>{colorName && `(${colorName})`}</span>
      </div>
    </div>
  );
};

export default ColorInput;