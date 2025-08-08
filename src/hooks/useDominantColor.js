//Color Thief browser를 이용해 이미지 주요 색 추출하는 커스텀 훅

import { useEffect, useState } from "react";
import ColorThief from "color-thief-browser"; //color-thief-browser 라이브러리 사용

export default function useDominantColor(imageRef, imageURL) {
  const [dominantColor, setDominantColor] = useState(null);

  useEffect(() => {
    if (!imageRef.current || !imageURL) return; //이미지 참조 없으면 아무것도 안함

    const img = imageRef.current;
    const colorThief = new ColorThief(); 

    const extractColor = () => {//색상 추출하고 rgb를 hex 값으로 바꿔서 dominantcolor에 저장
      try {
        const rgb = colorThief.getColor(img);//가장 뚜렷한 색을 rgb로 변환
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        setDominantColor(hex);
      } catch (error) {
        console.error("색상 추출 실패:", error);
      }
    };

    if (img.complete) {//ture이면 이미지가 로드된 상태이므로 색상 추출
      extractColor();
    } else {
      img.addEventListener("load", extractColor);
      return () => img.removeEventListener("load", extractColor);//아직 로드되지 않았다면 load 이벤트가 발생할 때 색상 추출
    }
  }, [imageRef, imageURL]);

  return dominantColor;
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase() //padstart는 한자리일 경우 앞에 0을 붙임
  );
}