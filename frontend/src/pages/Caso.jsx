import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    loadGame,
    saveGame,
    spendMoney,
    spendTime,
    startRunIfNeeded,
} from "../game/store";

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

export default function Caso() {
    const nav = useNavigate();
    const { caseId } = useParams();
    const [state, setState] = useState(null);

    // MODO: "RESUMO" | "LOCATIONS" | "SCENE" | "PROFILE"
    const [viewMode, setViewMode] = useState("RESUMO");
    const [selectedLocal, setSelectedLocal] = useState(null);

    // Toggles para Card 3
    const [showActions, setShowActions] = useState(false);
    const [showJournal, setShowJournal] = useState(false);

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

    function viajar() {
        if (run.status !== "IN_PROGRESS") return;
        const custo = 200;
        const horas = 12;
        let nextState = spendMoney(state, custo, `✈️ Viagem realizada: -$${custo}`, caseId);
        nextState = saveGame(nextState);
        const nextRun = spendTime(nextState.runs[caseId], horas, `✈️ Você viajou e gastou ${horas}h.`);
        const finalState = saveGame({
            ...nextState,
            runs: { ...nextState.runs, [caseId]: nextRun },
        });
        setState(finalState);
    }

    function abrirLocais() {
        if (run.status !== "IN_PROGRESS") return;
        setViewMode("LOCATIONS");
    }

    function interrogarNoLocal(locObj) {
        const horas = 4;
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
        setViewMode("SCENE");
        updateRun(nextRun);
    }

    function analisar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 3;
        updateRun(spendTime(run, horas, `🔍 Análise de pista: -${horas}h.`));
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
            <style>{`
        .om-wrap { max-width: 560px; margin: 0 auto; padding: 14px; padding-bottom: 96px; }
        .om-top { position: sticky; top: 0; z-index: 25; padding: 12px 0; background: linear-gradient(to bottom, #000, transparent); backdrop-filter: blur(8px); }
        .om-title { font-size: 16px; font-weight: 800; }
        .om-card { margin-top: 10px; }
        .om-img-card { width: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); overflow: hidden; background: #000; }
        .om-actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
        .om-btn { width: 100%; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); color: #fff; cursor: pointer; font-size: 13px; }
        .om-btn:active { transform: scale(0.98); }
        .om-btn-primary { background: rgba(120,200,255,0.2); border-color: rgba(120,200,255,0.4); }
        .om-tabs { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; padding: 15px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; justify-content: center; }
        .om-tabs-inner { width: 100%; max-width: 500px; display: flex; gap: 10px; padding: 8px; border-radius: 20px; background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); }
        .om-tab { flex: 1; padding: 12px; border-radius: 14px; border: none; background: transparent; color: rgba(255,255,255,0.7); cursor: pointer; text-align: center; font-size: 12px; font-weight: 700; }
        .om-tab-active { background: rgba(255,255,255,0.1); color: #fff; }

        .om-scene-box { position: relative; width: 100%; height: 300px; border-radius: 18px; overflow: hidden; }
        .om-scene-bg { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; }
        .om-scene-char { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 85%; filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
        .om-dialog { margin-top: 10px; padding: 15px; background: rgba(0,0,0,0.4); border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); font-size: 14px; line-height: 1.5; }
      `}</style>

            <div className="om-wrap">
                {/* Header Stats */}
                <div className="om-top">
                    <Panel>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2 }}>MISSÃO ATIVA</div>
                                <div className="om-title">{caseObj.titulo}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 14, fontWeight: 900 }}>{fmtHoras(run.tempoRestanteHoras)}</div>
                                <div style={{ fontSize: 10, opacity: 0.6 }}>RESTANTES</div>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* CARD 1: Imagem do que foi roubado */}
                <div className="om-card">
                    <div className="om-img-card">
                        <img
                            src={caseObj.imgItem || "/reliquiaDesaparecida.png"}
                            style={{ width: "100%", height: "200px", object_fit: "contain", padding: "20px" }}
                            alt="Item Roubado"
                        />
                    </div>
                </div>

                {/* CARD 2: Dinâmico (Resumo, Investigar, Cena, Perfil) */}
                <div className="om-card">
                    <Panel>
                        {viewMode === "RESUMO" && (
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, color: "#80bdff" }}>RELATÓRIO DO CASO</div>
                                <div style={{ fontSize: 14, opacity: 0.9, whiteSpace: "pre-line", lineHeight: 1.6 }}>
                                    {caseObj.resumo}
                                </div>
                                <div style={{ marginTop: 15, fontSize: 12, opacity: 0.6 }}>
                                    Local de Origem: {caseObj.localInicial.cidade} · {caseObj.localInicial.pais}
                                </div>
                            </div>
                        )}

                        {viewMode === "LOCATIONS" && (
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 12 }}>PRÓXIMOS PASSOS</div>
                                <div className="om-muted" style={{ marginBottom: 15 }}>Selecione um local para investigar:</div>
                                <div style={{ display: "grid", gap: 10 }}>
                                    {caseObj.interrogatorios?.map(loc => (
                                        <button
                                            key={loc.id}
                                            className="om-btn"
                                            style={{ textAlign: "left", paddingLeft: 15 }}
                                            onClick={() => interrogarNoLocal(loc)}
                                        >
                                            🕵️‍♂️ Ir para <span style={{ fontWeight: 700 }}>{loc.local}</span>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setViewMode("RESUMO")}
                                    className="om-btn"
                                    style={{ marginTop: 10, background: "transparent", border: "none", color: "#80bdff" }}
                                >
                                    Voltar ao Relatório
                                </button>
                            </div>
                        )}

                        {viewMode === "SCENE" && selectedLocal && (
                            <div>
                                <div className="om-scene-box">
                                    <img src={selectedLocal.imgLocal} className="om-scene-bg" alt="Local" />
                                    <img src={selectedLocal.imgPersonagem} className="om-scene-char" alt="Personagem" />
                                </div>
                                <div className="om-dialog">
                                    <div style={{ fontSize: 10, color: "#80bdff", fontWeight: 800, marginBottom: 4 }}>
                                        {selectedLocal.personagem.toUpperCase()} DIZ:
                                    </div>
                                    "{selectedLocal.pista.split('\n')[0]}"
                                    {selectedLocal.pista.includes('\n') && (
                                        <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
                                            {selectedLocal.pista.split('\n').slice(1).join('\n')}
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="om-btn om-btn-primary"
                                    style={{ marginTop: 15 }}
                                    onClick={() => setViewMode("RESUMO")}
                                >
                                    ENTENDIDO
                                </button>
                            </div>
                        )}

                        {viewMode === "PROFILE" && (
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 15 }}>PERFIL DO AGENTE</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 20 }}>
                                    <div style={{ width: 60, height: 60, borderRadius: 30, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justify_content: "center", fontSize: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
                                        👤
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 800 }}>{state.player.nome}</div>
                                        <Badge tone="blue">{state.player.nivelTitulo || "Agente Nível 1"}</Badge>
                                    </div>
                                </div>
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 15 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>CASOS EM ANDAMENTO</div>
                                    <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ fontSize: 13 }}>{caseObj.titulo}</div>
                                        <Badge tone="green">Ativo</Badge>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Panel>
                </div>

                {/* CARD 3: Toggleable (Actions ou Journal) */}
                <div style={{ marginTop: 10 }}>
                    {showActions && (
                        <Panel>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <div style={{ fontSize: 13, fontWeight: 800 }}>CENTRAL DE AÇÕES</div>
                                <button onClick={() => setShowActions(false)} style={{ background: "none", border: "none", color: "#666" }}>✕</button>
                            </div>
                            <div className="om-actions-grid">
                                <button className="om-btn" onClick={viajar} disabled={!canAct}>VIAJAR</button>
                                <button className="om-btn" onClick={abrirLocais} disabled={!canAct}>INVESTIGAR</button>
                                <button className="om-btn" onClick={analisar} disabled={!canAct}>ANALISAR</button>
                                <button className="om-btn" onClick={emitirMandado} disabled={!canAct}>MANDADO</button>
                                <button className="om-btn om-btn-primary" style={{ gridColumn: "1/-1" }} onClick={capturar} disabled={!canAct}>EFETUAR CAPTURA</button>
                            </div>
                        </Panel>
                    )}

                    {showJournal && (
                        <Panel>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <div style={{ fontSize: 13, fontWeight: 800 }}>JORNAL A.T.L.A.S.</div>
                                <button onClick={() => setShowJournal(false)} style={{ background: "none", border: "none", color: "#666" }}>✕</button>
                            </div>
                            <div style={{ maxHeight: 200, overflow: "auto", fontSize: 12 }}>
                                {run.jornal.slice().reverse().map((j, i) => (
                                    <div key={i} style={{ padding: "8px 0", borderBottom: i < run.jornal.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                        <div style={{ opacity: 0.5, fontSize: 10 }}>{new Date(j.t).toLocaleTimeString()}</div>
                                        <div style={{ marginTop: 2 }}>{j.msg}</div>
                                    </div>
                                ))}
                                {run.jornal.length === 0 && <div className="om-muted">Sem registros hoje.</div>}
                            </div>
                        </Panel>
                    )}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="om-tabs">
                <div className="om-tabs-inner">
                    <button
                        className={`om-tab ${showActions ? "om-tab-active" : ""}`}
                        onClick={() => { setShowActions(!showActions); setShowJournal(false); }}
                    >
                        AÇÃO
                    </button>
                    <button
                        className={`om-tab ${showJournal ? "om-tab-active" : ""}`}
                        onClick={() => { setShowJournal(!showJournal); setShowActions(false); }}
                    >
                        JORNAL
                    </button>
                    <button
                        className={`om-tab ${viewMode === "PROFILE" ? "om-tab-active" : ""}`}
                        onClick={() => { setViewMode(viewMode === "PROFILE" ? "RESUMO" : "PROFILE"); setShowActions(false); setShowJournal(false); }}
                    >
                        CASOS
                    </button>
                </div>
            </div>
        </div>
    );
}