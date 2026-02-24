import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadGame } from "../game/store";

export default function MissaoIntro() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const [phase, setPhase] = useState("VIDEO"); // VIDEO or BRIEFING
    const [state, setState] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const s = loadGame();
        setState(s);

        // Se não for o caso da relíquia, pula direto pro briefing (ou se o vídeo falhar)
        if (caseId !== "C001") {
            setPhase("BRIEFING");
        }
    }, [caseId]);

    const handleVideoEnd = () => {
        setPhase("BRIEFING");
    };

    if (!state) return null;

    const caseObj = state.cases.find(c => c.id === caseId);
    const { player } = state;

    if (!caseObj) return <div>Caso não encontrado.</div>;

    const dias = Math.floor(caseObj.tempoTotalHoras / 24);

    if (phase === "VIDEO") {
        return (
            <div style={{ height: "100dvh", width: "100vw", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video
                    ref={videoRef}
                    src="/Videos/reliquiadesaparecida.mp4"
                    autoPlay
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    onEnded={handleVideoEnd}
                    onError={handleVideoEnd} // Pula se der erro
                />
                <button
                    onClick={handleVideoEnd}
                    style={{ position: "absolute", bottom: 30, right: 30, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 12, letterSpacing: 2 }}
                >
                    PULAR VÍDEO ❯
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                height: "100dvh", width: "100vw", background: "#000",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "20px", color: "#fff",
                boxSizing: "border-box", overflowX: "hidden"
            }}
            onClick={() => nav(`/caso/${caseId}`)}
        >
            <div style={{ maxWidth: "420px", width: "100%", padding: "0 8px", boxSizing: "border-box" }}>
                <div style={{ color: "#80bdff", fontSize: "14px", letterSpacing: "4px", marginBottom: "30px", opacity: 0.8 }}>
                    ❯ COMUNICAÇÃO OFICIAL A.T.L.A.S.
                </div>

                <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "40px", lineHeight: "1.4" }}>
                    {player.nivelTitulo} "{player.nome}", você recebeu o valor de <span style={{ color: "#ffd700" }}>R$ 2.000,00</span> para custos de despesas.
                    <br /><br />
                    Você tem <span style={{ color: "#ffd700" }}>{dias} Dias</span> para resolver o caso.
                    <br /><br />
                    Boa Sorte!
                </h1>

                <div style={{ marginTop: "40px", animation: "pulse 2s infinite", fontSize: "12px", opacity: 0.5, letterSpacing: "3px" }}>
                    CLIQUE PARA INICIAR A MISSÃO
                </div>
            </div>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
            `}</style>
        </div>
    );
}
