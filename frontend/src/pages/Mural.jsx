// src/pages/Mural.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";

function Badge({ children, tone = "gray" }) {
    const map = {
        gray: { bg: "rgba(255,255,255,0.08)", bd: "rgba(255,255,255,0.14)", tx: "rgba(255,255,255,0.86)" },
        green: { bg: "rgba(60,255,160,0.10)", bd: "rgba(60,255,160,0.22)", tx: "rgba(200,255,235,0.95)" },
        blue: { bg: "rgba(80,170,255,0.12)", bd: "rgba(80,170,255,0.22)", tx: "rgba(210,240,255,0.95)" },
        purple: { bg: "rgba(170,120,255,0.12)", bd: "rgba(170,120,255,0.22)", tx: "rgba(240,225,255,0.95)" },
        amber: { bg: "rgba(255,190,90,0.12)", bd: "rgba(255,190,90,0.22)", tx: "rgba(255,240,215,0.95)" },
        red: { bg: "rgba(255,90,90,0.10)", bd: "rgba(255,90,90,0.22)", tx: "rgba(255,225,225,0.95)" },
    };

    const s = map[tone] || map.gray;

    return (
        <span
            style={{
                fontSize: 11,
                padding: "6px 10px",
                borderRadius: 999,
                background: s.bg,
                border: `1px solid ${s.bd}`,
                color: s.tx,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}

function CaseCard({ c, onOpen, status }) {
    const diffTone =
        c.dificuldade === "FACIL" ? "green" :
            c.dificuldade === "MEDIO" ? "blue" :
                c.dificuldade === "DIFICIL" ? "amber" :
                    "purple";

    const isActive = status === "IN_PROGRESS";

    return (
        <button
            onClick={onOpen}
            style={{
                width: "100%",
                textAlign: "left",
                borderRadius: 18,
                border: isActive ? "1px solid rgba(128,189,255,0.4)" : "1px solid rgba(255,255,255,.14)",
                background: isActive ? "rgba(128,189,255,0.08)" : "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: isActive ? "0 0 20px rgba(128,189,255,0.15), 0 16px 38px rgba(0,0,0,.45)" : "0 16px 38px rgba(0,0,0,.45)",
                padding: 14,
                cursor: "pointer",
            }}
            className="active:scale-[0.99]"
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.95)", lineHeight: 1.2 }}>
                        {c.titulo}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.78, marginTop: 6 }}>
                        Início: {c.localInicial.cidade} · {c.localInicial.pais}
                    </div>
                </div>

                <Badge tone={diffTone}>{c.dificuldade}</Badge>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <Badge tone="gray">💰 ${c.recompensa}</Badge>
                <Badge tone="blue">🧠 XP {c.xp}</Badge>
                <Badge tone="purple">⏳ {c.tempoTotalHoras}h</Badge>
                {status === "IN_PROGRESS" && <Badge tone="blue">🔵 EM ANDAMENTO</Badge>}
                {status === "WON" && <Badge tone="green">✅ COMPLETA</Badge>}
                {status === "LOST" && <Badge tone="red">❌ FRACASSADA</Badge>}
            </div>
        </button>
    );
}

export default function Mural() {
    const nav = useNavigate();
    const { state } = useGame();

    useEffect(() => {
        // tenta tocar (se já liberou no splash/login)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, []);

    if (!state) return null;

    const { player, cases } = state;

    return (
        <div
            style={{
                minHeight: "100dvh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
                color: "#fff",
            }}
        >
            <style>{`
        .om-wrap { max-width: 520px; margin: 0 auto; padding: 14px; padding-bottom: 26px; }
        .om-sticky { position: sticky; top: 0; z-index: 20; padding-top: 12px; padding-bottom: 12px; background: linear-gradient(to bottom, rgba(0,0,0,.85), rgba(0,0,0,0)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .om-panel {
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 45px rgba(0,0,0,.55);
          padding: 14px;
        }
        .om-h1 { font-size: 16px; font-weight: 800; letter-spacing: .3px; }
        .om-muted { font-size: 12px; opacity: .75; margin-top: 4px; line-height: 1.35; }
        .om-grid { display: grid; gap: 10px; margin-top: 12px; }
        .om-toprow { display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; flex-wrap: wrap; }
        .om-kpi { font-size: 12px; opacity: .72; }
        .om-kpiValue { font-size: 16px; font-weight: 800; margin-top: 2px; }
        .om-actions { display:flex; gap: 10px; margin-top: 10px; }
        .om-miniBtn {
          flex: 1;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,.92);
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .om-miniBtn:active { transform: scale(0.99); }
      `}</style>

            <div className="om-wrap">
                {/* Header sticky premium */}
                <div className="om-sticky">
                    <div className="om-panel">
                        <div className="om-toprow">
                            <div>
                                <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: 2 }}>A.T.L.A.S.</div>
                                <div className="om-h1">Mural de Casos</div>
                                <div className="om-muted">Escolha um caso e comece a investigação.</div>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <div className="om-kpi">Agente</div>
                                <div className="om-kpiValue">{player.nome}</div>
                                <div style={{ marginTop: 6 }}>
                                    <Badge tone="gray">💰 ${player.dinheiro}</Badge>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Badge tone="blue">{player.classeEmoji || "🟢"} {player.nivelTitulo || "Novato"}</Badge>
                            <Badge tone="green">XP {player.xp}</Badge>
                            <Badge tone="purple">Temporadas: em breve</Badge>
                        </div>

                        <div className="om-actions">
                            <button className="om-miniBtn" onClick={() => nav("/perfil")}>
                                PERFIL
                            </button>
                            <button
                                className="om-miniBtn"
                                onClick={() => alert("Ranking/Clãs (em breve)")}
                            >
                                CLÃS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lista de casos */}
                <div className="om-grid">
                    {cases.map((c) => {
                        const run = state.runs[c.id];
                        const isOtherActive = Object.values(state.runs).some(r => r.caseId !== c.id && r.status === "IN_PROGRESS");
                        const isActive = run?.status === "IN_PROGRESS";

                        return (
                            <div key={c.id} style={{ opacity: isOtherActive ? 0.5 : 1, pointerEvents: isOtherActive ? "none" : "auto" }}>
                                <CaseCard
                                    c={c}
                                    status={run?.status}
                                    onOpen={() => nav(isActive ? `/caso/${c.id}` : `/missao-intro/${c.id}`)}
                                />
                                {isOtherActive && (
                                    <div style={{ fontSize: 10, color: "#ff9090", textAlign: "center", marginTop: 4, fontWeight: 700 }}>
                                        FINALIZE A MISSÃO ATIVA PRIMEIRO
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}