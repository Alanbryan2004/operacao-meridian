// src/game/CasosScenarios.js

/**
 * Cada caso pode ter múltiplos cenários (variantes).
 * Cada cenário define:
 * - suspectId: quem é o culpado
 * - finalCity: cidade onde a captura ocorre
 * - spottedAt: cidades onde o suspeito foi avistado (para DialogBox)
 * - route: o caminho exato que o suspeito faz
 * - interrogatorios: pistas em cada cidade da rota
 */

import { CASO_1_SCENARIOS } from "./Caso1Scenarios";
import { CASO_2_SCENARIOS } from "./Caso2Scenarios";
import { CASO_3_SCENARIOS } from "./Caso3Scenarios";
import { CASO_4_SCENARIOS } from "./Caso4Scenarios";
import { Caso5Scenarios } from "./Caso5Scenarios";
import { Caso6Scenarios } from "./Caso6Scenarios";
import { Caso7Scenarios } from "./Caso7Scenarios";
import { Caso8Scenarios } from "./Caso8Scenarios";


export const CASOS_SCENARIOS = {
    "C001": CASO_1_SCENARIOS,
    "C002": CASO_2_SCENARIOS,
    "C003": CASO_3_SCENARIOS,
    "C004": CASO_4_SCENARIOS,
    "C005": Caso5Scenarios,
    "C006": Caso6Scenarios,
    "C007": Caso7Scenarios,
    "C008": Caso8Scenarios,
};

export const CASOS_CONFIG = {
    "C001": {
        hasIntroVideo: true,
        introVideo: "/Videos/reliquiadesaparecida.mp4"
    },
    "C002": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso2_LeilaoObradeArte.mp4"
    },
    "C003": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso3_ManuscritoRoubado.mp4"
    },
    "C004": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso4_Diamante_Muda_Cor.mp4"
    },
    "C005": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso5_Mapa_Desaparecido.mp4"
    },
    "C006": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso6_Leilao_Fantasma.mp4"
    },
    "C007": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso7_Container_Vazio.mp4"
    },
    "C008": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso8_Codigo_que_nunca_existiu.mp4"
    }
};

/**
 * Retorna a configuração de um caso (vídeos, etc)
 */
export function getCaseConfig(caseId) {
    return CASOS_CONFIG[caseId] || {};
}

/**
 * Retorna a lista de cenários para um caso específico.
 */
export function getScenarios(caseId) {
    return CASOS_SCENARIOS[caseId] || null;
}

/**
 * Busca um cenário específico por ID ou por Suspeito (fallback).
 */
export function findScenario(caseId, scenarioId, targetSuspectId = null) {
    const scenarios = getScenarios(caseId);
    if (!scenarios) return null;

    if (scenarioId) {
        const found = scenarios.find(s => s.id === scenarioId);
        if (found) return found;
    }

    if (targetSuspectId) {
        return scenarios.find(s => String(s.suspectId) === String(targetSuspectId));
    }

    return null;
}
