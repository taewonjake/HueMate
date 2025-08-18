import React, { useRef, useState, useEffect, useId } from "react";
import useDominantColor from "../hooks/useDominantColor";
import styles from "./ImageUpload.module.css";
import { fetchColorName } from "../utils/api";

/**
 * Props:
 * - setBaseColor(hex)
 * - showName: boolean
 * - resetSignal: number  ← 값이 바뀌면 프리뷰/상태 초기화
 */
const ImageUpload = ({ setBaseColor, showName = true, resetSignal = 0 }) => {
  const inputId = useId();
  const imgRef = useRef(null);

  const [previewURL, setPreviewURL] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false); //새로 추가
  const [colorName, setColorName] = useState("");

  const dominantColor = useDominantColor(imgRef, previewURL);

  // 해당 파일에 대해 setBaseColor를 이미 보냈는지 기록
  const pushedRef = useRef({ url: null, hex: null });

  // 외부 리셋: 프리뷰/상태 초기화
  useEffect(() => {
    setPreviewURL(null);
    setImageLoaded(false);            //이미지 로드 상태 초기화
    setColorName("");
    pushedRef.current = { url: null, hex: null };
  }, [resetSignal]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      pushedRef.current = { url: null, hex: null }; //새 파일이므로 초기화
      setImageLoaded(false);                        //새 이미지 로드 대기
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // dominantColor 반영: "현재 이미지가 로드된 뒤"에만 동작하도록 가드
  useEffect(() => {
    if (!previewURL || !dominantColor || !imageLoaded) return; //가드 추가
      //파일 있음      //추출됨          //이미지 로드 완료->이 세가지 모두 만족해야함
    const alreadyPushed =
      pushedRef.current.url === previewURL &&
      (pushedRef.current.hex || "").toLowerCase() === dominantColor.toLowerCase();

    if (!alreadyPushed) {
      setBaseColor(dominantColor);
      pushedRef.current = { url: previewURL, hex: dominantColor };

      if (showName) {
        fetchColorName(dominantColor).then((name) => setColorName(name || ""));
      }
    }
  }, [previewURL, dominantColor, imageLoaded, setBaseColor, showName]); //imageLoaded 의존

  return (
    <div className={styles.uploadSection}>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className={styles.inputFile}
        onChange={handleFileChange}
      />
      <label htmlFor={inputId} className={styles.uploadButton}>
        <span className={styles.icon} aria-hidden>📷</span>
        이미지로 색 추가
      </label>

      {previewURL && (
        <div className={styles.previewContainer}>
          <img
            ref={imgRef}
            src={previewURL}
            alt="업로드 이미지"
            className={styles.previewImage}
            crossOrigin="anonymous"
            onLoad={() => setImageLoaded(true)}   //현재 이미지가 로드되었음을 표시
          />
          {dominantColor && imageLoaded && (        //로드 후에만 정보 표시
            <div className={styles.detectedColor}>
              <strong>HEX:</strong> {dominantColor}
              {showName && colorName && <> · <strong>name:</strong> {colorName}</>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
