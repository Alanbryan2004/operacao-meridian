import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const nav = useNavigate();
    // MODOS: "ENTRY" (Botão inicial) | "VIDEO" (Intro) | "FINAL" (Logo + Iniciar)
    const [mode, setMode] = useState("ENTRY");

    useEffect(() => {
        // Tenta tocar assim que a tela abre (muitos browsers podem bloquear)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, []);

    function triggerAudio() {
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }

    async function handleStartProtocol() {
        triggerAudio();
        setMode("VIDEO");

        // Tenta travar em paisagem se estiver no celular (precisa de interação do usuário, que é este clique)
        try {
            if (window.screen?.orientation?.lock) {
                await window.screen.orientation.lock("landscape");
            }
        } catch (err) {
            console.log("Rotação automática não suportada ou bloqueada:", err);
        }
    }

    async function handleSkipOrEndVideo() {
        setMode("FINAL");
        // Tenta destravar a orientação
        try {
            if (window.screen?.orientation?.unlock) {
                window.screen.orientation.unlock();
            }
        } catch (err) {
            console.log("Erro ao destravar orientação:", err);
        }
    }

    function handleGoToLogin(e) {
        e.stopPropagation();
        triggerAudio();
        nav("/login");
    }

    if (mode === "ENTRY") {
        return (
            <div
                style={{
                    height: "100dvh", width: "100vw", background: "#000",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", gap: "30px"
                }}
                onClick={handleStartProtocol}
            >
                <img
                    src="/logo-meridian.png"
                    alt="Operação Meridian"
                    style={{
                        maxHeight: "40dvh",
                        maxWidth: "85vw",
                        opacity: 0.6,
                        filter: "brightness(0.8)"
                    }}
                />
                <div style={{
                    color: "#fff", fontSize: "12px", letterSpacing: "4px",
                    animation: "pulse 2s infinite", opacity: 0.7, textAlign: "center", padding: "20px"
                }}>
                    ▸ INICIAR PROTOCOLO MERIDIAN
                </div>
                <style>{`
                    @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
                `}</style>
            </div>
        );
    }

    if (mode === "VIDEO") {
        return (
            <div style={{ height: "100dvh", width: "100vw", background: "#000", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video
                    src="/Videos/introducao.mp4"
                    autoPlay
                    onEnded={handleSkipOrEndVideo}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // Garante que caiba na tela sem cortar
                        maxWidth: "100%",
                        maxHeight: "100%"
                    }}
                />
                <button
                    onClick={handleSkipOrEndVideo}
                    style={{
                        position: "absolute", bottom: "30px", right: "30px",
                        background: "rgba(0,0,0,0.5)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
                        padding: "10px 20px", borderRadius: "10px", fontSize: "11px", cursor: "pointer",
                        letterSpacing: "1px", zIndex: 10
                    }}
                >
                    PULAR INTRO ▸
                </button>
            </div>
        );
    }

    return (
        <div
            onClick={triggerAudio}
            style={{
                height: "100dvh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
        @keyframes meridianBlink {
          0%,100% { opacity: .25; }
          50% { opacity: 1; }
        }
        .meridian-blink {
          animation: meridianBlink 1.2s ease-in-out infinite;
        }
      `}</style>

            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    textAlign: "center",
                    gap: "18px",
                }}
            >
                <img
                    src="/logo-meridian.png"
                    alt="Operação Meridian"
                    style={{
                        maxHeight: "50dvh",
                        maxWidth: "92vw",
                        height: "auto",
                        width: "auto",
                        display: "block",
                    }}
                />

                <div style={{ fontSize: "13px", opacity: 0.8, letterSpacing: "0.6px" }}>
                    Divisão de Inteligência Estratégica da A.T.L.A.S.
                </div>

                <button
                    onClick={handleGoToLogin}
                    className="meridian-blink"
                    style={{
                        marginTop: "10px",
                        padding: "12px 28px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,.6)",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        fontSize: "14px",
                        letterSpacing: "2px",
                        cursor: "pointer",
                    }}
                >
                    ▸ INICIAR
                </button>
            </div>
        </div>
    );
}
