import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCargoByXp, getProximoCargo } from "../game/Cargos";
import DialogBox from "../components/DialogBox";

export default function CasoSolucionado() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const { state } = useGame();

    const caseObj = useMemo(() => state?.cases?.find(c => String(c.id) === String(caseId)), [state, caseId]);
    const run = useMemo(() => state?.runs?.[caseId], [state, caseId]);

    if (!state || !caseObj || !run) return null;

    const isWon = run.status === "WON";
    const player = state.player;

    const conclusionImg = isWon
        ? `/Suspeitos/Presos/${run.warrantId}.png`
        : `/Suspeitos/Presos/missaoFracassada.png`;

    const reportText = isWon
        ? `O suspeito foi capturado com êxito.\nA relíquia foi integralmente recuperada e devolvida à custódia internacional.\n\nO brilhante trabalho do(a) Agente ${player.nivelTitulo} "${player.nome}" foi decisivo para o sucesso desta missão.\nSua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.\n\nA.T.L.A.S. reconhece oficialmente sua conduta exemplar.\nContinue assim, Agente. O mundo precisa de mentes afiadas como a sua.\n\nEsperamos trabalhar novamente com você em futuras operações de alto risco.\n🌍 Justiça restaurada. Ordem mantida.\n\n🏆 RECOMPENSA: +R$${caseObj.recompensa} | +${caseObj.xp} XP`
        : `O suspeito escapou da captura.\nA relíquia permanece desaparecida.\n\nA Agência reconhece que o(a) Agente ${player.nivelTitulo} "${player.nome}" demonstrou potencial estratégico acima da média.\nPorém, falhas na execução final permitiram que o alvo deixasse o país antes da emissão adequada do mandado.\n\nA.T.L.A.S. espera mais de alguém que já demonstrou ser brilhante.\nFracassos não definem um agente. Eles moldam os próximos acertos.\n\nReavalie as pistas. Ajuste a estratégia. O próximo movimento será decisivo.\n🌍 O jogo continua.`;

    function handleEncerrar() {
        if (isWon) {
            // Verifica se o jogador tem XP para promoção
            const cargoAtual = getCargoByXp(player.xp);
            const proximoCargo = getProximoCargo(player.xp);

            // Se há próximo cargo E o nível atual do jogador é menor que o cargo que o XP permite
            if (proximoCargo && (player.nivel || 1) < cargoAtual.nivel) {
                // Tem promoção pendente → já qualificou mas ainda não subiu
                nav("/promocao");
                return;
            }

            if (proximoCargo && cargoAtual.nivel >= (player.nivel || 1)) {
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
                    maxChars={200}
                />
            </div>
        </div>
    );
}
