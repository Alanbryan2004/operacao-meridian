// src/pages/Caso.jsx
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

    function interrogar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 6;

        const idx = run.pistasDescobertas.length;
        const pista = caseObj.pistas[idx];

        const msgPista = pista
            ? `🗣️ Interrogatório: pista recebida -> "${pista.conteudo}"`
            : "🗣️ Interrogatório: nada novo. Você já coletou pistas suficientes aqui.";

        const nextRun = spendTime(run, horas, `🗣️ Interrogatório: -${horas}h. ${msgPista}`);

        if (pista) {
            nextRun.pistasDescobertas = [...run.pistasDescobertas, pista];
        }

        updateRun(nextRun);
    }

    function analisar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 3;
        updateRun(spendTime(run, horas, `🔍 Análise de pista: -${horas}h. Você organizou as informações no diário.`));
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
        const next = spendTime(run, horas, `🧾 Mandado emitido: -${horas}h. Agora você pode tentar a captura.`);
        next.mandadoEmitido = true;
        updateRun(next);
    }

    function capturar() {
        if (run.status !== "IN_PROGRESS") return;

        if (!run.mandadoEmitido) {
            updateRun({
                ...run,
                jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🚫 Você precisa emitir mandado antes de capturar." }],
            });
            return;
        }

        const sucesso = run.pistasDescobertas.length >= 2;

        if (!sucesso) {
            const next = spendTime(run, 4, "🚨 Tentativa de captura falhou. Faltam pistas. -4h.");
            updateRun(next);
            return;
        }

        const nextRun = {
            ...run,
            status: "WON",
            suspeitoCapturado: true,
            jornal: [...run.jornal, { t: new Date().toISOString(), msg: "✅ Captura realizada! Caso encerrado com sucesso." }],
        };

        const nextState = {
            ...state,
            player: {
                ...state.player,
                dinheiro: state.player.dinheiro + caseObj.recompensa,
                xp: state.player.xp + caseObj.xp,
            },
            runs: { ...state.runs, [caseId]: nextRun },
        };

        setState(saveGame(nextState));
    }

    const diffTone =
        caseObj.dificuldade === "FACIL" ? "green" :
            caseObj.dificuldade === "MEDIO" ? "blue" :
                caseObj.dificuldade === "DIFICIL" ? "amber" : "purple";

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
            }}
        >
            <style>{`
        .om-wrap { max-width: 560px; margin: 0 auto; padding: 14px; padding-bottom: 96px; }
        .om-top {
          position: sticky;
          top: 0;
          z-index: 25;
          padding-top: 12px;
          padding-bottom: 12px;
          background: linear-gradient(to bottom, rgba(0,0,0,.85), rgba(0,0,0,0));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .om-title { font-size: 16px; font-weight: 800; letter-spacing: .3px; }
        .om-muted { font-size: 12px; opacity: .75; margin-top: 4px; line-height: 1.35; }
        .om-grid { display: grid; gap: 10px; margin-top: 10px; }
        .om-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
        .om-btn {
          width: 100%;
          padding: 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,.92);
          font-size: 13px;
          letter-spacing: .8px;
          cursor: pointer;
        }
        .om-btn:active { transform: scale(0.99); }
        .om-btn[disabled] { opacity: .45; cursor: not-allowed; }
        .om-btn-primary { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,.22); }
        .om-btn-capture { grid-column: 1 / -1; background: rgba(60,255,160,0.10); border-color: rgba(60,255,160,0.22); }
        .om-journal {
          max-height: 260px;
          overflow: auto;
          padding-right: 4px;
        }
        .om-line { border-bottom: 1px solid rgba(255,255,255,.10); padding-bottom: 10px; margin-bottom: 10px; }
        .om-line:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
        .om-tabs {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 30;
          padding: 10px 12px 14px 12px;
          background: linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,0));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .om-tabs-inner {
          max-width: 560px;
          margin: 0 auto;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 18px 45px rgba(0,0,0,.55);
          padding: 8px;
          display: flex;
          gap: 8px;
        }
        .om-tab {
          flex: 1;
          padding: 10px 10px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,.9);
          font-size: 12px;
          letter-spacing: 1px;
          cursor: pointer;
          text-align: center;
        }
        .om-tab:active { transform: scale(0.99); }
      `}</style>

            <div className="om-wrap">
                {/* Header sticky */}
                <div className="om-top">
                    <Panel>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: 2 }}>A.T.L.A.S.</div>
                                <div className="om-title">{caseObj.titulo}</div>
                                <div className="om-muted">
                                    Caso {caseObj.id} · <span style={{ opacity: 0.9 }}>{caseObj.localInicial.cidade} · {caseObj.localInicial.pais}</span>
                                </div>
                                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    <Badge tone={diffTone}>{caseObj.dificuldade}</Badge>
                                    <Badge tone="gray">Status: {run.status}</Badge>
                                    {run.mandadoEmitido ? (
                                        <Badge tone="blue">Mandado: OK</Badge>
                                    ) : (
                                        <Badge tone="gray">Mandado: Pendente</Badge>
                                    )}
                                </div>
                            </div>

                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 11, opacity: 0.75 }}>Tempo</div>
                                <div style={{ fontSize: 16, fontWeight: 900 }}>{fmtHoras(run.tempoRestanteHoras)}</div>
                                <div style={{ marginTop: 8 }}>
                                    <Badge tone="gray">💰 ${state.player.dinheiro}</Badge>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* Ações */}
                <div className="om-grid">
                    <Panel>
                        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.2 }}>Ações</div>
                        <div className="om-muted">Cada ação consome tempo interno e pode gastar dinheiro.</div>

                        <div className="om-actions">
                            <button className="om-btn om-btn-primary" onClick={viajar} disabled={!canAct}>
                                VIAJAR
                            </button>

                            <button className="om-btn" onClick={interrogar} disabled={!canAct}>
                                INTERROGAR
                            </button>

                            <button className="om-btn" onClick={analisar} disabled={!canAct}>
                                ANALISAR
                            </button>

                            <button className="om-btn" onClick={emitirMandado} disabled={!canAct}>
                                EMITIR MANDADO
                            </button>

                            <button className="om-btn om-btn-capture" onClick={capturar} disabled={!canAct}>
                                CAPTURAR
                            </button>
                        </div>

                        <div className="om-muted" style={{ marginTop: 10 }}>
                            Dica MVP: colete pelo menos 2 pistas e emita mandado.
                        </div>
                    </Panel>

                    {/* Diário */}
                    <Panel>
                        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.2 }}>Diário de Pistas</div>

                        {run.pistasDescobertas.length === 0 ? (
                            <div className="om-muted" style={{ marginTop: 10 }}>Nenhuma pista ainda.</div>
                        ) : (
                            <ul style={{ marginTop: 10, paddingLeft: 18, fontSize: 12, lineHeight: 1.5, opacity: 0.92 }}>
                                {run.pistasDescobertas.map((p, i) => (
                                    <li key={i} style={{ marginBottom: 6 }}>
                                        {p.conteudo}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Panel>

                    {/* Jornal */}
                    <div id="jornal">
                        <Panel>
                            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.2 }}>Jornal A.T.L.A.S.</div>

                            <div className="om-journal" style={{ marginTop: 10, fontSize: 12, opacity: 0.92 }}>
                                {run.jornal
                                    .slice()
                                    .reverse()
                                    .map((j, i) => (
                                        <div key={i} className="om-line">
                                            <div style={{ fontSize: 11, opacity: 0.7 }}>
                                                {new Date(j.t).toLocaleString("pt-BR")}
                                            </div>
                                            <div style={{ marginTop: 4 }}>{j.msg}</div>
                                        </div>
                                    ))}
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>

            {/* Bottom tabs */}
            <div className="om-tabs">
                <div className="om-tabs-inner">
                    <button className="om-tab" onClick={() => nav("/mural")}>
                        MURAL
                    </button>
                    <button className="om-tab" onClick={() => window.location.hash = "#jornal"}>
                        JORNAL
                    </button>
                    <button className="om-tab" onClick={() => nav("/login")}>
                        PERFIL
                    </button>
                </div>
            </div>
        </div>
    );
}