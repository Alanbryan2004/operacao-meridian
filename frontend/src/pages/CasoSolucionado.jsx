import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCargoByXp, getProximoCargo } from "../game/Cargos";
import { suspectsSeed, saveGame } from "../game/store";
import { supabase } from "../lib/supabase";
import { saveGameState } from "../services/gameSaveService";
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

    // Se não temos o run nem o state, e não estamos mostrando o modal, aí sim retornamos null
    if (!state || !caseObj || (!run && !streakUpdated && !newVoucher)) return null;

    const isCompetitive = useMemo(() => {
        return searchParams.get("mode") === "competitive" || !!caseObj?.isCompetitive;
    }, [searchParams, caseObj]);

    const isWon = run?.status === "WON";
    const player = state.player;
    const [foundWinnerName, setFoundWinnerName] = useState(run?.winnerName || "");

    // 🔍 Tenta buscar o nome do vencedor caso não tenha sido sincronizado via Broadcast/Realtime
    useEffect(() => {
        const lobbyId = searchParams.get("lobbyId");
        const isGenericName = !foundWinnerName || foundWinnerName === "um Agente de Elite";

        if (isCompetitive && !isWon && isGenericName && lobbyId) {
            console.log("[ATLAS] Buscando nome do vencedor no banco...");
            supabase.from("competitive_lobbies")
                .select("winner_id")
                .eq("id", lobbyId)
                .single()
                .then(async ({ data }) => {
                    if (data?.winner_id) {
                        const { data: profile } = await supabase
                            .from("profiles")
                            .select("nickname")
                            .eq("id", data.winner_id)
                            .maybeSingle();

                        if (profile?.nickname) {
                            setFoundWinnerName(profile.nickname);
                        }
                    }
                })
                .catch(err => console.error("[ATLAS] Erro ao buscar vencedor:", err));
        }
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
                return `Parabéns pelo excelente desempenho e pela rapidez na conclusão do caso! sua eficiência foi absoluta, deixando os demais agentes para trás.\n\nA Agência A.T.L.A.S. reconhece sua superioridade tática nesta operação.\n\n🌍 Caso Encerrado.\n\n🏆 RECOMPENSA: +R$${caseObj.recompensa} | +${caseObj.xp} XP`;
            } else if (isCompetitive && (caseObj.dificuldade === "DIFICIL" || caseObj.dificuldade === "LENDARIO")) {
                return `Infelizmente, você falhou. O Agente "${winnerName}" fez um excelente trabalho completando a missão antes de você.\n\nÉ necessário melhorar suas táticas e evoluir para não ser superado novamente nas próximas operações.\n\n🌍 Caso Encerrado.`;
            } else {
                // Para Casos Fácil/Médio ou falha por mandado errado em modo solo
                return `Infelizmente, você falhou. O suspeito escapou da captura porque o mandado de prisão emitido não correspondia à identidade do alvo.\n\nA Agência A.T.L.A.S. espera mais precisão em operações de alto risco. Verifique as pistas com mais atenção da próxima vez.\n\n🌍 Caso Encerrado.`;
            }
        }

        return isWon
            ? `O suspeito foi capturado com êxito.\nA relíquia foi integralmente recuperada e devolvida à custódia internacional.\n\nO brilhante trabalho do(a) Agente ${player.nivelTitulo} "${player.nome}" foi decisivo para o sucesso desta missão.\nSua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.\n\nA.T.L.A.S. reconhece oficialmente sua conduta exemplar.\nContinue assim, Agente. O mundo precisa de mentes afiadas como a sua.\n\nEsperamos trabalhar novamente com você em futuras operações de alto risco.\n🌍 Justiça restaurada. Ordem mantida.\n\n🏆 RECOMPENSA: +R$${caseObj.recompensa} | +${caseObj.xp} XP`
            : `O suspeito escapou da captura.\nA relíquia permanece desaparecida.\n\nCulpado Real: ${realCriminal?.codinome || "Desconhecido"}\nMandado Emitido para: ${warrantSuspect?.codinome || "Nenhum"}\n\nA Agência reconhece que o(a) Agente ${player.nivelTitulo} "${player.nome}" demonstrou potencial estratégico acima da média.\nPorém, falhas na identificação final permitiram que o alvo deixasse o país antes da captura.\n\nA.T.L.A.S. espera mais de alguém que já demonstrou ser brilhante.\nFracassos não definem um agente. Eles moldam os próximos acertos.\n\nReavalie as pistas. Ajuste a estratégia. O próximo movimento será decisivo.\n🌍 O jogo continua.`;
    }, [isWon, isCompetitive, winnerName, player.nome, player.nivelTitulo, caseObj.recompensa, caseObj.xp, realCriminal, warrantSuspect]);

    function handleEncerrar() {
        // 🔥 Garante salvamento remoto imediato antes de qualquer coisa
        if (state.player.supabaseId) {
            saveGameState(state).catch(e => console.warn("[CasoSolucionado] Erro no sync final:", e));
        }

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
                    return; // Fica nesta tela para mostrar os modais
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


    // --- MODAIS DE STREAK / VOUCHER (Após ENCERRAR) ---
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
                        padding: "40px 30px", 
                        borderRadius: 24, 
                        border: "1px solid rgba(128,189,255,0.3)", 
                        maxWidth: 450, 
                        width: "100%", 
                        textAlign: "center", 
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        animation: "om-modal-fade-in 0.4s ease-out" 
                    }}>
                        <div style={{ color: "#80bdff", letterSpacing: 4, fontSize: 11, marginBottom: 10, fontWeight: 700 }}>📡 CENTRAL A.T.L.A.S.</div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 40, color: "#fff" }}>SEQUÊNCIA DIÁRIA</h2>
                        
                        {/* Barra de Progresso */}
                        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 50, padding: "0 10px" }}>
                            <div style={{ position: "absolute", top: "50%", left: 10, right: 10, height: 2, background: "rgba(255,255,255,0.1)", transform: "translateY(-50%)", zIndex: 1 }} />
                            <div style={{ position: "absolute", top: "50%", left: 10, width: `${Math.min(((streakUpdated?.current_streak || 1) - 1) / 6 * 100, 100)}%`, height: 2, background: "#3cff9c", transform: "translateY(-50%)", zIndex: 2, transition: "width 1s ease" }} />
                            
                            {[1,2,3,4,5,6,7].map(d => {
                                const isCompleted = d < (streakUpdated?.current_streak || 0);
                                const isCurrent = d === (streakUpdated?.current_streak || 0);
                                const isReward = d === 7;
                                return (
                                    <div key={d} style={{ zIndex: 3, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ 
                                            width: 32, height: 32, borderRadius: "50%", 
                                            background: isCompleted ? "#3cff9c" : isCurrent ? "#fff" : "#1a2a3a",
                                            border: `2px solid ${isCompleted ? "#3cff9c" : isCurrent ? "#80bdff" : "rgba(255,255,255,0.14)"}`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: (isCompleted || isCurrent) ? "#000" : "#555",
                                            fontSize: 12, fontWeight: 800,
                                            boxShadow: isCurrent ? "0 0 15px rgba(128,189,255,0.5)" : "none"
                                        }}>
                                            {isCompleted ? "✓" : isReward ? "🛫" : d}
                                        </div>
                                        <div style={{ fontSize: 9, marginTop: 8, opacity: isCurrent ? 1 : 0.4, color: isCurrent ? "#80bdff" : "#fff", letterSpacing: 1 }}>{isReward ? "VOUCHER" : `DIA ${d}`}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 30 }}>
                            {streakUpdated.current_streak >= 7 
                                ? "Parabéns! Você alcançou a meta semanal e desbloqueou uma recompensa de transporte." 
                                : `Incrível! Você completou ${streakUpdated.current_streak} dia${streakUpdated.current_streak > 1 ? "s" : ""} consecutivo${streakUpdated.current_streak > 1 ? "s" : ""} de missões.`}
                        </p>

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
                        animation: "om-modal-scale-in 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)" 
                    }}>
                        <div style={{ color: "#ffd700", letterSpacing: 6, fontSize: 12, marginBottom: 20, fontWeight: 900, textShadow: "0 0 20px rgba(255,215,0,0.5)" }}>📡 RECOMPENSA DE ELITE</div>
                        
                        <div style={{ position: "relative", marginBottom: 30 }}>
                            <img src="/Voucher.png" style={{ width: "100%", borderRadius: 20, boxShadow: "0 30px 60px rgba(0,0,0,0.8)", border: "1px solid rgba(255,215,0,0.3)" }} alt="Voucher" />
                            <div style={{ position: "absolute", inset: 0, borderRadius: 20, boxShadow: "inset 0 0 40px rgba(255,215,0,0.2)" }} />
                        </div>

                        <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{newVoucher.label}</h3>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
                            Agente disciplinado detectado.<br/>
                            Você recebeu <strong>{newVoucher.credits} créditos aéreos</strong> com <strong>{Math.round(newVoucher.discount * 100)}% de desconto</strong> para suas próximas operações.
                        </p>

                        <button 
                            onClick={() => {
                                setNewVoucher(null);
                                proceedToNext();
                            }} 
                            style={{ background: "linear-gradient(135deg, #ffd700, #ffba00)", color: "#000", fontWeight: 900, padding: "16px 0", width: "100%", borderRadius: 16, border: "none", fontSize: 14, cursor: "pointer" }}
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
