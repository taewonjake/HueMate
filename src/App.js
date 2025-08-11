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
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/harmony" element={<Harmony />} />
        <Route path="/random" element={<RandomPalette />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
