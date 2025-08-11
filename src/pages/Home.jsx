import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.logo}><span className={styles.dot}>●</span> HueMate</div>
        <p className={styles.subtitle}>색상의 마법을 경험해보세요. 완벽한 컬러 조합을 찾아드립니다.</p>
      </header>

      <section className={styles.grid}>
        <Link to="/recommend" className={`${styles.card} ${styles.gradPurple}`}>
          <div className={styles.icon}>🎨</div>
          <h3>색상 추천</h3>
          <p>선택한 색상에 어울리는 컬러들을 추천받아보세요</p>
          <span className={styles.link}>시작하기 →</span>
        </Link>

        <Link to="/harmony" className={`${styles.card} ${styles.gradBlue}`}>
          <div className={styles.icon}>📊</div>
          <h3>조화도 분석</h3>
          <p>여러 색상의 조화도를 분석하고 평가받아보세요</p>
          <span className={styles.link}>시작하기 →</span>
        </Link>

        <Link to="/random" className={`${styles.card} ${styles.gradGreen}`}>
          <div className={styles.icon}>🔀</div>
          <h3>랜덤 팔레트</h3>
          <p>무작위로 생성된 아름다운 색상 조합을 확인해보세요</p>
          <span className={styles.link}>시작하기 →</span>
        </Link>
      </section>

      <footer className={styles.footer}>© 2025 HueMate. 당신의 색상 도우미</footer>
    </main>
  );
}
