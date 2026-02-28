import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Mural from "./pages/Mural";
import Caso from "./pages/Caso";
import CasoSolucionado from "./pages/CasoSolucionado";
import Splash from "./pages/Splash";
import MissaoIntro from "./pages/MissaoIntro";
import Perfil from "./pages/Perfil";
import AudioManager from "./components/AudioManager";
import { GameProvider } from "./game/GameProvider";
import { loadGame } from "./game/store";

// Reducer simples: aceita SET_STATE para substituir tudo
// e SET_FIELD para atualizar campos específicos.
// Pode expandir conforme necessidade.
function gameReducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_PLAYER":
      return { ...state, player: { ...state.player, ...action.payload } };
    default:
      return state;
  }
}

const seed = loadGame();

export default function App() {
  return (
    <GameProvider initialState={seed} reducer={gameReducer}>
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <AudioManager />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/caso/:caseId" element={<Caso />} />
          <Route path="/missao-intro/:caseId" element={<MissaoIntro />} />
          <Route path="/caso-solucionado/:caseId" element={<CasoSolucionado />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </GameProvider>
  );
}