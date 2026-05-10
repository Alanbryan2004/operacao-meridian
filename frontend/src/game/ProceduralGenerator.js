// src/game/ProceduralGenerator.js
// ============================================================
// Engine for dynamically generating mission scenarios (C011+).
// Pure functions — no side-effects. Produces a scenario object
// compatible with activeScenario used in Caso.jsx.
// ============================================================

import { CIDADES } from "./Cidades";
import { DESTINATION_OPTIONS } from "./DestRoutes";
import { suspectsSeed } from "./store";

// ── NPC Pool ─────────────────────────────────────────────────
const NPC_POOL = [
    { local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png" },
    { local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png" },
    { local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png" },
    { local: "Casa de Show", personagem: "Dançarina", imgLocal: "/NPC/CasadeShow.png", imgPersonagem: "/NPC/Dancarina.png" },
    { local: "Centro da Cidade", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png" },
    { local: "Porto", personagem: "Pescador", imgLocal: "/NPC/Porto.png", imgPersonagem: "/NPC/Pescador.png" },
    { local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png" },
    { local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png" },
    { local: "Antiquário", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png" },
    { local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png" },
    { local: "Taxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png" },
    { local: "Feira", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png" },
    { local: "Cozinha Industrial", personagem: "Cozinheiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Cozinheiro.png" },
    { local: "Praça", personagem: "Agente de Trânsito", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/AgenteTransito.png" },
    { local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png" }
];

// ── Helpers ──────────────────────────────────────────────────

/** Simple seeded random number generator (Park-Miller) */
function createSeededRng(seedStr) {
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
        seed = (seed << 5) - seed + seedStr.charCodeAt(i);
        seed |= 0; 
    }
    // Park-Miller requer seed positivo no range [1, 2^31-2]
    seed = Math.abs(seed) % 2147483646;
    if (seed === 0) seed = 1;
    return function() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
}

function shuffle(arr, rng) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRandom(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
}

function pickNRandom(arr, n, rng) {
    return shuffle(arr, rng).slice(0, n);
}

/** Get number of stages for a given difficulty level */
function getStageCount(nivel) {
    const n = (nivel || "").toUpperCase();
    if (n === "FACIL") return 6;
    if (n === "MEDIO") return 6;
    if (n === "DIFICIL") return 10;
    if (n === "LENDARIO") return 16;
    return 6;
}

/** Get the last stage index where suspect tips should be given (0-based) */
function getLastSuspectTipStage(nivel) {
    const n = (nivel || "").toUpperCase();
    if (n === "FACIL" || n === "MEDIO") return 4;   // stage 5 (0-indexed)
    if (n === "DIFICIL") return 8;                    // stage 9
    if (n === "LENDARIO") return 14;                  // stage 15
    return 4;
}

// ── Route Builder ────────────────────────────────────────────

function buildCityGraph() {
    const graph = {};
    for (const d of DESTINATION_OPTIONS) {
        if (!graph[d.origem]) graph[d.origem] = new Set();
        graph[d.origem].add(d.cidade);
    }
    return graph;
}

function findRoute(startCity, length, graph, rng) {
    // DFS com backtracking — garante encontrar rota se existir
    const path = [startCity];
    const visited = new Set([startCity]);

    function dfs() {
        if (path.length === length) return true;

        const current = path[path.length - 1];
        const neighbors = graph[current];
        if (!neighbors || neighbors.size === 0) return false;

        // Embaralha candidatos com o RNG para determinismo
        const candidates = shuffle([...neighbors].filter(c => !visited.has(c)), rng);

        for (const next of candidates) {
            path.push(next);
            visited.add(next);
            if (dfs()) return true;
            // Backtrack
            path.pop();
            visited.delete(next);
        }

        return false;
    }

    if (dfs()) return path;

    // Fallback: tenta rotas mais curtas
    for (let l = length - 1; l >= 3; l--) {
        path.length = 0;
        path.push(startCity);
        visited.clear();
        visited.add(startCity);
        
        const dfsShort = () => {
            if (path.length === l) return true;
            const cur = path[path.length - 1];
            const nb = graph[cur];
            if (!nb || nb.size === 0) return false;
            const cands = shuffle([...nb].filter(c => !visited.has(c)), rng);
            for (const nx of cands) {
                path.push(nx);
                visited.add(nx);
                if (dfsShort()) return true;
                path.pop();
                visited.delete(nx);
            }
            return false;
        };
        if (dfsShort()) return path;
    }

    return null;
}

function findRouteSync(startCity, length, graph, rng) {
    const path = [startCity];
    const visited = new Set([startCity]);

    while (path.length < length) {
        const current = path[path.length - 1];
        const neighbors = graph[current];
        if (!neighbors || neighbors.size === 0) break;

        const candidates = [...neighbors].filter(c => !visited.has(c));
        if (candidates.length === 0) break;

        const next = pickRandom(candidates, rng);
        path.push(next);
        visited.add(next);
    }

    return path.length >= 3 ? path : null;
}

// ── Travel Table Builder ─────────────────────────────────────

function buildTravelTable(route, graph, rng) {
    const table = {};
    const routeSet = new Set(route);

    for (let i = 0; i < route.length - 1; i++) {
        const current = route[i];
        const correct = route[i + 1];
        const neighbors = graph[current] ? [...graph[current]] : [];

        const wrongCandidates = neighbors.filter(c => c !== correct && !routeSet.has(c));
        const wrongPicks = pickNRandom(wrongCandidates, 2, rng);

        while (wrongPicks.length < 2) {
            const fallback = neighbors.filter(c => c !== correct && !wrongPicks.includes(c));
            if (fallback.length > 0) {
                wrongPicks.push(pickRandom(fallback, rng));
            } else {
                break;
            }
        }

        table[current] = shuffle([correct, ...wrongPicks], rng);
    }

    return table;
}

// ── Suspect Tip Scheduler ────────────────────────────────────

const SUSPECT_TIP_CATEGORIES = ["sexo", "origem", "cabelo", "olhos", "esporte", "comida", "caracteristica"];

function scheduleSuspectTips(suspect, totalTipStages, nivel, rng) {
    const n = (nivel || "").toUpperCase();

    if (n === "DIFICIL") {
        const targetStages = [1, 3, 5, 8];
        const categories = shuffle([...SUSPECT_TIP_CATEGORIES], rng).slice(0, 4);

        return categories.map((cat, i) => {
            const tips = suspect.dicas?.[cat];
            if (!tips || tips.length === 0) return null;
            const tip = pickRandom(tips, rng);
            return { stage: targetStages[i], category: cat, tipId: tip.id, texto: tip.texto };
        }).filter(Boolean);
    }

    const numTips = Math.min(totalTipStages, SUSPECT_TIP_CATEGORIES.length);
    const MAX_ATTEMPTS = 100;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const categories = shuffle([...SUSPECT_TIP_CATEGORIES], rng).slice(0, numTips);

        if (verifySuspectUniqueness(suspect, categories)) {
            const schedule = categories.map((cat, i) => {
                const tips = suspect.dicas?.[cat];
                if (!tips || tips.length === 0) return null;
                const tip = pickRandom(tips, rng);
                return { stage: i, category: cat, tipId: tip.id, texto: tip.texto };
            }).filter(Boolean);

            return schedule;
        }
    }

    const schedule = SUSPECT_TIP_CATEGORIES.slice(0, numTips).map((cat, i) => {
        const tips = suspect.dicas?.[cat];
        if (!tips || tips.length === 0) return null;
        const tip = pickRandom(tips, rng);
        return { stage: i, category: cat, tipId: tip.id, texto: tip.texto };
    }).filter(Boolean);

    return schedule;
}

function verifySuspectUniqueness(suspect, categories) {
    const catToField = {
        sexo: "sexo",
        origem: "origem",
        cabelo: "corCabelo",
        olhos: "corOlhos",
        esporte: "esporte",
        comida: "comidaFavorita",
        caracteristica: "caracteristica"
    };

    const matching = suspectsSeed.filter(s => {
        if (!s.dicas) return false;
        return categories.every(cat => {
            const field = catToField[cat];
            if (!field) return true;

            const suspectValue = suspect[field];
            const candidateValue = s[field];

            if (Array.isArray(suspectValue) && Array.isArray(candidateValue)) {
                return suspectValue.some(v => candidateValue.includes(v));
            }
            return suspectValue === candidateValue;
        });
    });

    return matching.length === 1;
}

// ── City Tip Selector ────────────────────────────────────────

function selectCityTips(cityName, count, usedTipIds, rng) {
    const city = CIDADES.find(c => c.cidade === cityName);
    if (!city || !city.dicas) {
        return Array.from({ length: count }, (_, i) => ({
            id: `GENERIC_${cityName}_${i}`,
            texto: `Você está investigando em ${cityName}. Continue procurando pistas.`
        }));
    }

    const available = city.dicas.filter(d => !usedTipIds.has(d.id));
    const selected = pickNRandom(available, count, rng);

    if (selected.length < count) {
        const fallbacks = [
            "Ouvi dizer que o suspeito seguiu para um país distante.",
            "Disseram que o destino fica em outro continente.",
            "O suspeito parecia estar com pressa para viajar.",
            "Vi alguém com as mesmas características saindo no último transporte.",
            "Perguntaram sobre as passagens para a próxima grande metrópole."
        ];
        while (selected.length < count) {
            selected.push({ id: `fallback_${selected.length}`, texto: fallbacks[selected.length % fallbacks.length] });
        }
    }

    selected.forEach(t => usedTipIds.add(t.id));

    return selected;
}

// ── NPC Assembly ─────────────────────────────────────────────

function pick3Npcs(rng) {
    const shuffled = shuffle(NPC_POOL, rng);
    const selected = [];
    const usedLocs = new Set();

    for (const npc of shuffled) {
        if (!usedLocs.has(npc.local)) {
            selected.push(npc);
            usedLocs.add(npc.local);
        }
        if (selected.length === 3) break;
    }

    return selected;
}

// ── Main Generator ───────────────────────────────────────────

export function generateProceduralScenario(caseObj, seed = null) {
    const rng = seed ? createSeededRng(seed) : Math.random;
    
    const nivel = (caseObj.dificuldade || caseObj.nivel || "FACIL").toUpperCase();
    const stageCount = getStageCount(nivel);
    const lastSuspectTipStageIdx = getLastSuspectTipStage(nivel);
    const startCity = caseObj.localInicial?.cidade;

    if (!startCity) return null;

    // 1. Pick suspect
    const eligibleSuspects = suspectsSeed.filter(s => s.dicas && Object.keys(s.dicas).length > 0);
    if (eligibleSuspects.length === 0) return null;
    const suspect = pickRandom(eligibleSuspects, rng);

    // 2. Build route
    const graph = buildCityGraph();
    const route = findRoute(startCity, stageCount, graph, rng);
    if (!route) return null;

    const finalCity = route[route.length - 1];

    // 3. Build travel table
    const travelTable = buildTravelTable(route, graph, rng);

    // 4. Schedule suspect tips
    const numSuspectTipStages = lastSuspectTipStageIdx + 1;
    const suspectTipSchedule = scheduleSuspectTips(suspect, numSuspectTipStages, nivel, rng);

    // 5. Build interrogatorios
    const usedCityTipIds = new Set();
    const interrogatorios = [];
    const arrestNpcIndex = Math.floor(rng() * 3);

    for (let stageIdx = 0; stageIdx < stageCount; stageIdx++) {
        const city = route[stageIdx];
        const isFinalStage = (stageIdx === stageCount - 1);
        const npcs = pick3Npcs(rng);

        const suspectTip = suspectTipSchedule.find(t => t.stage === stageIdx);
        const suspectTipNpcIdx = suspectTip ? Math.floor(rng() * 3) : -1;

        const tipCity = isFinalStage ? city : route[stageIdx + 1];
        const cityTips = selectCityTips(tipCity, 3, usedCityTipIds, rng);

        for (let npcIdx = 0; npcIdx < 3; npcIdx++) {
            const npc = npcs[npcIdx];
            const cityTip = cityTips[npcIdx] || { id: `FALLBACK_${npcIdx}`, texto: "Não consegui muitas informações sobre o destino." };
            const isArrestNPC = isFinalStage && npcIdx === arrestNpcIndex;
            const hasSuspectTip = !isFinalStage && suspectTip && (npcIdx === suspectTipNpcIdx);

            let pista;
            if (isArrestNPC) {
                pista = `Atenção, Agente! Eu vi o suspeito entrando naquele prédio ali agora mesmo! Rápido, você pode capturá-lo!`;
            } else if (isFinalStage) {
                pista = `Houve muita agitação por aqui, mas o suspeito parece estar escondido em algum lugar desta cidade. Procure nos arredores!`;
            } else if (hasSuspectTip) {
                pista = `${cityTip.texto} Além disso: ${suspectTip.texto}`;
            } else {
                pista = cityTip.texto;
            }

            interrogatorios.push({
                id: `PROC_${caseObj.id}_S${stageIdx + 1}_N${npcIdx + 1}`,
                cidade: city,
                local: npc.local,
                personagem: npc.personagem,
                imgLocal: npc.imgLocal,
                imgPersonagem: npc.imgPersonagem,
                pista
            });
        }
    }

    return {
        id: `${caseObj.id}_PROC_${seed || Date.now()}`,
        suspectId: suspect.id,
        finalCity,
        route,
        spottedAt: route.slice(1), // All cities after start
        travelTable,
        interrogatorios,
        procedural: true,
        arrestNpcIndex,
        suspectTipSchedule
    };

    console.log(`[ProceduralGenerator] Generated scenario for ${caseObj.id}:`, {
        suspect: suspect.codinome,
        route: route.join(" → "),
        stages: stageCount,
        suspectTipCount: suspectTipSchedule.length,
        arrestNpcIndex
    });

    return scenario;
}
