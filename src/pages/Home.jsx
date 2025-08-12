import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>🎯</span>
          <span className={styles.name}>HueMate</span>
        </div>
        <p className={styles.slogan}>
          색상의 마법을 경험해보세요. 완벽한 컬러 조합을 찾아드립니다.
        </p>
      </header>

      <section className={styles.grid} aria-label="주요 기능">
        {/* 색상 추천 */}
        <Link
          to="/recommend"
          className={styles.card}
          aria-label="색상 추천으로 이동"
        >
          <div className={`${styles.cover} ${styles.purple}`}>
            <div className={styles.icon}>🧪</div>
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>색상 추천</h3>
            <p className={styles.desc}>선택한 색상에 어울리는 컬러들을 추천받아보세요</p>
            <span className={styles.cta}>시작하기 →</span>
          </div>
        </Link>

        {/* 조화도 분석 */}
        <Link
          to="/harmony"
          className={styles.card}
          aria-label="조화도 분석으로 이동"
        >
          <div className={`${styles.cover} ${styles.blue}`}>
            <div className={styles.icon}>📊</div>
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>조화도 분석</h3>
            <p className={styles.desc}>여러 색상의 조화도를 분석하고 평가받아보세요</p>
            <span className={styles.cta}>분석하기 →</span>
          </div>
        </Link>

        {/* 랜덤 팔레트 */}
        <Link
          to="/random"
          className={styles.card}
          aria-label="랜덤 팔레트로 이동"
        >
          <div className={`${styles.cover} ${styles.green}`}>
            <div className={styles.icon}>✖️</div>
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>랜덤 팔레트</h3>
            <p className={styles.desc}>무작위로 생성된 아름다운 색상 조합을 확인해보세요</p>
            <span className={styles.cta}>살펴보기 →</span>
          </div>
        </Link>
      </section>

      <footer className={styles.footer}>
        © 2024 HueMate. 당신의 색상 도우미
      </footer>
    </main>
  );
}
