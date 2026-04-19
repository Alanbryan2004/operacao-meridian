import { casesSeed, initialPlayer } from "./seed";
import { CASOS_SCENARIOS } from "./CasosScenarios";
import { generateProceduralScenario } from "./ProceduralGenerator";

const KEY = "operacao_meridian__mvp_state_v1";

function nowIso() {
    return new Date().toISOString();
}

/**
 * Garante que os casos no state utilizem os dados mais recentes do seed.js
 */
export function syncCasesWithSeed(state) {
    if (!state || !state.cases) return state;

    const nextCases = casesSeed.map((seed) => {
        const existing = state.cases.find((c) => c.id === seed.id);
        // O seed (dados novos) deve sobrescrever o existing (dados antigos do save)
        // para campos de definição como titulo, localInicial, recompensa, etc.
        return {
            ...existing,
            ...seed
        };
    });

    // 🔥 HOTFIX: Se houver uma run ativa para o Caso 2 em São Paulo, move para Paris
    // Isso garante que mesmo jogadores com saves antigos "bugados" sejam corrigidos.
    const nextRuns = { ...(state.runs || {}) };
    if (nextRuns["C002"]) {
        const run = nextRuns["C002"];
        const seed = casesSeed.find(s => s.id === "C002");

        if (run.status === "IN_PROGRESS" && seed && (run.localAtual?.cidade === "São Paulo" || run.localAtual?.cidade === "Sao Paulo" || run.localAtual?.cidade === "Campinas" || run.tempoRestanteHoras > seed.tempoTotalHoras)) {
            console.log("[ATLAS] Corrigindo inconsistências do Caso 2...");
            nextRuns["C002"] = {
                ...run,
                tempoRestanteHoras: Math.min(run.tempoRestanteHoras, seed.tempoTotalHoras),
                localAtual: { pais: "França", cidade: "Paris" },
                jornal: [
                    ...run.jornal,
                    { t: nowIso(), msg: "🕵️ Correção de sistema: Parâmetros da missão (local e tempo) sincronizados." }
                ]
            };
        }
    }

    return {
        ...state,
        cases: nextCases,
        runs: nextRuns
    };
}

export function loadGame() {
    try {
        const raw = localStorage.getItem(KEY);
        let state;
        if (!raw) {
            state = {
                player: { ...initialPlayer },
                cases: [...casesSeed],
                runs: {},
                capturedSuspects: {},
                createdAt: nowIso(),
                updatedAt: nowIso(),
            };
            localStorage.setItem(KEY, JSON.stringify(state));
        } else {
            state = JSON.parse(raw);
        }

        // Migração/Merge
        state = syncCasesWithSeed(state);

        // Migração: capturedSuspects
        if (!state.capturedSuspects) {
            state.capturedSuspects = {};
        }

        return state;
    } catch {
        const init = {
            player: { ...initialPlayer },
            cases: [...casesSeed],
            runs: {},
            capturedSuspects: {},
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

export function startRunIfNeeded(state, caseObj, forceReset = false, forcedScenarioId = null, lobbyId = null) {
    if (!forceReset) {
        const existing = state.runs?.[caseObj.id];
        // Se já existe uma run (em progresso ou já concluída), não inicia outra automaticamente
        if (existing && (existing.status === "IN_PROGRESS" || existing.status === "WON" || existing.status === "LOST" || existing.status === "ABORTED")) return state;

        // Bloqueia se já houver OUTRA missão em progresso
        const hasActiveMission = Object.values(state.runs || {}).some(r => r.status === "IN_PROGRESS");
        if (hasActiveMission) return state;
    } else if (forceReset) {
        // 🔥 FIX: Bloqueamos o reset AUTOMÁTICO apenas se a missão já estiver em status final 
        // E for uma partida competitiva (lobbyId existe). 
        // Em missões solo, permitimos o REJOGAR.
        const existing = state.runs?.[caseObj.id];
        const isSameMatch = existing && existing.lobbyId === lobbyId && (forcedScenarioId ? existing.scenarioId === forcedScenarioId : true);

        if (lobbyId && isSameMatch && (existing.status === "WON" || existing.status === "LOST")) {
            console.log("[ATLAS] Reset bloqueado: Partida competitiva já concluída.");
            return state;
        }
    }

    // Sorteio de Cenário (SE existir para este caso)
    let scenario = null;
    let interrogatoriosOverride = caseObj.interrogatorios;
    let targetSuspectId = null;
    let proceduralScenario = null;

    if (caseObj.procedural) {
        // === CASO PROCEDURAL ===
        proceduralScenario = generateProceduralScenario(caseObj);
        if (proceduralScenario) {
            scenario = proceduralScenario;
            interrogatoriosOverride = proceduralScenario.interrogatorios;
            targetSuspectId = proceduralScenario.suspectId;
            console.log(`[ATLAS] Cenário PROCEDURAL gerado para ${caseObj.id}: ${proceduralScenario.id} (Suspeito: ${targetSuspectId})`);
        } else {
            console.error(`[ATLAS] Falha ao gerar cenário procedural para ${caseObj.id}`);
        }
    } else if (CASOS_SCENARIOS[caseObj.id]) {
        const scenarios = CASOS_SCENARIOS[caseObj.id];
        // 🔥 FIX: Se um cenário específico foi forçado (ex: via URL no competitivo), usamos ele.
        if (forcedScenarioId) {
            scenario = scenarios.find(s => s.id === forcedScenarioId);
        }

        // Fallback para aleatório se não encontrou ou não foi forçado
        if (!scenario) {
            scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        }

        interrogatoriosOverride = scenario.interrogatorios;
        targetSuspectId = scenario.suspectId;
        console.log(`[ATLAS] Cenário ${forcedScenarioId ? "FORÇADO" : "SORTEADO"} para ${caseObj.id}: ${scenario.id} (Suspeito: ${targetSuspectId})`);
    }

    const run = {
        caseId: caseObj.id,
        lobbyId: lobbyId,
        scenarioId: scenario?.id || null,
        targetSuspectId: targetSuspectId,
        status: "IN_PROGRESS",
        interrogatorios: interrogatoriosOverride, // Agora a run tem seus próprios interrogatórios
        tempoRestanteHoras: caseObj.tempoTotalHoras,
        dinheiroNoInicio: state.player.dinheiro,
        localAtual: { ...caseObj.localInicial },
        isCompetitive: !!caseObj.isCompetitive,
        pistasDescobertas: [],
        jornal: [
            { t: nowIso(), msg: `Caso iniciado: ${caseObj.titulo} (${caseObj.dificuldade})` },
            { t: nowIso(), msg: `Local inicial: ${caseObj.localInicial?.cidade || "..."} - ${caseObj.localInicial?.pais || "..."}` },
            { t: nowIso(), msg: `Tempo total: ${caseObj.tempoTotalHoras}h` },
            !caseObj.isCompetitive && { t: nowIso(), msg: `Bônus de despesas recebido: R$ ${(caseObj.valorAdiantamento ?? 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        ].filter(Boolean),
        cidadeAnterior: null,
        proceduralScenario: proceduralScenario || null,
        mandadoEmitido: false,
        warrantId: null,
        suspeitoCapturado: false,
        valorAdiantamento: caseObj.valorAdiantamento ?? 1000,
        filtrosAnalise: {
            sexo: [],
            corCabelo: [],
            corOlhos: [],
            esporte: [],
            comidaFavorita: [],
            caracteristica: [],
            origem: []
        },
        investigationCountByCity: {},
    };

    const next = {
        ...state,
        player: {
            ...state.player,
            dinheiro: caseObj.isCompetitive ? state.player.dinheiro : state.player.dinheiro + (caseObj.valorAdiantamento ?? 1000)
        },
        runs: {
            ...state.runs,
            [caseObj.id]: run,
        },
    };

    return next;
}

export function abortRun(state, caseId) {
    const run = state.runs[caseId];
    if (!run) return state;

    const nextRun = {
        ...run,
        status: "ABORTED",
        jornal: [...run.jornal, { t: nowIso(), msg: "🚩 MISSÃO ABORTADA PELO AGENTE." }],
    };

    // Penalidade: Remove o adiantamento recebido. 
    // Se for competitivo, não houve adiantamento, então não há penalidade de devolução.
    const penalty = run.isCompetitive ? 0 : (run.valorAdiantamento ?? 1000);
    const nextDinheiro = Math.max(0, state.player.dinheiro - penalty);

    return {
        ...state,
        player: {
            ...state.player,
            dinheiro: nextDinheiro
        },
        runs: {
            ...state.runs,
            [caseId]: nextRun
        }
    };
}

export function spendTime(run, horas, msg) {
    const h = Math.max(0, Number(horas || 0));
    const tempo = Math.max(0, run.tempoRestanteHoras - h);

    const next = {
        ...run,
        tempoRestanteHoras: tempo,
        jornal: [...run.jornal, { t: nowIso(), msg }],
    };

    // 🔥 FIX: Em missões competitivas (C9), o tempo é apenas para registro (PVP), não causa derrota por esgotamento.
    const isCompetitive = run.isCompetitive;

    if (!isCompetitive && tempo <= 0 && run.status === "IN_PROGRESS") {
        next.status = "LOST";
        next.jornal = [
            ...next.jornal,
            { t: nowIso(), msg: "⌛ Tempo esgotado. O suspeito escapou." },
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

export function registerCapture(state, suspectId) {
    const prev = state.capturedSuspects || {};
    return {
        ...state,
        capturedSuspects: {
            ...prev,
            [suspectId]: (prev[suspectId] || 0) + 1,
        },
    };
}

// src/game/suspectsSeed.js
export const suspectsSeed = [
    {
        id: "001",
        codinome: "Vanta Quill",
        nomeReal: "Desconhecido",
        sexo: "Não Binário",
        corCabelo: "Platinado",
        corOlhos: "Castanho",
        esporte: "Xadrez",
        comidaFavorita: "Francesa",
        idadeAparente: "35–45",
        origem: "Europa",
        especialidade: ["Falsificação avançada", "Identidades fabricadas", "Rastreio reverso"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Bilhete em papel preto com frase curta (sem data)",
            "Notas novas e sequenciais quando paga algo",
            "Evita copos de vidro"
        ],
        caracteristica: [
            "Elegante",
            "Discreto"
        ],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Formal demais" },
            { idioma: "Francês", nivel: "Sotaque propositalmente quebrado" }
        ],
        habitos: ["Pede chá sem açúcar", "Não encosta em vidro"],
        pistasTipicas: [
            "Falava português… mas parecia um manual.",
            "Pagou com notas novas, sequenciais.",
            "Ninguém viu o rosto, só as luvas claras."
        ],
        falsosPositivos: [
            "Pode se passar por colecionador(a) de arte",
            "Cartão de visita perfeito e verificável"
        ],
        relacaoMeridian: "Executor(a) usado(a) quando é preciso apagar rastros.",

        dicas: {
            sexo: [
                { id: "001_SEXO_01", texto: "A testemunha disse que a pessoa não parecia se encaixar nas descrições tradicionais de homem ou mulher." },
                { id: "001_SEXO_02", texto: "Quem passou por aqui tinha uma presença ambígua, difícil de classificar à primeira vista." }
            ],
            origem: [
                { id: "001_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "001_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "001_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "001_CABELO_02", texto: "A testemunha reparou em cabelos platinados." }
            ],
            olhos: [
                { id: "001_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "001_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "001_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava xadrez." },
                { id: "001_ESPORTE_02", texto: "Ouvi uma menção casual a xadrez, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "001_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida francesa." },
                { id: "001_COMIDA_02", texto: "Ela parecia ter preferência por culinária francesa." }
            ],
            caracteristica: [
                { id: "001_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "001_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }

    },

    {
        id: "002",
        codinome: "Echo Lark",
        nomeReal: "Laila Kwon",
        sexo: "Feminino",
        corCabelo: "Preto",
        corOlhos: "Preto",
        esporte: "Tênis",
        comidaFavorita: "Asiática",
        idadeAparente: 29,
        origem: "Ásia",
        especialidade: ["Engenharia social", "Imitação de voz", "Golpes por ligação"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: [
            "Áudio curto deixado em algum dispositivo com tique repetido (3 vezes)",
            "Sempre usa fones"
        ],
        caracteristica: ["Atlético", "Discreto"],
        idiomas: [
            { idioma: "Coreano", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Espanhol", nivel: "Bom" },
            { idioma: "Português", nivel: "Intermediário (expressões fora de época)" }
        ],
        habitos: ["Repete o nome da pessoa como se estivesse testando a voz"],
        pistasTipicas: [
            "Ela repetiu meu nome como se estivesse testando minha voz.",
            "A ligação caiu exatamente quando eu disse 'sim'.",
            "Parecia saber minha rotina."
        ],
        falsosPositivos: ["Se apresenta como suporte técnico ou atendimento"],
        relacaoMeridian: "Abre portas humanas: convencimento e manipulação.",

        dicas: {
            sexo: [
                { id: "002_SEXO_01", texto: "A testemunha afirmou que era uma mulher." },
                { id: "002_SEXO_02", texto: "A presença feminina era evidente pela voz e postura." }
            ],
            origem: [
                { id: "002_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Ásia." },
                { id: "002_ORIGEM_02", texto: "A testemunha comentou que o sotaque era asiático." }
            ],
            cabelo: [
                { id: "002_CABELO_01", texto: "O cabelo era preto e bem alinhado." },
                { id: "002_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "002_OLHOS_01", texto: "Os olhos eram escuros e atentos." },
                { id: "002_OLHOS_02", texto: "O olhar parecia observar tudo com precisão." }
            ],
            esporte: [
                { id: "002_ESPORTE_01", texto: "Comentou sobre tênis como hábito frequente." },
                { id: "002_ESPORTE_02", texto: "Parecia alguém com rotina esportiva ativa." }
            ],
            comida: [
                { id: "002_COMIDA_01", texto: "Falou sobre culinária asiática com familiaridade." },
                { id: "002_COMIDA_02", texto: "Parecia ter preferência por comida asiática." }
            ],
            caracteristica: [
                { id: "002_CARACTERISTICA_01", texto: "O comportamento era extremamente discreto." },
                { id: "002_CARACTERISTICA_02", texto: "A movimentação era leve e atlética." }
            ]
        }


    },

    {
        id: "003",
        codinome: "Brass Mantis",
        nomeReal: "Matteo Sforza",
        sexo: "Masculino",
        corCabelo: "Castanho",
        corOlhos: "Castanho",
        esporte: "Remo",
        comidaFavorita: "Italiana",
        idadeAparente: 41,
        origem: "Europa",
        especialidade: ["Logística clandestina", "Rotas portuárias", "Contêineres"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Moeda antiga como troco/sinal",
            "Fala como gente de porto"
        ],
        caracteristica: [
            "Robusto",
            "Casual"
        ],
        idiomas: [
            { idioma: "Italiano", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Bom (gírias de carga)" }
        ],
        habitos: ["Pergunta do cais antes do endereço"],
        pistasTipicas: [
            "Falou de 'janela de maré' como se fosse horário de ônibus.",
            "Perguntou do cais, não do endereço.",
            "Deixou uma moeda antiga no balcão."
        ],
        falsosPositivos: ["Pode se passar por despachante/armador"],
        relacaoMeridian: "Faz item sumir do mapa físico.",

        dicas: {
            sexo: [
                { id: "003_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "003_SEXO_02", texto: "A presença masculina era evidente." }
            ],
            origem: [
                { id: "003_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "003_ORIGEM_02", texto: "A testemunha comentou que parecia europeu." }
            ],
            cabelo: [
                { id: "003_CABELO_01", texto: "O cabelo era castanho." },
                { id: "003_CABELO_02", texto: "A testemunha reparou em cabelos castanhos." }
            ],
            olhos: [
                { id: "003_OLHOS_01", texto: "Os olhos eram castanhos e atentos." },
                { id: "003_OLHOS_02", texto: "O olhar parecia experiente." }
            ],
            esporte: [
                { id: "003_ESPORTE_01", texto: "Comentou sobre remo." },
                { id: "003_ESPORTE_02", texto: "Parecia acostumado com atividades marítimas." }
            ],
            comida: [
                { id: "003_COMIDA_01", texto: "Falou de comida italiana." },
                { id: "003_COMIDA_02", texto: "Parecia gostar de culinária italiana." }
            ],
            caracteristica: [
                { id: "003_CARACTERISTICA_01", texto: "O corpo era robusto." },
                { id: "003_CARACTERISTICA_02", texto: "O comportamento era casual e seguro." }
            ]
        }
    },

    {
        id: "004",
        codinome: "Saffron Wisp",
        nomeReal: "Amaya Desai",
        sexo: "Feminino",
        corCabelo: "Castanho",
        corOlhos: "Preto",
        esporte: "Yoga",
        comidaFavorita: "Apimentada",
        idadeAparente: 33,
        origem: "Ásia",
        especialidade: ["Contrabando de micro-itens", "Troca em trânsito", "Joias"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: [
            "Perfume marcante de especiarias",
            "Fios dourados (tecido) sem querer"
        ],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Hindi", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Árabe", nivel: "Básico" },
            { idioma: "Português", nivel: "Bom e educado" }
        ],
        habitos: ["Pede embrulho 'sem metal'"],
        pistasTipicas: [
            "O cheiro ficou no corredor.",
            "Ela pediu um embrulho 'sem metal'.",
            "Os fios dourados estavam presos na maçaneta."
        ],
        falsosPositivos: ["Representante de boutique / colecionadora de joias"],
        relacaoMeridian: "Roubos onde nada parece ter sido tocado.",

        dicas: {
            sexo: [
                { id: "004_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "004_SEXO_02", texto: "A presença feminina era marcante." }
            ],
            origem: [
                { id: "004_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Ásia." },
                { id: "004_ORIGEM_02", texto: "A testemunha comentou que parecia asiática." }
            ],
            cabelo: [
                { id: "004_CABELO_01", texto: "O cabelo era castanho." },
                { id: "004_CABELO_02", texto: "A testemunha reparou em cabelos castanhos." }
            ],
            olhos: [
                { id: "004_OLHOS_01", texto: "Os olhos eram escuros." },
                { id: "004_OLHOS_02", texto: "O olhar era discreto e atento." }
            ],
            esporte: [
                { id: "004_ESPORTE_01", texto: "Comentou sobre yoga." },
                { id: "004_ESPORTE_02", texto: "Parecia ter movimentos controlados e leves." }
            ],
            comida: [
                { id: "004_COMIDA_01", texto: "Falou de comida apimentada." },
                { id: "004_COMIDA_02", texto: "Parecia gostar de pratos fortes e especiados." }
            ],
            caracteristica: [
                { id: "004_CARACTERISTICA_01", texto: "O comportamento era elegante." },
                { id: "004_CARACTERISTICA_02", texto: "A movimentação era discreta." }
            ]
        }
    },

    {
        id: "005",
        codinome: "Blue Rook",
        nomeReal: "Dimitri Volkov",
        sexo: "Masculino",
        corCabelo: "Loiro",
        corOlhos: "Azul",
        esporte: "Xadrez",
        comidaFavorita: "Francesa",
        idadeAparente: 38,
        origem: "Europa",
        especialidade: ["Negociação", "Compra de silêncio", "Pressão psicológica"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: [
            "Frases como 'movimento inevitável'",
            "Peças de xadrez baratas deixadas como souvenir"
        ],
        caracteristica: ["Elegante", "Robusto"],
        idiomas: [
            { idioma: "Russo", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Formal com sotaque forte" }
        ],
        habitos: ["Faz as pessoas acharem que não têm escolha"],
        pistasTipicas: [
            "Ele disse que eu não tinha escolha.",
            "Pagou 'para evitar problemas'.",
            "Tinha uma peça de xadrez no chão."
        ],
        falsosPositivos: ["Diplomata / empresário"],
        relacaoMeridian: "Resolve quando a missão exige controle, não correria.",

        dicas: {
            sexo: [
                { id: "005_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "005_SEXO_02", texto: "A presença masculina era dominante." }
            ],
            origem: [
                { id: "005_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "005_ORIGEM_02", texto: "A testemunha comentou que parecia europeu." }
            ],
            cabelo: [
                { id: "005_CABELO_01", texto: "O cabelo era loiro." },
                { id: "005_CABELO_02", texto: "A testemunha reparou em cabelos claros." }
            ],
            olhos: [
                { id: "005_OLHOS_01", texto: "Os olhos eram azuis e frios." },
                { id: "005_OLHOS_02", texto: "O olhar parecia calculista." }
            ],
            esporte: [
                { id: "005_ESPORTE_01", texto: "Comentou sobre xadrez." },
                { id: "005_ESPORTE_02", texto: "Falava como alguém acostumado a estratégia." }
            ],
            comida: [
                { id: "005_COMIDA_01", texto: "Falou de comida francesa." },
                { id: "005_COMIDA_02", texto: "Parecia apreciar culinária refinada." }
            ],
            caracteristica: [
                { id: "005_CARACTERISTICA_01", texto: "O comportamento era elegante." },
                { id: "005_CARACTERISTICA_02", texto: "A postura era dominante e segura." }
            ]
        }
    },

    {
        id: "006",
        codinome: "Kite Needle",
        nomeReal: "Mei Lin Zhao",
        sexo: "Feminino",
        corCabelo: "Preto",
        corOlhos: "Preto",
        esporte: "Ginástica Olímpica",
        comidaFavorita: "Asiática",
        idadeAparente: 27,
        origem: "Ásia",
        especialidade: ["Infiltração física", "Troca de crachás", "Furto rápido"],
        periculosidade: "Média",
        raridade: "Comum",
        assinatura: [
            "Kit de costura (carretel de linha)",
            "Sabe improvisar uniforme/crachá"
        ],
        caracteristica: ["Atlético", "Discreto"],
        idiomas: [
            { idioma: "Mandarim", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Básico (entende mais do que fala)" }
        ],
        habitos: ["Parece já trabalhar no local"],
        pistasTipicas: [
            "Parecia que ela já trabalhava aqui.",
            "O crachá era meu… mas com foto diferente.",
            "Havia linha clara presa no bolso de um jaleco."
        ],
        falsosPositivos: ["Funcionária terceirizada / estagiária"],
        relacaoMeridian: "Ideal para lugares controlados (museu, evento, laboratório).",

        dicas: {
            sexo: [
                { id: "006_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "006_SEXO_02", texto: "A presença feminina era discreta, mas perceptível." }
            ],
            origem: [
                { id: "006_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Ásia." },
                { id: "006_ORIGEM_02", texto: "A testemunha comentou que parecia asiática." }
            ],
            cabelo: [
                { id: "006_CABELO_01", texto: "O cabelo era preto e bem alinhado." },
                { id: "006_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "006_OLHOS_01", texto: "Os olhos eram escuros e atentos." },
                { id: "006_OLHOS_02", texto: "O olhar parecia observar tudo rapidamente." }
            ],
            esporte: [
                { id: "006_ESPORTE_01", texto: "Comentou sobre ginástica olímpica." },
                { id: "006_ESPORTE_02", texto: "Parecia extremamente ágil fisicamente." }
            ],
            comida: [
                { id: "006_COMIDA_01", texto: "Falou de comida asiática." },
                { id: "006_COMIDA_02", texto: "Parecia gostar de pratos asiáticos." }
            ],
            caracteristica: [
                { id: "006_CARACTERISTICA_01", texto: "A movimentação era atlética." },
                { id: "006_CARACTERISTICA_02", texto: "O comportamento era discreto." }
            ]
        }
    },

    {
        id: "007",
        codinome: "Nacre Fox",
        nomeReal: "Claire Beaumont",
        sexo: "Feminino",
        corCabelo: "Platinado",
        corOlhos: "Verde",
        esporte: "Esgrima",
        comidaFavorita: "Francesa",
        idadeAparente: 36,
        origem: "Europa",
        especialidade: ["Arte e antiguidades", "Falsos leilões", "Curadoria fraudulenta"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Etiqueta manuscrita 'catalogada' com número errado"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Francês", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Quase sem sotaque" }
        ],
        habitos: ["Fala do objeto como se fosse dela"],
        pistasTipicas: [
            "Perguntou do 'proveniência' três vezes.",
            "Deixou uma etiqueta manuscrita com número errado.",
            "Falava como curadora, mas evitava nomes."
        ],
        falsosPositivos: ["Curadora / crítica / leiloeira"],
        relacaoMeridian: "Ponte entre roubo e lavagem cultural.",

        dicas: {
            sexo: [
                { id: "007_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "007_SEXO_02", texto: "A presença feminina era elegante e marcante." }
            ],
            origem: [
                { id: "007_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "007_ORIGEM_02", texto: "A testemunha comentou que parecia europeia." }
            ],
            cabelo: [
                { id: "007_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "007_CABELO_02", texto: "A testemunha reparou em cabelos claros e bem cuidados." }
            ],
            olhos: [
                { id: "007_OLHOS_01", texto: "Os olhos eram verdes e expressivos." },
                { id: "007_OLHOS_02", texto: "O olhar era intenso e observador." }
            ],
            esporte: [
                { id: "007_ESPORTE_01", texto: "Comentou sobre esgrima." },
                { id: "007_ESPORTE_02", texto: "Parecia ter movimentos precisos e controlados como na esgrima." }
            ],
            comida: [
                { id: "007_COMIDA_01", texto: "Falou de comida francesa." },
                { id: "007_COMIDA_02", texto: "Parecia ter gosto refinado na alimentação." }
            ],
            caracteristica: [
                { id: "007_CARACTERISTICA_01", texto: "O comportamento era elegante." },
                { id: "007_CARACTERISTICA_02", texto: "A presença era extremamente discreta." }
            ]
        }
    },

    {
        id: "008",
        codinome: "Sand Helix",
        nomeReal: "Hassan Al-Rashid",
        sexo: "Masculino",
        corCabelo: "Preto",
        corOlhos: "Castanho",
        esporte: "Polo",
        comidaFavorita: "Árabe",
        idadeAparente: 44,
        origem: "Oriente Médio",
        especialidade: ["Antiguidades", "Rotas discretas", "Troca de custódia"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Areia fina em bolsos/rodapés", "Evita câmeras"],
        caracteristica: ["Robusto", "Elegante"],
        idiomas: [
            { idioma: "Árabe", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Francês", nivel: "Bom" },
            { idioma: "Português", nivel: "Básico" }
        ],
        habitos: ["Fala de 'camadas' como arqueólogo"],
        pistasTipicas: [
            "Tinha areia no chão… aqui não tem praia.",
            "Falou de 'camadas' como arqueólogo.",
            "Usava luvas mesmo no calor."
        ],
        falsosPositivos: ["Guia cultural / professor / colecionador"],
        relacaoMeridian: "Aparece quando o item tem valor histórico proibido.",

        dicas: {
            sexo: [
                { id: "008_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "008_SEXO_02", texto: "A presença masculina era forte e segura." }
            ],
            origem: [
                { id: "008_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo do Oriente Médio." },
                { id: "008_ORIGEM_02", texto: "A testemunha comentou que parecia do Oriente Médio." }
            ],
            cabelo: [
                { id: "008_CABELO_01", texto: "O cabelo era preto." },
                { id: "008_CABELO_02", texto: "A testemunha reparou em cabelos escuros." }
            ],
            olhos: [
                { id: "008_OLHOS_01", texto: "Os olhos eram castanhos." },
                { id: "008_OLHOS_02", texto: "O olhar era firme e atento." }
            ],
            esporte: [
                { id: "008_ESPORTE_01", texto: "Comentou sobre polo." },
                { id: "008_ESPORTE_02", texto: "Parecia acostumado com esportes tradicionais." }
            ],
            comida: [
                { id: "008_COMIDA_01", texto: "Falou de comida árabe." },
                { id: "008_COMIDA_02", texto: "Parecia ter preferência por culinária árabe." }
            ],
            caracteristica: [
                { id: "008_CARACTERISTICA_01", texto: "O corpo era robusto." },
                { id: "008_CARACTERISTICA_02", texto: "A postura era elegante." }
            ]
        }
    },

    {
        id: "009",
        codinome: "Velvet Circuit",
        nomeReal: "Sofia Mendez",
        sexo: "Feminino",
        corCabelo: "Ruivo",
        corOlhos: "Verde",
        esporte: "Skate",
        comidaFavorita: "Apimentada",
        idadeAparente: 31,
        origem: "América Latina",
        especialidade: ["Travas eletrônicas", "Gadgets", "Drones civis"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Peça barata de eletrônico (parafuso/cabo curto) esquecida"],
        caracteristica: ["Casual", "Atlético"],
        idiomas: [
            { idioma: "Espanhol", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Bom" },
            { idioma: "Português", nivel: "Bom (sotaque forte)" }
        ],
        habitos: ["Testa sensores antes de agir"],
        pistasTipicas: [
            "Vi uma luz vermelha piscando no alto.",
            "A fechadura abriu sem barulho.",
            "Tinha um parafuso pequeno perto da porta."
        ],
        falsosPositivos: ["Técnica de TI / instaladora / fotógrafa de evento"],
        relacaoMeridian: "Abre caminho em locais com sensores.",

        dicas: {
            sexo: [
                { id: "009_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "009_SEXO_02", texto: "A presença feminina era energética e marcante." }
            ],
            origem: [
                { id: "009_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da América Latina." },
                { id: "009_ORIGEM_02", texto: "A testemunha comentou que parecia latina." }
            ],
            cabelo: [
                { id: "009_CABELO_01", texto: "O cabelo chamava atenção pelo tom ruivo." },
                { id: "009_CABELO_02", texto: "A testemunha reparou em cabelos avermelhados." }
            ],
            olhos: [
                { id: "009_OLHOS_01", texto: "Os olhos eram verdes." },
                { id: "009_OLHOS_02", texto: "O olhar era rápido e atento." }
            ],
            esporte: [
                { id: "009_ESPORTE_01", texto: "Comentou sobre skate." },
                { id: "009_ESPORTE_02", texto: "Parecia acostumada com movimentos rápidos." }
            ],
            comida: [
                { id: "009_COMIDA_01", texto: "Falou de comida apimentada." },
                { id: "009_COMIDA_02", texto: "Parecia gostar de pratos fortes." }
            ],
            caracteristica: [
                { id: "009_CARACTERISTICA_01", texto: "O comportamento era casual." },
                { id: "009_CARACTERISTICA_02", texto: "A movimentação era atlética." }
            ]
        }
    },

    {
        id: "010",
        codinome: "Ivory Marrow",
        nomeReal: "“Dr. R.” (pseudônimo recorrente)",
        sexo: "Masculino",
        corCabelo: "Platinado",
        corOlhos: "Azul",
        esporte: "Golfe",
        comidaFavorita: "Grelhados",
        idadeAparente: "50+",
        origem: "Europa",
        especialidade: ["Patentes", "Dados científicos", "Laboratórios"],
        periculosidade: "Alta",
        raridade: "Elite",
        assinatura: ["Anotações com letra impecável", "Termos acadêmicos em frases curtas"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Alemão", nivel: "Bom" },
            { idioma: "Português", nivel: "Técnico" }
        ],
        habitos: ["Pergunta de temperatura/umidade do cofre"],
        pistasTipicas: [
            "Falou como se estivesse dando aula.",
            "Perguntou de temperatura e umidade do cofre.",
            "Tinha um caderno com anotações perfeitas."
        ],
        falsosPositivos: ["Pesquisador(a) / consultor(a) / auditor(a)"],
        relacaoMeridian: "Crimes elite com foco em ciência e tecnologia.",

        dicas: {
            sexo: [
                { id: "010_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "010_SEXO_02", texto: "A presença masculina era evidente." }
            ],
            origem: [
                { id: "010_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "010_ORIGEM_02", texto: "A testemunha comentou que parecia europeu." }
            ],
            cabelo: [
                { id: "010_CABELO_01", texto: "O cabelo era platinado." },
                { id: "010_CABELO_02", texto: "A testemunha reparou em cabelos claros." }
            ],
            olhos: [
                { id: "010_OLHOS_01", texto: "Os olhos eram azuis." },
                { id: "010_OLHOS_02", texto: "O olhar era frio e analítico." }
            ],
            esporte: [
                { id: "010_ESPORTE_01", texto: "Comentou sobre golfe." },
                { id: "010_ESPORTE_02", texto: "Parecia alguém de hábitos refinados." }
            ],
            comida: [
                { id: "010_COMIDA_01", texto: "Falou de grelhados." },
                { id: "010_COMIDA_02", texto: "Parecia ter gosto simples, mas preciso." }
            ],
            caracteristica: [
                { id: "010_CARACTERISTICA_01", texto: "O comportamento era extremamente elegante." },
                { id: "010_CARACTERISTICA_02", texto: "A postura era discreta e controlada." }
            ]
        }
    },

    {
        id: "011",
        codinome: "Sombra Digital",
        nomeReal: "Rafael Ionescu",
        sexo: "Masculino",
        corCabelo: "Preto",
        corOlhos: "Verde",
        esporte: "Tênis",
        comidaFavorita: "Asiática",
        idadeAparente: 34,
        origem: "Europa",
        especialidade: ["Lavagem digital", "Criptomoedas", "Identidades descartáveis"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Relógio sempre 7 minutos adiantado"],
        caracteristica: ["Discreto", "Casual"],
        idiomas: [
            { idioma: "Romeno", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Bom" }
        ],
        habitos: ["Corrige o horário das pessoas"],
        pistasTipicas: [
            "Ele comentou que meu relógio estava atrasado.",
            "Falou de moeda digital do nada.",
            "Vestia preto dos pés à cabeça."
        ],
        falsosPositivos: ["Consultor financeiro tech"],
        relacaoMeridian: "Move dinheiro sem deixar rastro.",

        dicas: {
            sexo: [
                { id: "011_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "011_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "011_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "011_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "011_CABELO_01", texto: "O cabelo chamava atenção pelo tom preto." },
                { id: "011_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "011_OLHOS_01", texto: "Os olhos eram verdes e bem marcantes." },
                { id: "011_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram verdes." }
            ],
            esporte: [
                { id: "011_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava tênis." },
                { id: "011_ESPORTE_02", texto: "Ouvi uma menção casual a tênis, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "011_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida asiática." },
                { id: "011_COMIDA_02", texto: "Ela parecia ter preferência por culinária asiática." }
            ],
            caracteristica: [
                { id: "011_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito discreto." },
                { id: "011_CARACTERISTICA_02", texto: "A pessoa parecia extremamente casual." }
            ]
        }
    },

    {
        id: "012",
        codinome: "Peão de Prata",
        nomeReal: "Helena Duarte",
        sexo: "Feminino",
        corCabelo: "Platinado",
        corOlhos: "Azul",
        esporte: "Xadrez",
        comidaFavorita: "Francesa",
        idadeAparente: 37,
        origem: "Europa",
        especialidade: ["Intermediação", "Negociação estratégica"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Peça pequena de xadrez metálica"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" }
        ],
        habitos: ["Sorri antes de dar notícia ruim"],
        pistasTipicas: [
            "Falou em movimento estratégico.",
            "Tinha uma peça de xadrez na mesa.",
            "Nunca alterou o tom de voz."
        ],
        falsosPositivos: ["Diplomata"],
        relacaoMeridian: "Negocia quando a missão exige calma.",

        dicas: {
            sexo: [
                { id: "012_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "012_SEXO_02", texto: "Quem passou por aqui tinha presença claramente feminina." }
            ],
            origem: [
                { id: "012_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "012_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "012_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "012_CABELO_02", texto: "A testemunha reparou em cabelos platinados." }
            ],
            olhos: [
                { id: "012_OLHOS_01", texto: "Os olhos eram azuis e bem marcantes." },
                { id: "012_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram azuis." }
            ],
            esporte: [
                { id: "012_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava xadrez." },
                { id: "012_ESPORTE_02", texto: "Ouvi uma menção casual a xadrez, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "012_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida francesa." },
                { id: "012_COMIDA_02", texto: "Ela parecia ter preferência por culinária francesa." }
            ],
            caracteristica: [
                { id: "012_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "012_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "013",
        codinome: "Maresia",
        nomeReal: "Thiago Morel",
        sexo: "Masculino",
        corCabelo: "Castanho",
        corOlhos: "Castanho",
        esporte: "Surfe",
        comidaFavorita: "Apimentada",
        idadeAparente: 43,
        origem: "América Latina",
        especialidade: ["Rotas portuárias", "Carga fracionada"],
        periculosidade: "Alta",
        raridade: "Incomum",
        assinatura: ["Cheiro leve de óleo náutico"],
        caracteristica: ["Robusto", "Casual"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" },
            { idioma: "Italiano", nivel: "Intermediário" }
        ],
        habitos: ["Pergunta da maré mesmo longe do mar"],
        pistasTipicas: [
            "Falou de maré numa cidade sem praia.",
            "Conhecia código de contêiner.",
            "Deixou uma moeda antiga no balcão."
        ],
        falsosPositivos: ["Transportador"],
        relacaoMeridian: "Resolve o que precisa cruzar fronteira.",

        dicas: {
            sexo: [
                { id: "013_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "013_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "013_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da América Latina." },
                { id: "013_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da América Latina." }
            ],
            cabelo: [
                { id: "013_CABELO_01", texto: "O cabelo chamava atenção pelo tom castanho." },
                { id: "013_CABELO_02", texto: "A testemunha reparou em cabelos castanhos." }
            ],
            olhos: [
                { id: "013_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "013_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "013_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava surfe." },
                { id: "013_ESPORTE_02", texto: "Ouvi uma menção casual a surfe, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "013_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida apimentada." },
                { id: "013_COMIDA_02", texto: "Ela parecia ter preferência por pratos fortes e apimentados." }
            ],
            caracteristica: [
                { id: "013_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito robusto." },
                { id: "013_CARACTERISTICA_02", texto: "A pessoa parecia extremamente casual." }
            ]
        }
    },

    {
        id: "014",
        codinome: "Byte Vermelho",
        nomeReal: "Valeria Cruz",
        sexo: "Feminino",
        corCabelo: "Ruivo",
        corOlhos: "Castanho",
        esporte: "Skate",
        comidaFavorita: "Apimentada",
        idadeAparente: 28,
        origem: "América Latina",
        especialidade: ["Clonagem de cartão", "Portas eletrônicas"],
        periculosidade: "Média",
        raridade: "Comum",
        assinatura: ["Adesivo pequeno perto da fechadura"],
        caracteristica: ["Casual", "Atlético"],
        idiomas: [
            { idioma: "Espanhol", nivel: "Nativo" },
            { idioma: "Português", nivel: "Bom" }
        ],
        habitos: ["Bate duas vezes antes de sair"],
        pistasTipicas: [
            "A porta abriu sem barulho.",
            "Tinha um adesivo minúsculo perto da entrada.",
            "Saiu de skate."
        ],
        falsosPositivos: ["Técnica de TI"],
        relacaoMeridian: "Especialista em acesso rápido.",

        dicas: {
            sexo: [
                { id: "014_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "014_SEXO_02", texto: "Quem passou por aqui tinha presença claramente feminina." }
            ],
            origem: [
                { id: "014_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da América Latina." },
                { id: "014_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da América Latina." }
            ],
            cabelo: [
                { id: "014_CABELO_01", texto: "O cabelo chamava atenção pelo tom ruivo." },
                { id: "014_CABELO_02", texto: "A testemunha reparou em cabelos avermelhados." }
            ],
            olhos: [
                { id: "014_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "014_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "014_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava skate." },
                { id: "014_ESPORTE_02", texto: "Ouvi uma menção casual a skate, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "014_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida apimentada." },
                { id: "014_COMIDA_02", texto: "Ela parecia ter preferência por pratos fortes e apimentados." }
            ],
            caracteristica: [
                { id: "014_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito casual." },
                { id: "014_CARACTERISTICA_02", texto: "A pessoa parecia extremamente atlética." }
            ]
        }
    },

    {
        id: "015",
        codinome: "Doutor Marfim",
        nomeReal: "Henrik Stahl",
        sexo: "Masculino",
        corCabelo: "Platinado",
        corOlhos: "Azul",
        esporte: "Xadrez",
        comidaFavorita: "Grelhados",
        idadeAparente: 58,
        origem: "Europa",
        especialidade: ["Dados científicos", "Arquivos clínicos"],
        periculosidade: "Alta",
        raridade: "Elite",
        assinatura: ["Anotações minúsculas e impecáveis"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Alemão", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Técnico" }
        ],
        habitos: ["Corrige termos científicos"],
        pistasTipicas: [
            "Falava como professor.",
            "Perguntou da umidade do cofre.",
            "Tinha um caderno perfeito."
        ],
        falsosPositivos: ["Consultor médico"],
        relacaoMeridian: "Atua quando ciência vira alvo.",

        dicas: {
            sexo: [
                { id: "015_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "015_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "015_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "015_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "015_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "015_CABELO_02", texto: "A testemunha reparou em cabelos platinados." }
            ],
            olhos: [
                { id: "015_OLHOS_01", texto: "Os olhos eram azuis e bem marcantes." },
                { id: "015_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram azuis." }
            ],
            esporte: [
                { id: "015_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava xadrez." },
                { id: "015_ESPORTE_02", texto: "Ouvi uma menção casual a xadrez, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "015_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar grelhados." },
                { id: "015_COMIDA_02", texto: "Ela parecia ter preferência por carnes e pratos grelhados." }
            ],
            caracteristica: [
                { id: "015_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "015_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "016",
        codinome: "Fio Sombrio",
        nomeReal: "Nadia Rahman",
        sexo: "Feminino",
        corCabelo: "Preto",
        corOlhos: "Preto",
        esporte: "Yoga",
        comidaFavorita: "Apimentada",
        idadeAparente: 32,
        origem: "Ásia",
        especialidade: ["Microcontrabando", "Tecidos técnicos"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Fios escuros quase invisíveis"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Bom" }
        ],
        habitos: ["Evita objetos metálicos"],
        pistasTipicas: [
            "Havia fios finíssimos no chão.",
            "Pediu embalagem sem metal.",
            "Perfume quente e suave."
        ],
        falsosPositivos: ["Importadora têxtil"],
        relacaoMeridian: "Confunde com Saffron Wisp.",

        dicas: {
            sexo: [
                { id: "016_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "016_SEXO_02", texto: "Quem passou por aqui tinha presença claramente feminina." }
            ],
            origem: [
                { id: "016_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Ásia." },
                { id: "016_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Ásia." }
            ],
            cabelo: [
                { id: "016_CABELO_01", texto: "O cabelo chamava atenção pelo tom preto." },
                { id: "016_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "016_OLHOS_01", texto: "Os olhos eram escuros e bem marcantes." },
                { id: "016_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram muito escuros." }
            ],
            esporte: [
                { id: "016_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava yoga." },
                { id: "016_ESPORTE_02", texto: "Ouvi uma menção casual a yoga, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "016_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida apimentada." },
                { id: "016_COMIDA_02", texto: "Ela parecia ter preferência por pratos fortes e apimentados." }
            ],
            caracteristica: [
                { id: "016_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "016_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "017",
        codinome: "Eco de Ferro",
        nomeReal: "Lucas Andrade",
        sexo: "Masculino",
        corCabelo: "Preto",
        corOlhos: "Castanho",
        esporte: "Tênis",
        comidaFavorita: "Árabe",
        idadeAparente: 42,
        origem: "América Latina",
        especialidade: ["Antiguidades", "Intermediação discreta"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Areia fina no sapato"],
        caracteristica: ["Robusto", "Elegante"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" }
        ],
        habitos: ["Fala de camadas históricas"],
        pistasTipicas: [
            "Tinha areia onde não devia.",
            "Falou de escavação antiga.",
            "Usava luvas leves."
        ],
        falsosPositivos: ["Professor de história"],
        relacaoMeridian: "Alternativa ao Sand Helix.",

        dicas: {
            sexo: [
                { id: "017_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "017_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "017_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da América Latina." },
                { id: "017_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da América Latina." }
            ],
            cabelo: [
                { id: "017_CABELO_01", texto: "O cabelo chamava atenção pelo tom preto." },
                { id: "017_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "017_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "017_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "017_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava tênis." },
                { id: "017_ESPORTE_02", texto: "Ouvi uma menção casual a tênis, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "017_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida árabe." },
                { id: "017_COMIDA_02", texto: "Ela parecia ter preferência por culinária árabe." }
            ],
            caracteristica: [
                { id: "017_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito robusto." },
                { id: "017_CARACTERISTICA_02", texto: "A pessoa parecia extremamente elegante." }
            ]
        }
    },

    {
        id: "018",
        codinome: "Vidro Frio",
        nomeReal: "Elisa Novak",
        sexo: "Feminino",
        corCabelo: "Platinado",
        corOlhos: "Verde",
        esporte: "Xadrez",
        comidaFavorita: "Francesa",
        idadeAparente: 44,
        origem: "Europa",
        especialidade: ["Falsificação documental"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Papéis perfeitos demais"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Inglês", nivel: "Fluente" },
            { idioma: "Português", nivel: "Formal demais" }
        ],
        habitos: ["Evita tocar vidro"],
        pistasTipicas: [
            "Falava português como manual.",
            "Notas novas e sequenciais.",
            "Nunca tocou no copo."
        ],
        falsosPositivos: ["Auditora"],
        relacaoMeridian: "Espelho de Vanta Quill.",

        dicas: {
            sexo: [
                { id: "018_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "018_SEXO_02", texto: "Quem passou por aqui tinha presença claramente feminina." }
            ],
            origem: [
                { id: "018_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "018_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "018_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "018_CABELO_02", texto: "A testemunha reparou em cabelos platinados." }
            ],
            olhos: [
                { id: "018_OLHOS_01", texto: "Os olhos eram verdes e bem marcantes." },
                { id: "018_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram verdes." }
            ],
            esporte: [
                { id: "018_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava xadrez." },
                { id: "018_ESPORTE_02", texto: "Ouvi uma menção casual a xadrez, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "018_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida francesa." },
                { id: "018_COMIDA_02", texto: "Ela parecia ter preferência por culinária francesa." }
            ],
            caracteristica: [
                { id: "018_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "018_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "019",
        codinome: "Etiqueta Dourada",
        nomeReal: "Carolina Weiss",
        sexo: "Feminino",
        corCabelo: "Castanho",
        corOlhos: "Azul",
        esporte: "Esgrima",
        comidaFavorita: "Francesa",
        idadeAparente: 35,
        origem: "Europa",
        especialidade: ["Leilões privados", "Obras raras"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Etiqueta numerada incorretamente"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Alemão", nivel: "Nativo" },
            { idioma: "Português", nivel: "Bom" }
        ],
        habitos: ["Pergunta da proveniência três vezes"],
        pistasTipicas: [
            "Perguntou da origem repetidamente.",
            "Etiqueta com número estranho.",
            "Falava como curadora."
        ],
        falsosPositivos: ["Galerista"],
        relacaoMeridian: "Possível elo com Nacre Fox.",

        dicas: {
            sexo: [
                { id: "019_SEXO_01", texto: "A testemunha disse que era uma mulher." },
                { id: "019_SEXO_02", texto: "Quem passou por aqui tinha presença claramente feminina." }
            ],
            origem: [
                { id: "019_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Europa." },
                { id: "019_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Europa." }
            ],
            cabelo: [
                { id: "019_CABELO_01", texto: "O cabelo chamava atenção pelo tom castanho." },
                { id: "019_CABELO_02", texto: "A testemunha reparou em cabelos castanhos." }
            ],
            olhos: [
                { id: "019_OLHOS_01", texto: "Os olhos eram azuis e bem marcantes." },
                { id: "019_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram azuis." }
            ],
            esporte: [
                { id: "019_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava esgrima." },
                { id: "019_ESPORTE_02", texto: "Ouvi uma menção casual a esgrima, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "019_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida francesa." },
                { id: "019_COMIDA_02", texto: "Ela parecia ter preferência por culinária francesa." }
            ],
            caracteristica: [
                { id: "019_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "019_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "020",
        codinome: "Agulha Silenciosa",
        nomeReal: "Yuri Tanaka",
        sexo: "Masculino",
        corCabelo: "Preto",
        corOlhos: "Preto",
        esporte: "Ginástica Olímpica",
        comidaFavorita: "Asiática",
        idadeAparente: 26,
        origem: "Ásia",
        especialidade: ["Troca de crachá", "Infiltração rápida"],
        periculosidade: "Média",
        raridade: "Comum",
        assinatura: ["Linha fina encontrada depois"],
        caracteristica: ["Atlético", "Discreto"],
        idiomas: [
            { idioma: "Japonês", nivel: "Nativo" },
            { idioma: "Português", nivel: "Básico" }
        ],
        habitos: ["Age como funcionário antigo"],
        pistasTipicas: [
            "Parecia já trabalhar ali.",
            "Crachá estranho.",
            "Linha presa no uniforme."
        ],
        falsosPositivos: ["Estagiário"],
        relacaoMeridian: "Lembra muito Kite Needle.",

        dicas: {
            sexo: [
                { id: "020_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "020_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "020_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo da Ásia." },
                { id: "020_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser da Ásia." }
            ],
            cabelo: [
                { id: "020_CABELO_01", texto: "O cabelo chamava atenção pelo tom preto." },
                { id: "020_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "020_OLHOS_01", texto: "Os olhos eram escuros e bem marcantes." },
                { id: "020_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram muito escuros." }
            ],
            esporte: [
                { id: "020_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava ginástica olímpica." },
                { id: "020_ESPORTE_02", texto: "Ouvi uma menção casual a ginástica olímpica, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "020_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida asiática." },
                { id: "020_COMIDA_02", texto: "Ela parecia ter preferência por culinária asiática." }
            ],
            caracteristica: [
                { id: "020_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito atlético." },
                { id: "020_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "021",
        codinome: "Lince",
        nomeReal: "Gustavo Valente",
        sexo: "Masculino",
        corCabelo: "Loiro",
        corOlhos: "Castanho",
        esporte: "Surfe",
        comidaFavorita: "Frutos do Mar",
        idadeAparente: 34,
        origem: "Brasil",
        especialidade: ["Transporte marítimo", "Rotas ilegais"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Cordão com dente de tubarão"],
        caracteristica: ["Atlético", "Casual"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" },
            { idioma: "Espanhol", nivel: "Bom" }
        ],
        habitos: ["Fica observando o horizonte como marinheiro"],
        pistasTipicas: [
            "Falava muito de vento e maré.",
            "Cheiro de sal nas roupas.",
            "Usava um colar com dente de tubarão."
        ],
        falsosPositivos: ["Instrutor de surfe"],
        relacaoMeridian: "Especialista em rotas costeiras.",

        dicas: {
            sexo: [
                { id: "021_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "021_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "021_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo do Brasil." },
                { id: "021_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser do Brasil." }
            ],
            cabelo: [
                { id: "021_CABELO_01", texto: "O cabelo chamava atenção pelo tom loiro." },
                { id: "021_CABELO_02", texto: "A testemunha reparou em cabelos claros." }
            ],
            olhos: [
                { id: "021_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "021_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "021_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava surfe." },
                { id: "021_ESPORTE_02", texto: "Ouvi uma menção casual a surfe, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "021_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar frutos do mar." },
                { id: "021_COMIDA_02", texto: "Ela parecia ter preferência por pratos do mar." }
            ],
            caracteristica: [
                { id: "021_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito atlético." },
                { id: "021_CARACTERISTICA_02", texto: "A pessoa parecia extremamente casual." }
            ]
        }
    },

    {
        id: "022",
        codinome: "Duque",
        nomeReal: "Eduardo Freitas",
        sexo: "Masculino",
        corCabelo: "Loiro",
        corOlhos: "Verde",
        esporte: "Esgrima",
        comidaFavorita: "Mediterrânea",
        idadeAparente: 39,
        origem: "Brasil",
        especialidade: ["Acesso VIP", "Roubo silencioso"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Luvas brancas impecáveis"],
        caracteristica: ["Elegante", "Discreto"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Fluente" }
        ],
        habitos: ["Arruma os punhos da camisa antes de agir"],
        pistasTipicas: [
            "Parecia alguém da alta sociedade.",
            "Usava luvas brancas.",
            "Falava com muita calma."
        ],
        falsosPositivos: ["Empresário"],
        relacaoMeridian: "Infiltração em ambientes de elite.",

        dicas: {
            sexo: [
                { id: "022_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "022_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "022_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo do Brasil." },
                { id: "022_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser do Brasil." }
            ],
            cabelo: [
                { id: "022_CABELO_01", texto: "O cabelo chamava atenção pelo tom loiro." },
                { id: "022_CABELO_02", texto: "A testemunha reparou em cabelos claros." }
            ],
            olhos: [
                { id: "022_OLHOS_01", texto: "Os olhos eram verdes e bem marcantes." },
                { id: "022_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram verdes." }
            ],
            esporte: [
                { id: "022_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava esgrima." },
                { id: "022_ESPORTE_02", texto: "Ouvi uma menção casual a esgrima, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "022_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida mediterrânea." },
                { id: "022_COMIDA_02", texto: "Ela parecia ter preferência por culinária mediterrânea." }
            ],
            caracteristica: [
                { id: "022_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito elegante." },
                { id: "022_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "023",
        codinome: "Nômade",
        nomeReal: "Alex Ribeiro",
        sexo: "Não Binário",
        corCabelo: "Preto",
        corOlhos: "Verde",
        esporte: "Parkour",
        comidaFavorita: "Vegana",
        idadeAparente: 28,
        origem: "Brasil",
        especialidade: ["Fuga urbana", "Escalada de prédios"],
        periculosidade: "Média",
        raridade: "Incomum",
        assinatura: ["Cordas ultrafinas abandonadas"],
        caracteristica: ["Atlético", "Discreto"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" }
        ],
        habitos: ["Sempre olha telhados e saídas"],
        pistasTipicas: [
            "Alguém viu uma sombra nos prédios.",
            "Cordas muito finas foram encontradas.",
            "Parecia desaparecer nos telhados."
        ],
        falsosPositivos: ["Atleta urbano"],
        relacaoMeridian: "Especialista em fuga.",

        dicas: {
            sexo: [
                { id: "023_SEXO_01", texto: "A testemunha disse que não conseguiu identificar se era homem ou mulher." },
                { id: "023_SEXO_02", texto: "Quem passou por aqui tinha uma presença ambígua, impossível de classificar com certeza." }
            ],
            origem: [
                { id: "023_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo do Brasil." },
                { id: "023_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser do Brasil." }
            ],
            cabelo: [
                { id: "023_CABELO_01", texto: "O cabelo chamava atenção pelo tom preto." },
                { id: "023_CABELO_02", texto: "A testemunha reparou em cabelos pretos." }
            ],
            olhos: [
                { id: "023_OLHOS_01", texto: "Os olhos eram verdes e bem marcantes." },
                { id: "023_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram verdes." }
            ],
            esporte: [
                { id: "023_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava parkour." },
                { id: "023_ESPORTE_02", texto: "Ouvi uma menção casual a parkour, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "023_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida vegana." },
                { id: "023_COMIDA_02", texto: "Ela parecia ter preferência por alimentação vegana." }
            ],
            caracteristica: [
                { id: "023_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito atlético." },
                { id: "023_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    },

    {
        id: "024",
        codinome: "Ferrugem",
        nomeReal: "Bruno Amaral",
        sexo: "Masculino",
        corCabelo: "Ruivo",
        corOlhos: "Castanho",
        esporte: "Boxe",
        comidaFavorita: "Churrasco",
        idadeAparente: 37,
        origem: "Brasil",
        especialidade: ["Cobrança", "Intimidação"],
        periculosidade: "Alta",
        raridade: "Incomum",
        assinatura: ["Isqueiro antigo de metal"],
        caracteristica: ["Robusto", "Casual"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" }
        ],
        habitos: ["Brinca com um isqueiro metálico"],
        pistasTipicas: [
            "Cheiro de fumaça no ambiente.",
            "Um isqueiro antigo ficou no balcão.",
            "Parecia acostumado a brigas."
        ],
        falsosPositivos: ["Segurança"],
        relacaoMeridian: "Cobrança de dívidas clandestinas.",

        dicas: {
            sexo: [
                { id: "024_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "024_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "024_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo do Brasil." },
                { id: "024_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser do Brasil." }
            ],
            cabelo: [
                { id: "024_CABELO_01", texto: "O cabelo chamava atenção pelo tom ruivo." },
                { id: "024_CABELO_02", texto: "A testemunha reparou em cabelos avermelhados." }
            ],
            olhos: [
                { id: "024_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "024_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "024_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava boxe." },
                { id: "024_ESPORTE_02", texto: "Ouvi uma menção casual a boxe, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "024_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar churrasco." },
                { id: "024_COMIDA_02", texto: "Ela parecia ter preferência por carne assada e churrasco." }
            ],
            caracteristica: [
                { id: "024_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito robusto." },
                { id: "024_CARACTERISTICA_02", texto: "A pessoa parecia extremamente casual." }
            ]
        }
    },

    {
        id: "025",
        codinome: "Faísca",
        nomeReal: "Caio Montenegro",
        sexo: "Masculino",
        corCabelo: "Ruivo",
        corOlhos: "Azul",
        esporte: "Ciclismo",
        comidaFavorita: "Mexicana",
        idadeAparente: 31,
        origem: "Portugal",
        especialidade: ["Mensagens clandestinas", "Entrega rápida"],
        periculosidade: "Média",
        raridade: "Comum",
        assinatura: ["Mapas rabiscados"],
        caracteristica: ["Atlético", "Casual"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" }
        ],
        habitos: ["Sempre com mochila leve"],
        pistasTipicas: [
            "Saiu pedalando muito rápido.",
            "Tinha mapas rabiscados.",
            "Parecia um mensageiro."
        ],
        falsosPositivos: ["Entregador"],
        relacaoMeridian: "Mensageiro entre células.",

        dicas: {
            sexo: [
                { id: "025_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "025_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "025_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo de Portugal." },
                { id: "025_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser de Portugal." }
            ],
            cabelo: [
                { id: "025_CABELO_01", texto: "O cabelo chamava atenção pelo tom ruivo." },
                { id: "025_CABELO_02", texto: "A testemunha reparou em cabelos avermelhados." }
            ],
            olhos: [
                { id: "025_OLHOS_01", texto: "Os olhos eram azuis e bem marcantes." },
                { id: "025_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram azuis." }
            ],
            esporte: [
                { id: "025_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava ciclismo." },
                { id: "025_ESPORTE_02", texto: "Ouvi uma menção casual a ciclismo, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "025_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida mexicana." },
                { id: "025_COMIDA_02", texto: "Ela parecia ter preferência por culinária mexicana." }
            ],
            caracteristica: [
                { id: "025_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito atlético." },
                { id: "025_CARACTERISTICA_02", texto: "A pessoa parecia extremamente casual." }
            ]
        }
    },

    {
        id: "026",
        codinome: "Nevado",
        nomeReal: "Marcelo Tavares",
        sexo: "Masculino",
        corCabelo: "Platinado",
        corOlhos: "Castanho",
        esporte: "Tiro esportivo",
        comidaFavorita: "Japonesa",
        idadeAparente: 46,
        origem: "Portugal",
        especialidade: ["Operações de precisão"],
        periculosidade: "Alta",
        raridade: "Raro",
        assinatura: ["Cartuchos limpos demais"],
        caracteristica: ["Frio", "Discreto"],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" }
        ],
        habitos: ["Observa ângulos e distâncias"],
        pistasTipicas: [
            "Falava de precisão.",
            "Um cartucho limpo foi encontrado.",
            "Parecia ex-militar."
        ],
        falsosPositivos: ["Instrutor de tiro"],
        relacaoMeridian: "Atirador de elite.",

        dicas: {
            sexo: [
                { id: "026_SEXO_01", texto: "A testemunha disse que era um homem." },
                { id: "026_SEXO_02", texto: "Quem passou por aqui tinha presença claramente masculina." }
            ],
            origem: [
                { id: "026_ORIGEM_01", texto: "O jeito de falar lembrava alguém vindo de Portugal." },
                { id: "026_ORIGEM_02", texto: "A testemunha comentou que a pessoa parecia ser de Portugal." }
            ],
            cabelo: [
                { id: "026_CABELO_01", texto: "O cabelo chamava atenção pelo tom platinado." },
                { id: "026_CABELO_02", texto: "A testemunha reparou em cabelos platinados." }
            ],
            olhos: [
                { id: "026_OLHOS_01", texto: "Os olhos eram castanhos e bem marcantes." },
                { id: "026_OLHOS_02", texto: "A única coisa que a testemunha lembra com certeza é que os olhos eram castanhos." }
            ],
            esporte: [
                { id: "026_ESPORTE_01", texto: "A pessoa comentou com naturalidade que praticava tiro esportivo." },
                { id: "026_ESPORTE_02", texto: "Ouvi uma menção casual a tiro esportivo, como se fosse parte da rotina." }
            ],
            comida: [
                { id: "026_COMIDA_01", texto: "A testemunha ouviu a pessoa elogiar comida japonesa." },
                { id: "026_COMIDA_02", texto: "Ela parecia ter preferência por culinária japonesa." }
            ],
            caracteristica: [
                { id: "026_CARACTERISTICA_01", texto: "O que mais chamou atenção foi o jeito frio." },
                { id: "026_CARACTERISTICA_02", texto: "A pessoa parecia extremamente discreta." }
            ]
        }
    }
    ,
];