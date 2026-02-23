import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame } from "../game/store";

const DESTINATION_OPTIONS = [
    { cidade: "Campinas", img: "/reliquiaDesaparecida.png" },
    { cidade: "Lisboa", img: "/Paises/Portugal.png" },
    { cidade: "Buenos Aires", img: "/Paises/BuenosAires.png" },
    { cidade: "Nova York", img: "/Paises/NovaYork.png" },
    { cidade: "Madrid", img: "/Paises/Madrid.png" },
    { cidade: "Paris", img: "/Paises/Paris.png" },
    { cidade: "Cairo", img: "/Paises/Cairo.png" },
    { cidade: "Moscou", img: "/Paises/Moscou.png" },
    { cidade: "Thimphu", img: "/Paises/Thimphu.png" },
];

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
            minHeight: "100vh",
            background: "#0a0c10",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
                maxWidth: "1100px",
                width: "100%"
            }}>
                {/* Card 1: Visual */}
                <div style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    border: isWon ? "1px solid #ffd700" : "1px solid #ff4d4d",
                    background: "rgba(255,255,255,0.03)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
                }}>
                    <img
                        src={conclusionImg}
                        alt="Resultado da Missão"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                </div>

                {/* Card 2: Comunicado */}
                <div style={{
                    borderRadius: 24,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: isWon ? "#ffd700" : "#ff4d4d",
                        letterSpacing: "2px",
                        marginBottom: 16
                    }}>
                        {isWon ? "MISSÃO CONCLUÍDA COM SUCESSO" : "🚨 MISSÃO FRACASSADA"}
                    </div>

                    <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 24 }}>
                        📜 Comunicado Oficial — Agência A.T.L.A.S.
                    </div>

                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
                        {isWon ? "Relatório Final de Operação" : "Relatório de Encerramento"}
                    </div>

                    <div style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.9, flex: 1 }}>
                        {isWon ? (
                            <>
                                <p>O suspeito foi capturado com êxito.</p>
                                <p>A relíquia foi integralmente recuperada e devolvida à custódia internacional.</p>
                                <br />
                                <p>O brilhante trabalho do(a) Agente {player.nome} foi decisivo para o sucesso desta missão.</p>
                                <p>Sua análise precisa, leitura estratégica das pistas e execução impecável elevaram o padrão operacional da Agência.</p>
                                <br />
                                <p>A.T.L.A.S. reconhece oficialmente sua conduta exemplar.</p>
                                <p>Continue assim, Agente. O mundo precisa de mentes afiadas como a sua.</p>
                                <br />
                                <p>Esperamos trabalhar novamente com você em futuras operações de alto risco.</p>
                                <p>🌍 Justiça restaurada. Ordem mantida.</p>
                                <div style={{ marginTop: 20, color: "#ffd700", fontWeight: 700 }}>
                                    RECOMPENSA: +${caseObj.recompensa} | +{caseObj.xp} XP
                                </div>
                            </>
                        ) : (
                            <>
                                <p>O suspeito escapou da captura.</p>
                                <p>A relíquia permanece desaparecida.</p>
                                <br />
                                <p>A Agência reconhece que o(a) Agente {player.nome} demonstrou potencial estratégico acima da média.</p>
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
                        style={{ marginTop: 32, width: "100%", padding: "16px" }}
                    >
                        VOLTAR AO MURAL
                    </button>
                </div>
            </div>
        </div>
    );
}
