import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCargoByXp, getProximoCargo } from "../game/Cargos";
import { suspectsSeed, saveGame, getUnlockedLeaders, FACTIONS } from "../game/store";
import { supabase } from "../lib/supabase";
import { saveGameState } from "../services/gameSaveService";
import { submitSpeedRecord, formatDuration } from "../services/speedRecordService";
import DialogBox from "../components/DialogBox";

export default function CasoSolucionado() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const { state, replaceState } = useGame();

    const caseObj = useMemo(() => state?.cases?.find(c => String(c.id) === String(caseId)), [state, caseId]);
    const run = useMemo(() => state?.runs?.[caseId], [state, caseId]);

    const [searchParams] = useSearchParams();
    
    // --- Streak / Voucher Modal State ---
    const [streakUpdated, setStreakUpdated] = useState(null);
    const [newVoucher, setNewVoucher] = useState(null);

    // --- Ranking Modal State ---
    const [showRanking, setShowRanking] = useState(false);
    const [rankingData, setRankingData] = useState([]);

    // --- Speed Record State ---
    const [showSpeedRecord, setShowSpeedRecord] = useState(false);
    const [speedRecordData, setSpeedRecordData] = useState(null); // { isNewRecord, duration, globalRank }
    const speedRecordSubmitted = useRef(false);

    // --- Faction Unlock Modal State ---
    const [unlockedFaction, setUnlockedFaction] = useState(null);


    const isCompetitive = useMemo(() => {
        return searchParams.get("mode") === "competitive" || !!caseObj?.isCompetitive;
    }, [searchParams, caseObj]);

    const isWon = run?.status === "WON";
    const player = state?.player || {};
    const [foundWinnerName, setFoundWinnerName] = useState(run?.winnerName || "");

    // 🔍 Busca o nome do vencedor com retry (o winner_id pode demorar a ser salvo no banco)
    useEffect(() => {
        const lobbyId = searchParams.get("lobbyId");
        const isGenericName = !foundWinnerName || foundWinnerName === "um Agente de Elite";

        if (!isCompetitive || isWon || !isGenericName || !lobbyId) return;

        let cancelled = false;
        const MAX_RETRIES = 5;

        async function fetchWinnerName(attempt = 0) {
            if (cancelled) return;
            console.log(`[ATLAS] Buscando nome do vencedor (tentativa ${attempt + 1}/${MAX_RETRIES})...`);
            
            try {
                const { data } = await supabase.from("competitive_lobbies")
                    .select("winner_id")
                    .eq("id", lobbyId)
                    .single();

                if (data?.winner_id) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("nickname")
                        .eq("id", data.winner_id)
                        .maybeSingle();

                    if (profile?.nickname && !cancelled) {
                        console.log(`[ATLAS] Vencedor encontrado: ${profile.nickname}`);
                        setFoundWinnerName(profile.nickname);
                        return;
                    }
                }

                // Retry se ainda não encontrou
                if (attempt < MAX_RETRIES - 1 && !cancelled) {
                    setTimeout(() => fetchWinnerName(attempt + 1), 2000);
                }
            } catch (err) {
                console.error("[ATLAS] Erro ao buscar vencedor:", err);
                if (attempt < MAX_RETRIES - 1 && !cancelled) {
                    setTimeout(() => fetchWinnerName(attempt + 1), 2000);
                }
            }
        }

        fetchWinnerName();
        return () => { cancelled = true; };
    }, [isCompetitive, isWon, foundWinnerName, searchParams]);

    const winnerName = foundWinnerName || "um Agente de Elite";

    const realCriminal = useMemo(() => suspectsSeed.find(s => String(s.id) === String(run?.targetSuspectId)), [run?.targetSuspectId]);
    const warrantSuspect = useMemo(() => suspectsSeed.find(s => String(s.id) === String(run?.warrantId)), [run?.warrantId]);

    const conclusionImg = isWon
        ? `/Suspeitos/Presos/${run?.warrantId}.png`
        : `/Suspeitos/Presos/missaoFracassada.png`;

    const reportText = useMemo(() => {
        if (isCompetitive) {
            if (isWon) {
                return `Parabéns pelo excelente desempenho e pela rapidez na conclusão do caso! sua eficiência foi absoluta, deixando os demais agentes para trás.\n\nA Agência A.T.L.A.S. reconhece sua superioridade tática nesta operação.\n\n🌍 Caso Encerrado.\n\n🏆 RECOMPENSA: +R$${caseObj?.recompensa} | +${caseObj?.xp} XP`;
            } else if (isCompetitive && (caseObj?.dificuldade === "DIFICIL" || caseObj?.dificuldade === "LENDARIO")) {
                return `Infelizmente, você falhou. O Agente "${winnerName}" fez um excelente trabalho completando a missão antes de você.\n\nÉ necessário melhorar suas táticas e evoluir para não ser superado novamente nas próximas operações.\n\n🌍 Caso Encerrado.`;
            } else {
                // Para Casos Fácil/Médio ou falha por mandado errado em modo solo
                return `Infelizmente, você falhou. O suspeito escapou da captura porque o mandado de prisão emitido não correspondia à identidade do alvo.\n\nA Agência A.T.L.A.S. espera mais precisão em operações de alto risco. Verifique as pistas com mais atenção da próxima vez.\n\n🌍 Caso Encerrado.`;
            }
        }

        return isWon
            ? `O suspeito foi capturado com êxito.\nA relíquia foi integralmente recuperada e devolvida à custódia internacional.\n\nO brilhante trabalho do(a) Agente ${player.nivelTitulo || ""} "${player.nome || ""}" foi decisivo para o sucesso desta missão.\nSua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.\n\nA.T.L.A.S. reconhece oficialmente sua conduta exemplar.\nContinue assim, Agente. O mundo precisa de mentes afiadas como a sua.\n\nEsperamos trabalhar novamente com você em futuras operações de alto risco.\n🌍 Justiça restaurada. Ordem mantida.\n\n🏆 RECOMPENSA: +R$${caseObj?.recompensa} | +${caseObj?.xp} XP`
            : `O suspeito escapou da captura.\nA relíquia permanece desaparecida.\n\nCulpado Real: ${realCriminal?.codinome || "Desconhecido"}\nMandado Emitido para: ${warrantSuspect?.codinome || "Nenhum"}\n\nA Agência reconhece que o(a) Agente ${player.nivelTitulo || ""} "${player.nome || ""}" demonstrou potencial estratégico acima da média.\nPorém, falhas na identificação final permitiram que o alvo deixasse o país antes da captura.\n\nA.T.L.A.S. espera mais de alguém que já demonstrou ser brilhante.\nFracassos não definem um agente. Eles moldam os próximos acertos.\n\nReavalie as pistas. Ajuste a estratégia. O próximo movimento será decisivo.\n🌍 O jogo continua.`;
    }, [isWon, isCompetitive, winnerName, player.nome, player.nivelTitulo, caseObj?.recompensa, caseObj?.xp, realCriminal, warrantSuspect, caseObj?.dificuldade]);

    // 🏆 Speed Record: Submete o recorde ao montar (se ganhou)
    useEffect(() => {
        if (!isWon || !run?.startedAtRealTime || !state?.player?.supabaseId || speedRecordSubmitted.current) return;
        speedRecordSubmitted.current = true;

        const durationMs = Date.now() - new Date(run.startedAtRealTime).getTime();
        const durationSeconds = Math.floor(durationMs / 1000);

        submitSpeedRecord(caseId, durationSeconds, {
            nickname: player.nome || "Agente",
            rank: player.nivelTitulo || "Novato",
            avatar: player.avatar || null,
            avatarKey: player.avatarUrl || null,
        }).then(result => {
            setSpeedRecordData({
                ...result,
                duration: durationSeconds,
            });
        }).catch(err => {
            console.warn("[SpeedRecord] Erro ao submeter recorde:", err);
        });
    }, [isWon, run?.startedAtRealTime, state?.player?.supabaseId, caseId]);

    // Se não temos o run nem o state, e não estamos mostrando o modal, aí sim retornamos null
    if (!state || !caseObj || (!run && !streakUpdated && !newVoucher && !unlockedFaction)) return null;

    function handleEncerrar() {
        // 🔥 Garante salvamento remoto imediato antes de qualquer coisa
        if (state.player.supabaseId) {
            saveGameState(state).catch(e => console.warn("[CasoSolucionado] Erro no sync final:", e));
        }

        // 🏆 Se for competitivo, busca ranking primeiro
        const lobbyId = searchParams.get("lobbyId");
        if (isCompetitive && lobbyId) {
            fetchRanking(lobbyId);
            return;
        }

        proceedAfterRanking();
    }

    async function fetchRanking(lobbyId) {
        try {
            const { data: players } = await supabase
                .from("competitive_players")
                .select("player_id, current_stage, status, finished_at, profiles(nickname, avatar)")
                .eq("lobby_id", lobbyId)
                .order("current_stage", { ascending: false });

            if (players && players.length > 0) {
                // Ordena: vencedor primeiro, depois por etapa desc, depois por tempo
                const sorted = players.sort((a, b) => {
                    if (a.status === "won" && b.status !== "won") return -1;
                    if (b.status === "won" && a.status !== "won") return 1;
                    return (b.current_stage || 0) - (a.current_stage || 0);
                });
                setRankingData(sorted);
            }
            setShowRanking(true);
        } catch (err) {
            console.error("[ATLAS] Erro ao buscar ranking:", err);
            proceedAfterRanking();
        }
    }

    function proceedAfterRanking() {
        // Checa se há algum líder de facção recém-desbloqueado pendente
        try {
            const raw = localStorage.getItem("pendingFactionUnlock");
            if (raw) {
                const data = JSON.parse(raw);
                localStorage.removeItem("pendingFactionUnlock");
                setUnlockedFaction(data);
                return;
            }
        } catch (e) {
            console.error("[CasoSolucionado] Erro ao ler facção pendente:", e);
        }

        proceedAfterFactionUnlock();
    }

    function proceedAfterFactionUnlock() {
        // 🏆 Se ganhou e tem recorde novo OU primeiro registro, exibe modal
        if (isWon && (speedRecordData?.isNewRecord || speedRecordData?.isFirstRecord) && !showSpeedRecord) {
            setShowSpeedRecord(true);
            return;
        }

        proceedAfterSpeedRecord();
    }

    function proceedAfterSpeedRecord() {
        // 🔥 Se ganhou, verifica se tem streak pendente para exibir
        if (isWon) {
            try {
                const raw = localStorage.getItem("pendingStreakResult");
                if (raw) {
                    const data = JSON.parse(raw);
                    localStorage.removeItem("pendingStreakResult");
                    setStreakUpdated(data);

                    const voucherRaw = localStorage.getItem("pendingNewVoucher");
                    if (voucherRaw) {
                        setNewVoucher(JSON.parse(voucherRaw));
                        localStorage.removeItem("pendingNewVoucher");
                    }
                    return;
                }
            } catch (e) {
                console.error("[CasoSolucionado] Erro ao ler streak pendente:", e);
            }
        }

        proceedToNext();
    }

    function proceedToNext() {
        if (isWon) {
            const cargoPermitido = getCargoByXp(player.xp);
            const nivelAtual = player.nivel || 1;
            if (cargoPermitido.nivel > nivelAtual) {
                nav("/promocao");
                return;
            }
        }
        nav("/mural");
    }

    // --- SPEED RECORD MODAL ---
    if (showSpeedRecord && speedRecordData) {
        const dur = speedRecordData.duration;
        const prevBest = speedRecordData.previousBest;
        const rank = speedRecordData.globalRank;
        const isFirst = speedRecordData.isFirstRecord;

        // Cores e textos dinâmicos baseados no tipo de conquista
        const accentColor = isFirst ? "#00ffcc" : "#ffd700";
        const accentBg = isFirst ? "rgba(0,255,204,0.08)" : "rgba(255,215,0,0.08)";
        const accentBorder = isFirst ? "rgba(0,255,204,0.25)" : "rgba(255,215,0,0.25)";
        const titleText = isFirst ? "RANKING DESBLOQUEADO!" : "NOVO RECORDE CONQUISTADO!";
        const emoji = isFirst ? "🏅" : "⚡";
        const glowAnim = isFirst
            ? "@keyframes sr-glow { 0%, 100% { text-shadow: 0 0 20px rgba(0,255,204,0.4); } 50% { text-shadow: 0 0 40px rgba(0,255,204,0.8); } }"
            : "@keyframes sr-glow { 0%, 100% { text-shadow: 0 0 20px rgba(255,215,0,0.4); } 50% { text-shadow: 0 0 40px rgba(255,215,0,0.8); } }";

        return (
            <div style={{
                position: "fixed", inset: 0, zIndex: 10000, background: "#0a0c10",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                padding: 20, boxSizing: "border-box"
            }}>
                <style>{`
                    @keyframes sr-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
                    ${glowAnim}
                    @keyframes sr-slide { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
                <div style={{
                    maxWidth: 420, width: "100%", textAlign: "center",
                    animation: "sr-slide 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                }}>
                    <div style={{ fontSize: 64, marginBottom: 12, animation: "sr-pulse 1.5s ease-in-out infinite" }}>{emoji}</div>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: accentColor, fontWeight: 800, marginBottom: 8 }}>📡 CENTRAL A.T.L.A.S.</div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, marginBottom: 6, color: accentColor, animation: "sr-glow 2s ease-in-out infinite" }}>
                        {titleText}
                    </h2>
                    <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>{caseObj?.titulo}</div>
                    {isFirst && (
                        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 22, lineHeight: 1.6 }}>
                            Seu tempo foi registrado no Ranking Global.<br />
                            Complete novamente para tentar bater seu próprio recorde!
                        </div>
                    )}
                    {!isFirst && (
                        <div style={{ marginBottom: 22 }} />
                    )}

                    {/* Tempo */}
                    <div style={{
                        background: accentBg, border: `1px solid ${accentBorder}`,
                        borderRadius: 18, padding: "20px 16px", marginBottom: 14
                    }}>
                        <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 2, marginBottom: 8, fontWeight: 800 }}>TEMPO DE CONCLUSÃO</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: accentColor, letterSpacing: 1 }}>
                            {formatDuration(dur)}
                        </div>
                    </div>

                    {/* Info cards */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
                        {prevBest !== null && (
                            <div style={{
                                flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 14, padding: "14px 10px"
                            }}>
                                <div style={{ fontSize: 9, opacity: 0.4, letterSpacing: 1, fontWeight: 800 }}>RECORDE ANTERIOR</div>
                                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4, color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }}>
                                    {formatDuration(prevBest)}
                                </div>
                            </div>
                        )}
                        {rank && (
                            <div style={{
                                flex: 1, background: "rgba(0,255,160,0.06)", border: "1px solid rgba(0,255,160,0.15)",
                                borderRadius: 14, padding: "14px 10px"
                            }}>
                                <div style={{ fontSize: 9, opacity: 0.4, letterSpacing: 1, fontWeight: 800 }}>RANKING GLOBAL</div>
                                <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4, color: "#00ffa0" }}>
                                    #{rank}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            setShowSpeedRecord(false);
                            proceedAfterSpeedRecord();
                        }}
                        style={{
                            width: "100%", padding: 16, borderRadius: 14,
                            background: `linear-gradient(135deg, ${accentBg}, rgba(0,0,0,0.2))`,
                            border: `1px solid ${accentBorder}`,
                            color: accentColor, fontSize: 14, fontWeight: 800,
                            letterSpacing: 2, cursor: "pointer"
                        }}
                    >
                        PROSSEGUIR ▶
                    </button>
                </div>
            </div>
        );
    }

    // --- RANKING MODAL (Competitivo) ---
    if (showRanking) {
        const totalStages = run?.proceduralScenario?.route?.length || 10;
        return (
            <div style={{
                position: "fixed", inset: 0, zIndex: 10000, background: "#0a0c10",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                padding: 20, boxSizing: "border-box"
            }}>
                <style>{`
                    @keyframes om-rank-slide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes om-rank-glow { 0%, 100% { box-shadow: 0 0 15px rgba(255,215,0,0.3); } 50% { box-shadow: 0 0 30px rgba(255,215,0,0.6); } }
                `}</style>
                <div style={{
                    maxWidth: 420, width: "100%",
                    animation: "om-rank-slide 0.5s ease-out"
                }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <div style={{ fontSize: 12, color: "#00ffcc", letterSpacing: 4, marginBottom: 8, fontWeight: 700 }}>📡 CENTRAL A.T.L.A.S.</div>
                        <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, marginBottom: 4 }}>🏆 RANKING FINAL</h2>
                        <div style={{ fontSize: 12, opacity: 0.5 }}>{caseObj?.titulo}</div>
                    </div>

                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16, overflow: "hidden"
                    }}>
                        {rankingData.length > 0 ? rankingData.map((p, i) => {
                            const isWinner = p.status === "won";
                            const isMe = p.player_id === state.player.supabaseId;
                            const nickname = p.profiles?.nickname || "Agente Desconhecido";
                            const stage = p.current_stage || 1;
                            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}º`;

                            return (
                                <div key={p.player_id} style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    padding: "14px 16px",
                                    background: isWinner ? "rgba(255,215,0,0.08)" : isMe ? "rgba(0,255,204,0.05)" : "transparent",
                                    borderBottom: i < rankingData.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                    animation: `om-rank-slide 0.4s ease-out ${i * 0.1}s both`,
                                    ...(isWinner ? { animation: `om-rank-slide 0.4s ease-out both, om-rank-glow 2s ease-in-out infinite` } : {})
                                }}>
                                    <div style={{
                                        fontSize: i < 3 ? 24 : 16, minWidth: 36, textAlign: "center",
                                        fontWeight: 900, color: isWinner ? "#ffd700" : "#fff"
                                    }}>
                                        {medal}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: 14, fontWeight: isMe ? 900 : 600,
                                            color: isWinner ? "#ffd700" : isMe ? "#00ffcc" : "#fff"
                                        }}>
                                            {isMe ? `Agente VOCÊ` : `Agente ${nickname}`}
                                        </div>
                                        {!isWinner && (
                                            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>
                                                Parou na Etapa {stage}/{totalStages}
                                            </div>
                                        )}
                                        {isWinner && (
                                            <div style={{ fontSize: 11, color: "rgba(255,215,0,0.6)", marginTop: 2 }}>
                                                ✅ Missão Concluída
                                            </div>
                                        )}
                                    </div>
                                    {isWinner && (
                                        <div style={{ fontSize: 20 }}>🏆</div>
                                    )}
                                </div>
                            );
                        }) : (
                            <div style={{ padding: 30, textAlign: "center", opacity: 0.5 }}>Carregando ranking...</div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            setShowRanking(false);
                            proceedAfterRanking();
                        }}
                        style={{
                            marginTop: 24, width: "100%", padding: 16,
                            borderRadius: 14,
                            background: "linear-gradient(135deg, #1a2a3a, #0d1b2a)",
                            color: "#00ffcc", fontSize: 14, fontWeight: 800,
                            letterSpacing: 2, cursor: "pointer",
                            border: "1px solid rgba(0,255,204,0.3)"
                        }}
                    >
                        FECHAR RANKING
                    </button>
                </div>
            </div>
        );
    }


    // --- MODAL DE DESBLOQUEIO DE FACÇÃO (LÍDER EXPOSTO) ---
    if (unlockedFaction) {
        return (
            <div style={{
                position: "fixed", inset: 0, zIndex: 10005, background: "#060a0f",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                padding: 20, boxSizing: "border-box"
            }}>
                <style>{`
                    @keyframes border-glow {
                        0%, 100% { border-color: rgba(255,215,0,0.3); box-shadow: 0 0 15px rgba(255,215,0,0.1); }
                        50% { border-color: rgba(255,215,0,1); box-shadow: 0 0 35px rgba(255,215,0,0.4); }
                    }
                    @keyframes header-glow {
                        0%, 100% { text-shadow: 0 0 10px rgba(255,77,106,0.3); color: #ff4d6a; }
                        50% { text-shadow: 0 0 25px rgba(255,77,106,0.8); color: #ff1a40; }
                    }
                    @keyframes panel-slide {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .uf-circle-glow {
                        animation: border-glow 2.5s infinite ease-in-out;
                    }
                    .uf-header-glow {
                        animation: header-glow 2s infinite ease-in-out;
                    }
                `}</style>
                <div style={{
                    maxWidth: 420, width: "100%", textAlign: "center",
                    animation: "panel-slide 0.7s cubic-bezier(0.19, 1, 0.22, 1) both"
                }}>
                    <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                        <img 
                            src="/AgenciaATLAS.png" 
                            alt="Agência A.T.L.A.S." 
                            style={{ width: 80, height: 80, objectFit: "contain" }} 
                        />
                    </div>
                    <div style={{ fontSize: 10, letterSpacing: 4, color: "#80bdff", fontWeight: 800, marginBottom: 6 }}>📡 ALERTA DE INTELIGÊNCIA A.T.L.A.S.</div>
                    
                    <h2 className="uf-header-glow" style={{ fontSize: 24, fontWeight: 900, margin: 0, marginBottom: 15, textTransform: "uppercase" }}>
                        Facção Desmantelada!
                    </h2>
                    
                    <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 16,
                        padding: "16px 20px",
                        marginBottom: 24,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.85)",
                        fontStyle: "italic"
                    }}>
                        "{unlockedFaction.message}"
                    </div>

                    {/* Exposed Boss Card */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(7, 18, 26, 0.9) 0%, rgba(3, 8, 13, 0.95) 100%)",
                        border: "1px solid rgba(255,215,0,0.2)",
                        borderRadius: 20,
                        padding: "24px 16px",
                        marginBottom: 30,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <div 
                            className="uf-circle-glow"
                            style={{
                                width: 96, height: 96, borderRadius: "50%",
                                overflow: "hidden", border: "2px solid rgba(255,215,0,0.3)",
                                background: "#0a131a", marginBottom: 16
                            }}
                        >
                            <img 
                                src="/Suspeitos/NaoIdentificadoLider.png" 
                                alt="Líder Não Identificado" 
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                            />
                        </div>

                        <div style={{ fontSize: 9, color: "#ffd700", fontWeight: 900, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                            👑 LÍDER EXPOSTO
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#ffd700", textShadow: "0 0 10px rgba(255,215,0,0.3)", textTransform: "uppercase", marginBottom: 8 }}>
                            {unlockedFaction.leaderName}
                        </div>
                        
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", maxWidth: 260, lineHeight: 1.4 }}>
                            A rede de inteligência Meridian foi rompida. Este alvo agora pode surgir como alvo principal em suas missões procedurais.
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (unlockedFaction?.leaderId) {
                                const leaderId = unlockedFaction.leaderId;
                                const currentSeen = state.player.seenLeaderUnlocks || [];
                                if (!currentSeen.includes(leaderId)) {
                                    const nextSeen = [...currentSeen, leaderId];
                                    const nextState = {
                                        ...state,
                                        player: {
                                            ...state.player,
                                            seenLeaderUnlocks: nextSeen
                                        }
                                    };
                                    const saved = saveGame(nextState);
                                    replaceState(saved);
                                    if (state.player.supabaseId) {
                                        saveGameState(saved).catch(e => console.warn("[CasoSolucionado] Erro ao salvar seenLeaderUnlocks remoto:", e));
                                    }
                                }
                            }
                            setUnlockedFaction(null);
                            proceedAfterFactionUnlock();
                        }}
                        style={{
                            width: "100%", padding: 16, borderRadius: 14,
                            background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(0,0,0,0.3))",
                            border: "1px solid rgba(255,215,0,0.35)",
                            color: "#ffd700", fontSize: 13, fontWeight: 800,
                            letterSpacing: 2, cursor: "pointer", transition: "all 0.3s",
                            boxShadow: "0 5px 15px rgba(255,215,0,0.1)"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.05))";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,215,0,0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(0,0,0,0.3))";
                            e.currentTarget.style.boxShadow = "0 5px 15px rgba(255,215,0,0.1)";
                        }}
                    >
                        RECONHECER ALVO ➔
                    </button>
                </div>
            </div>
        );
    }


    // --- MODAIS DE STREAK / VOUCHER (Após ENCERRAR) ---
    if (streakUpdated || newVoucher) {
        return (
            <div style={{ 
                position: "fixed", 
                inset: 0, 
                zIndex: 10000, 
                background: "#0a0c10", 
                color: "#fff", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <style>{`
                    @keyframes om-modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes om-modal-scale-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                `}</style>

                {streakUpdated ? (
                    <div style={{ 
                        background: "linear-gradient(135deg, #112233 0%, #000 100%)", 
                        padding: "30px 20px", 
                        borderRadius: 24, 
                        border: "1px solid rgba(128,189,255,0.3)", 
                        maxWidth: 450, 
                        width: "100%", 
                        textAlign: "center", 
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        animation: "om-modal-fade-in 0.4s ease-out" 
                    }}>
                        <div style={{ color: "#80bdff", letterSpacing: 4, fontSize: 11, marginBottom: 10, fontWeight: 700 }}>📡 CENTRAL A.T.L.A.S.</div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 30, color: "#fff" }}>SEQUÊNCIA DIÁRIA</h2>
                        
                        {/* Grid de 30 Dias */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 30, padding: "0 10px" }}>
                            {(() => {
                                const displayVal = streakUpdated?.streakReached || streakUpdated?.current_streak || 0;
                                const normalizedDay = ((displayVal - 1) % 30) + 1;
                                
                                return Array.from({ length: 30 }).map((_, i) => {
                                    const d = i + 1;
                                    const isCompleted = d < normalizedDay;
                                    const isCurrent = d === normalizedDay;
                                    const isMilestone = [7, 14, 21, 30].includes(d);
                                    
                                    let bg = "rgba(255,255,255,0.05)";
                                    let color = "rgba(255,255,255,0.3)";
                                    let border = isMilestone ? "1px solid rgba(255,215,0,0.3)" : "1px solid transparent";
                                    let shadow = "none";
                                    
                                    if (isCompleted) {
                                        bg = "#3cff9c"; color = "#000"; border = "1px solid #3cff9c";
                                    } else if (isCurrent) {
                                        bg = "#fff"; color = "#000"; border = "1px solid #fff";
                                        shadow = "0 0 15px rgba(255,255,255,0.8)";
                                    } else if (isMilestone) {
                                        color = "#ffd700";
                                    }

                                    return (
                                        <div key={d} style={{
                                            aspectRatio: "1", background: bg, borderRadius: 8,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 12, fontWeight: 900, color: color,
                                            border: border, boxShadow: shadow,
                                            position: "relative"
                                        }}>
                                            {isCompleted ? "✓" : d}
                                            {isMilestone && !isCompleted && !isCurrent && (
                                                <div style={{ position: "absolute", top: -2, right: -2, width: 6, height: 6, background: "#ffd700", borderRadius: "50%", boxShadow: "0 0 5px #ffd700" }} />
                                            )}
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        {(() => {
                            const displayVal = streakUpdated?.streakReached || streakUpdated?.current_streak || 0;
                            const normalizedDay = ((displayVal - 1) % 30) + 1;
                            return (
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 30 }}>
                                    {normalizedDay === 30 
                                        ? "Incrível! Você completou um ciclo inteiro de 30 dias na Agência!" 
                                        : `Excelente! Você completou ${displayVal} dia${displayVal > 1 ? "s" : ""} consecutivo${displayVal > 1 ? "s" : ""} de missões.`}
                                </p>
                            );
                        })()}

                        <button 
                            onClick={() => {
                                setStreakUpdated(null);
                                if (!newVoucher) proceedToNext();
                            }} 
                            style={{ background: "#80bdff", color: "#000", padding: "14px 0", width: "100%", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 800, cursor: "pointer" }}
                        >
                            PROSSEGUIR
                        </button>
                    </div>
                ) : newVoucher ? (
                    <div style={{ 
                        textAlign: "center", 
                        maxWidth: 440, 
                        width: "100%",
                        background: "linear-gradient(135deg, #09131a 0%, #020508 100%)",
                        border: "1px solid rgba(0, 255, 204, 0.3)",
                        padding: "30px 20px",
                        borderRadius: 28,
                        boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
                        animation: "om-modal-scale-in 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)" 
                    }}>
                        <div style={{ color: "#00ffcc", letterSpacing: 6, fontSize: 12, marginBottom: 20, fontWeight: 900, textShadow: "0 0 20px rgba(0,255,204,0.5)" }}>📡 RECOMPENSA DIÁRIA</div>
                        
                        <div style={{ display: "flex", justifyContent: "center", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
                            {newVoucher.items && Object.entries(newVoucher.items).map(([itemKey, qty]) => {
                                const imgMap = {
                                    satelite_atlas: "/Itens/SateliteAtlas.png",
                                    fonte_anonima: "/Itens/FonteAnonima.png",
                                    dossie_sigiloso: "/Itens/DossieSigiloso.png",
                                    licenca_tatica: "/Loja/licencaTatica.png"
                                };
                                const imgSrc = imgMap[itemKey] || "/Loja/licencaTatica.png";
                                return (
                                    <div key={itemKey} style={{ position: "relative", animation: "om-modal-fade-in 0.6s ease-out" }}>
                                        <div style={{ width: 80, height: 80, borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                                            <img src={imgSrc} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }} alt={itemKey} />
                                        </div>
                                        {qty > 1 && (
                                            <div style={{ position: "absolute", top: -8, right: -8, background: "#00ffcc", color: "#000", fontWeight: 900, fontSize: 12, width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #09131a" }}>
                                                x{qty}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {newVoucher.moedas > 0 && (
                            <div style={{ fontSize: 32, fontWeight: 900, color: "#ffd700", marginBottom: 10, textShadow: "0 0 15px rgba(255,215,0,0.4)" }}>
                                + {newVoucher.moedas.toLocaleString('pt-BR')} MOEDAS
                            </div>
                        )}

                        <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{newVoucher.label}</h3>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
                            Agente disciplinado detectado.<br/>
                            Seu bônus de sequência diária foi creditado.
                        </p>

                        <button 
                            onClick={() => {
                                setNewVoucher(null);
                                proceedToNext();
                            }} 
                            style={{ background: "linear-gradient(135deg, #00ffcc, #00b38f)", color: "#000", fontWeight: 900, padding: "16px 0", width: "100%", borderRadius: 16, border: "none", fontSize: 14, cursor: "pointer", boxShadow: "0 10px 25px rgba(0,255,204,0.3)" }}
                        >
                            RECEBER RECOMPENSA
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }


    return (
        <div style={{
            minHeight: "100dvh",
            background: "#0a0c10",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "auto",
            boxSizing: "border-box"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "420px",
                width: "100%"
            }}>
                {/* Card 1: Foto do Suspeito Preso / Missão Fracassada */}
                <div style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    border: isWon ? "2px solid #ffd700" : "2px solid #ff4d4d",
                    background: "rgba(255,255,255,0.03)",
                    boxShadow: isWon
                        ? "0 0 30px rgba(255,215,0,0.15)"
                        : "0 0 30px rgba(255,77,77,0.15)"
                }}>
                    <img
                        src={conclusionImg}
                        alt="Resultado da Missão"
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                    />
                </div>

                {/* Card 2: Comunicado A.T.L.A.S. via DialogBox */}
                <div style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: isWon ? "#ffd700" : "#ff4d4d",
                    letterSpacing: "2px",
                    textAlign: "center",
                    marginBottom: -8
                }}>
                    {isWon ? "🏆 MISSÃO CONCLUÍDA COM SUCESSO" : "🚨 MISSÃO FRACASSADA"}
                </div>

                <DialogBox
                    title="📜 Comunicado Oficial — Agência A.T.L.A.S."
                    text={reportText}
                    onComplete={handleEncerrar}
                    buttonLabel="ENCERRAR"
                    maxChars={180}
                />
            </div>
        </div>
    );
}
