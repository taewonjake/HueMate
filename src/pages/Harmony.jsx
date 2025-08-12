import { Link } from "react-router-dom";
import { useState } from "react";
import page from "./Page.module.css";
import ColorMultiInput from "../components/ColorMultiInput";
import HarmonyChecker from "../components/HarmonyChecker";

const newId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

export default function Harmony() {
  // [{id, hex}] 형태로 보관
  const [items, setItems] = useState([
    { id: newId(), hex: "#6366f1" },
    { id: newId(), hex: "#ec4899" },
  ]);
  const [analyzeTick, setAnalyzeTick] = useState(0); // 분석 트리거

  const handleAnalyze = () => setAnalyzeTick((v) => v + 1);

  // HarmonyChecker에는 hex만 전달
  const colorsForAnalyze = items.map((it) => it.hex).filter(Boolean);

  return (
    <main className={`${page.page} ${page.gradient}`}>
      <div className={page.topbar}>
        <Link to="/" className={page.back}>←</Link>
        <div className={page.titleRow}>
          <div className={page.titleIcon} style={{ background: "#e0f2fe" }}>📊</div>
          <h2>조화도 분석</h2>
        </div>
      </div>

      {/* 입력 카드 */}
      <section className={page.card}>
        <ColorMultiInput
          colorList={items}
          setColorList={setItems}
          onAnalyze={handleAnalyze}
        />
      </section>

      {/* 결과 카드 */}
      <section className={page.card}>
        <HarmonyChecker colors={colorsForAnalyze} trigger={analyzeTick} />
      </section>
    </main>
  );
}
