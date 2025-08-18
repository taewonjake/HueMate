//HEX 색상 입력창 또는 컬러 피커 UI, 입력된 색상을 상위(App)에 전달
import React, { useEffect, useState } from 'react';
import styles from "./ColorInput.module.css";
import { fetchColorName } from "../utils/api"; // 유틸 함수 import

const ColorInput = ({ baseColor, setBaseColor }) => {
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    async function getColorName() {
      if (baseColor) { //basecolor가 비어있지 않을 경우에 실행
        const name = await fetchColorName(baseColor);//api 호출
        setColorName(name);
      }
    }
    getColorName();
  }, [baseColor]);//basecolor가 바뀔 때마다 색 이름을 비동기로 가져옴

  return (
    <div className={styles.Colorinput}>
      <label htmlFor="colorPicker" className={styles.colorLabel}>
        색상을 선택하세요
      </label>
       {/* 컬러 피커: 선택 시 setBaseColor 호출로 부모 상태 변경 */}
      <input
        type="color"
        id="colorPicker"
        value={baseColor}
        onChange={(e) => setBaseColor(e.target.value)}
        className={styles.colorPicker}
      />
      {/* 선택한 HEX 코드와 (있으면) 색 이름 같이 표시 */}
      <div className={styles.colorCode}>
        <span>{baseColor}</span>
        <span style={{ marginLeft: "0.5rem" }}>{colorName && `(${colorName})`}</span>
      </div>
    </div>
  );
};

export default ColorInput;