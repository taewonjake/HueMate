// src/components/ColorMultiInput.jsx
import React from "react";
import ImageUpload from "./ImageUpload"; // ⬅️ 이미지 업로드+추출 컴포넌트 사용
import styles from "./ColorMultiInput.module.css";

const ColorMultiInput = ({ colorList, setColorList }) => {
  const handleChange = (idx, value) => {
    setColorList((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const addColor = () => {
    setColorList((prev) => (prev.length < 6 ? [...prev, "#000000"] : prev));
  };

  const removeColor = (idx) => {
    setColorList((prev) => (prev.length > 2 ? prev.filter((_, i) => i !== idx) : prev));
  };

  // ⬇️ ImageUpload에서 색이 추출되면 호출됨
  const handleBaseColorFromImage = (hex) => {
    if (!hex) return;
    setColorList((prev) => {
      if (prev.length >= 6) return prev;
      // 중복 방지(원하면 삭제해도 됨)
      if (prev.includes(hex)) return prev;
      return [...prev, hex];
    });
  };

  return (
    <div className={styles.multiInput}>
      <h3>색상 조화도 분석</h3>

      {colorList.map((color, index) => (
        <div key={index} className={styles.colorRow}>
          <input
            type="color"
            value={color}
            onChange={(e) => handleChange(index, e.target.value)}
            className={styles.colorPicker}
          />
          <span className={styles.colorCode}>{color}</span>
          {colorList.length > 2 && (
            <button onClick={() => removeColor(index)} className={styles.removeBtn}>
              삭제
            </button>
          )}
        </div>
      ))}

      <div className={styles.actions}>
        {colorList.length < 6 && (
          <>
            <button onClick={addColor} className={styles.addBtn}>색상 추가</button>
            {/* ⬇️ 여기서 이미지로부터 색 추가 */}
            <ImageUpload setBaseColor={handleBaseColorFromImage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ColorMultiInput;
