import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    loadGame,
    saveGame,
    spendMoney,
    spendTime,
    startRunIfNeeded,
} from "../game/store";
import Analisar from "./Analisar";

function fmtHoras(h) {
    const horas = Math.max(0, Number(h || 0));
    const d = Math.floor(horas / 24);
    const r = horas % 24;
    return `${d}d ${r}h`;
}

function Badge({ children, tone = "gray" }) {
    const map = {
        gray: { bg: "rgba(255,255,255,0.08)", bd: "rgba(255,255,255,0.14)", tx: "rgba(255,255,255,0.88)" },
        blue: { bg: "rgba(80,170,255,0.12)", bd: "rgba(80,170,255,0.22)", tx: "rgba(210,240,255,0.95)" },
        green: { bg: "rgba(60,255,160,0.10)", bd: "rgba(60,255,160,0.22)", tx: "rgba(200,255,235,0.95)" },
        amber: { bg: "rgba(255,190,90,0.12)", bd: "rgba(255,190,90,0.22)", tx: "rgba(255,240,215,0.95)" },
        red: { bg: "rgba(255,90,90,0.10)", bd: "rgba(255,90,90,0.22)", tx: "rgba(255,225,225,0.95)" },
        purple: { bg: "rgba(170,120,255,0.12)", bd: "rgba(170,120,255,0.22)", tx: "rgba(240,225,255,0.95)" },
    };
    const s = map[tone] || map.gray;
    return (
        <span
            style={{
                fontSize: 11,
                padding: "6px 10px",
                borderRadius: 999,
                background: s.bg,
                border: `1px solid ${s.bd}`,
                color: s.tx,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}

function Panel({ children }) {
    return (
        <div
            style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 45px rgba(0,0,0,.55)",
                padding: 14,
            }}
        >
            {children}
        </div>
    );
}

const DESTINATION_OPTIONS = [
    {
        id: "PT",
        pais: "Portugal",
        cidade: "Lisboa",
        coords: { x: 450, y: 100 },
        flag: "🇵🇹",
        img: "/Paises/Portugal.png",
        desc: "Portugal é um país europeu banhado pelo Atlântico, conhecido por sua rica história marítima e pelas grandes navegações.\n\nSua cultura mistura tradição e modernidade, com fado, azulejos, castelos medievais e uma gastronomia marcante como o bacalhau e os pastéis de nata.\n\nCom cidades históricas como Lisboa e Porto, o país encanta pelo charme, pela arquitetura e pelo espírito acolhedor de seu povo."
    },
    {
        id: "AR",
        pais: "Argentina",
        cidade: "Buenos Aires",
        coords: { x: 180, y: 220 },
        flag: "🇦🇷",
        img: "/Paises/BuenosAires.png",
        desc: "Buenos Aires é a vibrante capital da Argentina, conhecida por sua arquitetura elegante e avenidas amplas como a 9 de Julio.\n\nBerço do tango, mistura paixão, música e tradição em bairros icônicos como La Boca e San Telmo.\n\nCom cafés históricos, parrillas e vida cultural intensa, a cidade pulsa charme europeu com alma latina."
    },
    {
        id: "US",
        pais: "EUA",
        cidade: "Nova York",
        coords: { x: 120, y: 80 },
        flag: "🇺🇸",
        img: "/Paises/NovaYork.png",
        desc: "Nova York é uma das cidades mais icônicas do mundo, conhecida por seus arranha-céus imponentes e pela energia que nunca desacelera.\n\nLar da Estátua da Liberdade, da Times Square e do Central Park, é um centro global de cultura, negócios e entretenimento.\n\nDiversa e vibrante, mistura idiomas, sabores e estilos de vida em cada esquina, fazendo jus ao apelido de “a cidade que nunca dorme”."
    },
];

const TRANSPORT_MODES = [
    { id: "AVIAO", nome: "Avião", icon: "✈️", custoBase: 800, horasBase: 12, desc: "Rápido e caro" },
    { id: "METRO", nome: "Trem/Metrô", icon: "🚆", custoBase: 300, horasBase: 36, desc: "Econômico e moderado" },
    { id: "BARCO", nome: "Navio/Barco", icon: "🚢", custoBase: 150, horasBase: 72, desc: "Lento e barato" },
];

export default function Caso() {
    const nav = useNavigate();
    const { caseId } = useParams();
    const [state, setState] = useState(null);

    // MODOS CARD 2: "RESUMO" | "ACTIONS" | "LOCATIONS" | "DIALOGUE" | "JOURNAL" | "PROFILE" | "TRAVEL_MAP" | "TRAVEL_MODES" | "ARRIVAL"
    const [viewMode, setViewMode] = useState("RESUMO");
    const [selectedLocal, setSelectedLocal] = useState(null);
    const [selectedDest, setSelectedDest] = useState(null);
    const [showSuspectVideo, setShowSuspectVideo] = useState(false);
    const [darkenScreen, setDarkenScreen] = useState(false);

    useEffect(() => {
        const s = loadGame();
        const caseObj = s.cases.find((x) => x.id === caseId);
        if (!caseObj) {
            nav("/mural");
            return;
        }

        const next = startRunIfNeeded(s, caseObj);
        const saved = saveGame(next);
        setState(saved);

        // tenta tocar áudio (se já liberou no splash/login)
        window.dispatchEvent(new CustomEvent("meridian-play-audio", { detail: true }));
    }, [caseId, nav]);

    const caseObj = useMemo(
        () => state?.cases?.find((x) => x.id === caseId),
        [state, caseId]
    );
    const run = useMemo(
        () => (state?.runs ? state.runs[caseId] : null),
        [state, caseId]
    );

    if (!state || !caseObj || !run) return null;

    function updateRun(nextRun) {
        const nextState = { ...state, runs: { ...state.runs, [caseId]: nextRun } };
        const saved = saveGame(nextState);
        setState(saved);
    }

    function confirmarViagem(transport) {
        if (!selectedDest) return;
        const custo = transport.custoBase;
        const horas = transport.horasBase;

        if (state.player.dinheiro < custo) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: `🚫 Dinheiro insuficiente para viajar de ${transport.nome}.` }],
            });
            setViewMode("ACTIONS");
            return;
        }

        let nextState = spendMoney(state, custo, `✈️ Viagem para ${selectedDest.pais} (${transport.nome}): -$${custo}`, caseId);
        nextState = saveGame(nextState);
        const nextRun = spendTime(nextState.runs[caseId], horas, `✈️ Você chegou em ${selectedDest.cidade} após ${horas}h de viagem.`);

        // Atualiza localização no run
        nextRun.localAtual = { pais: selectedDest.pais, cidade: selectedDest.cidade };

        const finalState = saveGame({
            ...nextState,
            runs: { ...nextState.runs, [caseId]: nextRun },
        });
        setState(finalState);
        setViewMode("ARRIVAL");

        // Se for o país correto (Portugal no caso 1), mostra o vídeo do suspeito
        if (selectedDest.id === "PT") {
            setDarkenScreen(true);
            setTimeout(() => {
                setShowSuspectVideo(true);
                setDarkenScreen(false);
            }, 800); // 800ms de suspense
        }
    }

    function abrirLocais() {
        if (run.status !== "IN_PROGRESS") return;
        setViewMode("LOCATIONS");
    }

    function interrogarNoLocal(locObj) {
        const horas = 1;
        const jaTem = run.pistasDescobertas.some(p => p.idInterrogatorio === locObj.id);

        let msgPista;
        let novaPista = null;

        if (jaTem) {
            msgPista = `🗣️ Você voltou ao ${locObj.local}, nada novo.`;
        } else {
            msgPista = `🗣️ Investigação no ${locObj.local}: pista coletada!`;
            novaPista = {
                idInterrogatorio: locObj.id,
                conteudo: locObj.pista,
                fonte: locObj.personagem,
                local: locObj.local
            };
        }

        const nextRun = spendTime(run, horas, `🗣️ ${msgPista} (-${horas}h)`);
        if (novaPista) nextRun.pistasDescobertas = [...run.pistasDescobertas, novaPista];

        setSelectedLocal(locObj);
        setViewMode("DIALOGUE");
        updateRun(nextRun);
    }

    function analisar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 2; // Reduzi um pouco para incentivar o uso
        updateRun(spendTime(run, horas, `🔍 Acessando Laboratório de Análise: -${2}h.`));
        setViewMode("ANALYZE");
    }

    function emitirMandado() {
        if (run.status !== "IN_PROGRESS") return;
        if (run.mandadoEmitido) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🧾 Mandado já emitido." }],
            });
            return;
        }
        const horas = 2;
        const next = spendTime(run, horas, `🧾 Mandado emitido: -${horas}h.`);
        next.mandadoEmitido = true;
        updateRun(next);
    }

    function capturar() {
        if (run.status !== "IN_PROGRESS") return;
        if (!run.mandadoEmitido) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🚫 Mandado necessário." }],
            });
            return;
        }
        const sucesso = run.pistasDescobertas.length >= 2;
        if (!sucesso) {
            updateRun(spendTime(run, 4, "🚨 Captura falhou. -4h."));
            return;
        }
        const nextRun = {
            ...run,
            status: "WON",
            suspeitoCapturado: true,
            jornal: [...run.jornal, { t: new Date().toISOString(), msg: "✅ Capturado!" }],
        };
        const nextState = {
            ...state,
            player: { ...state.player, dinheiro: state.player.dinheiro + caseObj.recompensa, xp: state.player.xp + caseObj.xp },
            runs: { ...state.runs, [caseId]: nextRun },
        };
        setState(saveGame(nextState));
    }

    const diffTone = caseObj.dificuldade === "FACIL" ? "green" : caseObj.dificuldade === "MEDIO" ? "blue" : "amber";
    const canAct = run.status === "IN_PROGRESS";

    return (
        <div
            style={{
                minHeight: "100dvh",
                width: "100vw",
                margin: 0,
                padding: 0,
                background: "radial-gradient(circle at center, #071a26 0%, #000 70%)",
                color: "#fff",
                position: "relative",
            }}
        >
            {/* Overlay de Escurecimento */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "#000",
                    zIndex: 9999,
                    opacity: darkenScreen ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.6s ease"
                }}
            />

            <style>{`
        .om-wrap { max-width: 560px; margin: 0 auto; padding: 14px; padding-bottom: 96px; }
        .om-top { position: sticky; top: 0; z-index: 25; padding: 12px 0; background: linear-gradient(to bottom, #000, transparent); backdrop-filter: blur(8px); }
        .om-title { font-size: 16px; font-weight: 800; }
        .om-card { margin-top: 10px; }
        .om-img-card { width: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; background: #000; position: relative; }
        .om-btn { width: 100%; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 13px; text-transform: uppercase; font-weight: 700; }
        .om-btn:active { transform: scale(0.98); }
        .om-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .om-btn-primary { background: rgba(120,200,255,0.2); border-color: rgba(120,200,255,0.4); }
        .om-tabs { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; padding: 15px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; justify-content: center; }
        .om-tabs-inner { width: 100%; max-width: 500px; display: flex; gap: 10px; padding: 8px; border-radius: 20px; background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); }
        .om-tab { flex: 1; padding: 12px; border-radius: 14px; border: none; background: transparent; color: rgba(255,255,255,0.7); cursor: pointer; text-align: center; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; }
        .om-tab-active { background: rgba(255,255,255,0.1); color: #fff; }

        .om-scene-box { position: relative; width: 100%; height: 280px; overflow: hidden; background: #000; }
        .om-scene-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .om-scene-char { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 85%; filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
        .om-dialog { margin-top: 10px; padding: 5px; font-size: 15px; line-height: 1.6; color: #fff; }
        .om-journal-list { maxHeight: 250px; overflow-y: auto; padding-right: 5px; }
        .om-journal-item { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }

        /* Mapa Animado */
        .om-map-container { position: relative; width: 100%; height: 280px; background: #0a192f; border-radius: 18px; overflow: hidden; padding: 20px; }
        .om-map-origin { position: absolute; left: 210px; top: 180px; font-size: 20px; z-index: 5; }
        .om-map-dest { position: absolute; font-size: 20px; z-index: 5; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .om-map-line { position: absolute; height: 2px; background: rgba(128,189,255,0.3); transform-origin: left center; z-index: 1; pointer-events: none; }
      `}</style>

            <div style={{ padding: "15px 15px 80px 15px" }}>
                {/* Header Stats */}
                {viewMode !== "ANALYZE" && (
                    <div className="om-top">
                        <Panel>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2 }}>MISSÃO ATIVA</div>
                                    <div className="om-title">{caseObj.titulo}</div>
                                </div>
                                <div style={{ textAlign: "right", display: "flex", gap: "15px" }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 900 }}>${state.player.dinheiro}</div>
                                        <div style={{ fontSize: 10, opacity: 0.6 }}>SALDO</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 900 }}>{fmtHoras(run.tempoRestanteHoras)}</div>
                                        <div style={{ fontSize: 10, opacity: 0.6 }}>RESTANTES</div>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>
                )}

                {/* CARD 1: Imagem do que foi roubado OU Cena de Interrogatório OU Mapa */}
                {viewMode !== "ANALYZE" && (
                    <div className="om-card">
                        <div className="om-img-card">
                            {viewMode === "DIALOGUE" && selectedLocal ? (
                                <div className="om-scene-box">
                                    <img src={selectedLocal.imgLocal} className="om-scene-bg" alt="Local" />
                                    <img src={selectedLocal.imgPersonagem} className="om-scene-char" alt="Personagem" />
                                </div>
                            ) : viewMode === "ARRIVAL" && selectedDest ? (
                                showSuspectVideo ? (
                                    <video
                                        src="/Videos/suspeito.mp4"
                                        autoPlay
                                        muted={false}
                                        onEnded={() => setShowSuspectVideo(false)}
                                        style={{ width: "100%", height: "280px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <img
                                        src={selectedDest.img || "/reliquiaDesaparecida.png"}
                                        style={{ width: "100%", height: "280px", objectFit: "cover" }}
                                        alt={selectedDest.pais}
                                    />
                                )
                            ) : (viewMode === "TRAVEL_MAP" || viewMode === "TRAVEL_MODES") ? (
                                <div className="om-map-container">
                                    {/* Local atual (Brasil) */}
                                    <div className="om-map-origin">📍</div>
                                    <div style={{ position: "absolute", left: 195, top: 205, fontSize: 9, color: "#80bdff" }}>CAMPINAS/BR</div>

                                    {/* Destinos sugeridos */}
                                    {DESTINATION_OPTIONS.map(d => (
                                        <React.Fragment key={d.id}>
                                            <div
                                                className="om-map-dest"
                                                style={{ left: d.coords.x, top: d.coords.y, filter: selectedDest && selectedDest.id !== d.id ? "grayscale(1) opacity(0.3)" : "none" }}
                                            >
                                                {selectedDest && selectedDest.id === d.id ? "⭕" : "📍"}
                                            </div>
                                            {(!selectedDest || selectedDest.id === d.id) && (
                                                <div style={{ position: "absolute", left: d.coords.x - 20, top: d.coords.y + 25, fontSize: 9, color: "#fff", textAlign: "center", width: 60 }}>
                                                    {d.cidade.toUpperCase()}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}

                                    {/* Overlay de Viagem Concluida ou Em Progresso visual */}
                                    <div style={{ position: "absolute", bottom: 15, left: 15, right: 15, background: "rgba(0,0,0,0.6)", padding: "5px 10px", borderRadius: 8, fontSize: 11, border: "1px solid rgba(255,255,255,0.1)" }}>
                                        🌍 Local Atual: <span style={{ color: "#80bdff", fontWeight: 700 }}>{run.localAtual.cidade}</span>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={caseObj.imgItem || "/reliquiaDesaparecida.png"}
                                    style={{ width: "100%", height: "240px", objectFit: "contain", padding: "20px" }}
                                    alt="Item Roubado"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* CARD 2: Dinâmico */}
                {viewMode !== "ANALYZE" && (
                    <div className="om-card">
                        <Panel>
                            {viewMode === "RESUMO" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>RELATÓRIO DO CASO</div>
                                    <div style={{ fontSize: 14, opacity: 0.9, whiteSpace: "pre-line", lineHeight: 1.6 }}>
                                        {caseObj.resumo}
                                    </div>
                                    <div style={{ marginTop: 15, fontSize: 12, opacity: 0.6 }}>
                                        Local Atual: {run.localAtual.cidade} · {run.localAtual.pais}
                                    </div>
                                </div>
                            )}

                            {viewMode === "ACTIONS" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>CENTRAL DE OPERAÇÕES</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                        <button className="om-btn" onClick={() => setViewMode("TRAVEL_MAP")} disabled={!canAct}>VIAJAR</button>
                                        <button className="om-btn" onClick={abrirLocais} disabled={!canAct}>INVESTIGAR</button>
                                        <button className="om-btn" onClick={analisar} disabled={!canAct} style={{ gridColumn: "1 / -1" }}>ANALISAR</button>
                                    </div>
                                    <button onClick={() => setViewMode("RESUMO")} className="om-btn" style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Fechar
                                    </button>
                                </div>
                            )}

                            {viewMode === "TRAVEL_MAP" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>ESCOLHER DESTINO</div>
                                    <div className="om-muted" style={{ marginBottom: 15 }}>Seu próximo destino para seguir a trilha:</div>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {DESTINATION_OPTIONS.map(d => (
                                            <button
                                                key={d.id}
                                                className="om-btn"
                                                style={{ textAlign: "left", paddingLeft: 15 }}
                                                onClick={() => { setSelectedDest(d); setViewMode("TRAVEL_MODES"); }}
                                            >
                                                {d.flag} {d.cidade}, <span style={{ opacity: 0.6 }}>{d.pais}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Cancelar
                                    </button>
                                </div>
                            )}

                            {viewMode === "TRAVEL_MODES" && selectedDest && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4, color: "#80bdff" }}>VIAJAR PARA {selectedDest.cidade.toUpperCase()}</div>
                                    <div className="om-muted" style={{ marginBottom: 15 }}>Selecione o meio de transporte:</div>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {TRANSPORT_MODES.map(t => (
                                            <button
                                                key={t.id}
                                                className="om-btn"
                                                style={{ textAlign: "left", padding: "10px 15px", height: "auto" }}
                                                onClick={() => confirmarViagem(t)}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <span style={{ fontSize: 18 }}>{t.icon}</span>
                                                        <div>
                                                            <div style={{ fontSize: 13, fontWeight: 700 }}>{t.nome}</div>
                                                            <div style={{ fontSize: 10, opacity: 0.6 }}>{t.desc}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        <div style={{ fontSize: 12, color: "#ffd700", fontWeight: 700 }}>${t.custoBase}</div>
                                                        <div style={{ fontSize: 10, opacity: 0.6 }}>{t.horasBase}h</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => { setViewMode("TRAVEL_MAP"); setSelectedDest(null); }} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Mudar Destino
                                    </button>
                                </div>
                            )}

                            {viewMode === "ARRIVAL" && selectedDest && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>VOCÊ CHEGOU EM {selectedDest.cidade.toUpperCase()}</div>

                                    {showSuspectVideo ? (
                                        <div style={{ fontSize: 15, fontWeight: 700, fontStyle: "italic", opacity: 0.9, marginTop: 20, textAlign: "center", color: "#ffd700" }}>
                                            "Parece que o Suspeito passou por aqui..."
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ fontSize: 14, opacity: 0.9, whiteSpace: "pre-line", lineHeight: 1.6 }}>
                                                {selectedDest.desc}
                                            </div>
                                            <button
                                                onClick={() => { setViewMode("RESUMO"); setSelectedDest(null); }}
                                                className="om-btn om-btn-primary"
                                                style={{ marginTop: 20 }}
                                            >
                                                ENTENDIDO
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            {viewMode === "LOCATIONS" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>PONTOS DE INVESTIGAÇÃO</div>
                                    <div className="om-muted" style={{ marginBottom: 15 }}>Escolha onde procurar pistas:</div>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {caseObj.interrogatorios?.map(loc => (
                                            <button
                                                key={loc.id}
                                                className="om-btn"
                                                style={{ textAlign: "left", paddingLeft: 15 }}
                                                onClick={() => interrogarNoLocal(loc)}
                                            >
                                                🕵️‍♂️ Ir para <span style={{ fontWeight: 800 }}>{loc.local}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setViewMode("ACTIONS")} className="om-btn" style={{ marginTop: 15, background: "transparent", border: "none", color: "#80bdff" }}>
                                        Cancelar
                                    </button>
                                </div>
                            )}

                            {viewMode === "DIALOGUE" && selectedLocal && (
                                <div>
                                    <div style={{ fontSize: 11, color: "#80bdff", fontWeight: 800, marginBottom: 10, letterSpacing: 1 }}>
                                        {selectedLocal.personagem.toUpperCase()} DIZ:
                                    </div>
                                    <div className="om-dialog">
                                        "{selectedLocal.pista.split('\n')[0]}"
                                        {selectedLocal.pista.includes('\n') && (
                                            <div style={{ marginTop: 10, opacity: 0.85, fontSize: 13 }}>
                                                {selectedLocal.pista.split('\n').slice(1).join('\n')}
                                            </div>
                                        )}
                                    </div>
                                    <button className="om-btn om-btn-primary" style={{ marginTop: 20 }} onClick={() => setViewMode("RESUMO")}>
                                        ENTENDIDO
                                    </button>
                                </div>
                            )}

                            {viewMode === "JOURNAL" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: "#80bdff" }}>JORNAL A.T.L.A.S.</div>
                                    <div className="om-journal-list">
                                        {run.jornal.slice().reverse().map((j, i) => (
                                            <div key={i} className="om-journal-item">
                                                <div style={{ opacity: 0.5, fontSize: 10 }}>{new Date(j.t).toLocaleString("pt-BR")}</div>
                                                <div style={{ marginTop: 4, fontSize: 13 }}>{j.msg}</div>
                                            </div>
                                        ))}
                                        {run.jornal.length === 0 && <div className="om-muted">Nenhum registro encontrado.</div>}
                                    </div>
                                </div>
                            )}

                            {viewMode === "PROFILE" && (
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 15, color: "#80bdff" }}>PERFIL DO AGENTE</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 32, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: "1px solid rgba(255,255,255,0.15)" }}>
                                            👤
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 800 }}>{state.player.nome}</div>
                                            <Badge tone="blue">{state.player.nivelTitulo || "Recruta"}</Badge>
                                            <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>Saldo: ${state.player.dinheiro} | XP: {state.player.xp}</div>
                                        </div>
                                    </div>
                                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 15 }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>MISSÕES EM CURSO</div>
                                        <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ fontSize: 13 }}>{caseObj.titulo}</div>
                                            <Badge tone="green">Ativa</Badge>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Panel>
                    </div>
                )}

                {viewMode === "ANALYZE" && (
                    <Analisar onBack={() => setViewMode("ACTIONS")} />
                )}
            </div>

            {/* Footer Navigation */}
            <div className="om-tabs">
                <div className="om-tabs-inner">
                    <button
                        className={`om-tab ${viewMode === "ACTIONS" || viewMode === "LOCATIONS" || viewMode.startsWith("TRAVEL") ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode(viewMode === "ACTIONS" ? "RESUMO" : "ACTIONS")}
                    >
                        AÇÃO
                    </button>
                    <button
                        className={`om-tab ${viewMode === "JOURNAL" ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode(viewMode === "JOURNAL" ? "RESUMO" : "JOURNAL")}
                    >
                        JORNAL
                    </button>
                    <button
                        className={`om-tab ${viewMode === "PROFILE" ? "om-tab-active" : ""}`}
                        onClick={() => setViewMode(viewMode === "PROFILE" ? "RESUMO" : "PROFILE")}
                    >
                        CASOS
                    </button>
                </div>
            </div>
        </div>
    );
}