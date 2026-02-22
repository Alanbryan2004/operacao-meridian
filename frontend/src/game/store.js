import { casesSeed, initialPlayer } from "./seed";

const KEY = "operacao_meridian__mvp_state_v1";

function nowIso() {
    return new Date().toISOString();
}

export function loadGame() {
    try {
        const raw = localStorage.getItem(KEY);
        let state;
        if (!raw) {
            state = {
                player: { ...initialPlayer },
                cases: [...casesSeed],
                runs: {}, // caseId -> run
                createdAt: nowIso(),
                updatedAt: nowIso(),
            };
            localStorage.setItem(KEY, JSON.stringify(state));
        } else {
            state = JSON.parse(raw);
        }

        // Migração/Merge: Garante que os casos no state tenham os campos novos do seed.js
        // (como resumo e interrogatorios) que podem faltar em saves antigos.
        state.cases = casesSeed.map((seed) => {
            const existing = state.cases.find((c) => c.id === seed.id);
            return {
                ...seed, ...existing,
                // Prioriza campos estáticos (conteúdo) do seed para garantir atualização
                resumo: seed.resumo || existing?.resumo,
                interrogatorios: seed.interrogatorios || existing?.interrogatorios,
                imgItem: seed.imgItem || existing?.imgItem
            };
        });

        return state;
    } catch {
        const init = {
            player: { ...initialPlayer },
            cases: [...casesSeed],
            runs: {},
            createdAt: nowIso(),
            updatedAt: nowIso(),
        };
        localStorage.setItem(KEY, JSON.stringify(init));
        return init;
    }
}

export function saveGame(state) {
    const next = { ...state, updatedAt: nowIso() };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
}

export function resetGame() {
    localStorage.removeItem(KEY);
    return loadGame();
}

// ===== Helpers de jogo =====
export function startRunIfNeeded(state, caseObj) {
    const existing = state.runs?.[caseObj.id];
    if (existing && existing.status === "IN_PROGRESS") return state;

    const run = {
        caseId: caseObj.id,
        status: "IN_PROGRESS",
        tempoRestanteHoras: caseObj.tempoTotalHoras,
        dinheiroNoInicio: state.player.dinheiro,
        localAtual: { ...caseObj.localInicial },
        pistasDescobertas: [],
        jornal: [
            { t: nowIso(), msg: `Caso iniciado: ${caseObj.titulo} (${caseObj.dificuldade})` },
            { t: nowIso(), msg: `Local inicial: ${caseObj.localInicial.cidade} - ${caseObj.localInicial.pais}` },
            { t: nowIso(), msg: `Tempo total: ${caseObj.tempoTotalHoras}h (1 semana interna)` },
        ],
        mandadoEmitido: false,
        suspeitoCapturado: false,
    };

    const next = {
        ...state,
        runs: {
            ...state.runs,
            [caseObj.id]: run,
        },
    };

    return next;
}

export function spendTime(run, horas, msg) {
    const h = Math.max(0, Number(horas || 0));
    const tempo = Math.max(0, run.tempoRestanteHoras - h);

    const next = {
        ...run,
        tempoRestanteHoras: tempo,
        jornal: [...run.jornal, { t: nowIso(), msg }],
    };

    // Se acabou o tempo (Fácil/Médio), perde
    if (tempo <= 0 && run.status === "IN_PROGRESS") {
        next.status = "LOST";
        next.jornal = [
            ...next.jornal,
            { t: nowIso(), msg: "📰 Jornal A.T.L.A.S.: você atrasou. O suspeito fugiu para outro país. Caso encerrado (tempo esgotado)." },
        ];
    }

    return next;
}

export function spendMoney(state, valor, msg, caseId) {
    const v = Math.max(0, Number(valor || 0));
    const dinheiro = Math.max(0, state.player.dinheiro - v);

    const run = state.runs[caseId];
    const nextRun = {
        ...run,
        jornal: [...run.jornal, { t: nowIso(), msg }],
    };

    return {
        ...state,
        player: { ...state.player, dinheiro },
        runs: { ...state.runs, [caseId]: nextRun },
    };
}