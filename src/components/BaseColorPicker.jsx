//색상 추천 메뉴에서 색상 선택
import { useRef } from "react";
import styles from "./BaseColorPicker.module.css";

export default function BaseColorPicker({ color, onChange }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value?.toLowerCase();
    onChange?.(v);
  };

  return (
    <div className={styles.wrap}>
      <h4 className={styles.label}>색상을 선택하세요</h4>

      {/* 큰 원: 클릭하면 컬러 인풋 오픈 */}
      <button
        type="button"
        className={styles.circle}
        style={{ background: color }}
        onClick={() => inputRef.current?.click()}
        aria-label="색상 선택 열기"
      />

      {/* 숨겨진 컬러 인풋 */}
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={handleChange}
        className={styles.hiddenInput}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* HEX pill */}
      <div className={styles.hexPill}>{color}</div>
    </div>
  );
}
