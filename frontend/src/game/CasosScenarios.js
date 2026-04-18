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

import { Caso0Scenarios } from "./Caso0Scenarios";
import { CASO_1_SCENARIOS } from "./Caso1Scenarios";
import { CASO_2_SCENARIOS } from "./Caso2Scenarios";
import { CASO_3_SCENARIOS } from "./Caso3Scenarios";
import { Caso9Scenarios } from "./Caso9Scenarios";
import { Caso10Scenarios } from "./Caso10Scenarios";

export const CASOS_SCENARIOS = {
    "C000": Caso0Scenarios,
    "C001": CASO_1_SCENARIOS,
    "C002": CASO_2_SCENARIOS,
    "C003": CASO_3_SCENARIOS,
    // C004-C008: Migrados para geração procedural (ProceduralGenerator.js)
    "C009": Caso9Scenarios,
    "C010": Caso10Scenarios,
};

export const CASOS_CONFIG = {
    "C000": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso0_Relogio_roubado.mp4"
    },
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
        introVideo: "/Videos/Caso4_Diamante_Muda_Cor.mp4",
        procedural: true
    },
    "C005": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso5_Mapa_Desaparecido.mp4",
        procedural: true
    },
    "C006": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso6_Leilao_Fantasma.mp4",
        procedural: true
    },
    "C007": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso7_Container_Vazio.mp4",
        procedural: true
    },
    "C008": {
        hasIntroVideo: true,
        introVideo: "/Videos/Caso8_Codigo_que_nunca_existiu.mp4",
        procedural: true
    },
    "C009": {
        hasIntroVideo: false,
        isCompetitive: true,
        title: "Caso Especial: Protocolo Fantasma",
        description: "Um artefato de inteligência da A.T.L.A.S. foi fragmentado e espalhado pelo submundo digital. Vários agentes foram mobilizados para a recuperação. Apenas o mais rápido garantirá a integridade do sistema."
    },
    "C010": {
        hasIntroVideo: false,
        isCompetitive: true,
        title: "Caso Especial: O Cofre que Nunca Foi Aberto",
        description: "Um cofre ultra seguro internacional foi violado sem deixar rastros. Apenas o melhor e mais rápido agente poderá recuperar os documentos classificados antes dos concorrentes."
    },
    // Casos Procedurais (C011+)
    "C011": { hasIntroVideo: false, procedural: true },
    "C012": { hasIntroVideo: false, procedural: true },
    "C013": { hasIntroVideo: false, procedural: true },
    "C014": { hasIntroVideo: false, procedural: true },
    "C015": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C016": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C017": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C018": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C019": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C020": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C021": { hasIntroVideo: false, procedural: true },
    "C022": { hasIntroVideo: false, procedural: true },
    "C023": { hasIntroVideo: false, procedural: true },
    "C024": { hasIntroVideo: false, procedural: true },
    "C025": { hasIntroVideo: false, procedural: true },
    "C026": { hasIntroVideo: false, procedural: true },
    "C027": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C028": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C029": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C030": { hasIntroVideo: false, procedural: true, isCompetitive: true },
    "C031": { hasIntroVideo: false, procedural: true },
    "C032": { hasIntroVideo: false, procedural: true },
    "C033": { hasIntroVideo: false, procedural: true },
    "C034": { hasIntroVideo: false, procedural: true },
    "C035": { hasIntroVideo: false, procedural: true },
    "C036": { hasIntroVideo: false, procedural: true },
    "C037": { hasIntroVideo: false, procedural: true },
    "C038": { hasIntroVideo: false, procedural: true },
    "C039": { hasIntroVideo: false, procedural: true },
    "C040": { hasIntroVideo: false, procedural: true },
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
