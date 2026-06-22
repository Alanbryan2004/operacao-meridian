import React from "react";
import { STREAK_REWARDS_30_DAYS } from "../game/streakService";

export default function EventosModal({ onClose, streakData, loginStreakData }) {
    const currentCasoStreak = streakData?.current_streak || 0;
    const currentLoginStreak = loginStreakData?.current_streak || 0;
    const lastLoginDate = loginStreakData?.last_reward_date;
    const todayStr = new Date().toISOString().split('T')[0];
    const isLoginResgatado = lastLoginDate === todayStr;

    const displayStreak = Math.max(1, currentLoginStreak);
    const endDay = Math.max(5, displayStreak);
    const cycleDays = [endDay - 4, endDay - 3, endDay - 2, endDay - 1, endDay];
    const progressIndex = cycleDays.indexOf(displayStreak) !== -1 ? cycleDays.indexOf(displayStreak) : 4;

    return (
        <div 
            style={{ 
                position: "fixed", inset: 0, zIndex: 10005, 
                background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", 
                display: "flex", flexDirection: "column", alignItems: "center"
            }}
        >
            <div style={{ flex: 1, width: "100%", overflowY: "auto", padding: "40px 10px 20px 10px", boxSizing: "border-box" }}>
                <div style={{ maxWidth: 520, width: "100%", margin: "auto", position: "relative" }}>


                {/* TÍTULO PRINCIPAL */}
                <div style={{ textAlign: "center", marginBottom: 25 }}>
                    <div style={{ color: "#ffd700", letterSpacing: 8, fontSize: 13, marginBottom: 8, fontWeight: 900, textShadow: "0 0 20px rgba(255,215,0,0.5)" }}>CENTRO DE</div>
                    <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>EVENTOS & RECOMPENSAS</h2>
                </div>

                {/* =========================================
                    SEÇÃO 1: CASO 30 DIAS
                ========================================= */}
                <div style={{ 
                    borderRadius: 20, border: "1px solid rgba(255,215,0,0.3)", 
                    background: "rgba(255,215,0,0.03)", padding: "20px 15px", 
                    marginBottom: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <div>
                            <h3 style={{ color: "#ffd700", fontSize: 18, fontWeight: 900, margin: "0 0 4px 0" }}>O DESAFIO DOS 30 DIAS</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, margin: 0 }}>Complete um caso por dia para avançar.</p>
                        </div>
                        <div style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 12, padding: "6px 12px", textAlign: "center" }}>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>DIA ATUAL</div>
                            <div style={{ fontSize: 18, color: "#ffd700", fontWeight: 900 }}>{currentCasoStreak}</div>
                        </div>
                    </div>

                    {/* GRID DE 30 DIAS */}
                    <div style={{ 
                        display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 
                    }}>
                        {STREAK_REWARDS_30_DAYS.map((reward, index) => {
                            const isConquered = reward.day <= currentCasoStreak;
                            const isNext = reward.day === currentCasoStreak + 1;
                            const isSpecial = reward.day % 5 === 0;

                            return (
                                <div key={reward.day} style={{ 
                                    background: isConquered ? "rgba(255,215,0,0.15)" : isNext ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.3)",
                                    border: `1px solid ${isConquered ? "rgba(255,215,0,0.5)" : isNext ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.05)"}`,
                                    borderRadius: 12, aspectRatio: "1", display: "flex", flexDirection: "column", 
                                    alignItems: "center", justifyContent: "center", position: "relative",
                                    boxShadow: isConquered ? "0 0 15px rgba(255,215,0,0.2) inset" : "none"
                                }}>
                                    <div style={{ fontSize: 9, color: isConquered ? "#ffd700" : "rgba(255,255,255,0.4)", fontWeight: 800, position: "absolute", top: 4 }}>
                                        D{reward.day}
                                    </div>
                                    
                                    <div style={{ marginTop: 10, fontSize: 18 }}>
                                        {isConquered ? (
                                            <span style={{ color: "#ffd700", textShadow: "0 0 10px rgba(255,215,0,0.8)" }}>✓</span>
                                        ) : isSpecial ? (
                                            <span style={{ opacity: isNext ? 1 : 0.3 }}>🎁</span>
                                        ) : (
                                            <span style={{ fontSize: 12, opacity: 0.2 }}>🔒</span>
                                        )}
                                    </div>
                                    
                                    {isConquered && isSpecial && (
                                        <div style={{ position: "absolute", bottom: -2, fontSize: 8, color: "#fff", background: "#ffd700", padding: "1px 4px", borderRadius: 4, color: "#000", fontWeight: 900 }}>
                                            OK
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* =========================================
                    SEÇÃO 2: LOGIN DIÁRIO
                ========================================= */}
                <div style={{ 
                    borderRadius: 20, border: "1px solid rgba(60,255,160,0.3)", 
                    background: "rgba(60,255,160,0.03)", padding: "20px 15px", 
                    marginBottom: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <div>
                            <h3 style={{ color: "#3cff9c", fontSize: 18, fontWeight: 900, margin: "0 0 4px 0" }}>LOGIN DIÁRIO</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, margin: 0 }}>Bônus diário de presença.</p>
                        </div>
                        <div style={{ background: "rgba(60,255,160,0.1)", border: "1px solid rgba(60,255,160,0.3)", borderRadius: 12, padding: "6px 12px", textAlign: "center" }}>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>STATUS</div>
                            <div style={{ fontSize: 10, color: "#3cff9c", fontWeight: 900, marginTop: 4 }}>
                                {isLoginResgatado ? "RESGATADO ✓" : "PENDENTE ⏳"}
                            </div>
                        </div>
                    </div>

                    {/* TRILHA DE 5 DIAS */}
                    <div style={{ position: "relative", marginBottom: 8, padding: "0 8px", display: "flex", justifyContent: "space-between", height: 60, alignItems: "center" }}>
                        <div style={{ position: "absolute", top: "50%", left: 20, right: 20, height: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 1 }} />
                        <div style={{ 
                            position: "absolute", top: "50%", left: 20, 
                            width: `calc(${Math.min((progressIndex) / 4 * 100, 100)}% - 40px)`, 
                            height: 2, background: "#3cff9c", transform: "translateY(-50%)", zIndex: 2, transition: "width 1s ease" 
                        }} />
                        
                        {cycleDays.map((d, index) => {
                            const isCompleted = d <= currentLoginStreak;
                            const isNext = d === currentLoginStreak + 1;
                            const isReward = index === 4;
                            return (
                                <div key={d} style={{ zIndex: 3, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ 
                                        width: 36, height: 36, borderRadius: "50%", 
                                        background: isCompleted ? "#3cff9c" : isNext ? "rgba(255,255,255,0.1)" : "#1a2a3a", 
                                        border: `2px solid ${isCompleted ? "#3cff9c" : isNext ? "rgba(60,255,160,0.4)" : "rgba(255,255,255,0.12)"}`, 
                                        display: "flex", alignItems: "center", justifyContent: "center", 
                                        color: isCompleted ? "#000" : "#999", fontSize: 14, fontWeight: 800,
                                        boxShadow: isCompleted ? "0 0 15px rgba(60,255,160,0.5)" : "none"
                                    }}>
                                        {isCompleted ? "✓" : isReward ? "💰" : d}
                                    </div>
                                    <div style={{ fontSize: 9, marginTop: 8, opacity: isCompleted ? 1 : 0.4, color: isCompleted ? "#3cff9c" : "#fff", letterSpacing: 1, fontWeight: 700 }}>
                                        {isReward ? "BONUS" : `DIA ${d}`}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
            </div>

            {/* BOTÃO FIXO NO RODAPÉ */}
            <div style={{ width: "100%", background: "rgba(0,0,0,0.9)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "15px 20px", boxSizing: "border-box", display: "flex", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                <div style={{ maxWidth: 520, width: "100%" }}>
                    <button 
                        onClick={onClose}
                        style={{ 
                            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))", 
                            color: "#fff", fontWeight: 900, padding: "16px 0", width: "100%", 
                            borderRadius: 18, border: "1px solid rgba(255,255,255,0.2)", 
                            fontSize: 14, cursor: "pointer", letterSpacing: 2
                        }}
                    >
                        VOLTAR AO MURAL
                    </button>
                </div>
            </div>

        </div>
    );
}
