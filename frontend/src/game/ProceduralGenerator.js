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
    { local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png" },
    { local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png" },
    { local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png" },
    { local: "Floricultura", personagem: "Florista", imgLocal: "/NPC/Floricultura.png", imgPersonagem: "/NPC/Florista.png" },
    { local: "Hospital", personagem: "Médica", imgLocal: "/NPC/Hospital.png", imgPersonagem: "/NPC/Medica.png" },
    { local: "Hotel", personagem: "Camareira", imgLocal: "/NPC/Hotel.png", imgPersonagem: "/NPC/Camareira.png" },
    { local: "Casa de Show", personagem: "Dançarina", imgLocal: "/NPC/CasadeShow.png", imgPersonagem: "/NPC/Dancarina.png" },
    { local: "Centro da Cidade", personagem: "Morador de Rua", imgLocal: "/NPC/CentrodaCidade.png", imgPersonagem: "/NPC/moradorderua.png" },
    { local: "Porto", personagem: "Barqueiro", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Barqueiro.png" },
    { local: "Biblioteca", personagem: "Bibliotecária", imgLocal: "/NPC/Biblioteca.png", imgPersonagem: "/NPC/Bibliotecaria.png" },
    { local: "Faculdade", personagem: "Professor", imgLocal: "/NPC/Faculdade.png", imgPersonagem: "/NPC/Professor.png" },
    { local: "Antiquário", personagem: "Antiquário", imgLocal: "/NPC/Antiguidade.png", imgPersonagem: "/NPC/Antiquario.png" },
    { local: "Feira de Vendas", personagem: "Mercador", imgLocal: "/NPC/FeiraVendas.png", imgPersonagem: "/NPC/Mercador.png" },
];

// ── Helpers ──────────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickNRandom(arr, n) {
    return shuffle(arr).slice(0, n);
}

/** Get number of stages for a given difficulty level */
function getStageCount(nivel) {
    const n = (nivel || "").toUpperCase();
    if (n === "FACIL") return 5;
    if (n === "MEDIO") return 5;
    if (n === "DIFICIL") return 10;
    if (n === "LENDARIO") return 15;
    return 5;
}

/** Get the last stage index where suspect tips should be given (0-based) */
function getLastSuspectTipStage(nivel) {
    const n = (nivel || "").toUpperCase();
    if (n === "FACIL" || n === "MEDIO") return 3;   // stage 4 (0-indexed)
    if (n === "DIFICIL") return 8;                    // stage 9
    if (n === "LENDARIO") return 13;                  // stage 14
    return 3;
}

// ── Route Builder ────────────────────────────────────────────
// Builds a graph from DESTINATION_OPTIONS, then finds a path of
// unique cities from startCity with the required length.

function buildCityGraph() {
    const graph = {};
    for (const d of DESTINATION_OPTIONS) {
        if (!graph[d.origem]) graph[d.origem] = new Set();
        graph[d.origem].add(d.cidade);
    }
    return graph;
}

/**
 * Find a route of `length` unique cities starting from startCity.
 * Uses randomised DFS to produce varied routes.
 */
function findRoute(startCity, length, graph) {
    const MAX_ATTEMPTS = 50;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const path = [startCity];
        const visited = new Set([startCity]);

        while (path.length < length) {
            const current = path[path.length - 1];
            const neighbors = graph[current];
            if (!neighbors || neighbors.size === 0) break;

            const candidates = [...neighbors].filter(c => !visited.has(c));
            if (candidates.length === 0) break;

            const next = pickRandom(candidates);
            path.push(next);
            visited.add(next);
        }

        if (path.length === length) return path;
    }

    // Fallback: if we can't find a perfect route, try shorter but valid
    console.warn(`[ProceduralGenerator] Could not find route of length ${length} from ${startCity}. Attempting with relaxed constraints.`);
    return null;
}

// ── Travel Table Builder ─────────────────────────────────────
// For each city in the route (except the last), provides 3 options:
// - The correct next city
// - 2 wrong options (reachable from current, NOT in route)

function buildTravelTable(route, graph) {
    const table = {};
    const routeSet = new Set(route);

    for (let i = 0; i < route.length - 1; i++) {
        const current = route[i];
        const correct = route[i + 1];
        const neighbors = graph[current] ? [...graph[current]] : [];

        // Wrong options: reachable but NOT in the route
        const wrongCandidates = neighbors.filter(c => c !== correct && !routeSet.has(c));
        const wrongPicks = pickNRandom(wrongCandidates, 2);

        // If we don't have enough wrong picks, use any non-correct reachable city
        while (wrongPicks.length < 2) {
            const fallback = neighbors.filter(c => c !== correct && !wrongPicks.includes(c));
            if (fallback.length > 0) {
                wrongPicks.push(pickRandom(fallback));
            } else {
                break;
            }
        }

        table[current] = shuffle([correct, ...wrongPicks]);
    }

    return table;
}

// ── Suspect Tip Scheduler ────────────────────────────────────
// Selects which suspect tip categories to reveal at each stage.
// Guarantees that by the last tip stage, only 1 suspect matches.

const SUSPECT_TIP_CATEGORIES = ["sexo", "origem", "cabelo", "olhos", "esporte", "comida", "caracteristica"];

/**
 * Given a suspect, pick categories to reveal across stages such that
 * after all are revealed, only 1 suspect in suspectsSeed matches.
 */
function scheduleSuspectTips(suspect, totalTipStages) {
    // We have 7 categories, pick up to totalTipStages of them
    const numTips = Math.min(totalTipStages, SUSPECT_TIP_CATEGORIES.length);

    // Strategy: try random orderings until we find one that uniquely identifies
    // the suspect after all tips are revealed.
    const MAX_ATTEMPTS = 100;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const categories = shuffle([...SUSPECT_TIP_CATEGORIES]).slice(0, numTips);

        // Verify: after revealing all these categories, does only 1 suspect match?
        if (verifySuspectUniqueness(suspect, categories)) {
            // Pick a random tip text for each category
            const schedule = categories.map((cat, i) => {
                const tips = suspect.dicas?.[cat];
                if (!tips || tips.length === 0) return null;
                const tip = pickRandom(tips);
                return { stage: i, category: cat, tipId: tip.id, texto: tip.texto };
            }).filter(Boolean);

            return schedule;
        }
    }

    // Fallback: just use all categories we can
    console.warn("[ProceduralGenerator] Could not guarantee unique suspect with tip subset. Using all available.");
    const schedule = SUSPECT_TIP_CATEGORIES.slice(0, numTips).map((cat, i) => {
        const tips = suspect.dicas?.[cat];
        if (!tips || tips.length === 0) return null;
        const tip = pickRandom(tips);
        return { stage: i, category: cat, tipId: tip.id, texto: tip.texto };
    }).filter(Boolean);

    return schedule;
}

/**
 * Check if revealing the given categories for a suspect uniquely identifies them.
 * Maps category → suspect field for comparison.
 */
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

function selectCityTips(cityName, count, usedTipIds) {
    const city = CIDADES.find(c => c.cidade === cityName);
    if (!city || !city.dicas) {
        // Fallback generic tips
        return Array.from({ length: count }, (_, i) => ({
            id: `GENERIC_${cityName}_${i}`,
            texto: `Você está investigando em ${cityName}. Continue procurando pistas.`
        }));
    }

    const available = city.dicas.filter(d => !usedTipIds.has(d.id));
    const selected = pickNRandom(available, count);

    // Track used tips
    selected.forEach(t => usedTipIds.add(t.id));

    // If not enough, generate fillers
    while (selected.length < count) {
        selected.push({
            id: `FILLER_${cityName}_${selected.length}`,
            texto: `Não há mais informações disponíveis em ${cityName}.`
        });
    }

    return selected;
}

// ── NPC Assembly ─────────────────────────────────────────────

function pick3Npcs() {
    const shuffled = shuffle(NPC_POOL);
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

/**
 * Generate a procedural scenario for a given case.
 *
 * @param {object} caseObj - The case seed object (from seed.js)
 * @returns {object|null} - A scenario compatible with activeScenario in Caso.jsx
 */
export function generateProceduralScenario(caseObj) {
    const nivel = (caseObj.dificuldade || caseObj.nivel || "FACIL").toUpperCase();
    const stageCount = getStageCount(nivel);
    const lastSuspectTipStageIdx = getLastSuspectTipStage(nivel);
    const startCity = caseObj.localInicial?.cidade;

    if (!startCity) {
        console.error("[ProceduralGenerator] Case has no localInicial.cidade");
        return null;
    }

    // 1. Pick a random suspect (must have dicas)
    const eligibleSuspects = suspectsSeed.filter(s => s.dicas && Object.keys(s.dicas).length > 0);
    if (eligibleSuspects.length === 0) {
        console.error("[ProceduralGenerator] No suspects with dicas available.");
        return null;
    }
    const suspect = pickRandom(eligibleSuspects);

    // 2. Build route (all unique cities)
    const graph = buildCityGraph();
    const route = findRoute(startCity, stageCount, graph);
    if (!route) {
        console.error(`[ProceduralGenerator] Could not build route of ${stageCount} from ${startCity}`);
        return null;
    }

    const finalCity = route[route.length - 1];

    // 3. Build travel table (3 options per non-final stage)
    const travelTable = buildTravelTable(route, graph);

    // 4. Schedule suspect tips (stages 0 to lastSuspectTipStageIdx)
    const numSuspectTipStages = lastSuspectTipStageIdx + 1;
    const suspectTipSchedule = scheduleSuspectTips(suspect, numSuspectTipStages);

    // 5. Build interrogatorios for each stage
    const usedCityTipIds = new Set();
    const usedSuspectTipIds = new Set(suspectTipSchedule.map(s => s.tipId));
    const interrogatorios = [];
    const arrestNpcIndex = Math.floor(Math.random() * 3); // 0, 1, or 2

    for (let stageIdx = 0; stageIdx < stageCount; stageIdx++) {
        const city = route[stageIdx];
        const isFinalStage = (stageIdx === stageCount - 1);
        const npcs = pick3Npcs();

        // Get suspect tip for this stage (if any)
        const suspectTip = suspectTipSchedule.find(t => t.stage === stageIdx);
        // Pick which NPC gets the suspect tip (random)
        const suspectTipNpcIdx = suspectTip ? Math.floor(Math.random() * 3) : -1;

        // City tips: about the NEXT city (destination), not the current one.
        // This helps the player figure out WHERE the suspect went.
        // Final stage: tips about the current city (no next destination).
        const tipCity = isFinalStage ? city : route[stageIdx + 1];
        const cityTips = selectCityTips(tipCity, 3, usedCityTipIds);

        for (let npcIdx = 0; npcIdx < 3; npcIdx++) {
            const npc = npcs[npcIdx];
            const cityTip = cityTips[npcIdx];
            const hasSuspectTip = (npcIdx === suspectTipNpcIdx && suspectTip);

            let pista;
            if (isFinalStage) {
                // Final stage: simple clues, arrest trigger is on arrestNpcIndex
                pista = cityTip.texto;
            } else if (hasSuspectTip) {
                // Combined: city tip + suspect tip
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

    // 6. Build the scenario object
    const scenario = {
        id: `${caseObj.id}_PROC_${Date.now()}`,
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
