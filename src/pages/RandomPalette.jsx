import { Link } from "react-router-dom";
import page from "./Page.module.css";
import RandomPalettes from "../components/RandomPalettes";

export default function RandomPalette() {
  return (
    <main className={page.page}>
      <div className={page.topbar}>
        <Link to="/" className={page.back}>←</Link>
        <div className={page.titleRow}>
          <div className={page.titleIcon} style={{background:"#dcfce7"}}>🔀</div>
          <h2>랜덤 팔레트</h2>
        </div>
      </div>

      <section className={page.card}>
        <RandomPalettes />
      </section>
    </main>
  );
}
