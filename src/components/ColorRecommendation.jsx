//선택된 색상 기반 추천 팔레트 출력, TheColorAPI, Colormind 사용

import React, { useEffect, useState } from "react";
import { fetchColorScheme, fetchColorName } from "../utils/api"; // 색상 이름 가져오는 함수 import
import ColorBox from "./ColorBox";
import StylingTip from "./StylingTip";
import styles from "./ColorRecommendation.module.css";
import { createPinterestURL } from "../utils/pinterest";

const ColorRecommendation = ({ baseColor, toneType }) => {
  const [recommendedColors, setRecommendedColors] = useState([]);
  const [colorName, setColorName] = useState(""); // 색상 이름 상태

  useEffect(() => {
    if (!baseColor || !toneType) return;

    fetchColorScheme(baseColor, toneType).then(setRecommendedColors);

    // 색상 이름도 동시에 가져오기
    fetchColorName(baseColor).then(setColorName);
  }, [baseColor, toneType]);

  const tipMap = {
    analogic: {
      title: "톤온톤 조합",
      description:
        "자연스럽고 편안한 느낌의 조합입니다. 그라데이션 효과나 은은한 스타일에 적합합니다.",
    },
    monochrome: {
      title: "톤인톤 조합",
      description:
        "세련되고 우아한 느낌의 조합입니다. 같은 색상의 다양한 톤으로 통일감을 줄 수 있습니다.",
    },
    complement: {
      title: "보색 조합",
      description:
        "강렬한 대비로 시선을 끄는 조합입니다. 하나는 메인, 다른 하나는 포인트로 활용해보세요.",
    },
  };

  const tip = tipMap[toneType] || { title: "추천 조합", description: "" };

  return (
    <section className={styles.recommendation}>
      <h3 className={styles.sectionTitle}>{tip.title}</h3>

      <div className={styles.colorRow}>
        {recommendedColors.map((color, i) => (
          <ColorBox key={i} color={color} />
        ))}
      </div>

      <StylingTip
    title={tip.title}
    description={tip.description}
    pinterestKeyword={createPinterestURL(colorName, tip.title)} //Pinterest 키워드 URL 생성
      />
    </section>
  );
};

export default ColorRecommendation;