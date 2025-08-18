//색상 조화도 평가에서 색상 입력
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import styles from "./ColorMultiInput.module.css";

const newId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const norm = (h) =>
  typeof h === "string" ? h.trim().toLowerCase().replace(/\s+/g, "") : h;

//{id, hex} 리스트를 받아 UI/조작을 담당
const ColorMultiInput = ({ colorList, setColorList, onAnalyze }) => {
  const [resetSignal, setResetSignal] = useState(0); // ImageUpload 프리뷰 초기화 트리거

  const handleChange = (id, value) => {
    const v = norm(value);
    setColorList((prev) => prev.map((it) => (it.id === id ? { ...it, hex: v } : it)));
    // 타이핑 중에는 프리뷰 유지
  };

  // 버튼으로 색상 추가: 프리뷰 지움
  const addColor = () => {
    setColorList((prev) => [...prev, { id: newId(), hex: "#cccccc" }]);
    setResetSignal((n) => n + 1);
  };

  // id로 안전 삭제: 프리뷰 지움
  const removeById = (id) => {
    setColorList((prev) => prev.filter((it) => it.id !== id));
    setResetSignal((n) => n + 1);
  };

  // 이미지에서 추출된 색 추가: 중복(hex) 방지, 프리뷰는 유지
  const handleBaseColorFromImage = (hex) => {
    const v = norm(hex);
    if (!v) return;
    setColorList((prev) => {
      const exists = prev.some((it) => norm(it.hex) === v);
      return exists ? prev : [...prev, { id: newId(), hex: v }];
    });
    // 프리뷰는 유지. 이후 사용자가 추가/삭제 시 프리뷰 제거.
  };

  const filledCount =
    Array.isArray(colorList) ? colorList.filter((it) => it.hex && it.hex.trim() !== "").length : 0;
  const canAnalyze = filledCount >= 2;

  return (
    <div className={styles.multiInput}>
      <h3 className={styles.head}>분석할 색상들을 선택하세요</h3>

      {colorList.map((it) => (
        <div className={styles.colorRow} key={it.id}>
          <div className={styles.swatch} style={{ background: it.hex || "#eee" }} />
          <input
            className={styles.hexInput}
            value={it.hex || ""}
            placeholder="#6366f1"
            onChange={(e) => handleChange(it.id, e.target.value)}
          />
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeById(it.id)}
            aria-label="색상 제거"
            title="색상 제거"
          >
            ✕
          </button>
        </div>
      ))}

      <div className={styles.btnRow}>
        <ImageUpload
          setBaseColor={handleBaseColorFromImage}
          showName={false}
          resetSignal={resetSignal}
        />
        <button type="button" className={styles.addBtn} onClick={addColor}>
          색상 추가
        </button>
        <button
          type="button"
          className={styles.analyzeButton}
          disabled={!canAnalyze}
          onClick={() => onAnalyze && onAnalyze()}
          title={canAnalyze ? "조화도 분석" : "색상을 두 가지 이상 입력하세요"}
        >
          조화도 분석
        </button>
      </div>
    </div>
  );
};

export default ColorMultiInput;
