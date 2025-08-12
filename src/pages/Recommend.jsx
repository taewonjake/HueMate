import { useState } from "react";
import { Link } from "react-router-dom";
import page from "./Page.module.css";

import ToneSelector from "../components/ToneSelector";
import ImageUpload from "../components/ImageUpload";
import ColorRecommendation from "../components/ColorRecommendation";
import BaseColorPicker from "../components/BaseColorPicker";

export default function Recommend() {
  const [baseColor, setBaseColor] = useState("#6366f1");     // 기본값
  const [toneType, setToneType] = useState("toneOnTone");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGenerate = () => setRefreshKey(k => k + 1);

  return (
    <div className={page.page}>
      {/* 상단 */}
      <div className={page.topbar}>
        <Link to="/" className={page.back} aria-label="뒤로가기">←</Link>
        <div className={page.titleRow}>
          <div className={page.titleIcon} style={{ background: "#F1E7FF", color: "#7C3AED" }}>🎨</div>
          <span>색상 추천</span>
        </div>
      </div>

      {/* 선택 섹션 */}
      <section className={page.card}>
        {/* 1) 큰 원 컬러 피커 - 이것만 남깁니다 */}
        <BaseColorPicker color={baseColor} onChange={setBaseColor} />

        {/* 2) 톤 선택 */}
        <ToneSelector toneType={toneType} setToneType={setToneType} />

        {/* 3) 버튼들 */}
        <div className={page.btnRow}>
          {/* 이미지로 색 추가: 결과 텍스트/이름은 숨김 → UI 중복 제거 */}
          <ImageUpload setBaseColor={setBaseColor} showName={false} />

          {/* 추천 색상 생성 (그라데이션 버튼) */}
          <button
            type="button"
            onClick={handleGenerate}
            className={`${page.btn} ${page.btnGradientPurple}`}
          >
            추천 색상 생성
          </button>
        </div>
      </section>

      {/* 결과 섹션 */}
      <section className={page.card}>
        <ColorRecommendation
          baseColor={baseColor}
          toneType={toneType}
          refreshKey={refreshKey}
        />
      </section>
    </div>
  );
}
