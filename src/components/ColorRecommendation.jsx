import React, { useEffect, useState } from "react";
import { fetchColorScheme, fetchColorName } from "../utils/api";
import ColorBox from "./ColorBox";
import StylingTip from "./StylingTip";
import styles from "./ColorRecommendation.module.css";
import { createPinterestURL } from "../utils/pinterest";

const ColorRecommendation = ({ baseColor, toneType, refreshKey }) => {
  const [recommendedColors, setRecommendedColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [lastMode, setLastMode] = useState(null);

  useEffect(() => { /*baseColor가 바뀌면 기존 추천 색과 이름을 모두 지움. 이렇게 해야 이전 색 추천이 잠깐이라도 남아있지 않음.*/
    setRecommendedColors([]);
    setColorName("");
    setLastMode(null);
  }, [baseColor]);

  useEffect(() => { //api 호출
    if (!baseColor || !toneType) return;
    if (!refreshKey) return;

    let ignore = false;
    const timer = setTimeout(async () => {
      try {
        const colors = await fetchColorScheme(baseColor, toneType);
        const name = await fetchColorName(baseColor);
        if (!ignore) {
          setRecommendedColors(colors);
          setColorName(name);
          setLastMode(toneType);
        }
      } catch (e) {
        if (!ignore) console.error(e);
      }
    }, 200); // 디바운스 200ms

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [baseColor, toneType, refreshKey]);

  const tipMap = {
    analogic: {
      title: "톤온톤 조합",
      description: "자연스럽고 편안한 느낌의 조합입니다. 그라데이션 효과나 은은한 스타일에 적합합니다.",
    },
    monochrome: {
      title: "톤인톤 조합",
      description: "세련되고 우아한 느낌의 조합입니다. 같은 색상의 다양한 톤으로 통일감을 줄 수 있습니다.",
    },
    complement: {
      title: "보색 조합",
      description: "강렬한 대비로 시선을 끄는 조합입니다. 하나는 메인, 다른 하나는 포인트로 활용해보세요.",
    },
  };

  if (!refreshKey || recommendedColors.length === 0) return null;

  const activeTip = tipMap[lastMode ?? toneType] || {
    title: "추천 조합",
    description: "",
  };

  return (
    <section className={styles.recommendation}>
      <h3 className={styles.sectionTitle}>{activeTip.title}</h3>

      <div className={styles.colorRow}>
        {recommendedColors.map((color, i) => (
          <ColorBox key={i} color={color} />
        ))}
      </div>

      <StylingTip
        title={activeTip.title}
        description={activeTip.description}
        pinterestKeyword={createPinterestURL(colorName, activeTip.title)}
      />
    </section>
  );
};

export default ColorRecommendation;
