// src/components/ColorMultiInput.jsx
import React from "react";
import ImageUpload from "./ImageUpload";
import styles from "./ColorMultiInput.module.css";

const ColorMultiInput = ({ colorList, setColorList }) => {
  const normalizeHex = (hex) =>
    typeof hex === "string" ? hex.trim().toLowerCase() : hex;

  const handleChange = (idx, value) => {
    const v = normalizeHex(value);
    setColorList((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
  };

  const addColor = () => {
    setColorList((prev) =>
      prev.length < 6 ? [...prev, "#000000"] : prev
    );
  };

  const removeColor = (idx) => {
    setColorList((prev) => prev.filter((_, i) => i !== idx));
  };

  // 이미지 업로드에서 받은 대표색을 리스트에 추가
  const handleBaseColorFromImage = (hex) => {
    const v = normalizeHex(hex);
    setColorList((prev) => {
      if (!v || !/^#([0-9a-f]{6})$/.test(v)) return prev;
      // 대소문자 무시 중복 체크
      const hasDup = prev.some((c) => normalizeHex(c) === v);
      return hasDup ? prev : [...prev, v].slice(0, 6);
    });
  };

  return (
    <div className={styles.multiInput}>
      <h3>색상 조화도 분석</h3>

      {colorList.map((color, index) => (
        <div key={index} className={styles.colorRow}>
          <input
            type="color"
            value={normalizeHex(color)}
            onChange={(e) => handleChange(index, e.target.value)}
            className={styles.colorPicker}
          />
          <span className={styles.colorCode}>{normalizeHex(color)}</span>

          <button
            type="button"
            onClick={() => removeColor(index)}
            className={styles.removeBtn}
          >
            삭제
          </button>
        </div>
      ))}

      <div className={styles.actions}>
        {colorList.length < 6 && (
          <>
            <button onClick={addColor} className={styles.addBtn} type="button">
              색상 추가
            </button>
            {/* 이미지에서 색상 추출해서 바로 리스트에 추가 */}
            <ImageUpload setBaseColor={handleBaseColorFromImage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ColorMultiInput;
