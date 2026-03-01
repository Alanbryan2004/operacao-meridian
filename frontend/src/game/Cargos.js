/**
 * 🛡️ Hierarquia Completa de Cargos — A.T.L.A.S.
 *
 * Classes visuais:
 *   🟢 Iniciante  (Fases 1-2)
 *   🔵 Operacional (Fases 3-4)
 *   🟣 Elite      (Fases 5-6)
 *   🟠 Comando    (Fases 7)
 *   🔴 Diretoria  (Fases 8-9)
 *   ⚫ Lendário   (Fase 10)
 */

export const CARGOS = [
    // ── 🟢 Fase 1 — Recruta ──
    { nivel: 1, titulo: "Novato", fase: 1, classe: "Iniciante", emoji: "🟢", xpMin: 0 },
    { nivel: 2, titulo: "Recruta", fase: 1, classe: "Iniciante", emoji: "🟢", xpMin: 500 },
    { nivel: 3, titulo: "Cadete", fase: 1, classe: "Iniciante", emoji: "🟢", xpMin: 1300 },
    { nivel: 4, titulo: "Cadete Investigativo", fase: 1, classe: "Iniciante", emoji: "🟢", xpMin: 2400 },
    { nivel: 5, titulo: "Cadete de Inteligência", fase: 1, classe: "Iniciante", emoji: "🟢", xpMin: 3800 },

    // ── 🟢 Fase 2 — Formação ──
    { nivel: 6, titulo: "Trainee de Campo", fase: 2, classe: "Iniciante", emoji: "🟢", xpMin: 5500 },
    { nivel: 7, titulo: "Agente em Treinamento", fase: 2, classe: "Iniciante", emoji: "🟢", xpMin: 7500 },
    { nivel: 8, titulo: "Assistente de Investigação", fase: 2, classe: "Iniciante", emoji: "🟢", xpMin: 10000 },
    { nivel: 9, titulo: "Investigador Júnior", fase: 2, classe: "Iniciante", emoji: "🟢", xpMin: 13000 },
    { nivel: 10, titulo: "Investigador", fase: 2, classe: "Iniciante", emoji: "🟢", xpMin: 16500 },

    // ── 🔵 Fase 3 — Primeira Autoridade ──
    { nivel: 11, titulo: "Detetive Júnior", fase: 3, classe: "Operacional", emoji: "🔵", xpMin: 20500 },
    { nivel: 12, titulo: "Detetive", fase: 3, classe: "Operacional", emoji: "🔵", xpMin: 25000 },
    { nivel: 13, titulo: "Detetive Sênior", fase: 3, classe: "Operacional", emoji: "🔵", xpMin: 30000 },
    { nivel: 14, titulo: "Agente de Campo", fase: 3, classe: "Operacional", emoji: "🔵", xpMin: 36000 },
    { nivel: 15, titulo: "Agente Especial", fase: 3, classe: "Operacional", emoji: "🔵", xpMin: 43000 },

    // ── 🔵 Fase 4 — Operacional Avançado ──
    { nivel: 16, titulo: "Agente Especial Sênior", fase: 4, classe: "Operacional", emoji: "🔵", xpMin: 51000 },
    { nivel: 17, titulo: "Agente Tático", fase: 4, classe: "Operacional", emoji: "🔵", xpMin: 60000 },
    { nivel: 18, titulo: "Analista de Inteligência", fase: 4, classe: "Operacional", emoji: "🔵", xpMin: 70000 },
    { nivel: 19, titulo: "Analista Especial", fase: 4, classe: "Operacional", emoji: "🔵", xpMin: 82000 },
    { nivel: 20, titulo: "Operador de Inteligência", fase: 4, classe: "Operacional", emoji: "🔵", xpMin: 95000 },

    // ── 🟣 Fase 5 — Elite ──
    { nivel: 21, titulo: "Operador Especial", fase: 5, classe: "Elite", emoji: "🟣", xpMin: 110000 },
    { nivel: 22, titulo: "Inspetor", fase: 5, classe: "Elite", emoji: "🟣", xpMin: 128000 },
    { nivel: 23, titulo: "Inspetor de Campo", fase: 5, classe: "Elite", emoji: "🟣", xpMin: 148000 },
    { nivel: 24, titulo: "Inspetor Especial", fase: 5, classe: "Elite", emoji: "🟣", xpMin: 170000 },
    { nivel: 25, titulo: "Inspetor Sênior", fase: 5, classe: "Elite", emoji: "🟣", xpMin: 195000 },

    // ── 🟣 Fase 6 — Supervisão ──
    { nivel: 26, titulo: "Supervisor de Campo", fase: 6, classe: "Elite", emoji: "🟣", xpMin: 225000 },
    { nivel: 27, titulo: "Supervisor de Operações", fase: 6, classe: "Elite", emoji: "🟣", xpMin: 260000 },
    { nivel: 28, titulo: "Supervisor Especial", fase: 6, classe: "Elite", emoji: "🟣", xpMin: 300000 },
    { nivel: 29, titulo: "Coordenador de Operações", fase: 6, classe: "Elite", emoji: "🟣", xpMin: 345000 },
    { nivel: 30, titulo: "Coordenador Especial", fase: 6, classe: "Elite", emoji: "🟣", xpMin: 400000 },

    // ── 🟠 Fase 7 — Comando ──
    { nivel: 31, titulo: "Comandante Assistente", fase: 7, classe: "Comando", emoji: "🟠", xpMin: 460000 },
    { nivel: 32, titulo: "Comandante de Campo", fase: 7, classe: "Comando", emoji: "🟠", xpMin: 530000 },
    { nivel: 33, titulo: "Comandante Especial", fase: 7, classe: "Comando", emoji: "🟠", xpMin: 610000 },
    { nivel: 34, titulo: "Comandante de Operações", fase: 7, classe: "Comando", emoji: "🟠", xpMin: 700000 },
    { nivel: 35, titulo: "Comandante Sênior", fase: 7, classe: "Comando", emoji: "🟠", xpMin: 800000 },

    // ── 🔴 Fase 8 — Diretoria ──
    { nivel: 36, titulo: "Diretor Assistente", fase: 8, classe: "Diretoria", emoji: "🔴", xpMin: 920000 },
    { nivel: 37, titulo: "Diretor Operacional", fase: 8, classe: "Diretoria", emoji: "🔴", xpMin: 1060000 },
    { nivel: 38, titulo: "Diretor de Inteligência", fase: 8, classe: "Diretoria", emoji: "🔴", xpMin: 1220000 },
    { nivel: 39, titulo: "Diretor Estratégico", fase: 8, classe: "Diretoria", emoji: "🔴", xpMin: 1400000 },
    { nivel: 40, titulo: "Diretor Global", fase: 8, classe: "Diretoria", emoji: "🔴", xpMin: 1600000 },

    // ── 🔴 Fase 9 — Alto Comando ──
    { nivel: 41, titulo: "Diretor Executivo", fase: 9, classe: "Diretoria", emoji: "🔴", xpMin: 1850000 },
    { nivel: 42, titulo: "Diretor Supremo Assistente", fase: 9, classe: "Diretoria", emoji: "🔴", xpMin: 2150000 },
    { nivel: 43, titulo: "Diretor Supremo", fase: 9, classe: "Diretoria", emoji: "🔴", xpMin: 2500000 },
    { nivel: 44, titulo: "Diretor Supremo Global", fase: 9, classe: "Diretoria", emoji: "🔴", xpMin: 2900000 },
    { nivel: 45, titulo: "Diretor Supremo de Operações", fase: 9, classe: "Diretoria", emoji: "🔴", xpMin: 3400000 },

    // ── ⚫ Fase 10 — Nível Lendário ──
    { nivel: 46, titulo: "Guardião da A.T.L.A.S.", fase: 10, classe: "Lendário", emoji: "⚫", xpMin: 4000000 },
    { nivel: 47, titulo: "Mestre da Inteligência", fase: 10, classe: "Lendário", emoji: "⚫", xpMin: 4800000 },
    { nivel: 48, titulo: "Agente Global", fase: 10, classe: "Lendário", emoji: "⚫", xpMin: 5800000 },
    { nivel: 49, titulo: "Comandante Supremo", fase: 10, classe: "Lendário", emoji: "⚫", xpMin: 7000000 },
    { nivel: 50, titulo: "Lenda da A.T.L.A.S.", fase: 10, classe: "Lendário", emoji: "⚫", xpMin: 9000000 },
];

/**
 * Retorna o cargo atual do jogador com base no XP.
 * Exemplo: getCargoByXp(1500) → { nivel: 3, titulo: "Cadete", ... }
 */
export function getCargoByXp(xp) {
    let cargo = CARGOS[0];
    for (const c of CARGOS) {
        if (xp >= c.xpMin) cargo = c;
        else break;
    }
    return cargo;
}

/**
 * Retorna o próximo cargo (ou null se já for Lenda).
 */
export function getProximoCargo(xp) {
    for (const c of CARGOS) {
        if (xp < c.xpMin) return c;
    }
    return null; // já é Lenda da A.T.L.A.S.
}

/**
 * Retorna o progresso em % para o próximo cargo.
 */
export function getProgressoCargo(xp) {
    const atual = getCargoByXp(xp);
    const proximo = getProximoCargo(xp);
    if (!proximo) return 100; // max level

    const xpNoNivel = xp - atual.xpMin;
    const xpNecessario = proximo.xpMin - atual.xpMin;
    return Math.floor((xpNoNivel / xpNecessario) * 100);
}

/**
 * Retorna os dados de um cargo pelo nível exato.
 */
export function getCargoByNivel(nivel) {
    return CARGOS.find(c => c.nivel === nivel) || CARGOS[0];
}

