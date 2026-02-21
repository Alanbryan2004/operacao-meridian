import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadGame, saveGame, spendMoney, spendTime, startRunIfNeeded } from "../game/store";
import AppShell, { BottomTabsCaso } from "../components/AppShell";

function fmtHoras(h) {
    const horas = Math.max(0, Number(h || 0));
    const d = Math.floor(horas / 24);
    const r = horas % 24;
    return `${d}d ${r}h`;
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
    }, [caseId, nav]);

    const caseObj = useMemo(() => state?.cases?.find((x) => x.id === caseId), [state, caseId]);
    const run = useMemo(() => (state?.runs ? state.runs[caseId] : null), [state, caseId]);

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

        // 1) gasta dinheiro
        let nextState = spendMoney(state, custo, `✈️ Viagem realizada: -$${custo}`, caseId);
        nextState = saveGame(nextState);

        // 2) gasta tempo (uma vez só)
        const nextRun = spendTime(
            nextState.runs[caseId],
            horas,
            `✈️ Você viajou e gastou ${horas}h.`
        );

        // 3) salva estado final
        const finalState = saveGame({
            ...nextState,
            runs: { ...nextState.runs, [caseId]: nextRun },
        });

        setState(finalState);
    }

    function interrogar() {
        if (run.status !== "IN_PROGRESS") return;
        const horas = 6;

        // Puxa a próxima pista disponível
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
            updateRun({ ...run, jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🧾 Mandado já emitido." }] });
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
            updateRun({ ...run, jornal: [...run.jornal, { t: new Date().toISOString(), msg: "🚫 Você precisa emitir mandado antes de capturar." }] });
            return;
        }

        // MVP: captura simplificada. Depois: suspeitos + confronto + fuga dinâmica.
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

        // aplica recompensa e xp
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

    return (
        <AppShell
            title="Operação Meridian"
            subtitle={`Caso ${caseObj.id} · ${caseObj.dificuldade}`}
            rightTop={
                <div>
                    <div className="text-[11px] opacity-80">Tempo</div>
                    <div className="text-[15px] font-semibold">{fmtHoras(run.tempoRestanteHoras)}</div>
                    <div className="mt-1">
                        <div className="text-[11px] opacity-80">Dinheiro</div>
                        <div className="text-[14px] font-semibold">${state.player.dinheiro}</div>
                    </div>
                </div>
            }
            bottomTabs={<BottomTabsCaso caseId={caseId} />}
        >
            <div className="bg-white rounded-2xl border shadow-sm p-3">
                <div className="text-[12px] text-gray-500">Caso</div>
                <div className="text-[15px] font-semibold text-gray-900">{caseObj.titulo}</div>
                <div className="text-[12px] text-gray-600 mt-1">
                    Início: {caseObj.localInicial.cidade} · {caseObj.localInicial.pais}
                </div>

                <div className="mt-2 flex gap-2 flex-wrap">
                    <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        Status: {run.status}
                    </span>
                    {run.mandadoEmitido ? (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            Mandado: OK
                        </span>
                    ) : (
                        <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            Mandado: Pendente
                        </span>
                    )}
                </div>
            </div>

            {/* Ações */}
            <div className="mt-3 bg-white rounded-2xl border shadow-sm p-3">
                <div className="text-[13px] font-semibold text-gray-900">Ações</div>
                <div className="text-[12px] text-gray-600 mt-1">
                    Cada ação consome tempo interno e pode gastar dinheiro.
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                        onClick={viajar}
                        disabled={run.status !== "IN_PROGRESS"}
                        className="rounded-xl bg-black text-white py-2 text-[13px] disabled:opacity-50"
                    >
                        Viajar
                    </button>

                    <button
                        onClick={interrogar}
                        disabled={run.status !== "IN_PROGRESS"}
                        className="rounded-xl border py-2 text-[13px] text-gray-800 disabled:opacity-50"
                    >
                        Interrogar
                    </button>

                    <button
                        onClick={analisar}
                        disabled={run.status !== "IN_PROGRESS"}
                        className="rounded-xl border py-2 text-[13px] text-gray-800 disabled:opacity-50"
                    >
                        Analisar
                    </button>

                    <button
                        onClick={emitirMandado}
                        disabled={run.status !== "IN_PROGRESS"}
                        className="rounded-xl border py-2 text-[13px] text-gray-800 disabled:opacity-50"
                    >
                        Emitir Mandado
                    </button>

                    <button
                        onClick={capturar}
                        disabled={run.status !== "IN_PROGRESS"}
                        className="col-span-2 rounded-xl bg-green-600 text-white py-2 text-[13px] disabled:opacity-50"
                    >
                        Capturar
                    </button>
                </div>

                <div className="mt-2 text-[12px] text-gray-600">
                    Dica MVP: colete pelo menos 2 pistas e emita mandado.
                </div>
            </div>

            {/* Diário */}
            <div className="mt-3 bg-white rounded-2xl border shadow-sm p-3">
                <div className="text-[13px] font-semibold text-gray-900">Diário de Pistas</div>
                {run.pistasDescobertas.length === 0 ? (
                    <div className="text-[12px] text-gray-500 mt-2">Nenhuma pista ainda.</div>
                ) : (
                    <ul className="mt-2 list-disc pl-5 text-[12px] text-gray-700 space-y-1">
                        {run.pistasDescobertas.map((p, i) => (
                            <li key={i}>{p.conteudo}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Jornal */}
            <div id="jornal" className="mt-3 bg-white rounded-2xl border shadow-sm p-3">
                <div className="text-[13px] font-semibold text-gray-900">Jornal A.T.L.A.S.</div>
                <div className="mt-2 max-h-[260px] overflow-auto text-[12px] text-gray-700 space-y-2">
                    {run.jornal
                        .slice()
                        .reverse()
                        .map((j, i) => (
                            <div key={i} className="border-b pb-2 last:border-b-0">
                                <div className="text-[11px] text-gray-500">
                                    {new Date(j.t).toLocaleString("pt-BR")}
                                </div>
                                <div>{j.msg}</div>
                            </div>
                        ))}
                </div>
            </div>
        </AppShell>
    );
}