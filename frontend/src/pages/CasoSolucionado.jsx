import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCargoByXp, getProximoCargo } from "../game/Cargos";
import { suspectsSeed } from "../game/store";
import { supabase } from "../lib/supabase";
import DialogBox from "../components/DialogBox";

export default function CasoSolucionado() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const { state } = useGame();

    const caseObj = useMemo(() => state?.cases?.find(c => String(c.id) === String(caseId)), [state, caseId]);
    const run = useMemo(() => state?.runs?.[caseId], [state, caseId]);

    if (!state || !caseObj || !run) return null;

    const [searchParams] = useSearchParams();
    const isCompetitive = useMemo(() => {
        return searchParams.get("mode") === "competitive" || !!caseObj?.isCompetitive;
    }, [searchParams, caseObj]);

    const isWon = run.status === "WON";
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
                            .eq("supabase_id", data.winner_id)
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

    const realCriminal = useMemo(() => suspectsSeed.find(s => String(s.id) === String(run.targetSuspectId)), [run.targetSuspectId]);
    const warrantSuspect = useMemo(() => suspectsSeed.find(s => String(s.id) === String(run.warrantId)), [run.warrantId]);

    const conclusionImg = isWon
        ? `/Suspeitos/Presos/${run.warrantId}.png`
        : `/Suspeitos/Presos/missaoFracassada.png`;

    const reportText = useMemo(() => {
        if (isCompetitive) {
            if (isWon) {
                return `Parabéns pelo excelente desempenho e pela rapidez na conclusão do caso! sua eficiência foi absoluta, deixando os demais agentes para trás.\n\nA Agência A.T.L.A.S. reconhece sua superioridade tática nesta operação.\n\n🌍 Caso Encerrado.\n\n🏆 RECOMPENSA: +R$${caseObj.recompensa} | +${caseObj.xp} XP`;
            } else if (run.winnerName) {
                return `Infelizmente, você falhou. O Agente "${winnerName}" fez um excelente trabalho completando a missão antes de você.\n\nÉ necessário melhorar suas táticas e evoluir para não ser superado novamente nas próximas operações.\n\n🌍 Caso Encerrado.`;
            } else {
                // Caso o jogador tenha falhado por conta própria (Mandado errado / Target fugiu)
                return `Infelizmente, você falhou. O suspeito escapou da captura porque o mandado de prisão emitido não correspondia à identidade do alvo.\n\nA Agência A.T.L.A.S. espera mais precisão em operações de alto risco. Verifique as pistas com mais atenção da próxima vez.\n\n🌍 Caso Encerrado.`;
            }
        }

        return isWon
            ? `O suspeito foi capturado com êxito.\nA relíquia foi integralmente recuperada e devolvida à custódia internacional.\n\nO brilhante trabalho do(a) Agente ${player.nivelTitulo} "${player.nome}" foi decisivo para o sucesso desta missão.\nSua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.\n\nA.T.L.A.S. reconhece oficialmente sua conduta exemplar.\nContinue assim, Agente. O mundo precisa de mentes afiadas como a sua.\n\nEsperamos trabalhar novamente com você em futuras operações de alto risco.\n🌍 Justiça restaurada. Ordem mantida.\n\n🏆 RECOMPENSA: +R$${caseObj.recompensa} | +${caseObj.xp} XP`
            : `O suspeito escapou da captura.\nA relíquia permanece desaparecida.\n\nCulpado Real: ${realCriminal?.codinome || "Desconhecido"}\nMandado Emitido para: ${warrantSuspect?.codinome || "Nenhum"}\n\nA Agência reconhece que o(a) Agente ${player.nivelTitulo} "${player.nome}" demonstrou potencial estratégico acima da média.\nPorém, falhas na identificação final permitiram que o alvo deixasse o país antes da captura.\n\nA.T.L.A.S. espera mais de alguém que já demonstrou ser brilhante.\nFracassos não definem um agente. Eles moldam os próximos acertos.\n\nReavalie as pistas. Ajuste a estratégia. O próximo movimento será decisivo.\n🌍 O jogo continua.`;
    }, [isWon, isCompetitive, winnerName, player.nome, player.nivelTitulo, caseObj.recompensa, caseObj.xp, realCriminal, warrantSuspect]);

    function handleEncerrar() {
        if (isWon) {
            // O cargo que o XP atual permitiria ter
            const cargoPermitido = getCargoByXp(player.xp);
            const nivelAtual = player.nivel || 1;

            // Só vai para a tela de promoção se o XP permitir um nível MAIOR que o atual
            if (cargoPermitido.nivel > nivelAtual) {
                nav("/promocao");
                return;
            }
        }
        nav("/mural");
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
                    maxChars={1000}
                />
            </div>
        </div>
    );
}
