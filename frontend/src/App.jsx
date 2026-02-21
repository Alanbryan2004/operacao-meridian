import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Mural from "./pages/Mural";
import Caso from "./pages/Caso";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mural" element={<Mural />} />
        <Route path="/caso/:caseId" element={<Caso />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}