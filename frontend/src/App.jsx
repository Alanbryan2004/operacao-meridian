import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Mural from "./pages/Mural";
import Caso from "./pages/Caso";
import Splash from "./pages/Splash";
import AudioManager from "./components/AudioManager";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AudioManager />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/caso/:caseId" element={<Caso />} />
      </Routes>
    </div>
  );
}