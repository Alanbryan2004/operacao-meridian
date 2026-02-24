import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame } from "../game/store";

export default function CasoSolucionado() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const state = loadGame();

    const caseObj = useMemo(() => state?.cases?.find(c => String(c.id) === String(caseId)), [state, caseId]);
    const run = useMemo(() => state?.runs?.[caseId], [state, caseId]);

    if (!state || !caseObj || !run) return null;

    const isWon = run.status === "WON";
    const player = state.player;

    const conclusionImg = isWon
        ? `/Suspeitos/Presos/${run.warrantId}.png`
        : `/Suspeitos/Presos/missaoFracassada.png`;

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
            overflowY: "auto"
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

                {/* Card 2: Comunicado A.T.L.A.S. */}
                <div style={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: isWon ? "#ffd700" : "#ff4d4d",
                        letterSpacing: "2px",
                        marginBottom: 12
                    }}>
                        {isWon ? "🏆 MISSÃO CONCLUÍDA COM SUCESSO" : "🚨 MISSÃO FRACASSADA"}
                    </div>

                    <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 20 }}>
                        📜 Comunicado Oficial — Agência A.T.L.A.S.
                    </div>

                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                        {isWon ? "Relatório Final de Operação" : "Relatório de Encerramento"}
                    </div>

                    <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9 }}>
                        {isWon ? (
                            <>
                                <p>O suspeito foi capturado com êxito.</p>
                                <p>A relíquia foi integralmente recuperada e devolvida à custódia internacional.</p>
                                <br />
                                <p>O brilhante trabalho do(a) Agente {player.nivelTitulo} "{player.nome}" foi decisivo para o sucesso desta missão.</p>
                                <p>Sua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.</p>
                                <br />
                                <p>A.T.L.A.S. reconhece oficialmente sua conduta exemplar.</p>
                                <p>Continue assim, Agente. O mundo precisa de mentes afiadas como a sua.</p>
                                <br />
                                <p>Esperamos trabalhar novamente com você em futuras operações de alto risco.</p>
                                <p>🌍 Justiça restaurada. Ordem mantida.</p>
                                <div style={{ marginTop: 16, padding: "12px", borderRadius: 12, background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", color: "#ffd700", fontWeight: 700, textAlign: "center" }}>
                                    RECOMPENSA: +R${caseObj.recompensa} | +{caseObj.xp} XP
                                </div>
                            </>
                        ) : (
                            <>
                                <p>O suspeito escapou da captura.</p>
                                <p>A relíquia permanece desaparecida.</p>
                                <br />
                                <p>A Agência reconhece que o(a) Agente {player.nivelTitulo} "{player.nome}" demonstrou potencial estratégico acima da média.</p>
                                <p>Porém, falhas na execução final permitiram que o alvo deixasse o país antes da emissão adequada do mandado.</p>
                                <br />
                                <p>A.T.L.A.S. espera mais de alguém que já demonstrou ser brilhante.</p>
                                <p>Fracassos não definem um agente. Eles moldam os próximos acertos.</p>
                                <br />
                                <p>Reavalie as pistas. Ajuste a estratégia. O próximo movimento será decisivo.</p>
                                <p>🌍 O jogo continua.</p>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => nav("/mural")}
                        className="om-btn om-btn-primary"
                        style={{ marginTop: 24, width: "100%", padding: "14px", fontSize: 14, fontWeight: 700, letterSpacing: "1px" }}
                    >
                        ENCERRAR
                    </button>
                </div>
            </div>
        </div>
    );
}
