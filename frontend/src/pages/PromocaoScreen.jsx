import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCargoByXp, getProximoCargo, getCargoByNivel, getPromotionBonus, PROMOTION_ITEMS } from "../game/Cargos";
import { getPromotionQuestion } from "../game/promotionQuestions";
import { saveGame } from "../game/store";
import { inventoryService } from "../game/inventoryService";
import { ITEMS_DATA } from "../game/itemsData";

/**
 * Fases:
 *   VIDEO      → vídeo do celular tocando
 *   COMUNICADO → texto oficial A.T.L.A.S.
 *   PERGUNTA   → quiz de promoção
 *   ACERTOU    → parabéns + novo cargo
 *   ERROU      → falhou, deve aguardar próxima missão
 */
export default function PromocaoScreen() {
    const nav = useNavigate();
    const { state, replaceState } = useGame();
    const musicEnabled = state?.player?.settings?.musicEnabled ?? true;
    const videoRef = useRef(null);

    const [fase, setFase] = useState("VIDEO");
    const [selectedAlt, setSelectedAlt] = useState(null);
    const [question, setQuestion] = useState(null);
    const [novoCargo, setNovoCargo] = useState(null);
    const [bonusData, setBonusData] = useState(null); // { moedas, itemKey, itemNome }

    const player = state?.player;
    const cargoAtual = player ? getCargoByNivel(player.nivel || 1) : null;

    // Sorteia a pergunta ao montar
    useEffect(() => {
        const nivelAlvo = (player?.nivel || 1) + 1;
        const cargoAlvo = getCargoByNivel(nivelAlvo);

        if (!cargoAlvo || nivelAlvo > 50) {
            nav("/mural");
            return;
        }

        setQuestion(getPromotionQuestion(nivelAlvo));
        setNovoCargo(cargoAlvo);
    }, []);


    if (!state || !player || !question || !novoCargo) return null;

    function handleAnswer(idx) {
        setSelectedAlt(idx);

        setTimeout(async () => {
            if (idx === question.correta) {
                // Calcula bônus baseado na fase do novo cargo
                const bonus = getPromotionBonus(novoCargo.fase);
                const randomItemKey = PROMOTION_ITEMS[Math.floor(Math.random() * PROMOTION_ITEMS.length)];
                const itemInfo = ITEMS_DATA[randomItemKey];

                // Promovido! Atualiza cargo + dinheiro no state
                const next = {
                    ...state,
                    player: {
                        ...state.player,
                        nivel: novoCargo.nivel,
                        nivelTitulo: novoCargo.titulo,
                        classe: novoCargo.classe,
                        classeEmoji: novoCargo.emoji,
                        dinheiro: (state.player.dinheiro || 0) + bonus.moedas,
                    }
                };
                replaceState(saveGame(next));

                // Salva item no inventário (Supabase)
                if (state.player.supabaseId) {
                    inventoryService.addItem(state.player.supabaseId, randomItemKey, 1)
                        .catch(e => console.warn("[Promoção] Erro ao adicionar item:", e));
                }

                setBonusData({
                    moedas: bonus.moedas,
                    itemKey: randomItemKey,
                    itemNome: itemInfo?.nome || randomItemKey,
                    itemImg: itemInfo?.imagem || "/Itens/FonteAnonima.png",
                });
                setFase("BONUS");
            } else {
                setFase("ERROU");
            }
        }, 1200);
    }

    return (
        <div style={{
            minHeight: "100dvh",
            width: "100vw",
            background: "#000",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            boxSizing: "border-box",
        }}>
            <style>{`
                .promo-wrap { max-width: 480px; width: 100%; }
                .promo-panel { border-radius: 18px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 18px 45px rgba(0,0,0,0.55); padding: 20px; }
                .promo-btn { width: 100%; padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 13px; font-weight: 700; text-align: left; margin-bottom: 10px; transition: all 0.2s; }
                .promo-btn:hover { background: rgba(128,189,255,0.1); border-color: rgba(128,189,255,0.3); }
                .promo-btn:disabled { cursor: default; }
                .promo-btn.correct { background: rgba(60,255,160,0.15); border-color: rgba(60,255,160,0.4); color: #3cffA0; }
                .promo-btn.wrong { background: rgba(255,70,70,0.15); border-color: rgba(255,70,70,0.4); color: #ff6b6b; }
                .promo-gold { color: #ffd700; }
                .promo-fade-in { animation: promoFadeIn 0.8s ease forwards; opacity: 0; }
                @keyframes promoFadeIn { to { opacity: 1; } }
            `}</style>

            <div className="promo-wrap">

                {/* ═══════ FASE: VIDEO ═══════ */}
                {fase === "VIDEO" && (
                    <div style={{ borderRadius: 18, overflow: "hidden", position: "relative" }}>
                        <video
                            ref={el => { videoRef.current = el; }}
                            src="/Videos/promocao.mp4"
                            autoPlay
                            playsInline
                            muted
                            webkitPlaysInline
                            x5-playsinline="true"
                            preload="auto"
                            onEnded={() => setFase("COMUNICADO")}
                            onError={() => setFase("COMUNICADO")}
                            onStalled={() => { setTimeout(() => { if (fase === "VIDEO") setFase("COMUNICADO"); }, 5000); }}
                            onLoadedData={(e) => {
                                e.target.play().then(() => {
                                    // Após iniciar o play, aplica a preferência de som
                                    if (musicEnabled && videoRef.current) videoRef.current.muted = false;
                                }).catch(() => {});
                            }}
                            style={{ width: "100%", display: "block", objectFit: "cover" }}
                        />
                        <button
                            onClick={() => setFase("COMUNICADO")}
                            style={{
                                position: "absolute", bottom: 14, right: 14,
                                background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
                                color: "rgba(255,255,255,0.7)", padding: "6px 14px",
                                borderRadius: 8, fontSize: 11, cursor: "pointer", fontWeight: 700,
                            }}
                        >
                            PULAR VÍDEO ▶
                        </button>
                    </div>
                )}

                {/* ═══════ FASE: COMUNICADO ═══════ */}
                {fase === "COMUNICADO" && (
                    <div className="promo-panel promo-fade-in">
                        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, marginBottom: 12, textAlign: "center" }}>🛡️ COMUNICADO OFICIAL</div>
                        <div style={{ fontSize: 16, fontWeight: 900, textAlign: "center", marginBottom: 20, color: "#ffd700" }}>
                            Agência A.T.L.A.S.
                        </div>

                        <div style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.9, marginBottom: 24 }}>
                            O desempenho do <span style={{ color: "#80bdff", fontWeight: 700 }}>{cargoAtual.titulo}</span> foi excepcional.
                            Sua condução precisa e sua capacidade investigativa demonstraram alto valor para esta Agência.
                            <br /><br />
                            Em reconhecimento ao excelente trabalho, <span className="promo-gold" style={{ fontWeight: 800 }}>uma promoção foi autorizada.</span>
                            <br /><br />
                            Antes de assumir o novo cargo, o {cargoAtual.titulo} deverá comprovar sua aptidão respondendo corretamente à seguinte pergunta de validação.
                            <br /><br />
                            <span style={{ opacity: 0.5 }}>A.T.L.A.S. aguarda sua resposta, Agente.</span>
                        </div>

                        <button
                            onClick={() => setFase("PERGUNTA")}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: 14, border: "1px solid rgba(255,215,0,0.4)",
                                background: "rgba(255,215,0,0.12)", color: "#ffd700",
                                cursor: "pointer", fontSize: 14, fontWeight: 800,
                                letterSpacing: 1,
                            }}
                        >
                            INICIAR TESTE DE PROMOÇÃO ▶
                        </button>
                    </div>
                )}

                {/* ═══════ FASE: PERGUNTA ═══════ */}
                {fase === "PERGUNTA" && (
                    <div className="promo-panel promo-fade-in">
                        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, marginBottom: 8, textAlign: "center" }}>🛡️ TESTE DE PROMOÇÃO</div>
                        <div style={{ fontSize: 11, textAlign: "center", opacity: 0.4, marginBottom: 16 }}>
                            {cargoAtual.emoji} {cargoAtual.titulo} → {novoCargo.emoji} {novoCargo.titulo}
                        </div>

                        <div style={{
                            fontSize: 15, fontWeight: 700, lineHeight: 1.5,
                            marginBottom: 20, padding: 16,
                            background: "rgba(255,255,255,0.03)", borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}>
                            {question.pergunta}
                        </div>

                        {question.alternativas.map((alt, i) => {
                            let cls = "promo-btn";
                            if (selectedAlt !== null) {
                                if (i === question.correta) cls += " correct";
                                else if (i === selectedAlt) cls += " wrong";
                            }
                            return (
                                <button
                                    key={i}
                                    className={cls}
                                    disabled={selectedAlt !== null}
                                    onClick={() => handleAnswer(i)}
                                >
                                    <span style={{ opacity: 0.4, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                                    {alt}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ═══════ FASE: BONUS (Moedas + Item) ═══════ */}
                {fase === "BONUS" && bonusData && (
                    <div className="promo-panel promo-fade-in" style={{ textAlign: "center" }}>
                        <style>{`
                            @keyframes promoCoinPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
                            @keyframes promoItemGlow { 0%,100%{box-shadow:0 0 15px rgba(0,255,204,0.2)} 50%{box-shadow:0 0 35px rgba(0,255,204,0.5)} }
                        `}</style>
                        <div style={{ fontSize: 48, marginBottom: 8 }}>🎁</div>
                        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, marginBottom: 6 }}>BÔNUS DE PROMOÇÃO</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#ffd700", marginBottom: 4 }}>
                            Recompensa Desbloqueada!
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 24 }}>
                            Fase {novoCargo.fase} — {novoCargo.classe}
                        </div>

                        {/* Moedas */}
                        <div style={{
                            padding: 16, borderRadius: 14,
                            background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.25)",
                            marginBottom: 14, display: "flex", alignItems: "center", gap: 14,
                        }}>
                            <div style={{ fontSize: 36, animation: "promoCoinPulse 1.5s ease-in-out infinite" }}>💰</div>
                            <div style={{ textAlign: "left", flex: 1 }}>
                                <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 2 }}>BÔNUS EM MOEDAS</div>
                                <div style={{ fontSize: 22, fontWeight: 900, color: "#ffd700" }}>
                                    +R$ {bonusData.moedas.toLocaleString("pt-BR")}
                                </div>
                            </div>
                        </div>

                        {/* Item aleatório */}
                        <div style={{
                            padding: 16, borderRadius: 14,
                            background: "rgba(0,255,204,0.05)", border: "1px solid rgba(0,255,204,0.2)",
                            marginBottom: 24, display: "flex", alignItems: "center", gap: 14,
                            animation: "promoItemGlow 2s ease-in-out infinite",
                        }}>
                            <img
                                src={bonusData.itemImg}
                                alt={bonusData.itemNome}
                                style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", background: "rgba(255,255,255,0.05)" }}
                            />
                            <div style={{ textAlign: "left", flex: 1 }}>
                                <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 2 }}>ITEM TÁTICO</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: "#00ffcc" }}>
                                    {bonusData.itemNome} x1
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setFase("ACERTOU")}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: 14, border: "1px solid rgba(0,255,204,0.3)",
                                background: "linear-gradient(135deg, rgba(0,255,204,0.12), rgba(0,255,204,0.05))",
                                color: "#00ffcc", cursor: "pointer", fontSize: 14, fontWeight: 800,
                                letterSpacing: 1,
                            }}
                        >
                            PROSSEGUIR ▶
                        </button>
                    </div>
                )}

                {/* ═══════ FASE: ACERTOU ═══════ */}
                {fase === "ACERTOU" && (
                    <div className="promo-panel promo-fade-in" style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
                        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, marginBottom: 8 }}>PROMOÇÃO APROVADA</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: "#ffd700", marginBottom: 6 }}>
                            Parabéns, Agente!
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>
                            Você foi oficialmente promovido(a).
                        </div>

                        <div style={{
                            padding: 16, borderRadius: 14,
                            background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.25)",
                            marginBottom: 20,
                        }}>
                            <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 2, marginBottom: 6 }}>NOVO CARGO</div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffd700" }}>
                                {novoCargo.emoji} {novoCargo.titulo}
                            </div>
                            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
                                Classe: {novoCargo.classe} · Nível {novoCargo.nivel}
                            </div>
                        </div>

                        <button
                            onClick={() => nav("/mural")}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: 14, border: "1px solid rgba(255,215,0,0.4)",
                                background: "rgba(255,215,0,0.12)", color: "#ffd700",
                                cursor: "pointer", fontSize: 14, fontWeight: 800,
                            }}
                        >
                            VOLTAR AO MURAL ▶
                        </button>
                    </div>
                )}

                {/* ═══════ FASE: ERROU ═══════ */}
                {fase === "ERROU" && (
                    <div className="promo-panel promo-fade-in" style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, marginBottom: 8 }}>PROMOÇÃO NEGADA</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#ff6b6b", marginBottom: 6 }}>
                            Resposta Incorreta
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 20, lineHeight: 1.7 }}>
                            Infelizmente, sua resposta não atendeu aos critérios da Agência.
                            <br /><br />
                            Você permanecerá como <span style={{ color: "#80bdff", fontWeight: 700 }}>{cargoAtual.titulo}</span> até que uma nova oportunidade de promoção seja disponibilizada após a conclusão de mais uma missão.
                            <br /><br />
                            <span style={{ opacity: 0.5 }}>A.T.L.A.S. confia no seu potencial, Agente.</span>
                        </div>

                        <button
                            onClick={() => nav("/mural")}
                            style={{
                                width: "100%", padding: "14px",
                                borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)",
                                background: "rgba(255,255,255,0.06)", color: "#fff",
                                cursor: "pointer", fontSize: 14, fontWeight: 800,
                            }}
                        >
                            VOLTAR AO MURAL ▶
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
