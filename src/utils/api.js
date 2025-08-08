//외부 색상 추천 API와 연결하는 함수 모음

//TheColorApI에서 색상 조합을 가져옴
export async function fetchColorScheme(hex, mode = "analogic") {
  const url = `https://www.thecolorapi.com/scheme?hex=${hex.replace("#", "")}&mode=${mode}&count=5`;
  const response = await fetch(url);
  const data = await response.json();
  return data.colors.map((c) => c.hex.value);
}

//색상을 받아 이름으로 바꾸기
// src/utils/api.js
export async function fetchColorName(hex) {
  const cleanHex = hex.replace("#", "");
  try {
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${cleanHex}`);
    const data = await res.json();
    return data.name.value; // 예: "Beaver"
  } catch (err) {
    console.error("색상 이름 가져오기 실패:", err);
    return hex; // 실패 시 fallback
  }
}
