// src/pages/Splash.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const nav = useNavigate();

    useEffect(() => {
        // Tenta tocar assim que a tela abre (muitos browsers podem bloquear)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, []);

    function triggerAudio() {
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }

    function handleStart(e) {
        e.stopPropagation(); // evita disparar o triggerAudio do pai
        triggerAudio();
        nav("/login");
    }

    return (
        <div
            onClick={triggerAudio} // Qualquer clique na tela agora ativa o áudio
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
            {/* Animação local do botão */}
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
                {/* Logo */}
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

                {/* Texto da agência */}
                <div style={{ fontSize: "13px", opacity: 0.8, letterSpacing: "0.6px" }}>
                    Divisão de Inteligência Estratégica da A.T.L.A.S.
                </div>

                {/* Botão Iniciar */}
                <button
                    onClick={handleStart}
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