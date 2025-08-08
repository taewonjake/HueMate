//검색 키워드 기반 Pinterest URL 생성 함수

// utils/pinterest.js

export const createPinterestURL = (colorName, toneTitle) => {
  const query = `${colorName} ${toneTitle} outfit combination`;
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
};
