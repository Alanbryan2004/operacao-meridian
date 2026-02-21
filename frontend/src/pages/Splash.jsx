// src/pages/Splash.jsx
import { useNavigate } from "react-router-dom";

export default function Splash() {
    const nav = useNavigate();

    return (
        <div
            style={{
                height: "100dvh",
                width: "100vw",
                background: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* CSS local (garante o piscar SEM depender do Tailwind/index.css) */}
            <style>{`
        @keyframes meridianBlink {
          0%, 100% { opacity: .25; }
          50% { opacity: 1; }
        }
        .meridian-blink {
          animation: meridianBlink 1s ease-in-out infinite;
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
                    gap: "14px",
                }}
            >
                <img
                    src="/logo-meridian.png"
                    alt="Operação Meridian"
                    style={{
                        maxHeight: "52dvh",
                        maxWidth: "92vw",
                        height: "auto",
                        width: "auto",
                        display: "block",
                    }}
                />

                <div style={{ fontSize: "13px", opacity: 0.8, letterSpacing: "0.5px" }}>
                    Divisão de Inteligência Estratégica da ATLAS
                </div>

                <button
                    onClick={() => nav("/login")}
                    className="meridian-blink"
                    style={{
                        marginTop: "10px",
                        padding: "10px 22px",
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,.7)",
                        background: "transparent",
                        color: "#fff",
                        fontSize: "13px",
                        letterSpacing: "2px",
                    }}
                >
                    ▸ INICIAR
                </button>
            </div>
        </div>
    );
}