import { Link } from "react-router-dom";
import { useState } from "react";
import page from "./Page.module.css";
import ColorMultiInput from "../components/ColorMultiInput";
import HarmonyChecker from "../components/HarmonyChecker";

export default function Harmony() {
  const [colors, setColors] = useState(["#6366f1", "#ec4899"]);
  return (
    <main className={page.page}>
      <div className={page.topbar}>
        <Link to="/" className={page.back}>←</Link>
        <div className={page.titleRow}>
          <div className={page.titleIcon} style={{background:"#e0f2fe"}}>📊</div>
          <h2>조화도 분석</h2>
        </div>
      </div>

      <section className={page.card}>
        <h3>분석할 색상들을 선택하세요</h3>
        <ColorMultiInput colorList={colors} setColorList={setColors} />
        <div className={page.btnRow} style={{marginTop:12}}>
          {/* HarmonyChecker 내부에서 버튼을 갖고 있으면 아래 버튼은 생략 */}
        </div>
      </section>

      <section className={page.card}>
        <HarmonyChecker colors={colors} />
      </section>
    </main>
  );
}
