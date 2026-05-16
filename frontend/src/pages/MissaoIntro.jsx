import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../game/GameProvider";
import { getCaseConfig } from "../game/CasosScenarios";

// ── Typewriter Hook ──────────────────────────────────────
function useTypewriter(text, speed = 25, active = false) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        if (!active) return;
        setDisplayed("");
        setDone(false);
        indexRef.current = 0;

        const timer = setInterval(() => {
            indexRef.current++;
            if (indexRef.current >= text.length) {
                setDisplayed(text);
                setDone(true);
                clearInterval(timer);
            } else {
                setDisplayed(text.slice(0, indexRef.current));
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, active]);

    const skip = useCallback(() => {
        setDisplayed(text);
        setDone(true);
    }, [text]);

    return { displayed, done, skip };
}

export default function MissaoIntro() {
    const { caseId } = useParams();
    const nav = useNavigate();
    const [phase, setPhase] = useState("VIDEO"); // VIDEO → RESUMO → BRIEFING
    const [fadeOut, setFadeOut] = useState(false);
    const { state } = useGame();
    const videoRef = useRef(null);

    const caseConfig = getCaseConfig(caseId);

    const isResumoActive = phase === "RESUMO";
    const resumoText = state?.cases?.find(c => c.id === caseId)?.resumo || "";
    const { displayed: typedText, done: typingDone, skip: skipTyping } = useTypewriter(resumoText, 20, isResumoActive);

    useEffect(() => {
        if (!caseConfig.hasIntroVideo) {
            setPhase("RESUMO");
        }
    }, [caseId, caseConfig]);

    const handleVideoEnd = () => {
        setPhase("RESUMO");
    };

    const handleAccept = () => {
        setFadeOut(true);
        setTimeout(() => {
            setFadeOut(false);
            setPhase("BRIEFING");
        }, 800);
    };

    if (!state) return null;

    const caseObj = state.cases.find(c => c.id === caseId);
    const { player } = state;

    if (!caseObj) return <div>Caso não encontrado.</div>;

    const dias = Math.floor(caseObj.tempoTotalHoras / 24);

    const diffLabel = (caseObj.dificuldade || "").toUpperCase();
    const diffColor =
        diffLabel === "FACIL" ? "#3cff9c" :
        diffLabel === "MEDIO" ? "#50aaff" :
        diffLabel === "DIFICIL" ? "#ffbe5a" :
        "#aa78ff";

    // ── PHASE: VIDEO ─────────────────────────────────────
    if (phase === "VIDEO") {
        return (
            <div style={{ height: "100dvh", width: "100vw", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <video
                    ref={videoRef}
                    src={caseConfig.introVideo}
                    autoPlay
                    playsInline
                    muted
                    webkit-playsinline="true"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    onEnded={handleVideoEnd}
                    onError={handleVideoEnd}
                    onStalled={() => { setTimeout(handleVideoEnd, 5000); }}
                />
                <button
                    onClick={handleVideoEnd}
                    style={{ position: "absolute", bottom: 30, right: 30, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 12, letterSpacing: 2 }}
                >
                    PULAR VÍDEO ❯
                </button>
            </div>
        );
    }

    // ── PHASE: RESUMO ────────────────────────────────────
    if (phase === "RESUMO") {
        return (
            <div
                onClick={() => { if (!typingDone) skipTyping(); }}
                style={{
                    minHeight: "100dvh", width: "100vw", background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    textAlign: "center", padding: "24px", color: "#fff",
                    boxSizing: "border-box", overflowX: "hidden",
                    opacity: fadeOut ? 0 : 1,
                    transition: "opacity 0.8s ease",
                }}
            >
                <div style={{ maxWidth: "440px", width: "100%", padding: "0 8px", boxSizing: "border-box" }}>
                    {/* Badge de dificuldade */}
                    <div style={{
                        display: "inline-block", padding: "6px 18px", borderRadius: 999,
                        background: `${diffColor}18`, border: `1px solid ${diffColor}44`,
                        color: diffColor, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 24
                    }}>
                        {diffLabel}
                    </div>

                    {/* Título do caso */}
                    <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.3, marginBottom: 10, color: "rgba(255,255,255,0.95)" }}>
                        {caseObj.titulo}
                    </h1>

                    {/* Local inicial */}
                    <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 28, letterSpacing: 1 }}>
                        📍 {caseObj.localInicial?.cidade} · {caseObj.localInicial?.pais}
                    </div>

                    {/* Resumo do caso — Typewriter */}
                    <div style={{
                        borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)", padding: "20px 18px",
                        fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.85)",
                        textAlign: "left", whiteSpace: "pre-line", minHeight: 80
                    }}>
                        {typedText}
                        {!typingDone && <span style={{ opacity: 0.6, animation: "blink 0.7s infinite" }}>▌</span>}
                    </div>

                    {/* Conteúdo que aparece após a digitação */}
                    <div style={{
                        opacity: typingDone ? 1 : 0,
                        transform: typingDone ? "translateY(0)" : "translateY(12px)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                        pointerEvents: typingDone ? "auto" : "none",
                    }}>
                        {/* Info badges */}
                        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.86)" }}>
                                💰 ${caseObj.recompensa}
                            </span>
                            <span style={{ fontSize: 11, padding: "6px 12px", borderRadius: 999, background: "rgba(80,170,255,0.12)", border: "1px solid rgba(80,170,255,0.22)", color: "rgba(210,240,255,0.95)" }}>
                                🧠 XP {caseObj.xp}
                            </span>
                            <span style={{ fontSize: 11, padding: "6px 12px", borderRadius: 999, background: "rgba(170,120,255,0.12)", border: "1px solid rgba(170,120,255,0.22)", color: "rgba(240,225,255,0.95)" }}>
                                ⏳ {caseObj.tempoTotalHoras}h
                            </span>
                        </div>

                        {/* Botão aceitar missão */}
                        <button
                            onClick={handleAccept}
                            style={{
                                marginTop: 32, width: "100%", padding: "16px 24px",
                                borderRadius: 14, border: "1px solid rgba(80,170,255,0.3)",
                                background: "linear-gradient(135deg, rgba(80,170,255,0.15), rgba(80,170,255,0.05))",
                                color: "#80bdff", fontSize: 14, fontWeight: 700,
                                letterSpacing: 2, cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            ACEITAR MISSÃO ❯
                        </button>

                        {/* Botão voltar */}
                        <button
                            onClick={() => nav("/mural")}
                            style={{
                                marginTop: 12, width: "100%", padding: "12px 24px",
                                borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)",
                                background: "transparent", color: "rgba(255,255,255,0.4)",
                                fontSize: 11, letterSpacing: 2, cursor: "pointer",
                            }}
                        >
                            VOLTAR AO MURAL
                        </button>
                    </div>
                </div>

                <style>{`
                    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                `}</style>
            </div>
        );
    }

    // ── PHASE: BRIEFING ──────────────────────────────────
    return (
        <div
            style={{
                height: "100dvh", width: "100vw", background: "#000",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", padding: "20px", color: "#fff",
                boxSizing: "border-box", overflowX: "hidden"
            }}
            onClick={() => nav(`/caso/${caseId}?setup=true`)}
        >
            <div style={{ maxWidth: "420px", width: "100%", padding: "0 8px", boxSizing: "border-box" }}>
                <div style={{ color: "#80bdff", fontSize: "14px", letterSpacing: "4px", marginBottom: "30px", opacity: 0.8 }}>
                    ❯ COMUNICAÇÃO OFICIAL A.T.L.A.S.
                </div>

                <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "40px", lineHeight: "1.4" }}>
                    {player.nivelTitulo} "{player.nome}", você recebeu o valor de <span style={{ color: "#ffd700" }}>R$ {(caseObj.valorAdiantamento ?? 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> para custos de despesas.
                    <br /><br />
                    Você tem <span style={{ color: "#ffd700" }}>{dias} Dias</span> para resolver o caso.
                    <br /><br />
                    Boa Sorte!
                </h1>

                <div style={{ marginTop: "40px", animation: "pulse 2s infinite", fontSize: "12px", opacity: 0.5, letterSpacing: "3px" }}>
                    CLIQUE PARA INICIAR A MISSÃO
                </div>
            </div>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
            `}</style>
        </div>
    );
}
