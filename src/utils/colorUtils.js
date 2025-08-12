// 색 조합 조화성 평가 유틸
// - 입력: HEX 문자열 배열 ['#RRGGBB', ...] (최소 2개)
// - 출력: { score: 0..100, message: string, tips: string, bestRelation?: string }

export const analyzeHarmony = (colors) => {
  const clean = (colors || []).filter(Boolean).map(normalizeHex).filter(Boolean);
  if (clean.length < 2) {
    return { score: 0, message: "두 가지 이상의 색을 선택하세요.", tips: "" };
  }

  const pairs = pairwise(clean.map(hexToHSL));
  const pairScores = pairs.map(([a, b]) => scorePair(a, b));
  const raw = average(pairScores);
  const score = clamp(Math.round(raw), 0, 100);

  const message =
    score >= 85
      ? "아주 잘 어울리는 조합입니다!"
      : score >= 60
      ? "무난한 조합이에요."
      : "색상 간의 대비가 크니 주의해서 활용해보세요.";

  const best = bestRelationForPairs(pairs);

  return {
    score,
    message,
    tips: makeTip(best),
    bestRelation: best?.name
  };
};

/* ---------------- core scoring ---------------- */

function scorePair(a, b) {
  const dH = hueDistance(a.h, b.h);      // 0..180
  const dS = Math.abs(a.s - b.s);        // 0..1
  const dL = Math.abs(a.l - b.l);        // 0..1

  // 대표 조화 각도(°)에 가까울수록 가산
  const relations = [
    { name: "보색", angle: 180, w: 1.0 },
    { name: "삼색", angle: 120, w: 0.9 },
    { name: "분할보색", angle: 60, w: 0.85 },
    { name: "유사", angle: 30, w: 0.8 },
    { name: "단색", angle: 0, w: 0.6 },
  ];

  // 가우시안 형태의 근접도
  const sigma = 18; // 허용폭(°)
  const closeness = (d, mu) => Math.exp(-Math.pow(d - mu, 2) / (2 * sigma * sigma));

  let maxHueScore = 0;
  for (const r of relations) {
    const s = r.w * closeness(dH, r.angle);
    if (s > maxHueScore) maxHueScore = s;
  }

  // 채도/명도 균형 패널티 (차이가 클수록 감점)
  const satPenalty = Math.max(0, 1 - 0.6 * dS); // α=0.6
  const lightPenalty = Math.max(0, 1 - 0.8 * dL); // β=0.8

  const pairScore = 100 * maxHueScore * satPenalty * lightPenalty;
  return pairScore;
}

function bestRelationForPairs(pairs) {
  const agg = {};
  for (const [a,b] of pairs) {
    const dH = hueDistance(a.h, b.h);
    const relations = [
      { name: "보색", angle: 180, w: 1.0 },
      { name: "삼색", angle: 120, w: 0.9 },
      { name: "분할보색", angle: 60, w: 0.85 },
      { name: "유사", angle: 30, w: 0.8 },
      { name: "단색", angle: 0, w: 0.6 },
    ];
    const sigma = 18;
    const closeness = (d, mu) => Math.exp(-Math.pow(d - mu, 2) / (2 * sigma * sigma));
    let best = null; let bestVal = -1;
    for (const r of relations) {
      const val = r.w * closeness(dH, r.angle);
      if (val > bestVal){ bestVal = val; best = r; }
    }
    agg[best.name] = (agg[best.name] || 0) + bestVal;
  }
  const bestName = Object.entries(agg).sort((a,b)=>b[1]-a[1])[0]?.[0];
  if(!bestName) return null;
  return { name: bestName };
}

/* ---------------- helpers ---------------- */

function average(arr){ return arr.reduce((a,b)=>a+b,0) / arr.length; }
function clamp(v, min, max){ return Math.min(max, Math.max(min, v)); }

function pairwise(arr){
  const out = [];
  for (let i=0;i<arr.length;i++){
    for (let j=i+1;j<arr.length;j++){
      out.push([arr[i], arr[j]]);
    }
  }
  return out;
}

function normalizeHex(hex){
  if (typeof hex !== "string") return null;
  let s = hex.trim();
  if (!s) return null;
  if (s[0] !== "#") s = "#" + s;
  if (s.length === 4) { // #RGB -> #RRGGBB
    s = "#" + s.slice(1).split("").map(ch => ch+ch).join("");
  }
  if (/^#([0-9a-f]{6})$/i.test(s)) return s.toLowerCase();
  return null;
}

function hexToHSL(hex){
  const r = parseInt(hex.substr(1,2), 16) / 255;
  const g = parseInt(hex.substr(3,2), 16) / 255;
  const b = parseInt(hex.substr(5,2), 16) / 255;

  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = 0; s = 0; // 무채색
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h = h * 60; // 0..360
  }

  return { h, s, l };
}

function hueDistance(h1, h2){
  const diff = Math.abs(h1 - h2) % 360;
  return diff > 180 ? 360 - diff : diff; // 0..180
}

function makeTip(best){
  switch(best?.name){
    case "보색":
      return "보색 관계는 대비가 강하니 채도/명도를 약간 낮추거나 한쪽을 중간톤으로 맞추면 좋아요.";
    case "삼색":
      return "삼색 조합은 균형이 핵심! 한 색을 주색으로 정하고 나머지는 보조로 사용해 보세요.";
    case "분할보색":
      return "분할보색은 안정적인 대비를 줍니다. 주색 1 + 보조색 2 비율을 추천해요.";
    case "유사":
      return "유사색은 부드럽지만 단조로울 수 있어요. 명도 차이를 조금 줘서 레이어를 만들면 좋아요.";
    case "단색":
      return "단색 조합은 톤 변주가 관건입니다. 같은 색상에서 명도/채도만 다르게 써보세요.";
    default:
      return "톤을 맞추거나 중간색을 추가해보세요.";
  }
}
