// src/components/ImageUpload.jsx
import React, { useRef, useState, useEffect } from "react";
import useDominantColor from "../hooks/useDominantColor";
import styles from "./ImageUpload.module.css";
import { fetchColorName } from "../utils/api";

const ImageUpload = ({ setBaseColor, showName = true }) => {
  const imgRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [colorName, setColorName] = useState("");
  const dominantColor = useDominantColor(imgRef, previewURL);

  useEffect(() => {
    if (!dominantColor) return;

    // 색상 반영
    setBaseColor(dominantColor);

    // 선택적으로 이름 가져오기
    if (!showName) return;

    let ignore = false;
    (async () => {
      try {
        const name = await fetchColorName(dominantColor);
        if (!ignore) setColorName(name || "");
      } catch (err) {
        if (!ignore) setColorName("");
      }
    })();

    return () => { ignore = true; };
  }, [dominantColor, setBaseColor, showName]);

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
          {showName && dominantColor && (
            <p className={styles.detectedColor}>
              추출된 색상: <span>{dominantColor}</span>
              {colorName && (
                <span style={{ marginLeft: "0.5rem" }}>({colorName})</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
