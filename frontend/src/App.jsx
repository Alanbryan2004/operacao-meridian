import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Mural from "./pages/Mural";
import Caso from "./pages/Caso";
import CasoSolucionado from "./pages/CasoSolucionado";
import Splash from "./pages/Splash";
import MissaoIntro from "./pages/MissaoIntro";
import AudioManager from "./components/AudioManager";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <AudioManager />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/caso/:caseId" element={<Caso />} />
        <Route path="/missao-intro/:caseId" element={<MissaoIntro />} />
        <Route path="/caso-solucionado/:caseId" element={<CasoSolucionado />} />
      </Routes>
    </div>
  );
}