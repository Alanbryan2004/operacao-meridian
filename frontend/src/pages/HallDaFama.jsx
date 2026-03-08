import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { supabase } from "../lib/supabase";

export default function HallDaFama() {
    const nav = useNavigate();
    const { state } = useGame();
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRankings() {
            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("id, nickname, rank, total_capturas, level, avatar_key")
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
            fontFamily: "'Inter', sans-serif"
        }}>
            <style>{`
                .hf-container { max-width: 500px; margin: 0 auto; padding: 20px; padding-bottom: 40px; }
                .hf-header { text-align: center; margin-bottom: 30px; padding-top: 20px; }
                .hf-title { font-size: 24px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #fff; text-shadow: 0 0 15px rgba(0,255,160,0.3); }
                .hf-subtitle { font-size: 13px; opacity: 0.6; margin-top: 6px; }
                .hf-list { display: grid; gap: 12px; }
                .hf-card {
                    display: flex; align-items: center; gap: 15px; padding: 16px;
                    border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.05); backdrop-filter: blur(12px);
                    transition: transform 0.2s, border-color 0.2s;
                }
                .hf-card-player {
                    background: linear-gradient(135deg, rgba(0,255,160,0.15) 0%, rgba(0,180,255,0.1) 100%);
                    border: 1px solid rgba(0,255,160,0.4);
                    box-shadow: 0 0 20px rgba(0,255,160,0.1);
                }
                .hf-rank { font-size: 18px; font-weight: 800; color: rgba(255,255,255,0.3); width: 25px; text-align: center; }
                .hf-rank-1 { color: #ffd700; text-shadow: 0 0 10px rgba(255,215,0,0.5); }
                .hf-rank-2 { color: #c0c0c0; }
                .hf-rank-3 { color: #cd7f32; }
                .hf-avatar { width: 50px; height: 50px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; background: #111; }
                .hf-info { flex: 1; }
                .hf-name { font-size: 15px; font-weight: 700; color: #fff; }
                .hf-role { font-size: 11px; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
                .hf-score { text-align: right; }
                .hf-score-val { font-size: 18px; font-weight: 900; color: #00ffa0; }
                .hf-score-label { font-size: 9px; opacity: 0.4; text-transform: uppercase; }
                .hf-back {
                    margin-top: 30px; padding: 16px; border-radius: 16px;
                    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
                    color: #fff; font-size: 13px; font-weight: 600; cursor: pointer;
                    width: 100%; text-align: center; letter-spacing: 1px; transition: background 0.2s;
                }
                .hf-back:active { transform: scale(0.98); background: rgba(255,255,255,0.15); }
            `}</style>

            <div className="hf-container">
                <div className="hf-header">
                    <div className="hf-title">Hall da Fama</div>
                    <div className="hf-subtitle">Os maiores agentes da agência A.T.L.A.S.</div>
                </div>

                <div className="hf-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Acessando arquivos da A.T.L.A.S...</div>
                    ) : rankings.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Nenhum agente registrado ainda.</div>
                    ) : rankings.map((r, idx) => {
                        const rank = idx + 1;
                        const isPlayer = r.nickname === player.nome; // Simples comparação por nome (ou id se tivéssemos user.id aqui)
                        
                        return (
                            <div key={idx} className={`hf-card ${isPlayer ? 'hf-card-player' : ''}`}>
                                <div className={`hf-rank ${rank <= 3 ? `hf-rank-${rank}` : ''}`}>
                                    {rank}
                                </div>
                                <div className="hf-avatar">
                                    <img 
                                        src={r.avatar_key || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.nickname}`} 
                                        alt={r.nickname} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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
                                    <div className="hf-score-label">Casos</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="hf-back" onClick={() => nav("/mural")}>
                    VOLTAR AO MURAL
                </button>
            </div>
        </div>
    );
}
