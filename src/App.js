import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Harmony from "./pages/Harmony";
import RandomPalette from "./pages/RandomPalette";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 기능 페이지 */}
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/harmony" element={<Harmony />} />
        <Route path="/random" element={<RandomPalette />} />

        {/* 예전 경로 호환: /random-palette -> /random */}
        <Route path="/random-palette" element={<Navigate to="/random" replace />} />

        {/* 그 외 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
