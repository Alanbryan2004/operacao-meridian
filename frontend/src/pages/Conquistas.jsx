import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { saveGame, suspectsSeed, FACTIONS } from "../game/store";
import { supabase } from "../lib/supabase";
import { inventoryService } from "../game/inventoryService";
import { ITEMS_DATA } from "../game/itemsData";
import { saveGameState } from "../services/gameSaveService";

// ── Definição das Conquistas ────────────────────────────────
export const ACHIEVEMENTS = [
    {
        id: "suspects_20",
        title: "Investigador Avançado",
        description: "Capture 20 suspeitos comuns no banco de dados A.T.L.A.S.",
        icon: "📡",
        target: 20,
        type: "suspects",
        rewards: { moedas: 10000, items: [{ key: "satelite_atlas", qty: 1 }] },
    },
    {
        id: "suspects_30",
        title: "Lenda da Investigação",
        description: "Capture 30 suspeitos comuns no banco de dados A.T.L.A.S.",
        icon: "🗣️",
        target: 30,
        type: "suspects",
        rewards: { moedas: 10000, items: [{ key: "fonte_anonima", qty: 1 }] },
    },
    {
        id: "suspects_35",
        title: "Caçador de Criminosos",
        description: "Capture todos os 35 suspeitos do banco de dados A.T.L.A.S.",
        icon: "🕵️",
        target: 35,
        type: "suspects",
        rewards: { moedas: 10000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F1",
        title: "Fim da Shadow Forge",
        description: "Derrube a Shadow Forge capturando todos os seus 5 integrantes.",
        icon: "🕸️",
        target: 5,
        type: "faction_captured",
        factionId: "F1",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F2",
        title: "Queda da Black Tide",
        description: "Derrube a Black Tide capturando todos os seus 5 integrantes.",
        icon: "⚓",
        target: 5,
        type: "faction_captured",
        factionId: "F2",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F3",
        title: "Desvelando a Golden Veil",
        description: "Derrube a Golden Veil capturando todos os seus 5 integrantes.",
        icon: "🏛️",
        target: 5,
        type: "faction_captured",
        factionId: "F3",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F4",
        title: "Caça ao Neon Phantom",
        description: "Derrube a Neon Phantom capturando todos os seus 5 integrantes.",
        icon: "💻",
        target: 5,
        type: "faction_captured",
        factionId: "F4",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F5",
        title: "Corte da Silent Thread",
        description: "Derrube a Silent Thread capturando todos os seus 5 integrantes.",
        icon: "🥷",
        target: 5,
        type: "faction_captured",
        factionId: "F5",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F6",
        title: "Derrubando a Crimson Crown",
        description: "Derrube a Crimson Crown capturando todos os seus 5 integrantes.",
        icon: "💰",
        target: 5,
        type: "faction_captured",
        factionId: "F6",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "faction_F7",
        title: "Fim do Omega Protocol",
        description: "Derrube o Omega Protocol capturando todos os seus 5 integrantes.",
        icon: "☢️",
        target: 5,
        type: "faction_captured",
        factionId: "F7",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_architect",
        title: "Derrubando The Architect",
        description: "Capture Elias Voss (The Architect), o líder da Shadow Forge.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L01",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_leviathan",
        title: "Derrubando Leviathan",
        description: "Capture Victor Graves (Leviathan), o líder da Black Tide.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L02",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_curator",
        title: "Derrubando The Curator",
        description: "Capture Sami Al-Karim (The Curator), o líder da Golden Veil.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L03",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_ghost_prime",
        title: "Derrubando Ghost Prime",
        description: "Capture Ghost Prime, o misterioso líder da Neon Phantom.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L04",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_silk_specter",
        title: "Derrubando Silk Specter",
        description: "Capture Aisha Rahman (Silk Specter), o líder da Silent Thread.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L05",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_monarch",
        title: "Derrubando The Monarch",
        description: "Capture Aleksandr Morozov (The Monarch), o líder da Crimson Crown.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L06",
        rewards: { moedas: 30000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
    {
        id: "capture_vesper",
        title: "Derrubando Vesper",
        description: "Capture Vesper, o Maior Criminoso e Líder Supremo da Meridian.",
        icon: "👑",
        target: 1,
        type: "capture_suspect",
        suspectId: "L07",
        rewards: { moedas: 100000, items: [{ key: "dossie_sigiloso", qty: 1 }, { key: "fonte_anonima", qty: 1 }, { key: "satelite_atlas", qty: 1 }] },
    },
    {
        id: "cases_100",
        title: "Veterano da Agência",
        description: "Solucione 100 casos com sucesso para a Agência A.T.L.A.S.",
        icon: "🏅",
        target: 100,
        type: "total_won",
        rewards: { moedas: 10000, items: [{ key: "dossie_sigiloso", qty: 1 }, { key: "licenca_tatica", qty: 1 }] },
    },
    {
        id: "easy_40",
        title: "Recruta Exemplar",
        description: "Solucione 40 casos no Modo Fácil.",
        icon: "🟢",
        target: 40,
        type: "difficulty_won",
        difficulty: "FACIL",
        rewards: { moedas: 5000, items: [{ key: "fonte_anonima", qty: 1 }] },
    },
    {
        id: "medium_50",
        title: "Analista Tático",
        description: "Solucione 50 casos no Modo Médio.",
        icon: "🔵",
        target: 50,
        type: "difficulty_won",
        difficulty: "MEDIO",
        rewards: { moedas: 5000, items: [{ key: "satelite_atlas", qty: 1 }] },
    },
    {
        id: "hard_50",
        title: "Operador de Elite",
        description: "Solucione 50 casos no Modo Difícil.",
        icon: "🟣",
        target: 50,
        type: "difficulty_won",
        difficulty: "DIFICIL",
        rewards: { moedas: 7000, items: [{ key: "licenca_tatica", qty: 1 }] },
    },
    {
        id: "hard_pvp_10",
        title: "Dominador PVP",
        description: "Vença 10 partidas competitivas no Modo Difícil.",
        icon: "⚔️",
        target: 10,
        type: "hard_wins",
        rewards: { moedas: 10000, items: [{ key: "licenca_tatica", qty: 1 }] },
    },
    {
        id: "speed_rank_1st_3",
        title: "Recordista Supremo",
        description: "Conquiste 3x o 1º Lugar no Ranking Tempo Recorde.",
        icon: "⚡",
        target: 3,
        type: "speed_rank_1st",
        rewards: { moedas: 20000, items: [{ key: "dossie_sigiloso", qty: 1 }] },
    },
];

export default function Conquistas() {
    const nav = useNavigate();
    const { state, replaceState, refreshInventory } = useGame();
    const player = state?.player;

    const [missionStats, setMissionStats] = useState(null);
    const [claiming, setClaiming] = useState(null);
    const [claimSuccess, setClaimSuccess] = useState(null);
    const [speedRank1stCount, setSpeedRank1stCount] = useState(0);

    // Busca estatísticas de missões e recordes do Supabase
    useEffect(() => {
        async function fetchStats() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const user = session?.user;
                if (!user) return;

                const { data: missions } = await supabase
                    .from("completed_missions")
                    .select("case_id, dificuldade, resultado")
                    .eq("user_id", user.id);

                if (missions) {
                    const won = missions.filter(m => m.resultado === "WON");
                    setMissionStats({
                        totalWon: won.length,
                        easyWon: won.filter(m => m.dificuldade === "FACIL").length,
                        mediumWon: won.filter(m => m.dificuldade === "MEDIO").length,
                        hardWon: won.filter(m => m.dificuldade === "DIFICIL").length,
                    });
                }

                // Conta em quantos casos o jogador está em 1º lugar no ranking de velocidade
                const { data: allRecords } = await supabase
                    .from("speed_records")
                    .select("user_id, case_id, duration_seconds")
                    .order("duration_seconds", { ascending: true });

                if (allRecords) {
                    // Agrupa por case_id e pega o 1º (menor tempo) de cada
                    const bestByCase = {};
                    for (const r of allRecords) {
                        if (!bestByCase[r.case_id]) {
                            bestByCase[r.case_id] = r;
                        }
                    }
                    // Conta quantas vezes o user é o 1º
                    const firstPlaceCount = Object.values(bestByCase).filter(r => r.user_id === user.id).length;
                    setSpeedRank1stCount(firstPlaceCount);
                }
            } catch (err) {
                console.error("[Conquistas] Erro ao buscar stats:", err);
            }
        }
        fetchStats();
    }, []);

    const claimed = useMemo(() => player?.claimedAchievements || [], [player?.claimedAchievements]);
    const capturedCount = useMemo(() => {
        return Object.keys(state?.capturedSuspects || {}).filter(id => !id.startsWith("L")).length;
    }, [state?.capturedSuspects]);

    function getProgress(achievement) {
        switch (achievement.type) {
            case "suspects":
                return capturedCount;
            case "faction_captured": {
                const faction = FACTIONS[achievement.factionId];
                if (!faction) return 0;
                return faction.members.filter(memberId => (state?.capturedSuspects?.[memberId] || 0) > 0).length;
            }
            case "capture_suspect":
                return (state?.capturedSuspects?.[achievement.suspectId] || 0) > 0 ? 1 : 0;
            case "total_won":
                return missionStats?.totalWon ?? 0;
            case "difficulty_won":
                if (achievement.difficulty === "FACIL") return missionStats?.easyWon ?? 0;
                if (achievement.difficulty === "MEDIO") return missionStats?.mediumWon ?? 0;
                if (achievement.difficulty === "DIFICIL") return missionStats?.hardWon ?? 0;
                return 0;
            case "hard_wins":
                return player?.hardWins || 0;
            case "speed_rank_1st":
                return speedRank1stCount;
            default:
                return 0;
        }
    }

    const sortedAchievements = useMemo(() => {
        return [...ACHIEVEMENTS].sort((a, b) => {
            const currentA = getProgress(a);
            const isCompleteA = currentA >= a.target;
            const isClaimedA = claimed.includes(a.id);

            const currentB = getProgress(b);
            const isCompleteB = currentB >= b.target;
            const isClaimedB = claimed.includes(b.id);

            const statusA = (isCompleteA && !isClaimedA) ? 0 : (!isCompleteA ? 1 : 2);
            const statusB = (isCompleteB && !isClaimedB) ? 0 : (!isCompleteB ? 1 : 2);

            if (statusA !== statusB) {
                return statusA - statusB;
            }
            return ACHIEVEMENTS.indexOf(a) - ACHIEVEMENTS.indexOf(b);
        });
    }, [claimed, capturedCount, missionStats, player?.hardWins, speedRank1stCount, state?.capturedSuspects]);

    async function claimReward(achievement) {
        if (claiming) return;
        setClaiming(achievement.id);

        try {
            // Adiciona moedas e marca como resgatado
            const nextPlayer = {
                ...state.player,
                dinheiro: (state.player.dinheiro || 0) + achievement.rewards.moedas,
                claimedAchievements: [...(state.player.claimedAchievements || []), achievement.id],
            };

            const nextState = { ...state, player: nextPlayer };
            replaceState(saveGame(nextState));

            // 🔥 Sincroniza com Supabase IMEDIATAMENTE para garantir persistência
            if (nextPlayer.supabaseId) {
                saveGameState(nextState, 0).catch(e =>
                    console.warn("[Conquistas] Erro ao sincronizar claim com Supabase:", e)
                );
            }

            // Adiciona itens no inventário (Supabase)
            if (state.player.supabaseId && achievement.rewards.items) {
                for (const item of achievement.rewards.items) {
                    await inventoryService.addItem(state.player.supabaseId, item.key, item.qty);
                }
                if (refreshInventory) refreshInventory();
            }

            setClaimSuccess(achievement.id);
            setTimeout(() => setClaimSuccess(null), 2500);
        } catch (err) {
            console.error("[Conquistas] Erro ao resgatar:", err);
        } finally {
            setClaiming(null);
        }
    }

    if (!state || !player) return null;

    return (
        <div style={{
            height: "100dvh",
            width: "100vw",
            background: "#0a0c10",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            padding: "16px 16px 0 16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            <style>{`
                @keyframes achv-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
                @keyframes achv-glow { 0%,100%{box-shadow:0 0 10px rgba(0,255,204,0.2)} 50%{box-shadow:0 0 25px rgba(0,255,204,0.5)} }
                @keyframes achv-claimed { 0%{opacity:0;transform:translateY(10px)} 100%{opacity:1;transform:translateY(0)} }
                @keyframes achv-bar { from{width:0} }
                
                .ac-wrap {
                    max-width: 480px;
                    margin: 0 auto;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .ac-header {
                    flex-shrink: 0;
                    padding-bottom: 14px;
                }
                .ac-body {
                    flex: 1;
                    overflow-y: auto;
                    padding-bottom: 20px;
                }
                .om-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .om-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 99px;
                }
                .om-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.12);
                    border-radius: 99px;
                }
                .om-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 255, 204, 0.3);
                }
            `}</style>

            <div className="ac-wrap">
                <div className="ac-header">
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                        <button
                            onClick={() => nav("/mural")}
                            style={{
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                color: "#fff", padding: "8px 16px", borderRadius: 10, fontSize: 12,
                                fontWeight: 700, cursor: "pointer",
                            }}
                        >
                            ← VOLTAR
                        </button>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.4 }}>📡 CENTRAL A.T.L.A.S.</div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: "#ffd700" }}>🏆 CONQUISTAS</div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
                    }}>
                        {[
                            { label: "Suspeitos", value: capturedCount, total: 35, color: "#ffd700" },
                            { label: "Vitórias", value: missionStats?.totalWon ?? "...", color: "#3cffA0" },
                            { label: "PVP Difícil", value: player.hardWins || 0, color: "#ff6b6b" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.04)", borderRadius: 12,
                                padding: "12px 8px", textAlign: "center",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}>
                                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: 9, letterSpacing: 1, opacity: 0.5, marginTop: 2 }}>{s.label.toUpperCase()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievement Cards */}
                <div className="ac-body om-scrollbar">
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingRight: 6 }}>
                        {sortedAchievements.map(ach => {
                            const current = getProgress(ach);
                            const pct = Math.min((current / ach.target) * 100, 100);
                            const isComplete = current >= ach.target;
                            const isClaimed = claimed.includes(ach.id);
                            const justClaimed = claimSuccess === ach.id;

                            return (
                                <div key={ach.id} style={{
                                    borderRadius: 16, overflow: "hidden",
                                    background: isClaimed
                                        ? "rgba(255,255,255,0.02)"
                                        : isComplete
                                            ? "rgba(0,255,204,0.04)"
                                            : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${isClaimed ? "rgba(255,255,255,0.06)" : isComplete ? "rgba(0,255,204,0.25)" : "rgba(255,255,255,0.08)"}`,
                                    ...(isComplete && !isClaimed ? { animation: "achv-glow 3s ease-in-out infinite" } : {}),
                                    opacity: isClaimed ? 0.5 : 1,
                                }}>
                                    <div style={{ padding: "16px 16px 12px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{
                                                fontSize: 28, minWidth: 42, textAlign: "center",
                                                ...(isComplete && !isClaimed ? { animation: "achv-pulse 2s ease-in-out infinite" } : {}),
                                            }}>
                                                {isClaimed ? "✅" : ach.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    fontSize: 14, fontWeight: 800,
                                                    color: isClaimed ? "rgba(255,255,255,0.4)" : isComplete ? "#00ffcc" : "#fff",
                                                }}>
                                                    {ach.title}
                                                </div>
                                                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2, lineHeight: 1.4 }}>
                                                    {ach.description}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right", minWidth: 50 }}>
                                                <div style={{
                                                    fontSize: 16, fontWeight: 900,
                                                    color: isComplete ? "#00ffcc" : "#fff",
                                                }}>
                                                    {Math.round(pct)}%
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div style={{
                                            marginTop: 12, height: 6, borderRadius: 3,
                                            background: "rgba(255,255,255,0.08)", overflow: "hidden",
                                        }}>
                                            <div style={{
                                                height: "100%", borderRadius: 3,
                                                width: `${pct}%`,
                                                background: isClaimed
                                                    ? "rgba(255,255,255,0.15)"
                                                    : isComplete
                                                        ? "linear-gradient(90deg, #00ffcc, #3cffA0)"
                                                        : "linear-gradient(90deg, #80bdff, #4dabff)",
                                                transition: "width 0.8s ease-out",
                                                animation: "achv-bar 1s ease-out",
                                            }} />
                                        </div>
                                        <div style={{ fontSize: 10, opacity: 0.4, marginTop: 4, textAlign: "right" }}>
                                            {Math.min(current, ach.target)}/{ach.target}
                                        </div>
                                    </div>

                                    {/* Reward Section */}
                                    <div style={{
                                        padding: "10px 16px 14px",
                                        borderTop: "1px solid rgba(255,255,255,0.05)",
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        gap: 10,
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.4, marginBottom: 4 }}>RECOMPENSA</div>
                                            <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700 }}>
                                                💰 R$ {ach.rewards.moedas.toLocaleString("pt-BR")}
                                                {ach.rewards.items.map((itm, i) => {
                                                    const info = ITEMS_DATA[itm.key];
                                                    return (
                                                        <span key={i} style={{ color: "#00ffcc", marginLeft: 6 }}>
                                                            + {String(itm.qty).padStart(2, "0")} {info?.nome || itm.key}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {isClaimed ? (
                                            <div style={{
                                                fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)",
                                                padding: "8px 14px", borderRadius: 10,
                                                background: "rgba(255,255,255,0.04)",
                                                ...(justClaimed ? { animation: "achv-claimed 0.4s ease-out" } : {}),
                                            }}>
                                                RESGATADO ✓
                                            </div>
                                        ) : isComplete ? (
                                            <button
                                                onClick={() => claimReward(ach)}
                                                disabled={!!claiming}
                                                style={{
                                                    padding: "8px 18px", borderRadius: 10,
                                                    border: "1px solid rgba(0,255,204,0.4)",
                                                    background: "linear-gradient(135deg, rgba(0,255,204,0.15), rgba(0,255,204,0.05))",
                                                    color: "#00ffcc", fontSize: 11, fontWeight: 800,
                                                    cursor: claiming ? "wait" : "pointer",
                                                    letterSpacing: 1,
                                                }}
                                            >
                                                {claiming === ach.id ? "..." : "RESGATAR"}
                                            </button>
                                        ) : (
                                            <div style={{
                                                fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.2)",
                                                padding: "8px 14px", borderRadius: 10,
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                            }}>
                                                BLOQUEADO 🔒
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Footer spacing */}
                    <div style={{ height: 20 }} />
                </div>
            </div>
        </div>
    );
}
