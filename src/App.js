import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import ColorInput from "./components/ColorInput";
import ToneSelector from "./components/ToneSelector";
import ColorRecommendation from "./components/ColorRecommendation";
import ImageUpload from "./components/ImageUpload";
import HarmonyChecker from "./components/HarmonyChecker";
import RandomPalettes from "./components/RandomPalettes";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [baseColor, setBaseColor] = useState("#D4A373");
  const [toneType, setToneType] = useState("analogic"); // default: 유사색 조합

  return (
    <div className="App">
      <HeroSection />

      <section style={{ padding: "40px 20px" }}>
        <ColorInput baseColor={baseColor} setBaseColor={setBaseColor} />
        <ImageUpload setBaseColor={setBaseColor} />
        <ToneSelector toneType={toneType} setToneType={setToneType} />
        <ColorRecommendation baseColor={baseColor} toneType={toneType} />
      </section>

      <section style={{ padding: "40px 20px", backgroundColor: "#f8f8f8" }}>
        <HarmonyChecker />
      </section>

      <section style={{ padding: "40px 20px" }}>
        <RandomPalettes />
      </section>

      <Footer />
    </div>
  );
}

export default App;
