//색상 팔레트 하나하나의 카드 컴포넌트, 색상, HEX, 이름, 톤 유형 등 시각화
import React from "react";
import styles from "./ColorBox.module.css";

const ColorBox = ({ color }) => {
  return (
    <div
      className={styles.colorBox}
      style={{ backgroundColor: color }}
      title={color}
    ></div>
  );
};

export default ColorBox;
