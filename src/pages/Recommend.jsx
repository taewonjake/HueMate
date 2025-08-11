import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import page from "./Page.module.css";

import ImageUpload from "../components/ImageUpload";
import ColorRecommendation from "../components/ColorRecommendation";
import ColorInput from "../components/ColorInput";
import ToneSelector from "../components/ToneSelector";

export default function Recommend() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [toneType, setToneType] = useState("analogic");
  const [refreshKey, setRefreshKey] = useState(0); // 0이면 아직 생성 안 함

  // 수동 생성
  const handleGenerate = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // 색상 입력/피커에서 변경: 값이 달라질 때만 반영 + 결과 초기화
  const handleBaseColorChange = useCallback(
    (v) => {
      if (!v) return;
      if (v.toLowerCase() === (baseColor || "").toLowerCase()) return; // 변화 없음
      setBaseColor(v);
      setRefreshKey(0); // 다시 버튼 누르게
    },
    [baseColor]
  );

  // 이미지 업로드에서 변경: 값이 달라질 때만 반영 + 자동 생성
  const handleBaseColorFromImage = useCallback(
    (v) => {
      if (!v) return;
      if (v.toLowerCase() === (baseColor || "").toLowerCase()) return; // 변화 없음
      setBaseColor(v);
      setRefreshKey((k) => k + 1); // 자동 생성
    },
    [baseColor]
  );

  // 톤 변경: 값이 달라질 때만 반영 + 자동 재생성
  const handleToneChange = useCallback(
    (v) => {
      if (!v || v === toneType) return; // 변화 없음이면 무시 (무한 루프 방지)
      setToneType(v);
      setRefreshKey((k) => k + 1);
    },
    [toneType]
  );

  return (
    <main className={page.page}>
      <div className={page.topbar}>
        <Link to="/" className={page.back}>←</Link>
        <div className={page.titleRow}>
          <div className={page.titleIcon} style={{ background: "#ede9fe" }}>🎨</div>
          <h2>색상 추천</h2>
        </div>
      </div>

      <section className={page.card}>
        <h3>색상을 선택하세요</h3>
        <div style={{ display: "grid", gap: 12, placeItems: "center", marginTop: 12 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              boxShadow: "0 10px 30px rgba(0,0,0,.12)",
              background: baseColor,
            }}
          />

          {/* 색 바꾸면 결과 초기화 */}
          <ColorInput baseColor={baseColor} setBaseColor={handleBaseColorChange} />

          {/* 탭 바꾸면 자동 재추천 (값이 같으면 아무 것도 안 함) */}
          <ToneSelector toneType={toneType} setToneType={handleToneChange} />

          <div className={page.btnRow}>
            {/* 이미지로 색 바꾸면 자동 생성 (값이 같으면 무시) */}
            <ImageUpload showName={false} setBaseColor={handleBaseColorFromImage} />
            <button className={`${page.btn} ${page.btnPrimary}`} onClick={handleGenerate}>
              추천 색상 생성
            </button>
          </div>
        </div>
      </section>

      <section className={page.card}>
        <h3>추천 색상</h3>
        <ColorRecommendation
          baseColor={baseColor}
          toneType={toneType}
          refreshKey={refreshKey}
        />
      </section>
    </main>
  );
}
