// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGame, saveGame, resetGame } from "../game/store";
import { supabase } from "../lib/supabase";
import { ensureProfile, loadGameState, saveGameState } from "../services/gameSaveService";

export default function Login() {
    const nav = useNavigate();
    const [nome, setNome] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const s = loadGame();
        setNome(s.player?.nome ? String(s.player.nome) : "");

        // tenta tocar ao entrar
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));

        // Verifica se voltou de um login OAuth (callback)
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                await handleAuthUser(session.user);
            }
        });

        // Escuta mudanças de auth (ex: redirect do Google)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
                await handleAuthUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleAuthUser(user) {
        const meta = user.user_metadata || {};
        const googleName = meta.full_name || meta.name || "";
        const googleAvatar = meta.avatar_url || meta.picture || "";

        // 1) Garante profile no Supabase
        await ensureProfile(googleName || "");

        // 2) Tenta carregar save remoto
        const remoteState = await loadGameState(0);

        if (remoteState) {
            // Se existe save remoto: usa ele como fonte principal
            const merged = {
                ...remoteState,
                player: {
                    ...(remoteState.player || {}),
                    nome: googleName || remoteState.player?.nome || "Recruta",
                    avatarUrl: googleAvatar || remoteState.player?.avatarUrl || "",
                    supabaseId: user.id,
                },
            };

            saveGame(merged);
        } else {
            // Primeira vez: pega state local atual e manda pro Supabase
            const s = loadGame();
            const next = {
                ...s,
                player: {
                    ...s.player,
                    nome: googleName || s.player?.nome || "Recruta",
                    avatarUrl: googleAvatar,
                    supabaseId: user.id,
                },
            };

            // salva local
            saveGame(next);

            // cria save remoto
            await saveGameState(next, 0);
        }

        // 3) Atualiza avatar no profile (opcional)
        await supabase
            .from("profiles")
            .upsert(
                {
                    id: user.id,
                    nickname: googleName,
                    avatar_key: googleAvatar,
                },
                { onConflict: "id" }
            );

        nav("/mural");
    }

    async function loginComGoogle() {
        setLoading(true);

        // Em produção: defina VITE_SITE_URL na Vercel (https://operacao-meridian.vercel.app)
        // Em dev: se não existir, cai no origin atual (http://localhost:5173)
        const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${siteUrl}/login`,
            },
        });

        if (error) {
            alert("Erro ao conectar com Google: " + error.message);
            setLoading(false);
        }
    }

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
        .om-card, .om-card * { box-sizing: border-box; }

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
          text-align: center;
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
          text-align: center;
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

        .om-oauth-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
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
                <div className="om-card" onClick={(e) => e.stopPropagation()}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "12px", opacity: 0.75, letterSpacing: "2px" }}>
                            A.T.L.A.S.
                        </div>

                        <div className="om-title">Operação Meridian</div>

                        <div className="om-subtitle">Entre como recruta. O mundo está em movimento.</div>
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
                                disabled={loading}
                                onClick={() => {
                                    triggerAudio();
                                    loginComGoogle();
                                }}
                            >
                                <span className="om-oauth-btn-inner">
                                    <svg width="18" height="18" viewBox="0 0 48 48">
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        />
                                        <path
                                            fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.77.9 7.35 2.56 10.52l7.97-5.93z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.93C6.51 42.62 14.62 48 24 48z"
                                        />
                                    </svg>
                                    {loading ? "Conectando..." : "Continuar com Google"}
                                </span>
                            </button>

                            <button
                                className="om-oauth-btn"
                                onClick={() => {
                                    triggerAudio();
                                    alert("Login com Facebook (MVP) - vamos integrar depois.");
                                }}
                            >
                                <span className="om-oauth-btn-inner">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Continuar com Facebook
                                </span>
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