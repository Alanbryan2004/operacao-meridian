import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";
import SuspectGallery from "../components/SuspectGallery";

function Badge({ children, tone = "gray" }) {
    const map = {
        gray: { bg: "rgba(255,255,255,0.08)", bd: "rgba(255,255,255,0.14)", tx: "rgba(255,255,255,0.86)" },
        green: { bg: "rgba(60,255,160,0.10)", bd: "rgba(60,255,160,0.22)", tx: "rgba(200,255,235,0.95)" },
        blue: { bg: "rgba(80,170,255,0.12)", bd: "rgba(80,170,255,0.22)", tx: "rgba(210,240,255,0.95)" },
        purple: { bg: "rgba(170,120,255,0.12)", bd: "rgba(170,120,255,0.22)", tx: "rgba(240,225,255,0.95)" },
        amber: { bg: "rgba(255,190,90,0.12)", bd: "rgba(255,190,90,0.22)", tx: "rgba(255,240,215,0.95)" },
    };
    const s = map[tone] || map.gray;
    return (
        <span style={{ fontSize: 11, padding: "6px 10px", borderRadius: 999, background: s.bg, border: `1px solid ${s.bd}`, color: s.tx, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            {children}
        </span>
    );
}

export default function Perfil() {
    const nav = useNavigate();
    const { state } = useGame();
    const [tab, setTab] = useState("PERFIL");

    if (!state) return null;
    const { player } = state;

    // Conta missões
    const totalMissoes = state.cases?.length || 0;
    const missoesVencidas = Object.values(state.runs || {}).filter(r => r.status === "WON").length;
    const missoesAtivas = Object.values(state.runs || {}).filter(r => r.status === "IN_PROGRESS").length;
    const totalCapturas = Object.values(state.capturedSuspects || {}).reduce((acc, v) => acc + v, 0);

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
            color: "#fff",
            padding: "14px",
            boxSizing: "border-box",
        }}>
            <style>{`
                .pf-wrap { max-width: 520px; margin: 0 auto; }
                .pf-panel { border-radius: 18px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 18px 45px rgba(0,0,0,.55); padding: 16px; margin-bottom: 14px; }
                .pf-back { background: none; border: none; color: rgba(255,255,255,0.6); font-size: 13px; cursor: pointer; padding: 8px 0; margin-bottom: 8px; }
                .pf-back:hover { color: #80bdff; }
            `}</style>

            <div className="pf-wrap">
                <button className="pf-back" onClick={() => nav(-1)}>← VOLTAR</button>

                {/* Sub-tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                    {["PERFIL", "GALERIA"].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            style={{
                                flex: 1,
                                padding: "10px 0",
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 800,
                                letterSpacing: 0.5,
                                border: "1px solid",
                                borderColor: tab === t ? "#80bdff" : "rgba(255,255,255,0.12)",
                                background: tab === t ? "rgba(128,189,255,0.15)" : "transparent",
                                color: tab === t ? "#80bdff" : "rgba(255,255,255,0.5)",
                                cursor: "pointer",
                            }}
                        >
                            {t === "PERFIL" ? "👤 PERFIL" : "🔍 GALERIA"}
                        </button>
                    ))}
                </div>

                {tab === "PERFIL" && (
                    <>
                        {/* Card do Agente */}
                        <div className="pf-panel">
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: 36,
                                    background: "rgba(255,255,255,0.05)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 32, border: "2px solid rgba(128,189,255,0.3)",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                }}>
                                    {player.avatarUrl ? (
                                        <img src={player.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                                    ) : "👤"}
                                </div>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 800 }}>{player.nome}</div>
                                    <div style={{ marginTop: 4 }}>
                                        <Badge tone="blue">{player.classeEmoji || "🟢"} {player.nivelTitulo || "Novato"}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: "#ffd700" }}>${player.dinheiro}</div>
                                    <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: 1 }}>SALDO</div>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: "#80bdff" }}>{player.xp}</div>
                                    <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: 1 }}>XP TOTAL</div>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: "#3cffA0" }}>{missoesVencidas}</div>
                                    <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: 1 }}>MISSÕES COMPLETAS</div>
                                </div>
                                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: "#ff6b6b" }}>{totalCapturas}</div>
                                    <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: 1 }}>CAPTURAS TOTAIS</div>
                                </div>
                            </div>
                        </div>

                        {/* Missões */}
                        <div className="pf-panel">
                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, color: "#80bdff", letterSpacing: 1 }}>MISSÕES</div>
                            {state.cases.map(c => {
                                const run = state.runs?.[c.id];
                                const status = run?.status;
                                const statusLabel = status === "WON" ? "✅ Completa" : status === "LOST" ? "❌ Fracassada" : status === "IN_PROGRESS" ? "🔵 Em curso" : "⬜ Não iniciada";
                                const statusColor = status === "WON" ? "#3cffA0" : status === "LOST" ? "#ff6b6b" : status === "IN_PROGRESS" ? "#80bdff" : "rgba(255,255,255,0.4)";

                                return (
                                    <div key={c.id} style={{
                                        padding: "10px 12px",
                                        borderRadius: 12,
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}>
                                        <div style={{ fontSize: 13 }}>{c.titulo}</div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: statusColor }}>{statusLabel}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Logout */}
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                localStorage.removeItem("operacao_meridian__mvp_state_v1");
                                nav("/login");
                            }}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: 14,
                                border: "1px solid rgba(255,70,70,0.25)",
                                background: "rgba(255,70,70,0.08)",
                                color: "#ff6b6b",
                                cursor: "pointer",
                                fontSize: 13, fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            🚪 SAIR DA CONTA
                        </button>
                    </>
                )}

                {tab === "GALERIA" && (
                    <div className="pf-panel">
                        <SuspectGallery capturedSuspects={state.capturedSuspects || {}} />
                    </div>
                )}
            </div>
        </div>
    );
}
