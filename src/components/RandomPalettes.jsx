// 랜덤 팔레트 UI — API 기반 (TheColorAPI) + 모드명 제목
import React, { useEffect, useState } from "react";
import styles from "./RandomPalettes.module.css";

const MODES = ["analogic", "monochrome", "complement", "triad", "quad"];
const rand = (n) => Math.floor(Math.random() * n);
const randHex = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;

// TheColorAPI로 팔레트 생성
async function fetchScheme(baseHex, mode) {
  const hex = (baseHex || "").replace(/^#/, "");
  const url = `https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(
    hex
  )}&mode=${encodeURIComponent(mode)}&count=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch scheme");
  const data = await res.json();
  const colors = (data.colors || [])
    .map((c) => (c.hex && c.hex.value ? c.hex.value.toLowerCase() : null))
    .filter(Boolean);
  return colors;
}

function makeEmptyCard(mode) {
  return { mode, title: `${mode.toUpperCase()} 조합`, colors: [] };
}

export default function RandomPalettes() {
  const [cards, setCards] = useState(() =>
    MODES.slice(0, 7).map((m) => makeEmptyCard(m))
  );
  const [busy, setBusy] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const load = async () => {
    if (busy) return;
    setBusy(true);

    // 7개 카드: 모드 랜덤 + 기준색 랜덤
    const targets = Array.from({ length: 7 }, () => ({
      mode: MODES[rand(MODES.length)],
      base: randHex(),
    }));

    setCards(targets.map((t) => makeEmptyCard(t.mode)));

    try {
      const results = await Promise.all(
        targets.map(async (t) => {
          try {
            const colors = await fetchScheme(t.base, t.mode);
            return { ...t, colors };
          } catch {
            // 실패 시 폴백: 임의 색 5개
            const colors = Array.from({ length: 5 }, () => randHex());
            return { ...t, colors };
          }
        })
      );
      setCards(
        results.map((r) => ({
          mode: r.mode,
          title: `${r.mode.toUpperCase()} 조합`,
          colors: r.colors,
        }))
      );
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const handleCopyColor = async (hex) => {
    await copyText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 800);
  };

  const handleCopyPalette = async (idx) => {
    const colors = cards[idx]?.colors || [];
    await copyText(colors.join(", "));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 900);
  };

  return (
    <section className={styles.wrap}>
      {/* 상단 설명 + 새로고침 */}
      <div className={styles.topRow}>
        <p className={styles.desc}>
          아름다운 색상 조합을 발견해보세요. 색상을 클릭하면 코드가 복사됩니다.
        </p>
        <button
          className={styles.refreshBtn}
          onClick={load}
          aria-label="새로고침"
          disabled={busy}
        >
          <span className={styles.btnIcon}>🔄</span> 새로고침
        </button>
      </div>

      {/* 팔레트 목록 */}
      <div className={styles.list}>
        {cards.map((p, i) => (
          <article key={i} className={styles.card}>
            <header className={styles.cardHead}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <button
                className={styles.copyPaletteBtn}
                onClick={() => handleCopyPalette(i)}
                aria-label="팔레트 복사"
              >
                <span className={styles.btnIcon}>📋</span> 팔레트 복사
              </button>
              {copiedIdx === i && <span className={styles.toast}>복사됨!</span>}
            </header>

            <div className={styles.colorRow}>
              {(p.colors.length ? p.colors : Array.from({ length: 5 })).map(
                (hex, ci) => (
                  <button
                    key={(hex || "skeleton") + ci}
                    className={styles.colorTile}
                    style={{ backgroundColor: hex || "#e5e7eb" }}
                    onClick={() => hex && handleCopyColor(hex)}
                    aria-label={hex ? `${hex} 복사` : "로딩 중..."}
                  >
                    {hex && (
                      <span
                        className={`${styles.hex} ${
                          copiedHex === hex ? styles.show : ""
                        }`}
                      >
                        {hex}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
