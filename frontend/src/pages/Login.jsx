// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGame, saveGame, resetGame } from "../game/store";

export default function Login() {
    const nav = useNavigate();
    const [nome, setNome] = useState("");

    useEffect(() => {
        const s = loadGame();
        setNome(s.player.nome ? String(s.player.nome) : "");

        // tenta tocar ao entrar (alguns browsers bloqueiam, mas não atrapalha)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, []);

    function triggerAudio() {
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }

    function entrar() {
        const finalNome = (nome || "").trim() || "Recruta";

        const s = loadGame();
        const next = {
            ...s,
            player: { ...s.player, nome: finalNome },
        };
        saveGame(next);
        nav("/mural");
    }

    function zerar() {
        resetGame();
        nav("/login");
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
        .om-card, .om-card * {
          box-sizing: border-box;
        }

        .om-card {
          width: min(420px, 92vw);
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 45px rgba(0,0,0,.55);
          padding: 18px;
        }

        .om-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: .3px;
          margin-top: 6px;
        }

        .om-subtitle {
          font-size: 13px;
          opacity: .8;
          margin-top: 6px;
          line-height: 1.35;
        }

        .om-label {
          font-size: 12px;
          opacity: .75;
          display: block;
          text-align: left;
          margin-bottom: 6px;
        }

        .om-input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(0,0,0,.35);
          color: #fff;
          outline: none;
          font-size: 14px;
          display: block;
        }

        .om-input::placeholder { color: rgba(255,255,255,.45); }

        .om-input:focus {
          border-color: rgba(120,200,255,.55);
          box-shadow: 0 0 0 4px rgba(60,150,220,.18);
        }

        .om-btn {
          width: 100%;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.16);
          font-size: 14px;
          letter-spacing: 1px;
          cursor: pointer;
          background: transparent;
          color: #fff;
        }

        .om-btn-primary {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,.22);
        }

        .om-btn-secondary {
          background: rgba(0,0,0,0.25);
          color: rgba(255,255,255,.85);
        }

        .om-btn:active { transform: scale(0.99); }

        .om-row {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .om-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          margin-bottom: 8px;
          opacity: 0.75;
          font-size: 12px;
        }

        .om-divider::before,
        .om-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,.18);
        }

        .om-oauth {
          display: grid;
          gap: 10px;
          margin-top: 6px;
        }

        .om-oauth-btn {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.6px;
          cursor: pointer;
        }

        .om-oauth-btn:active { transform: scale(0.99); }

        @media (max-height: 650px) {
          .om-card { padding: 14px; }
          .om-title { font-size: 18px; }
        }
      `}</style>

            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                }}
            >
                <div
                    className="om-card"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "12px", opacity: 0.75, letterSpacing: "2px" }}>
                            A.T.L.A.S.
                        </div>

                        <div className="om-title">Operação Meridian</div>

                        <div className="om-subtitle">
                            Entre como recruta. O mundo está em movimento.
                        </div>
                    </div>

                    <div className="om-row" style={{ marginTop: 18 }}>
                        <div>
                            <label className="om-label">Nome do Agente</label>
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                onFocus={triggerAudio}
                                className="om-input"
                                placeholder="Informe seu nome"
                                autoComplete="off"
                            />
                        </div>

                        <button
                            className="om-btn om-btn-primary"
                            onClick={() => {
                                triggerAudio();
                                entrar();
                            }}
                        >
                            ENTRAR
                        </button>

                        <button
                            className="om-btn om-btn-secondary"
                            onClick={() => {
                                triggerAudio();
                                zerar();
                            }}
                        >
                            RESETAR PROGRESSO (MVP)
                        </button>

                        <div className="om-divider">ou</div>

                        <div className="om-oauth">
                            <button
                                className="om-oauth-btn"
                                onClick={() => {
                                    triggerAudio();
                                    alert("Login com Google (MVP) - vamos integrar depois.");
                                }}
                            >
                                Continuar com Google
                            </button>

                            <button
                                className="om-oauth-btn"
                                onClick={() => {
                                    triggerAudio();
                                    alert("Login com Facebook (MVP) - vamos integrar depois.");
                                }}
                            >
                                Continuar com Facebook
                            </button>
                        </div>

                        <div style={{ fontSize: "11px", opacity: 0.55, textAlign: "center", marginTop: 2 }}>
                            Dica: depois a gente coloca “Recuperar acesso” e seleção de especialização.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}