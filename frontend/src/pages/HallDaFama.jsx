import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";
import AvatarDisplay from "../components/AvatarDisplay";

export default function HallDaFama() {
    const nav = useNavigate();
    const { state } = useGame();
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        async function fetchRankings() {
            try {
                // Ensure we select 'avatar', 'frase' AND 'avatar_key'
                const { data, error } = await supabase
                    .from("profiles")
                    .select("id, nickname, rank, total_capturas, level, avatar, frase, avatar_key")
                    .order("total_capturas", { ascending: false })
                    .limit(20);

                if (error) throw error;
                setRankings(data || []);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRankings();
    }, []);

    if (!state) return null;
    const { player } = state;

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
                .hf-container { max-width: 500px; margin: 0 auto; padding: 20px; padding-bottom: 40px; }
                .hf-header { text-align: center; margin-bottom: 30px; padding-top: 20px; }
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
            `}</style>

            <div className="hf-container">
                <div className="hf-header">
                    <div className="hf-title">Hall da Fama</div>
                    <div className="hf-subtitle">Agentes que fizeram história na Meridian.</div>
                </div>

                <div className="hf-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Descriptografando registros...</div>
                    ) : rankings.map((r, idx) => {
                        const rankNum = idx + 1;
                        const isPlayer = r.nickname === player.nome;
                        
                        return (
                            <div 
                                key={r.id || idx} 
                                className={`hf-card ${isPlayer ? 'hf-card-player' : ''}`}
                                onClick={() => setSelectedAgent(r)}
                            >
                                <div className={`hf-rank ${rankNum <= 3 ? `hf-rank-${rankNum}` : ''}`}>
                                    {rankNum}
                                </div>
                                <div className="hf-avatar">
                                    <img 
                                        src={r.avatar_key || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.nickname}`} 
                                        alt={r.nickname} 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.nickname}`;
                                        }}
                                    />
                                </div>
                                <div className="hf-info">
                                    <div className="hf-name">{r.nickname} {isPlayer && "(VOCÊ)"}</div>
                                    <div className="hf-role">{r.rank || "Agente"} (Nível {r.level || 1})</div>
                                </div>
                                <div className="hf-score">
                                    <div className="hf-score-val">{r.total_capturas || 0}</div>
                                    <div className="hf-score-label">Capturas</div>
                                </div>
                            </div>
                        );
                    })}
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
                        <AvatarDisplay config={selectedAgent.avatar} size={180} style={{ borderRadius: 24 }} />
                        <div className="hf-d-name">{selectedAgent.nickname}</div>
                        <div className="hf-d-role">
                            {selectedAgent.rank || "Agente"} · Nível {selectedAgent.level || 1}
                        </div>
                        <div style={{ marginTop: 10, color: '#64748b', fontSize: 11, fontWeight: 800 }}>
                             {selectedAgent.total_capturas || 0} CRIMINOSOS CAPTURADOS
                        </div>
                        
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
