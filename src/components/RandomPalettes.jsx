//인기 팔레트 카드 렌더링

import React, { useEffect, useState } from "react";
import styles from "./RandomPalettes.module.css";

const MODES = ["analogic", "monochrome", "complement", "triad", "quad"];

const getRandomHex = () => {
  return Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
};

const RandomPalettes = () => {
  const [palettes, setPalettes] = useState([]);

  const fetchRandomPalettes = async () => {
    const promises = MODES.map(async (mode) => {
      const randomHex = getRandomHex();
      const res = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${randomHex}&mode=${mode}&count=5`
      );
      const data = await res.json();
      return {
        mode,
        colors: data.colors,
      };
    });

    const results = await Promise.all(promises);
    setPalettes(results);
  };

  useEffect(() => {
    fetchRandomPalettes();
  }, []);

  return (
    <section className={styles.randomPalettes}>
      <h3>랜덤 색상 조합</h3>
      <button onClick={fetchRandomPalettes} className={styles.refreshBtn}>
        다른 색상 조합 보기
      </button>

      <div className={styles.grid}>
        {palettes.map((palette, idx) => (
          <div key={idx} className={styles.paletteCard}>
            <h4>{palette.mode.toUpperCase()} 조합</h4>
            <div className={styles.colorRow}>
              {palette.colors.map((c, i) => (
                <div
                  key={i}
                  className={styles.colorBox}
                  style={{ backgroundColor: c.hex.value }}
                  title={c.name.value}
                >
                  <span className={styles.colorHex}>{c.hex.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RandomPalettes;
