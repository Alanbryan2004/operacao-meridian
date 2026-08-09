import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";
import AvatarDisplay from "../components/AvatarDisplay";
import { fetchGlobalTopRecords, formatDuration } from "../services/speedRecordService";
import { casesSeed } from "../game/seed";

export default function HallDaFama() {
    const nav = useNavigate();
    const { state } = useGame();
    const [rankings, setRankings] = useState(() => {
        try {
            const cached = localStorage.getItem("meridian_rankings_capturas");
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });
    const [speedRecords, setSpeedRecords] = useState(() => {
        try {
            const cached = localStorage.getItem("meridian_rankings_speed");
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });
    const [streakRecords, setStreakRecords] = useState(() => {
        try {
            const cached = localStorage.getItem("meridian_rankings_streak");
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });
    const [loadingRankings, setLoadingRankings] = useState(() => rankings.length === 0);
    const [loadingSpeed, setLoadingSpeed] = useState(() => speedRecords.length === 0);
    const [loadingStreak, setLoadingStreak] = useState(() => streakRecords.length === 0);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [activeTab, setActiveTab] = useState("CAPTURAS"); // CAPTURAS | TEMPO_RECORDE
    const [fetchError, setFetchError] = useState(null);
 
    useEffect(() => {
        let active = true;

        async function fetchRankings() {
            let completed = false;
            const timer = setTimeout(() => {
                if (!completed && active) {
                    console.warn("[HallDaFama] fetchRankings timed out");
                    setLoadingRankings(false);
                }
            }, 8000);

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("id, nickname, rank, total_capturas, level, avatar, frase, avatar_key, hard_wins, hard_losses, legendary_wins, legendary_losses, current_streak")
                    .order("total_capturas", { ascending: false })
                    .limit(20);

                completed = true;
                clearTimeout(timer);

                if (error) throw error;
                
                const updated = data || [];
                if (active) {
                    setRankings(updated);
                    try {
                        localStorage.setItem("meridian_rankings_capturas", JSON.stringify(updated));
                    } catch (e) {}
                }
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
                if (active) setFetchError(err.message || String(err));
            } finally {
                if (active) setLoadingRankings(false);
            }
        }

        async function fetchSpeedRankings() {
            let completed = false;
            const timer = setTimeout(() => {
                if (!completed && active) {
                    console.warn("[HallDaFama] fetchSpeedRankings timed out");
                    setLoadingSpeed(false);
                }
            }, 8000);

            try {
                const result = await fetchGlobalTopRecords(20);
                completed = true;
                clearTimeout(timer);

                const updated = result || [];
                if (active) {
                    setSpeedRecords(updated);
                    try {
                        localStorage.setItem("meridian_rankings_speed", JSON.stringify(updated));
                    } catch (e) {}
                }
            } catch (err) {
                console.error("Erro ao buscar recordes de velocidade:", err);
                if (active) setFetchError(err.message || String(err));
            } finally {
                if (active) setLoadingSpeed(false);
            }
        }

        async function fetchStreakRankings() {
            let completed = false;
            const timer = setTimeout(() => {
                if (!completed && active) {
                    console.warn("[HallDaFama] fetchStreakRankings timed out");
                    setLoadingStreak(false);
                }
            }, 8000);

            try {
                const { data: profiles, error } = await supabase
                    .from("profiles")
                    .select("id, nickname, rank, total_capturas, level, avatar, frase, avatar_key, hard_wins, hard_losses, legendary_wins, legendary_losses, current_streak")
                    .gt("current_streak", 0)
                    .order("current_streak", { ascending: false })
                    .limit(20);

                completed = true;
                clearTimeout(timer);

                if (error) throw error;

                // Achatar o resultado para o formato esperado pelo componente
                const merged = (profiles || []).map(p => ({
                    ...p,
                    user_id: p.id,
                    id: p.id
                }));
                
                if (active) {
                    setStreakRecords(merged);
                    try {
                        localStorage.setItem("meridian_rankings_streak", JSON.stringify(merged));
                    } catch (e) {}
                }
            } catch (err) {
                console.error("Erro ao buscar recordes de ofensiva:", err);
                if (active) setFetchError(err.message || String(err));
            } finally {
                if (active) setLoadingStreak(false);
            }
        }

        fetchRankings();
        fetchSpeedRankings();
        fetchStreakRankings();

        return () => {
            active = false;
        };
    }, []);

    if (!state) return null;
    const { player } = state;

    // Estado e efeito para controlar a animação de subida (climb) do jogador no ranking
    const [animateClimb, setAnimateClimb] = useState(false);

    useEffect(() => {
        setAnimateClimb(false);
        const tabLoading = 
            activeTab === "CAPTURAS" ? loadingRankings :
            activeTab === "TEMPO_RECORDE" ? loadingSpeed :
            loadingStreak;

        if (!tabLoading) {
            const timer = setTimeout(() => {
                setAnimateClimb(true);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [activeTab, loadingRankings, loadingSpeed, loadingStreak]);

    // Calcula o deslocamento e a transição da subida do jogador
    function getClimbStyle(idx, items, isPlayer) {
        if (!animateClimb) {
            const playerIdx = items.findIndex(item => {
                if (activeTab === "CAPTURAS") {
                    return item.nickname === player.nome;
                } else if (activeTab === "OFENSIVA") {
                    return item.nickname === player.nome || item.user_id === state.player?.supabaseId;
                } else {
                    return item.user_id === state.player?.supabaseId;
                }
            });

            if (playerIdx !== -1) {
                const startIdx = Math.min(items.length - 1, playerIdx + 4);
                const delta = startIdx - playerIdx;

                if (isPlayer) {
                    return {
                        transform: `translateY(${delta * 92}px)`,
                        zIndex: 10,
                        boxShadow: "0 0 25px rgba(0, 255, 160, 0.4)",
                        borderColor: "rgba(0, 255, 160, 0.6)",
                    };
                } else if (idx > playerIdx && idx <= startIdx) {
                    return {
                        transform: "translateY(-92px)",
                    };
                }
            }
        }

        return {
            transform: "translateY(0)",
            transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s, background 0.4s, box-shadow 0.4s",
        };
    }

    // Helper: busca título do caso pelo case_id
    function getCaseTitle(caseId) {
        const c = casesSeed.find(s => s.id === caseId);
        return c?.titulo || caseId;
    }

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "radial-gradient(circle at top, #0c2a3d 0%, #000 80%)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            position: 'relative'
        }}>
            <style>{`
                .hf-container { 
                    max-width: 500px; 
                    margin: 0 auto; 
                    padding: 16px; 
                    height: 100dvh; 
                    display: flex; 
                    flex-direction: column; 
                    box-sizing: border-box; 
                    overflow: hidden; 
                }
                .hf-scrollable-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 4px 6px 16px 6px;
                    margin: 0 -6px;
                }
                .hf-scrollable-content::-webkit-scrollbar {
                    width: 6px;
                }
                .hf-scrollable-content::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.01);
                    border-radius: 999px;
                }
                .hf-scrollable-content::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.12);
                    border-radius: 999px;
                }
                .hf-scrollable-content::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
                .hf-header { text-align: center; margin-bottom: 16px; }
                .hf-title { font-size: 28px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #fff; text-shadow: 0 0 15px rgba(0,255,160,0.3); }
                .hf-subtitle { font-size: 13px; opacity: 0.6; margin-top: 6px; }
                .hf-list { display: grid; gap: 12px; }
                .hf-card {
                    display: flex; align-items: center; gap: 15px; padding: 14px;
                    border-radius: 20px; border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(255,255,255,0.05); backdrop-filter: blur(12px);
                    transition: all 0.2s; cursor: pointer;
                }
                .hf-card:hover { transform: translateX(5px); border-color: rgba(0,255,160,0.3); background: rgba(255,255,255,0.08); }
                .hf-card-player {
                    background: linear-gradient(135deg, rgba(0,255,160,0.1) 0%, rgba(0,180,255,0.05) 100%);
                    border: 1px solid rgba(0,255,160,0.3);
                }
                .hf-rank { font-size: 18px; font-weight: 800; color: rgba(255,255,255,0.2); width: 30px; text-align: center; }
                .hf-rank-1 { color: #ffd700; text-shadow: 0 0 10px rgba(255,215,0,0.5); }
                .hf-rank-2 { color: #c0c0c0; }
                .hf-rank-3 { color: #cd7f32; }
                
                .hf-avatar { 
                    width: 50px; height: 50px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); 
                    overflow: hidden; flex-shrink: 0; background: #000;
                }
                .hf-avatar img { width: 100%; height: 100%; object-fit: cover; }

                .hf-info { flex: 1; }
                .hf-name { font-size: 15px; font-weight: 700; color: #fff; }
                .hf-role { font-size: 11px; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
                
                .hf-score { text-align: right; }
                .hf-score-val { font-size: 18px; font-weight: 900; color: #00ffa0; }
                .hf-score-label { font-size: 9px; opacity: 0.4; text-transform: uppercase; }

                /* Tabs */
                .hf-tabs { display: flex; gap: 0; margin-bottom: 20px; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
                .hf-tab {
                    flex: 1; padding: 12px 8px; text-align: center; font-size: 12px; font-weight: 800;
                    letter-spacing: 1.5px; cursor: pointer; transition: all 0.2s;
                    background: rgba(255,255,255,0.03); color: rgba(255,255,255,0.4); border: none;
                }
                .hf-tab:first-child { border-right: 1px solid rgba(255,255,255,0.08); }
                .hf-tab-active {
                    background: linear-gradient(135deg, rgba(0,255,160,0.1), rgba(0,180,255,0.06));
                    color: #00ffa0; box-shadow: inset 0 -2px 0 #00ffa0;
                }
                .hf-tab-speed.hf-tab-active {
                    background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,180,0,0.06));
                    color: #ffd700; box-shadow: inset 0 -2px 0 #ffd700;
                }
                .hf-tab-streak.hf-tab-active {
                    background: linear-gradient(135deg, rgba(255,100,0,0.1), rgba(255,50,0,0.06));
                    color: #ff8080; box-shadow: inset 0 -2px 0 #ff8080;
                }

                /* Dossiê Modal */
                .hf-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 100;
                    display: flex; align-items: center; justify-content: center; padding: 20px;
                    backdrop-filter: blur(10px); animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                
                .hf-dossier {
                    width: 100%; max-width: 400px; background: #0f172a; border-radius: 32px;
                    border: 1px solid rgba(255,255,255,0.1); padding: 40px;
                    display: flex; flex-direction: column; align-items: center; text-align: center;
                    box-shadow: 0 0 50px rgba(0,255,160,0.2);
                }
                .hf-d-title { font-size: 10px; letter-spacing: 3px; color: #64748b; margin-bottom: 20px; font-weight: 800; }
                .hf-d-name { font-size: 24px; font-weight: 900; margin: 15px 0 5px; }
                .hf-d-role { color: #00ffa0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                .hf-d-phrase { 
                   margin-top: 25px; padding: 20px; font-style: italic; color: #94a3b8; line-height: 1.5;
                   border-top: 1px solid rgba(255,255,255,0.05); position: relative;
                }
                .hf-d-phrase::before { content: '"'; font-size: 40px; position: absolute; top: -10px; opacity: 0.1; }

                .hf-back {
                    margin-top: 30px; padding: 16px; border-radius: 16px;
                    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
                    color: #fff; font-size: 13px; font-weight: 600; cursor: pointer;
                    width: 100%; text-align: center; letter-spacing: 1px; transition: background 0.2s;
                }
                .hf-d-stat {
                    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
                    padding: 15px 10px; border-radius: 16px; flex: 1;
                }

                /* Speed record card */
                .hf-speed-time { font-size: 16px; font-weight: 900; color: #ffd700; }
                .hf-speed-case { font-size: 10px; opacity: 0.45; margin-top: 2px; line-height: 1.3; }
            `}</style>

            <div className="hf-container">
                <div className="hf-header">
                    <div className="hf-title">Hall da Fama</div>
                    <div className="hf-subtitle">Agentes que fizeram história na Meridian.</div>
                </div>

                {/* Tabs */}
                <div className="hf-tabs">
                    <button
                        className={`hf-tab ${activeTab === "CAPTURAS" ? "hf-tab-active" : ""}`}
                        onClick={() => setActiveTab("CAPTURAS")}
                    >
                        🎯 CAPTURAS
                    </button>
                    <button
                        className={`hf-tab hf-tab-speed ${activeTab === "TEMPO_RECORDE" ? "hf-tab-active" : ""}`}
                        onClick={() => setActiveTab("TEMPO_RECORDE")}
                    >
                        ⚡ TEMPO RECORDE
                    </button>
                    <button
                        className={`hf-tab hf-tab-streak ${activeTab === "OFENSIVA" ? "hf-tab-active" : ""}`}
                        onClick={() => setActiveTab("OFENSIVA")}
                    >
                        🔥 OFENSIVA
                    </button>
                </div>

                <div className="hf-scrollable-content">
                    {fetchError && (
                        <div style={{ margin: '14px', padding: '14px', background: 'rgba(255, 75, 75, 0.15)', border: '1px solid #ff4b4b', borderRadius: '8px', color: '#ff8080', fontSize: '13px', textAlign: 'center', lineHeight: '1.4' }}>
                            <strong>Erro de Conexão:</strong><br/>
                            {fetchError}
                        </div>
                    )}

                {/* Tab: CAPTURAS */}
                {activeTab === "CAPTURAS" && (
                    <div className="hf-list">
                        {loadingRankings ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Descriptografando registros...</div>
                        ) : rankings.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Nenhum agente registrado ainda.</div>
                        ) : rankings.map((r, idx) => {
                            const rankNum = idx + 1;
                            const isPlayer = r.nickname === player.nome;

                            return (
                                <div
                                    key={r.id || idx}
                                    className={`hf-card ${isPlayer ? 'hf-card-player' : ''}`}
                                    onClick={() => setSelectedAgent(r)}
                                    style={getClimbStyle(idx, rankings, isPlayer)}
                                >
                                    <div className={`hf-rank ${rankNum <= 3 ? `hf-rank-${rankNum}` : ''}`}>
                                        {rankNum}
                                    </div>
                                    <div className="hf-avatar">
                                        <AvatarDisplay
                                            config={r.avatar}
                                            googlePhoto={r.avatar_key}
                                            size={50}
                                            style={{ borderRadius: 12 }}
                                            useGoogleFirst={true}
                                        />
                                    </div>
                                    <div className="hf-info">
                                        <div className="hf-name">{r.nickname} {isPlayer && "(VOCÊ)"}</div>
                                        <div className="hf-role" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                                            <span>{r.rank || "Agente"} (Nível {r.level || 1})</span>
                                            {r.current_streak > 0 && (
                                                <span style={{ color: "#ff8080", fontSize: 9, fontWeight: 900, background: "rgba(255,128,128,0.1)", padding: "2px 6px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 2 }}>
                                                    🔥 {r.current_streak}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hf-score">
                                        <div className="hf-score-val">{r.total_capturas || 0}</div>
                                        <div className="hf-score-label">Capturas</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Tab: TEMPO RECORDE */}
                {activeTab === "TEMPO_RECORDE" && (
                    <div className="hf-list">
                        {loadingSpeed ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Descriptografando registros...</div>
                        ) : speedRecords.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.4 }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>Nenhum recorde registrado</div>
                                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
                                    Complete missões com sucesso para aparecer aqui!
                                </div>
                            </div>
                        ) : speedRecords.map((r, idx) => {
                            const rankNum = idx + 1;
                            const isPlayer = r.user_id === state.player?.supabaseId;
                            const caseTitle = getCaseTitle(r.case_id);

                            return (
                                <div
                                    key={r.user_id + r.case_id}
                                    className={`hf-card ${isPlayer ? 'hf-card-player' : ''}`}
                                    onClick={() => setSelectedAgent({
                                        nickname: r.nickname,
                                        rank: r.rank,
                                        avatar: r.avatar,
                                        avatar_key: r.avatar_key,
                                        total_capturas: null,
                                        speedRecord: { duration: r.duration_seconds, caseTitle, caseId: r.case_id },
                                    })}
                                    style={getClimbStyle(idx, speedRecords, isPlayer)}
                                >
                                    <div className={`hf-rank ${rankNum <= 3 ? `hf-rank-${rankNum}` : ''}`}>
                                        {rankNum}
                                    </div>
                                    <div className="hf-avatar">
                                        <AvatarDisplay
                                            config={r.avatar}
                                            googlePhoto={r.avatar_key}
                                            size={50}
                                            style={{ borderRadius: 12 }}
                                            useGoogleFirst={true}
                                        />
                                    </div>
                                    <div className="hf-info">
                                        <div className="hf-name">{r.nickname} {isPlayer && "(VOCÊ)"}</div>
                                        <div className="hf-speed-case">{caseTitle}</div>
                                    </div>
                                    <div className="hf-score">
                                        <div className="hf-speed-time">{formatDuration(r.duration_seconds)}</div>
                                        <div className="hf-score-label">Tempo</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Tab: OFENSIVA */}
                {activeTab === "OFENSIVA" && (
                    <div className="hf-list">
                        {loadingStreak ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Descriptografando registros...</div>
                        ) : streakRecords.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Nenhum agente registrado ainda.</div>
                        ) : streakRecords.map((r, idx) => {
                            const rankNum = idx + 1;
                            const isPlayer = r.user_id === state.player?.supabaseId || r.nickname === player.nome;

                            return (
                                <div
                                    key={r.user_id || idx}
                                    className={`hf-card ${isPlayer ? 'hf-card-player' : ''}`}
                                    onClick={() => setSelectedAgent({
                                        ...r,
                                        total_capturas: r.total_capturas
                                    })}
                                    style={getClimbStyle(idx, streakRecords, isPlayer)}
                                >
                                    <div className={`hf-rank ${rankNum <= 3 ? `hf-rank-${rankNum}` : ''}`}>
                                        {rankNum}
                                    </div>
                                    <div className="hf-avatar">
                                        <AvatarDisplay
                                            config={r.avatar}
                                            googlePhoto={r.avatar_key}
                                            size={50}
                                            style={{ borderRadius: 12 }}
                                            useGoogleFirst={true}
                                        />
                                    </div>
                                    <div className="hf-info">
                                        <div className="hf-name">{r.nickname} {isPlayer && "(VOCÊ)"}</div>
                                        <div className="hf-role">{r.rank || "Agente"} (Nível {r.level || 1})</div>
                                    </div>
                                    <div className="hf-score">
                                        <div className="hf-score-val" style={{ color: "#ff8080" }}>{r.current_streak || 0}</div>
                                        <div className="hf-score-label">Dias</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                </div>

                <button className="hf-back" onClick={() => nav("/mural")}>
                    VOLTAR AO MURAL
                </button>
            </div>

            {/* Dossiê Overlay */}
            {selectedAgent && (
                <div className="hf-overlay" onClick={() => setSelectedAgent(null)}>
                    <div className="hf-dossier" onClick={e => e.stopPropagation()}>
                        <div className="hf-d-title">DOSSIÊ DO AGENTE</div>
                        <AvatarDisplay
                            config={selectedAgent.avatar}
                            googlePhoto={selectedAgent.avatar_key}
                            size={180}
                            style={{ borderRadius: 24 }}
                            useGoogleFirst={false}
                        />
                        <div className="hf-d-name">{selectedAgent.nickname}</div>
                        <div className="hf-d-role">
                            {selectedAgent.rank || "Agente"} · Nível {selectedAgent.level || 1}
                        </div>

                        {/* Speed Record info (quando vem da tab de recordes) */}
                        {selectedAgent.speedRecord && (
                            <div style={{
                                marginTop: 20, padding: 16, borderRadius: 16, width: "100%",
                                background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)"
                            }}>
                                <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: 2, fontWeight: 800, marginBottom: 6 }}>⚡ MELHOR TEMPO</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: "#ffd700" }}>
                                    {formatDuration(selectedAgent.speedRecord.duration)}
                                </div>
                                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 6 }}>
                                    {selectedAgent.speedRecord.caseTitle}
                                </div>
                            </div>
                        )}

                        {/* Capturas info (quando vem da tab de capturas) */}
                        {selectedAgent.total_capturas !== null && selectedAgent.total_capturas !== undefined && (
                            <>
                                <div style={{ marginTop: 10, color: '#64748b', fontSize: 11, fontWeight: 800 }}>
                                    {selectedAgent.total_capturas || 0} CRIMINOSOS CAPTURADOS
                                </div>

                                <div style={{ display: "flex", gap: 12, width: "100%", marginTop: 25 }}>
                                    <div className="hf-d-stat">
                                        <img src="/icones/emblema_dificil.png" alt="" style={{ width: 40, height: 40, marginBottom: 6, filter: "drop-shadow(0 0 8px rgba(255,0,0,0.3))" }} />
                                        <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: 1, fontWeight: 800, textTransform: "uppercase" }}>Caso Difícil</div>
                                        <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4 }}>
                                            {selectedAgent.hard_wins || 0} <span style={{ color: '#00ffa0', fontSize: 10 }}>VIT</span>
                                            <span style={{ opacity: 0.2, margin: "0 6px" }}>|</span>
                                            {selectedAgent.hard_losses || 0} <span style={{ color: '#ff4b4b', fontSize: 10 }}>DER</span>
                                        </div>
                                    </div>
                                    <div className="hf-d-stat">
                                        <img src="/icones/emblema_lendario.png" alt="" style={{ width: 40, height: 40, marginBottom: 6, filter: "drop-shadow(0 0 8px rgba(255,215,0,0.2))" }} />
                                        <div style={{ fontSize: 9, opacity: 0.5, letterSpacing: 1, fontWeight: 800, textTransform: "uppercase" }}>Caso Lendário</div>
                                        <div style={{ fontSize: 15, fontWeight: 900, marginTop: 4 }}>
                                            {selectedAgent.legendary_wins || 0} <span style={{ color: '#00ffa0', fontSize: 10 }}>VIT</span>
                                            <span style={{ opacity: 0.2, margin: "0 6px" }}>|</span>
                                            {selectedAgent.legendary_losses || 0} <span style={{ color: '#ff4b4b', fontSize: 10 }}>DER</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedAgent.frase ? (
                            <div className="hf-d-phrase">
                                {selectedAgent.frase}
                            </div>
                        ) : (
                            <div className="hf-d-phrase" style={{ opacity: 0.3 }}>
                                "Nenhum lema registrado nos arquivos da A.T.L.A.S."
                            </div>
                        )}

                        <button
                            className="hf-back"
                            style={{ marginTop: 40, background: '#1e293b' }}
                            onClick={() => setSelectedAgent(null)}
                        >
                            FECHAR ARQUIVO
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
