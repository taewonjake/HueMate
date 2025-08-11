//HEX <->HSL 변환, 톤 계산, 색상명 매핑

export const analyzeHarmony = (colors) => {
  // 단순 색상 거리 기반 조화도 계산 예시
  const score = calculateHarmonyScore(colors);
  const message =
    score > 80
      ? "아주 잘 어울리는 조합입니다!"
      : score > 50
      ? "무난한 조합이에요."
      : "색상 간의 대비가 크니 주의해서 활용해보세요.";

  return {
    score,
    message,
    tips: "톤을 맞추거나 중간색을 추가해보세요.",
  };
};

const calculateHarmonyScore = (colors) => {
  // HEX -> RGB -> 유클리드 거리 등으로 점수 계산하는 로직
  // 여기서는 일단 임시 점수 반환
  return Math.floor(Math.random() * 100);
};