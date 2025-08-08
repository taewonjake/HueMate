//사용자가 옷 이미지 업로드, Color Thief로 대표 색 추출 → 상위에 전달

import React, { useRef, useState, useEffect } from "react";
import useDominantColor from "../hooks/useDominantColor";
import styles from "./ImageUpload.module.css";
import { fetchColorName } from "../utils/api"; // 색상 이름 가져오는 함수

const ImageUpload = ({ setBaseColor }) => {
  const imgRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [colorName, setColorName] = useState("");
  const dominantColor = useDominantColor(imgRef, previewURL);

  useEffect(() => {
    if (dominantColor) {
      setBaseColor(dominantColor);
      // 색상 이름도 비동기적으로 받아오기
      async function getColorName() {
        const name = await fetchColorName(dominantColor);
        setColorName(name);
      }
      getColorName();
    }
  }, [dominantColor, setBaseColor]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewURL(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.uploadSection}>
      <label htmlFor="imageUpload" className={styles.label}>
        이미지에서 색상 추출
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="imageUpload"
        onChange={handleFileChange}
      />
      {previewURL && (
        <div className={styles.previewContainer}>
          <img
            ref={imgRef}
            src={previewURL}
            alt="업로드 미리보기"
            className={styles.previewImage}
            crossOrigin="anonymous"
          />
          <p className={styles.detectedColor}>
            추출된 색상: <span>{dominantColor}</span>
            {colorName && <span style={{ marginLeft: "0.5rem" }}>({colorName})</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;