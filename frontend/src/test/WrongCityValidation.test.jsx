import * as Caso1 from "../game/Caso1Scenarios";
import * as Caso2 from "../game/Caso2Scenarios";
import * as Caso3 from "../game/Caso3Scenarios";
import * as Caso4 from "../game/Caso4Scenarios";
import * as Caso5 from "../game/Caso5Scenarios";
import * as Caso6 from "../game/Caso6Scenarios";
import * as Caso7 from "../game/Caso7Scenarios";
import * as Caso8 from "../game/Caso8Scenarios";
import * as Caso9 from "../game/Caso9Scenarios";

import { CIDADES } from "../game/Cidades";

// Todas as cidades válidas do jogo a partir da fonte real
const ALL_CITIES = CIDADES.map(c => c.cidade);

// Campos obrigatórios para cada NPC/interrogatório
const REQUIRED_NPC_FIELDS = ["id", "cidade", "local", "personagem", "imgLocal", "imgPersonagem", "pista"];

// Extract scenarios dynamically to avoid strict naming issues
function extractScenarios(module) {
    for (const key in module) {
        if (Array.isArray(module[key])) return module[key];
    }
    return [];
}

const ALL_SCENARIOS = [
    ...extractScenarios(Caso1),
    ...extractScenarios(Caso2),
    ...extractScenarios(Caso3),
    ...extractScenarios(Caso4),
    ...extractScenarios(Caso5),
    ...extractScenarios(Caso6),
    ...extractScenarios(Caso7),
    ...extractScenarios(Caso8),
    ...extractScenarios(Caso9),
];

describe("Validação de NPCs por Cidade", () => {
    ALL_SCENARIOS.forEach((scenario) => {
        describe(`Cenário ${scenario.id}`, () => {
            // Pega todas as cidades da rota (onde o jogador DEVE ir)
            const routeCities = scenario.route || [];

            it("cada cidade da rota deve ter pelo menos 3 NPCs com todos os campos obrigatórios", () => {
                routeCities.forEach((city) => {
                    const npcs = (scenario.interrogatorios || []).filter(
                        (npc) => npc.cidade === city
                    );

                    expect(
                        npcs.length,
                        `Cidade "${city}" no cenário ${scenario.id} tem ${npcs.length} NPCs (mínimo: 3)`
                    ).toBeGreaterThanOrEqual(3);

                    npcs.forEach((npc) => {
                        REQUIRED_NPC_FIELDS.forEach((field) => {
                            expect(
                                npc[field],
                                `NPC ${npc.id} na cidade "${city}" está sem o campo "${field}"`
                            ).toBeDefined();
                            expect(
                                npc[field],
                                `NPC ${npc.id} na cidade "${city}" tem campo "${field}" vazio`
                            ).not.toBe("");
                        });
                    });
                });
            });

            it("NPCs de cada cidade da rota devem ter personagem definido (prevenir crash toUpperCase)", () => {
                routeCities.forEach((city) => {
                    const npcs = (scenario.interrogatorios || []).filter(
                        (npc) => npc.cidade === city
                    );
                    npcs.forEach((npc) => {
                        expect(
                            typeof npc.personagem,
                            `NPC ${npc.id} na cidade "${city}" não tem personagem do tipo string`
                        ).toBe("string");
                        // Garante que personagem.toUpperCase() não crashe
                        expect(() => npc.personagem.toUpperCase()).not.toThrow();
                    });
                });
            });
        });
    });
});

describe("Validação de Opções de Viagem (travelTable)", () => {
    ALL_SCENARIOS.forEach((scenario) => {
        describe(`Cenário ${scenario.id}`, () => {
            const travelTable = scenario.travelTable || {};
            const routeCities = scenario.route || [];

            it("cada cidade da rota (exceto a última) deve ter exatamente 3 destinos na travelTable", () => {
                routeCities.forEach((city, index) => {
                    // A última cidade da rota é o destino final, não precisa de travelTable
                    if (index === routeCities.length - 1) return;

                    const destinations = travelTable[city];
                    expect(
                        destinations,
                        `Cidade "${city}" no cenário ${scenario.id} não tem entrada na travelTable`
                    ).toBeDefined();

                    expect(
                        destinations.length,
                        `Cidade "${city}" no cenário ${scenario.id} tem ${destinations?.length} destinos na travelTable (esperado: 3)`
                    ).toBe(3);
                });
            });

            it("a próxima cidade da rota deve estar entre os destinos de viagem", () => {
                routeCities.forEach((city, index) => {
                    if (index === routeCities.length - 1) return;

                    const nextCity = routeCities[index + 1];
                    const destinations = travelTable[city] || [];

                    expect(
                        destinations.includes(nextCity),
                        `Cidade "${city}" no cenário ${scenario.id}: a próxima rota "${nextCity}" NÃO está nos destinos [${destinations.join(", ")}]`
                    ).toBe(true);
                });
            });

            it("cidades erradas (fora do travelTable) NÃO devem ter entrada na travelTable", () => {
                // Para cada cidade que NÃO está na travelTable, confirma que viajando para lá
                // o jogador não teria acesso a todas as rotas globais
                const wrongCities = ALL_CITIES.filter(
                    (c) => !routeCities.includes(c) && c !== "Campinas"
                );

                wrongCities.forEach((wrongCity) => {
                    expect(
                        travelTable[wrongCity],
                        `Cidade errada "${wrongCity}" no cenário ${scenario.id} tem entrada na travelTable (não deveria)`
                    ).toBeUndefined();
                });
            });

            it("todos os destinos na travelTable devem ser cidades válidas do jogo", () => {
                Object.entries(travelTable).forEach(([origin, destinations]) => {
                    destinations.forEach((dest) => {
                        expect(
                            ALL_CITIES.includes(dest),
                            `Destino "${dest}" do "${origin}" no cenário ${scenario.id} NÃO é uma cidade válida`
                        ).toBe(true);
                    });
                });
            });
        });
    });
});

describe("Fallback NPC para cidades erradas (lógica no Caso.jsx)", () => {
    // Simula a mesma lógica de fallback do Caso.jsx
    function getLocalInterrogatorios(scenario, currentCity) {
        const source = scenario?.interrogatorios || [];
        const matches = source.filter((loc) => loc.cidade === currentCity);
        if (matches.length === 0 && currentCity) {
            return [
                { id: `FALLBACK_1_${currentCity}`, cidade: currentCity, local: "Táxi", personagem: "Taxista", imgLocal: "/NPC/Taxi.png", imgPersonagem: "/NPC/Taxista.png", pista: "Não vi nenhum suspeito por aqui." },
                { id: `FALLBACK_2_${currentCity}`, cidade: currentCity, local: "Restaurante", personagem: "Garçom", imgLocal: "/NPC/Restaurante.png", imgPersonagem: "/NPC/Garcon.png", pista: "Ninguém estranho passou por aqui." },
                { id: `FALLBACK_3_${currentCity}`, cidade: currentCity, local: "Banco", personagem: "Banqueiro", imgLocal: "/NPC/Banco.png", imgPersonagem: "/NPC/Banqueiro.png", pista: "Nenhuma transação suspeita registrada." },
            ];
        }
        return matches;
    }

    it("deve gerar exatamente 3 NPCs genéricos para cidades fora da rota", () => {
        const scenario = extractScenarios(Caso1)[0]; // Cenário 1
        const wrongCities = ["Madrid", "Viena", "Istambul", "Dubai"];

        wrongCities.forEach((wrongCity) => {
            // Só testar se NÃO é uma cidade da rota do cenário
            if (scenario.route?.includes(wrongCity)) return;

            const npcs = getLocalInterrogatorios(scenario, wrongCity);
            expect(npcs.length, `Cidade errada "${wrongCity}" deve ter 3 NPCs fallback`).toBe(3);

            npcs.forEach((npc) => {
                REQUIRED_NPC_FIELDS.forEach((field) => {
                    expect(
                        npc[field],
                        `Fallback NPC em "${wrongCity}" está sem o campo "${field}"`
                    ).toBeDefined();
                    expect(
                        typeof npc.personagem,
                        `Fallback NPC em "${wrongCity}" tem personagem que não é string`
                    ).toBe("string");
                    // Garante que não crashe
                    expect(() => npc.personagem.toUpperCase()).not.toThrow();
                });
            });
        });
    });

    it("cidades da rota devem ter NPCs reais (não fallback)", () => {
        const scenario = extractScenarios(Caso1)[0]; // Cenário 1
        scenario.route.forEach((city) => {
            const npcs = getLocalInterrogatorios(scenario, city);
            expect(npcs.length, `Cidade da rota "${city}" deve ter NPCs reais`).toBeGreaterThanOrEqual(3);
            // Nenhum deve ser fallback
            npcs.forEach((npc) => {
                expect(npc.id.startsWith("FALLBACK_")).toBe(false);
            });
        });
    });
});
