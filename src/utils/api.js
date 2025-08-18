const MODE_MAP = {//tomeselector 컴포넌트와 파라미터 연결
  analogic: "analogic",
  monochrome: "monochrome",
  complement: "complement",
};

const normalizeHex = (hex) =>//입력된 색상 값 # 제거, 소문자로 변환, 안전하게 처리하기 위함
  (hex || "").toString().trim().replace(/^#/, "").toLowerCase(); 

export async function fetchColorScheme(baseHex, toneType) {//색상 조합 api 호출
  const hex = normalizeHex(baseHex);
  const mode = MODE_MAP[toneType] || "analogic";

  const url = `https://www.thecolorapi.com/scheme?hex=${encodeURIComponent(
    hex
  )}&mode=${encodeURIComponent(mode)}&count=6`;

  try {
    const res = await fetch(url, { mode: "cors", cache: "no-store" });//api 응답에서 배열 꺼내고 hex코드만 추출
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const colors =
      data?.colors?.map((c) => c?.hex?.value?.toLowerCase()).filter(Boolean) ||
      [];

    // API가 비어 있으면 폴백, 직접 만든 fallbackScheme 함수로 대체 팔레트 생성
    return colors.length ? colors : fallbackScheme(hex, mode);
  } catch (err) {
    console.error("fetchColorScheme failed:", err);
    return fallbackScheme(hex, mode); // 네트워크, CORS 실패 시에도 동작
  }
}

export async function fetchColorName(baseHex) {//색상 이름 api 호출
  const hex = normalizeHex(baseHex);
  const url = `https://www.thecolorapi.com/id?hex=${encodeURIComponent(hex)}`;

  try {
    const res = await fetch(url, { mode: "cors", cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.name?.value || "";
  } catch (err) {
    console.error("fetchColorName failed:", err);
    return ""; // 이름은 실패해도 필수 아님, 실패 시 빈문자열 반환
  }
}

/*간단 폴백 팔레트: HSL에서 모드별로 근처 색을 생성*/
function fallbackScheme(hex, mode) {
  const [h, s, l] = hexToHsl(hex || "666666");
  const n = 6;
  const arr = [];

  if (mode === "monochrome") {//톤인톤
    for (let i = 0; i < n; i++) {
      const li = clamp(l + (i - 2) * 8, 8, 92);
      arr.push(hslToHex(h, s, li));
    }
  } else if (mode === "complement") {//보색
    const h2 = (h + 180) % 360;
    for (let i = 0; i < n; i++) {
      const hh = i % 2 === 0 ? h : h2;
      const si = clamp(s + (i - 2) * 6, 18, 88);
      const li = clamp(l + (i - 2) * 6, 20, 85);
      arr.push(hslToHex(hh, si, li));
    }
  } else {
    // analogic (기본)
    for (let i = 0; i < n; i++) {
      const hh = (h + (i - 2) * 20 + 360) % 360;
      const si = clamp(s + (i - 2) * 5, 22, 88);
      const li = clamp(l + (i - 2) * 4, 20, 86);
      arr.push(hslToHex(hh, si, li));
    }
  }
  return uniqHex(arr);
}

function hexToHsl(hex) {//HEX → HSL 변환. (색조/채도/명도 계산)
  const m = normalizeHex(hex).match(/^([0-9a-f]{6})$/i);
  const n = m ? parseInt(m[1], 16) : 0x666666;
  let r = ((n >> 16) & 255) / 255,
    g = ((n >> 8) & 255) / 255,
    b = (n & 255) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  const d = max - min;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}
function hslToHex(h, s, l) {//HSL → HEX 변환.
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toLowerCase();
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uniqHex = (arr) => Array.from(new Set(arr));
