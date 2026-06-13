import React, { useState, useEffect } from "react";

/**
 * LicencaUsadaModal — Modal premium que mostra os últimos 7 dias 
 * com indicação visual de dias jogados vs dias protegidos por Licença Tática.
 * 
 * Props:
 *   notification: { diasProtegidos: string[], licencasConsumidas: number, licencasRestantes: number, streakAtual: number }
 *   completedMissions: array de missões com completed_at
 *   onClose: callback
 */
export default function LicencaUsadaModal({ notification, completedMissions = [], onClose }) {
    const [visible, setVisible] = useState(false);
    const [cardReveal, setCardReveal] = useState(-1);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        // Revela cards um por um
        for (let i = 0; i < 5; i++) {
            setTimeout(() => setCardReveal(i), 400 + i * 150);
        }
    }, []);

    if (!notification) return null;

    const { diasProtegidos = [], licencasConsumidas = 0, licencasRestantes = 0 } = notification;

    // Gera os últimos 5 dias (hoje = último)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 4; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        days.push({
            date: `${y}-${m}-${dd}`,
            label: `${dd}/${m}`,
            isToday: i === 0
        });
    }

    // Determina quais dias tiveram missões concluídas
    const playedDates = new Set();
    (completedMissions || []).forEach(m => {
        if (m.completed_at) {
            const mDate = new Date(m.completed_at);
            const y = mDate.getFullYear();
            const mo = String(mDate.getMonth() + 1).padStart(2, "0");
            const dd = String(mDate.getDate()).padStart(2, "0");
            playedDates.add(`${y}-${mo}-${dd}`);
        }
    });

    const protectedSet = new Set(diasProtegidos);

    // Classifica cada dia
    const timeline = days.map(day => {
        if (day.isToday) return { ...day, status: "HOJE" };
        if (protectedSet.has(day.date)) return { ...day, status: "PROTEGIDO" };
        if (playedDates.has(day.date)) return { ...day, status: "JOGADO" };
        return { ...day, status: "INATIVO" };
    });

    function handleClose() {
        setVisible(false);
        setTimeout(() => {
            localStorage.removeItem("pendingLicencaNotification");
            onClose();
        }, 400);
    }

    return (
        <div style={{
            position: "fixed", inset: 0,
            background: visible ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0)",
            backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)",
            zIndex: 21000,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
            transition: "background 0.5s ease",
            padding: 16,
            overflowY: "auto"
        }}>
            <style>{`
                @keyframes lt-pulse { 0%,100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.3); } }
                @keyframes lt-glow { 0%,100% { box-shadow: 0 0 15px rgba(60,200,255,0.15); } 50% { box-shadow: 0 0 30px rgba(60,200,255,0.35); } }
                @keyframes lt-gold-glow { 0%,100% { box-shadow: 0 0 15px rgba(255,215,0,0.2); } 50% { box-shadow: 0 0 35px rgba(255,215,0,0.5); } }
                @keyframes lt-frost { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
                @keyframes lt-card-in { 0% { opacity: 0; transform: translateY(20px) scale(0.85); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes lt-hero-in { 0% { opacity: 0; transform: scale(0.7); } 60% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes lt-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                @keyframes lt-check-pop { 0% { transform: scale(0); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
            `}</style>

            <div style={{
                maxWidth: 520, width: "100%",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
                {/* HEADER */}
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <img
                        src="/Loja/licencaTatica.png"
                        alt="Licença Tática"
                        style={{
                            width: 90, height: 90, objectFit: "contain",
                            animation: "lt-hero-in 0.8s ease-out, lt-pulse 3s ease-in-out 1s infinite",
                            filter: "drop-shadow(0 0 25px rgba(60,200,255,0.5))",
                            marginBottom: 8
                        }}
                    />
                    <div style={{
                        fontSize: 11, letterSpacing: 5, color: "rgba(60,200,255,0.8)",
                        fontWeight: 900, marginBottom: 6
                    }}>
                        🛡️ LICENÇA TÁTICA ATIVADA
                    </div>
                    <div style={{
                        fontSize: 18, fontWeight: 900, color: "#fff",
                        marginBottom: 4
                    }}>
                        Sua ofensiva foi protegida!
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                        {licencasConsumidas} licença{licencasConsumidas > 1 ? "s" : ""} utilizada{licencasConsumidas > 1 ? "s" : ""} · {licencasRestantes} restante{licencasRestantes !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* TIMELINE - 7 DIAS */}
                <div style={{
                    display: "flex", gap: 6,
                    justifyContent: "center",
                    marginBottom: 24,
                    overflowX: "auto",
                    padding: "4px 0"
                }}>
                    {timeline.map((day, i) => {
                        const isProtected = day.status === "PROTEGIDO";
                        const isPlayed = day.status === "JOGADO";
                        const isToday = day.status === "HOJE";
                        const isInactive = day.status === "INATIVO";
                        const revealed = i <= cardReveal;

                        // Cores por status
                        const borderColor = isProtected
                            ? "rgba(255,215,0,0.5)"
                            : isPlayed
                                ? "rgba(60,200,255,0.35)"
                                : isToday
                                    ? "rgba(60,255,160,0.4)"
                                    : "rgba(255,255,255,0.08)";

                        const bgColor = isProtected
                            ? "linear-gradient(180deg, rgba(255,215,0,0.08) 0%, rgba(180,140,0,0.04) 100%)"
                            : isPlayed
                                ? "linear-gradient(180deg, rgba(60,200,255,0.08) 0%, rgba(30,100,180,0.04) 100%)"
                                : isToday
                                    ? "linear-gradient(180deg, rgba(60,255,160,0.08) 0%, rgba(30,180,100,0.04) 100%)"
                                    : "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)";

                        const glowAnim = isProtected ? "lt-gold-glow 2.5s ease-in-out infinite" : isPlayed ? "lt-glow 3s ease-in-out infinite" : "none";

                        return (
                            <div
                                key={day.date}
                                style={{
                                    flex: "1 0 0",
                                    minWidth: 58, maxWidth: 75,
                                    borderRadius: 14,
                                    border: `1px solid ${borderColor}`,
                                    background: bgColor,
                                    padding: "10px 4px 8px",
                                    textAlign: "center",
                                    opacity: revealed ? 1 : 0,
                                    transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.85)",
                                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                    animation: revealed ? glowAnim : "none",
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                            >
                                {/* Shimmer para PROTEGIDO */}
                                {isProtected && revealed && (
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.08) 50%, transparent 100%)",
                                        backgroundSize: "200% 100%",
                                        animation: "lt-shimmer 3s linear infinite",
                                        borderRadius: 14, pointerEvents: "none"
                                    }} />
                                )}

                                {/* Data */}
                                <div style={{
                                    fontSize: 10, fontWeight: 800,
                                    color: isToday ? "#3cff9c" : isProtected ? "#ffd700" : "rgba(255,255,255,0.5)",
                                    letterSpacing: 0.5, marginBottom: 6,
                                    position: "relative"
                                }}>
                                    {isToday ? "HOJE" : day.label}
                                </div>

                                {/* Ícone central */}
                                <div style={{
                                    width: 38, height: 38, margin: "0 auto 6px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative"
                                }}>
                                    {isProtected ? (
                                        <img
                                            src="/Loja/licencaTatica.png"
                                            alt="Protegido"
                                            style={{
                                                width: 38, height: 38, objectFit: "contain",
                                                filter: "drop-shadow(0 0 8px rgba(255,215,0,0.5))",
                                                animation: revealed ? "lt-pulse 2.5s ease-in-out infinite" : "none"
                                            }}
                                        />
                                    ) : isPlayed ? (
                                        <div style={{
                                            width: 32, height: 32, borderRadius: "50%",
                                            background: "linear-gradient(135deg, rgba(60,200,255,0.2), rgba(60,200,255,0.05))",
                                            border: "1.5px solid rgba(60,200,255,0.4)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 16
                                        }}>
                                            🔥
                                        </div>
                                    ) : isToday ? (
                                        <div style={{
                                            width: 32, height: 32, borderRadius: "50%",
                                            background: "linear-gradient(135deg, rgba(60,255,160,0.15), rgba(60,255,160,0.05))",
                                            border: "1.5px solid rgba(60,255,160,0.4)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 16,
                                            animation: "lt-pulse 2s ease-in-out infinite"
                                        }}>
                                            ⚡
                                        </div>
                                    ) : (
                                        <div style={{
                                            width: 32, height: 32, borderRadius: "50%",
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1.5px solid rgba(255,255,255,0.08)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 14, opacity: 0.3
                                        }}>
                                            —
                                        </div>
                                    )}
                                </div>

                                {/* Status text */}
                                <div style={{
                                    fontSize: 8, fontWeight: 900,
                                    letterSpacing: 0.8,
                                    color: isProtected ? "#ffd700" : isPlayed ? "#5cc8ff" : isToday ? "#3cff9c" : "rgba(255,255,255,0.2)",
                                    position: "relative"
                                }}>
                                    {isProtected ? "PROTEGIDO" : isPlayed ? "JOGADO" : isToday ? "EM JOGO" : "—"}
                                </div>

                                {/* Badge check / snowflake */}
                                <div style={{
                                    marginTop: 4, fontSize: 12,
                                    animation: revealed && (isPlayed || isProtected) ? "lt-check-pop 0.4s ease-out" : "none",
                                    opacity: isInactive ? 0.15 : 1
                                }}>
                                    {isProtected ? (
                                        <span style={{ animation: "lt-frost 2s ease-in-out infinite" }}>❄️</span>
                                    ) : isPlayed ? (
                                        <span style={{ color: "#3cff9c" }}>✓</span>
                                    ) : isToday ? (
                                        <span style={{ opacity: 0.6 }}>▸</span>
                                    ) : (
                                        <span style={{ opacity: 0.15 }}>·</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* INFO PANEL */}
                <div style={{
                    borderRadius: 16,
                    border: "1px solid rgba(255,215,0,0.15)",
                    background: "rgba(255,215,0,0.04)",
                    padding: "14px 16px",
                    marginBottom: 20,
                    textAlign: "center"
                }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,215,0,0.6)", fontWeight: 800, marginBottom: 6 }}>
                        RELATÓRIO DO SISTEMA
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                        {licencasConsumidas === 1 ? (
                            <>O sistema detectou <strong style={{ color: "#ffd700" }}>1 dia</strong> de inatividade e ativou automaticamente sua Licença Tática para preservar a sequência.</>
                        ) : (
                            <>O sistema detectou <strong style={{ color: "#ffd700" }}>{licencasConsumidas} dias</strong> de inatividade e ativou automaticamente suas Licenças Táticas para preservar a sequência.</>
                        )}
                    </div>
                </div>

                {/* BOTÃO FECHAR */}
                <button
                    onClick={handleClose}
                    style={{
                        width: "100%", padding: 16,
                        borderRadius: 16,
                        border: "1px solid rgba(60,200,255,0.3)",
                        background: "linear-gradient(135deg, rgba(60,200,255,0.15), rgba(60,200,255,0.05))",
                        color: "#5cc8ff", fontSize: 14, fontWeight: 900,
                        cursor: "pointer", letterSpacing: 1,
                        transition: "all 0.2s"
                    }}
                >
                    ENTENDIDO — PROSSEGUIR ▸
                </button>
            </div>
        </div>
    );
}
