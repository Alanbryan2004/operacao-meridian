// src/pages/Mural.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import ModalMsg from "../components/ModalMsg";
import { loadCompletedMissions } from "../services/gameSaveService";
import { getStreakData } from "../game/streakService";
import { checkLoginReward } from "../game/loginRewardService";
import InventoryModal from "../components/InventoryModal";

function Badge({ children, tone = "gray", onClick, style: extraStyle }) {
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
        <span onClick={onClick} style={{ fontSize: 11, padding: "6px 10px", borderRadius: 999, background: s.bg, border: `1px solid ${s.bd}`, color: s.tx, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", ...extraStyle }}>
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
            </div>
        </button>
    );
}

export default function Mural() {
    const { state, refreshInventory, inventory } = useGame();
    const nav = useNavigate();
    const [modal, setModal] = useState({ show: false, message: "" });
    const [completedIds, setCompletedIds] = useState([]);
    const [loadingMissions, setLoadingMissions] = useState(true);
    const [showPromo, setShowPromo] = useState(false);
    const [streakData, setStreakData] = useState(null);
    const [loginStreakData, setLoginStreakData] = useState(null);
    const [loginReward, setLoginReward] = useState({ show: false, moedas: 0, diamantes: 0, diasRestantes: 0, isMax: false });
    const [newsIndex, setNewsIndex] = useState(0);
    const [dragStart, setDragStart] = useState(null);
    const [showInventory, setShowInventory] = useState(false);
    const [hasNewItem, setHasNewItem] = useState(false);
    const [weeklyRankReward, setWeeklyRankReward] = useState({ show: false, id: null, rankPosition: 0, moedas: 0, items: null });

    async function handleClaimWeeklyRankReward() {
        if (!weeklyRankReward.id) return;
        
        try {
            const { claimWeeklyRankingReward } = await import("../services/weeklyRankingRewardService");
            const success = await claimWeeklyRankingReward(weeklyRankReward.id);
            
            if (success) {
                // Credita moedas localmente se houver
                if (weeklyRankReward.moedas > 0) {
                    useGame().dispatch({ 
                        type: "UPDATE_PLAYER", 
                        payload: { dinheiro: state.player.dinheiro + weeklyRankReward.moedas } 
                    });
                }
                
                // Credita itens no inventário (Supabase)
                if (weeklyRankReward.items) {
                    const { inventoryService } = await import("../game/inventoryService");
                    for (const [key, qty] of Object.entries(weeklyRankReward.items)) {
                        await inventoryService.addItem(state.player.supabaseId, key, qty);
                    }
                    if (refreshInventory) refreshInventory();
                }
            }
        } catch (err) {
            console.error("[Mural] Erro ao resgatar recompensa semanal:", err);
        } finally {
            setWeeklyRankReward({ show: false, id: null, rankPosition: 0, moedas: 0, items: null });
        }
    }

    useEffect(() => {
        if (!state?.player?.supabaseId) return;

        Promise.all([
            loadCompletedMissions(),
            getStreakData(state.player.supabaseId)
        ])
        .then(([missions, streak]) => {
            const ids = missions.filter(m => m.resultado === "WON").map(m => m.case_id);
            setCompletedIds(ids);
            setStreakData(streak);
            
            // Checa Recompensa de Login
            return checkLoginReward(state.player.supabaseId);
        })
        .then(async reward => {
            if (reward?.show) {
                setLoginReward(reward);
                setLoginStreakData({
                    current_streak: reward.day,
                    last_reward_date: new Date().toISOString().split('T')[0]
                });
                
                // Atualiza moedas localmente
                useGame().dispatch({ 
                    type: "UPDATE_PLAYER", 
                    payload: { dinheiro: state.player.dinheiro + reward.reward } 
                });

                // 🔥 Se houver itens na recompensa, adiciona no banco
                if (reward.items) {
                    try {
                        const { inventoryService } = await import("../game/inventoryService");
                        for (const [key, qty] of Object.entries(reward.items)) {
                            await inventoryService.addItem(state.player.supabaseId, key, qty);
                        }
                    } catch (e) {
                        console.error("[Mural] Erro ao creditar itens de login:", e);
                    }
                }
            } else if (reward?.streak) {
                setLoginStreakData(reward.streak);
            }

            // Checa Recompensa de Ranking Semanal
            try {
                const { checkWeeklyRankingReward } = await import("../services/weeklyRankingRewardService");
                const weeklyReward = await checkWeeklyRankingReward(state.player.supabaseId);
                if (weeklyReward?.show) {
                    setWeeklyRankReward(weeklyReward);
                }
            } catch (e) {
                console.error("[Mural] Erro ao checar recompensa de ranking semanal:", e);
            }
        })
        .finally(() => setLoadingMissions(false));
    }, [state?.player?.supabaseId]);

    // Checa se há itens novos no inventário
    useEffect(() => {
        if (!inventory) return;
        const totalItems = Object.values(inventory).reduce((a, b) => a + b, 0) + (state.player.vouchers?.length || 0);
        const lastTotal = parseInt(localStorage.getItem("meridian_last_total_items") || "0");
        
        if (totalItems > lastTotal) {
            setHasNewItem(true);
        }
    }, [inventory, state.player.vouchers]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
        if (state && !state.player?.avatar) {
            nav("/avatar-creator?onboarding=true");
        }

        // --- Checa Promo de Voucher e Licenca (1x) ---
        if (state && !loadingMissions) {
            const hasSeenLicenca = localStorage.getItem("licenca_tatica_promo_v3");
            const hasSeenVoucher = localStorage.getItem("atlas_voucher_promo_v1");
            
            if (!hasSeenLicenca || !hasSeenVoucher) {
                if (!loginReward.show) {
                    if (!hasSeenLicenca) {
                        localStorage.setItem("licenca_tatica_promo_v3", "true");
                        import("../game/inventoryService").then(({ inventoryService }) => {
                            inventoryService.addItem(state.player.supabaseId, "licenca_tatica", 2)
                            .then(() => {
                                if (refreshInventory) refreshInventory();
                            })
                            .catch(e => console.error(e));
                        });
                        setShowPromo(true);
                        setNewsIndex(0); // Abre direto na Licença
                    } else if (!hasSeenVoucher) {
                        setShowPromo(true);
                        setNewsIndex(2); // Abre no Voucher se a Licença já foi vista
                    }
                }
            }
        }
    }, [state, nav, loadingMissions, loginReward.show, refreshInventory]);

    if (!state) return null;
    const { player, cases } = state;

    // Sorteia missões garantindo diversidade de dificuldade (FÁCIL, MÉDIO, DIFÍCIL)
    const dailyMissions = useMemo(() => {
        if (loadingMissions) return [];

        const normalizeDiff = (d) => {
            if (!d) return "";
            const s = d.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (s === "MEDIA") return "MEDIO";
            return s;
        };

        const available = cases.filter(c => {
            const diff = normalizeDiff(c.dificuldade);
            
            if (c.id === "C000") {
                if (state.runs["C000"]?.status === "WON" || completedIds.includes("C000")) return false;
            }

            // Missões de nível DIFICIL e LENDARIO são PVP/Competitivas e podem ser repetidas sempre.
            const isReplayableByDiff = diff === "DIFICIL" || diff === "LENDARIO";

            if (!isReplayableByDiff) {
                if (completedIds.includes(c.id)) return false;
                if (state.runs[c.id]?.status === "WON") return false;
            }
            
            return true;
        });

        const activeRun = Object.values(state.runs || {}).find(r => r.status === "IN_PROGRESS");
        const activeCaseId = activeRun?.caseId;
        const activeCase = activeCaseId ? cases.find(c => c.id === activeCaseId) : null;

        let selected = [];
        if (activeCase) selected.push(activeCase);

        const targetDiffs = ["FACIL", "MEDIO", "DIFICIL"];
        
        // 1. Tenta preencher cada slot de dificuldade alvo
        targetDiffs.forEach(diff => {
            if (selected.length >= 3) return;
            // Se já temos essa dificuldade selecionada (ex: via missão ativa), pula
            if (selected.find(s => normalizeDiff(s.dificuldade) === diff)) return;

            const pool = available.filter(c => normalizeDiff(c.dificuldade) === diff && !selected.find(s => s.id === c.id));
            if (pool.length === 0) return;

            const tutorials = pool.filter(c => {
                const idNum = parseInt(c.id.replace("C", ""), 10);
                return idNum >= 1 && idNum <= 10;
            });

            let found = null;
            if (tutorials.length > 0) {
                found = tutorials.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric: true}))[0];
            } else {
                found = pool[Math.floor(Math.random() * pool.length)];
            }
            if (found) selected.push(found);
        });

        // 2. Fallback: Preenche até 3 com qualquer disponível
        if (selected.length < 3) {
            const remaining = available.filter(c => !selected.find(s => s.id === c.id));
            remaining.sort((a,b) => a.id.localeCompare(b.id, undefined, {numeric: true}));
            for (const c of remaining) {
                if (selected.length >= 3) break;
                selected.push(c);
            }
        }

        return selected.slice(0, 3);
    }, [loadingMissions, cases, state.runs, completedIds]);

    return (
        <div style={{ minHeight: "100dvh", width: "100vw", background: "radial-gradient(circle at center, #071a26 0%, #000 70%)", color: "#fff" }}>
            <style>{`
                .om-wrap { max-width: 520px; margin: 0 auto; padding: 14px; padding-bottom: 26px; }
                .om-sticky { position: sticky; top: 56px; z-index: 20; padding-top: 4px; padding-bottom: 12px; background: linear-gradient(to bottom, rgba(0,0,0,.85), rgba(0,0,0,0)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
                .om-panel { border-radius: 18px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 18px 45px rgba(0,0,0,.55); padding: 14px; }
                .om-h1 { font-size: 16px; font-weight: 800; letter-spacing: .3px; }
                .om-muted { font-size: 12px; opacity: .75; margin-top: 4px; line-height: 1.35; }
                .om-grid { display: grid; gap: 10px; margin-top: 12px; }
                .om-toprow { display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; flex-wrap: wrap; }
                .om-kpi { font-size: 12px; opacity: .72; }
                .om-kpiValue { font-size: 16px; font-weight: 800; margin-top: 2px; }
                .om-actions { display:flex; gap: 10px; margin-top: 10px; }
                .om-miniBtn { flex: 1; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,0.06); color: rgba(255,255,255,.92); font-size: 12px; letter-spacing: 1px; cursor: pointer; }
                .om-miniBtn:active { transform: scale(0.99); }
                .om-newsBtn { background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); color: #ffd700; font-size: 10px; font-weight: 800; padding: 6px 12px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s; }
                .om-newsBtn:active { transform: scale(0.95); opacity: 0.8; }
                
                .shop-currencies { display: flex; gap: 8px; align-items: center; }
                .currency-pill { 
                    background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 12px; padding: 4px 10px; display: flex; align-items: center; gap: 6px;
                    font-size: 13px; font-weight: 800; height: 32px; box-sizing: border-box;
                    backdrop-filter: blur(10px);
                }
                .currency-pill img { width: 32px; height: 32px; object-fit: contain; margin-left: -8px; margin-right: -4px; }
                .currency-add { 
                    width: 20px; height: 20px; border-radius: 6px; background: rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer;
                    opacity: 0.6; margin-left: 4px;
                }
            `}</style>

            <div className="om-wrap">
                {/* Linha Superior: Inventário, Moedas, Diamantes, Loja */}
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    gap: "8px", 
                    padding: "12px 0",
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#050a0d", 
                    margin: "0 -14px", 
                    paddingLeft: "14px",
                    paddingRight: "14px"
                }}>
                    {/* Botão de Inventário */}
                    <div 
                        className="currency-pill"
                        onClick={() => {
                            setShowInventory(true);
                            setHasNewItem(false);
                            const totalItems = Object.values(inventory).reduce((a, b) => a + b, 0) + (state.player.vouchers?.length || 0);
                            localStorage.setItem("meridian_last_total_items", totalItems.toString());
                        }}
                        style={{ cursor: "pointer", position: "relative", width: "45px", justifyContent: "center" }}
                    >
                        <img src="/Itens/inventario.png" alt="Inventário" style={{ height: "24px", width: "auto", objectFit: "contain" }} />
                        {hasNewItem && (
                            <div style={{ 
                                position: "absolute", 
                                top: -2, 
                                right: -2, 
                                width: 10, 
                                height: 10, 
                                background: "#ff4040", 
                                borderRadius: "50%", 
                                border: "1.5px solid #000",
                                boxShadow: "0 0 6px rgba(255,64,64,0.6)"
                            }} />
                        )}
                    </div>

                    <div className="currency-pill">
                        <div className="logo-meridian" style={{ fontSize: '20px', marginRight: '4px' }}>M</div>
                        {state.player.dinheiro.toLocaleString("pt-BR")}
                    </div>
                    
                    <div className="currency-pill">
                        <img src="/Loja/diamante.png" alt="" style={{ width: "24px", height: "24px" }} />
                        {player.diamonds || 0}
                    </div>

                    <div className="currency-pill" onClick={() => nav("/loja")} style={{ cursor: "pointer", padding: "4px 8px", width: "45px", justifyContent: "center" }}>
                        <img 
                            src="/Loja/carrinho.png" 
                            alt="Loja" 
                            style={{ 
                                width: "30px", 
                                height: "30px", 
                                objectFit: "contain",
                                margin: 0,
                                transition: "transform 0.2s"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                    </div>
                </div>

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
                            </div>
                        </div>
                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                            <Badge tone="blue">{player.classeEmoji || "🟢"} {player.nivelTitulo || "Novato"}</Badge>
                            <Badge tone="green">XP {player.xp}</Badge>
                            <Badge tone="purple" style={{ cursor: "pointer" }} onClick={() => nav("/conquistas")}>🏆 Conquistas</Badge>
                            <button className="om-newsBtn" onClick={() => { setShowPromo(true); setNewsIndex(0); }}>✨ NOVIDADES</button>
                        </div>
                        <div className="om-actions">
                            <button className="om-miniBtn" onClick={() => nav("/perfil")}>PERFIL</button>
                            <button className="om-miniBtn" onClick={() => nav("/hall-da-fama")}>HALL DA FAMA</button>
                        </div>
                    </div>
                </div>

                <div className="om-grid">
                    {loadingMissions ? (
                        <div style={{ textAlign: "center", opacity: 0.5, padding: 20 }}>Sincronizando casos...</div>
                    ) : (
                        dailyMissions.map(c => {
                            const run = state.runs[c.id];
                            const isOtherActive = Object.values(state.runs).some(r => r.caseId !== c.id && r.status === "IN_PROGRESS");
                            const isActive = run?.status === "IN_PROGRESS";
                            return (
                                <div key={c.id} style={{ opacity: isOtherActive ? 0.5 : 1, pointerEvents: isOtherActive ? "none" : "auto" }}>
                                    <CaseCard
                                        c={c}
                                        status={run?.status}
                                        onOpen={() => {
                                            if (isActive) nav(`/caso/${c.id}`);
                                            else if (c.isCompetitive) nav(`/competitive-lobby/${c.id}`);
                                            else nav(`/missao-intro/${c.id}`);
                                        }}
                                    />
                                    {isOtherActive && (
                                        <div style={{ fontSize: 10, color: "#ff9090", textAlign: "center", marginTop: 4, fontWeight: 700 }}>
                                            FINALIZE A MISSÃO ATIVA PRIMEIRO
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {modal.show && (
                <ModalMsg message={modal.message} onClose={() => setModal({ show: false, message: "" })} />
            )}

            {/* --- MODAL DE RECOMPENSA DE LOGIN (APARECE 1X AO DIA) --- */}
            {loginReward.show && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(25px)", zIndex: 20000, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "20px 0", animation: "scale-in 0.5s ease-out" }}>
                    <div style={{ textAlign: "center", maxWidth: 520, width: "95%", margin: "auto" }}>
                        <div style={{ color: "#3cff9c", letterSpacing: 6, fontSize: 13, marginBottom: 15, fontWeight: 900 }}>🎁 RECOMPENSA DIÁRIA DISPONÍVEL</div>
                        
                        <div style={{ position: "relative", marginBottom: 25 }}>
                            <img src="/logindiario2.png" style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: 24, boxShadow: "0 25px 50px rgba(0,0,0,0.9)", border: "1px solid rgba(60,255,160,0.3)" }} alt="Login Diário" />
                            <div style={{ position: "absolute", bottom: -15, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #3cff9c, #1a8a5a)", padding: "10px 25px", borderRadius: 15, color: "#000", fontWeight: 900, fontSize: 18, boxShadow: "0 10px 20px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
                                DIA {loginReward.day} RESGATADO!
                            </div>
                        </div>

                        <div style={{ color: "#fff", fontSize: 24, fontWeight: 900, marginBottom: 5 }}>+{loginReward.reward} MOEDAS</div>
                        {loginReward.items && (
                            <div style={{ color: "#3cff9c", fontSize: 16, fontWeight: 800, marginBottom: 15 }}>
                                {Object.entries(loginReward.items).map(([key, qty]) => (
                                    <div key={key}>
                                        + {qty} {key.replace(/_/g, ' ').toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        )}
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 30 }}>Sua dedicação foi recompensada, Agente.</p>

                        <button 
                            onClick={() => {
                                setLoginReward({ ...loginReward, show: false });
                                // Se ainda não viu a promo do voucher, mostra agora
                                const hasSeen = localStorage.getItem("atlas_voucher_promo_v1");
                                if (!hasSeen) setShowPromo(true);
                            }} 
                            style={{ background: "#3cff9c", color: "#000", fontWeight: 900, padding: "16px 0", width: "100%", borderRadius: 18, border: "none", fontSize: 16, cursor: "pointer", boxShadow: "0 10px 25px rgba(60,255,160,0.3)" }}
                        >
                            RECEBER E CONTINUAR
                        </button>
                    </div>
                </div>
            )}

            {/* --- MODAL DE RECOMPENSA/CLASSIFICAÇÃO DE RANKING SEMANAL (APARECE NO LOGIN APÓS RECOMPENSA DIÁRIA) --- */}
            {!loginReward.show && weeklyRankReward.show && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.94)", backdropFilter: "blur(25px)", zIndex: 19000, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "20px 0", animation: "scale-in 0.5s ease-out" }}>
                    <div style={{ textAlign: "center", maxWidth: 440, width: "90%", margin: "auto", padding: "30px 24px", background: "linear-gradient(135deg, #09131a 0%, #020508 100%)", borderRadius: 28, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 60px rgba(0,0,0,0.8)" }}>
                        {(() => {
                            const pos = weeklyRankReward.rankPosition;
                            const isPodium = pos <= 3;
                            
                            const accentColor = 
                                pos === 1 ? "#ffd700" : 
                                pos === 2 ? "#c0c0c0" : 
                                pos === 3 ? "#cd7f32" : 
                                "#00ffcc";

                            const glowShadow = `0 0 30px ${accentColor}30`;
                            
                            const emoji = 
                                pos === 1 ? "🥇" : 
                                pos === 2 ? "🥈" : 
                                pos === 3 ? "🥉" : 
                                "🎖️";

                            const headerText = 
                                pos === 1 ? "👑 CAMPEÃO DA SEMANA!" : 
                                pos === 2 ? "⚡ VICE-CAMPEÃO DA SEMANA!" : 
                                pos === 3 ? "🏆 PÓDIO DA SEMANA!" : 
                                "📡 CLASSIFICAÇÃO SEMANAL";

                            const descText = isPodium 
                                ? "Parabéns, Agente! Sua velocidade operacional garantiu seu lugar no pódio global e recompensas militares de elite."
                                : "Seu tempo foi registrado nos arquivos da A.T.L.A.S. Continue aprimorando suas rotas para alcançar o pódio na próxima semana.";

                            return (
                                <>
                                    <div style={{ fontSize: 64, marginBottom: 16, filter: `drop-shadow(0 0 15px ${accentColor}40)` }}>{emoji}</div>
                                    <div style={{ color: accentColor, letterSpacing: 4, fontSize: 11, marginBottom: 8, fontWeight: 900 }}>📡 CENTRAL A.T.L.A.S.</div>
                                    <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 900, marginBottom: 20, textTransform: "uppercase" }}>{headerText}</h2>

                                    {/* Card de Posição */}
                                    <div style={{ 
                                        background: "rgba(255,255,255,0.02)", 
                                        border: `1px solid rgba(255,255,255,0.06)`, 
                                        borderRadius: 20, padding: "20px 16px", marginBottom: 24,
                                        boxShadow: glowShadow
                                    }}>
                                        <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 2, marginBottom: 4, fontWeight: 800 }}>POSIÇÃO FINAL</div>
                                        <div style={{ fontSize: 44, fontWeight: 900, color: accentColor, letterSpacing: 1 }}>
                                            #{pos}
                                        </div>
                                        <div style={{ fontSize: 11, opacity: 0.4, marginTop: 4 }}>
                                            Semana encerrada em {new Date(weeklyRankReward.resetDate).toLocaleDateString("pt-BR")}
                                        </div>
                                    </div>

                                    {/* Card de Recompensas */}
                                    {isPodium && (
                                        <div style={{ 
                                            background: "rgba(255,215,0,0.02)", 
                                            border: `1px solid ${accentColor}33`, 
                                            borderRadius: 20, padding: "20px 16px", marginBottom: 30 
                                        }}>
                                            <div style={{ fontSize: 9, color: accentColor, letterSpacing: 2, marginBottom: 12, fontWeight: 800 }}>RECOMPENSAS DESBLOQUEADAS</div>
                                            
                                            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                                                {/* Moedas */}
                                                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>
                                                    💰 R$ {weeklyRankReward.moedas.toLocaleString("pt-BR")}
                                                </div>
                                                
                                                {/* Itens */}
                                                {weeklyRankReward.items && (
                                                    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
                                                        {Object.entries(weeklyRankReward.items).map(([itemKey, qty]) => {
                                                            const itemNames = {
                                                                dossie_sigiloso: "Dossiê Sigiloso",
                                                                fonte_anonima: "Fonte Anônima",
                                                                satelite_atlas: "Satélite A.T.L.A.S."
                                                            };
                                                            return (
                                                                <span key={itemKey} style={{ 
                                                                    fontSize: 11, background: "rgba(255,255,255,0.06)", 
                                                                    border: "1px solid rgba(255,255,255,0.1)", 
                                                                    padding: "6px 12px", borderRadius: 10, color: "#00ffcc", fontWeight: 700 
                                                                }}>
                                                                    + {qty} {itemNames[itemKey] || itemKey}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5, marginBottom: 32, padding: "0 10px" }}>{descText}</p>

                                    <button 
                                        onClick={handleClaimWeeklyRankReward} 
                                        style={{ 
                                            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, 
                                            color: "#000", fontWeight: 900, padding: "16px 0", width: "100%", 
                                            borderRadius: 16, border: "none", fontSize: 15, cursor: "pointer", 
                                            boxShadow: `0 10px 25px ${accentColor}25`,
                                            letterSpacing: 1
                                        }}
                                    >
                                        {isPodium ? "RESGATAR RECOMPENSA ✓" : "PROSSEGUIR OPERAÇÃO"}
                                    </button>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* --- MODAL PROMOCIONAL / CARROSSEL DE NOVIDADES --- */}
            {showPromo && (
                <div 
                    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", overflowY: "auto", padding: "40px 0", animation: "scale-in 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67)" }}
                    onMouseDown={(e) => setDragStart(e.clientX)}
                    onMouseUp={(e) => {
                        if (dragStart === null) return;
                        const diff = e.clientX - dragStart;
                        if (Math.abs(diff) > 50) {
                            if (diff > 0) setNewsIndex(prev => Math.max(0, prev - 1)); 
                            else setNewsIndex(prev => Math.min(3, prev + 1));
                        }
                        setDragStart(null);
                    }}
                    onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                        if (dragStart === null) return;
                        const diff = e.changedTouches[0].clientX - dragStart;
                        if (Math.abs(diff) > 50) {
                            if (diff > 0) setNewsIndex(prev => Math.max(0, prev - 1)); 
                            else setNewsIndex(prev => Math.min(3, prev + 1));
                        }
                        setDragStart(null);
                    }}
                >
                    <div style={{ textAlign: "center", maxWidth: 520, width: "95%", position: "relative", margin: "auto" }}>
                        <button 
                            onClick={() => {
                                setShowPromo(false);
                                localStorage.setItem("atlas_voucher_promo_v1", "true");
                            }}
                            style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", opacity: 0.8, zIndex: 10 }}
                        >✕</button>

                        <div style={{ display: "flex", width: "400%", transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)", transform: `translateX(-${(newsIndex * 100) / 4}%)` }}>
                            {/* SLIDE 0: LICENÇA TÁTICA */}
                            <div style={{ width: "25%", padding: "0 10px", boxSizing: "border-box" }}>
                                <div style={{ color: "#3cff9c", letterSpacing: 8, fontSize: 13, marginBottom: 12, fontWeight: 900, textShadow: "0 0 20px rgba(60,255,160,0.5)" }}>🛡️ PRESENTE DE ELITE</div>
                                <div style={{ position: "relative", marginBottom: 12 }}>
                                    <img src="/Banner/Banner_Licenca_Tatica.png" style={{ width: "100%", maxHeight: "45vh", objectFit: "contain", borderRadius: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(60,255,160,0.3)" }} alt="Licença Tática" />
                                </div>
                                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 4 }}>LICENÇA TÁTICA</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.4, marginBottom: 12 }}>
                                    Proteja sua ofensiva! Se você não puder jogar, a licença manterá sua sequência intacta. Você acaba de receber <strong>2 unidades</strong>!
                                </p>
                                <div style={{ background: "rgba(60,255,160,0.1)", borderRadius: 16, padding: "10px", border: "1px solid rgba(60,255,160,0.2)", fontSize: 11, color: "#3cff9c", fontWeight: 700 }}>
                                    Equipamento acionado automaticamente pelo sistema.
                                </div>
                            </div>

                            {/* SLIDE 1: NOVOS ITENS */}
                            <div style={{ width: "25%", padding: "0 10px", boxSizing: "border-box" }}>
                                <div style={{ color: "#80bdff", letterSpacing: 8, fontSize: 13, marginBottom: 12, fontWeight: 900, textShadow: "0 0 20px rgba(128,189,255,0.5)" }}>🛠️ INTELIGÊNCIA OPERACIONAL</div>
                                <div style={{ position: "relative", marginBottom: 12 }}>
                                    <img src="/Banner/Banner_NovosItens.png" style={{ width: "100%", maxHeight: "45vh", objectFit: "contain", borderRadius: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(128,189,255,0.3)" }} alt="Novos Itens de Inteligência" />
                                </div>
                                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 4 }}>RECURSOS TÁTICOS</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.4, marginBottom: 12 }}>
                                    Fonte Anônima, Dossiê Sigiloso e Satélite Atlas agora disponíveis para auxiliar suas investigações.
                                </p>
                                <div style={{ background: "rgba(128,189,255,0.1)", borderRadius: 16, padding: "10px", border: "1px solid rgba(128,189,255,0.2)", fontSize: 11, color: "#80bdff", fontWeight: 700 }}>
                                    Acesse o menu ☰ MAIS durante a missão para utilizar.
                                </div>
                            </div>

                            {/* SLIDE 2: VOUCHER ATLAS */}
                            <div style={{ width: "25%", padding: "0 10px", boxSizing: "border-box" }}>
                                <div style={{ color: "#ffd700", letterSpacing: 8, fontSize: 13, marginBottom: 12, fontWeight: 900, textShadow: "0 0 20px rgba(255,215,0,0.5)" }}>📡 COMUNICADO ESPECIAL</div>
                                <div style={{ position: "relative", marginBottom: 12 }}>
                                    <img src="/Voucher.png" style={{ width: "100%", maxHeight: "40vh", objectFit: "contain", borderRadius: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.3)" }} alt="Voucher Atlas Aéreo" />
                                </div>
                                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 4 }}>VOUCHERS ATLAS AÉREO</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.4, marginBottom: 12 }}>
                                    Complete missões diárias para ganhar <strong>Vouchers de Desconto</strong>.
                                </p>

                                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: "12px 10px", marginBottom: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 8, padding: "0 8px" }}>
                                        <div style={{ position: "absolute", top: "50%", left: 8, right: 8, height: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 1 }} />
                                        <div style={{ 
                                            position: "absolute", top: "50%", left: 8, 
                                            width: `${Math.min((((streakData?.current_streak || 0) % 7)) / 6 * 100, 100)}%`, 
                                            height: 2, background: "#3cff9c", transform: "translateY(-50%)", zIndex: 2, transition: "width 1s ease" 
                                        }} />
                                        {[1,2,3,4,5,6,7].map(d => {
                                            const currentCycleStreak = (streakData?.current_streak || 0) % 7;
                                            // Se for múltiplo exato de 7 (ex: 7, 14, 21) e for maior que 0, significa que acabou de completar um ciclo.
                                            // Mostramos a barra cheia temporariamente.
                                            const isJustCompletedCycle = (streakData?.current_streak || 0) > 0 && (streakData?.current_streak || 0) % 7 === 0;
                                            
                                            const isCompleted = isJustCompletedCycle ? true : d <= currentCycleStreak;
                                            const isNext = isJustCompletedCycle ? false : d === currentCycleStreak + 1;
                                            const isReward = d === 7;
                                            return (
                                                <div key={d} style={{ zIndex: 3, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: isCompleted ? "#3cff9c" : isNext ? "rgba(255,255,255,0.1)" : "#1a2a3a", border: `2px solid ${isCompleted ? "#3cff9c" : isNext ? "rgba(255,189,128,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isCompleted ? "#000" : "#999", fontSize: 11, fontWeight: 800 }}>
                                                        {isCompleted ? "✓" : isReward ? "🛫" : d}
                                                    </div>
                                                    <div style={{ fontSize: 8, marginTop: 6, opacity: isCompleted ? 1 : 0.4, color: isCompleted ? "#3cff9c" : "#fff", letterSpacing: 1 }}>{isReward ? "RECOMPENSA" : `DIA ${d}`}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 700, marginTop: 6 }}>
                                        {streakData?.current_streak > 0 ? `Você está no DIA ${(streakData.current_streak % 7) || 7} do ciclo atual!` : "Comece sua sequência hoje!"}
                                    </div>
                                </div>
                            </div>

                            {/* SLIDE 3: LOGIN DIÁRIO */}
                            <div style={{ width: "25%", padding: "0 10px", boxSizing: "border-box" }}>
                                <div style={{ color: "#3cff9c", letterSpacing: 8, fontSize: 13, marginBottom: 8, fontWeight: 900, textShadow: "0 0 20px rgba(60,255,160,0.5)" }}>📈 RECOMPENSA DIÁRIA</div>
                                <div style={{ position: "relative", marginBottom: 12 }}>
                                    <img src="/logindiario2.png" style={{ width: "100%", maxHeight: "40vh", objectFit: "contain", borderRadius: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(60,255,160,0.3)" }} alt="Login Diário" />
                                </div>
                                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 4 }}>LOGIN DIÁRIO</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.4, marginBottom: 12 }}>
                                    Garanta moedas extras todos os dias apenas acessando o sistema.
                                </p>
                                
                                <div style={{ background: "rgba(60,255,160,0.04)", borderRadius: 18, padding: "12px 10px", marginBottom: 12, border: "1px solid rgba(60,255,160,0.12)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 8, padding: "0 8px" }}>
                                        <div style={{ position: "absolute", top: "50%", left: 8, right: 8, height: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 1 }} />
                                        <div style={{ 
                                            position: "absolute", top: "50%", left: 8, 
                                            width: `${Math.min(((loginStreakData?.current_streak || 0)) / 4 * 100, 100)}%`, 
                                            height: 2, background: "#3cff9c", transform: "translateY(-50%)", zIndex: 2, transition: "width 1s ease" 
                                        }} />
                                        {[1,2,3,4,5].map(d => {
                                            const isCompleted = d <= (loginStreakData?.current_streak || 0);
                                            const isNext = d === (loginStreakData?.current_streak || 0) + 1;
                                            const isReward = d === 5;
                                            return (
                                                <div key={d} style={{ zIndex: 3, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: isCompleted ? "#3cff9c" : isNext ? "rgba(255,255,255,0.1)" : "#1a2a3a", border: `2px solid ${isCompleted ? "#3cff9c" : isNext ? "rgba(60,255,160,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isCompleted ? "#000" : "#999", fontSize: 11, fontWeight: 800 }}>
                                                        {isCompleted ? "✓" : isReward ? "💰" : d}
                                                    </div>
                                                    <div style={{ fontSize: 8, marginTop: 6, opacity: isCompleted ? 1 : 0.4, color: isCompleted ? "#3cff9c" : "#fff", letterSpacing: 1 }}>{isReward ? "BONUS" : `DIA ${d}`}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#fff", fontWeight: 700, marginTop: 6 }}>
                                        {loginStreakData?.current_streak > 0 
                                            ? `VOCÊ ESTÁ NO DIA ${loginStreakData.current_streak} DA SEQUÊNCIA!` 
                                            : "COMECE HOJE SUA SEQUÊNCIA!"}
                                    </div>
                                    <div style={{ fontSize: 9, color: "#3cff9c", marginTop: 2, fontWeight: 700, letterSpacing: 1 }}>
                                        {loginStreakData?.last_reward_date === new Date().toISOString().split('T')[0]
                                            ? "✓ RECOMPENSA DE HOJE RESGATADA"
                                            : "⏳ RECOMPENSA DE HOJE DISPONÍVEL!"}
                                    </div>
                                </div>

                                <div style={{ background: "rgba(60,255,160,0.04)", borderRadius: 16, padding: "8px", marginBottom: 12, border: "1px solid rgba(60,255,160,0.12)", color: "#3cff9c", fontSize: 11, fontWeight: 700 }}>
                                    {(() => {
                                        const d = (loginStreakData?.current_streak || 0);
                                        if (d < 5) {
                                            const rewards = { 1: 300, 2: 500, 3: 700, 4: 900, 5: 1000 };
                                            return `💎 PRÓXIMA META: DIA ${d+1} (${rewards[d+1] || 1000} MOEDAS)`;
                                        }
                                        if (d < 10) return `💎 PRÓXIMA META: DIA 10 (1.000 + 01 FONTE ANÔNIMA)`;
                                        if (d < 15) return `💎 PRÓXIMA META: DIA 15 (1.000 + 01 SATÉLITE ATLAS)`;
                                        if (d < 20) return `💎 PRÓXIMA META: DIA 20 (1.000 + 02 FONTE ANÔNIMA)`;
                                        if (d < 25) return `💎 PRÓXIMA META: DIA 25 (1.000 + 02 SATÉLITE ATLAS)`;
                                        if (d < 30) return `💎 PRÓXIMA META: DIA 30 (10.000 + ITENS ESPECIAIS)`;
                                        return `💎 META: MANTER SEQUÊNCIA (1.000 MOEDAS)`;
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* INDICADORES (BOLINHAS) */}
                        <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "10px 0 25px" }}>
                            <div onClick={() => setNewsIndex(0)} style={{ width: 10, height: 10, borderRadius: "50%", background: newsIndex === 0 ? "#3cff9c" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "0.3s" }} />
                            <div onClick={() => setNewsIndex(1)} style={{ width: 10, height: 10, borderRadius: "50%", background: newsIndex === 1 ? "#80bdff" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "0.3s" }} />
                            <div onClick={() => setNewsIndex(2)} style={{ width: 10, height: 10, borderRadius: "50%", background: newsIndex === 2 ? "#ffd700" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "0.3s" }} />
                            <div onClick={() => setNewsIndex(3)} style={{ width: 10, height: 10, borderRadius: "50%", background: newsIndex === 3 ? "#3cff9c" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "0.3s" }} />
                        </div>

                        <button 
                            onClick={() => {
                                setShowPromo(false);
                                localStorage.setItem("atlas_voucher_promo_v1", "true");
                            }} 
                            style={{ background: "linear-gradient(135deg, #ffd700, #ffba00)", color: "#000", fontWeight: 900, padding: "14px 0", width: "100%", borderRadius: 18, border: "none", fontSize: 15, cursor: "pointer", boxShadow: "0 10px 25px rgba(255,186,0,0.3)" }}
                        >
                            FECHAR NOVIDADES
                        </button>
                    </div>
                </div>
            )}

            <InventoryModal isOpen={showInventory} onClose={() => setShowInventory(false)} />

            <style>{`
                @keyframes scale-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
}