import { describe, it, expect } from 'vitest';
import { CASO_1_SCENARIOS } from '../Caso1Scenarios';
import { CASO_2_SCENARIOS } from '../Caso2Scenarios';
import { CASO_3_SCENARIOS } from '../Caso3Scenarios';
// C004-C008: Migrados para geração procedural, não testados aqui
import { Caso9Scenarios } from '../Caso9Scenarios';
import { DESTINATION_OPTIONS } from '../DestRoutes';

const ALL_SCENARIOS = [
    ...CASO_1_SCENARIOS,
    ...CASO_2_SCENARIOS,
    ...CASO_3_SCENARIOS,
    ...Caso9Scenarios
];

describe('Scenario Configuration Validation', () => {
    ALL_SCENARIOS.forEach((scenario) => {
        describe(`Scenario: ${scenario.id}`, () => {
            it('should have exactly 3 travel options for each city in the route (except final)', () => {
                const citiesToTravelFrom = scenario.route.slice(0, -1);
                
                citiesToTravelFrom.forEach(city => {
                    const options = scenario.travelTable[city];
                    expect(options, `City "${city}" in travelTable for scenario ${scenario.id} should exist`).toBeDefined();
                    expect(options.length, `City "${city}" in scenario ${scenario.id} should have exactly 3 travel options`).toBe(3);
                });
            });

            it('should have exactly 3 investigation points (interrogatorios) for each city in the route', () => {
                const cityCounts = {};
                scenario.route.forEach(city => {
                    cityCounts[city] = (cityCounts[city] || 0) + 1;
                });

                Object.entries(cityCounts).forEach(([city, count]) => {
                    const interrogatoriesInCity = scenario.interrogatorios.filter(i => i.cidade === city);
                    expect(interrogatoriesInCity.length, `City "${city}" in scenario ${scenario.id} should have exactly ${3 * count} interrogation points`).toBe(3 * count);
                });
            });

            it('should ensure all travel options exist in global DESTINATION_OPTIONS', () => {
                Object.entries(scenario.travelTable).forEach(([origin, destinations]) => {
                    if (destinations.length === 0) return; // finalCity has no outgoing routes
                    destinations.forEach(dest => {
                        const exists = DESTINATION_OPTIONS.some(opt => opt.origem === origin && opt.cidade === dest);
                        expect(exists, `Travel route from "${origin}" to "${dest}" in scenario ${scenario.id} must be defined in DESTINATION_OPTIONS in Caso.jsx`).toBe(true);
                    });
                });
            });

            it('should ensure travel options are unique for each city in travelTable', () => {
                Object.entries(scenario.travelTable).forEach(([origin, destinations]) => {
                    if (destinations.length === 0) return; // finalCity has no outgoing routes
                    const uniqueDestinations = new Set(destinations);
                    expect(uniqueDestinations.size, `Scenario ${scenario.id}: City "${origin}" has duplicate travel options in travelTable`).toBe(destinations.length);
                    
                    // Also check if filtering from global leads to exactly 3 unique results
                    const globalOptions = DESTINATION_OPTIONS.filter(d => d.origem === origin && destinations.includes(d.cidade));
                    const uniqueGlobalCities = new Set(globalOptions.map(o => o.cidade));
                    expect(uniqueGlobalCities.size, `Scenario ${scenario.id}: City "${origin}" results in ${uniqueGlobalCities.size} unique options instead of 3 due to duplicates in DESTINATION_OPTIONS`).toBe(3);
                });
            });

            it('should ensure the route is logically consistent (each city connects to the next)', () => {
                for (let i = 0; i < scenario.route.length - 1; i++) {
                    const currentCity = scenario.route[i];
                    const nextCity = scenario.route[i + 1];
                    const options = scenario.travelTable[currentCity];
                    expect(options, `Scenario ${scenario.id}: travelTable[${currentCity}] must contain the next city in route: ${nextCity}`).toContain(nextCity);
                }
            });

            it('should NOT have finalCity as a wrong travel option in early stages (anti-early-completion)', () => {
                const { finalCity, route, travelTable } = scenario;

                // Detectar cenários de loop: cidades que aparecem mais de uma vez na rota
                const cityOccurrences = {};
                route.forEach(city => { cityOccurrences[city] = (cityOccurrences[city] || 0) + 1; });
                const loopCities = Object.keys(cityOccurrences).filter(c => cityOccurrences[c] > 1);

                for (let i = 0; i < route.length - 1; i++) {
                    const currentCity = route[i];
                    const correctNext = route[i + 1];
                    const options = travelTable[currentCity] || [];

                    // Pular cidades de loop: o travelTable é compartilhado entre as visitas,
                    // e a proteção hasMissionProgressed em Caso.jsx impede a conclusão prematura.
                    if (loopCities.includes(currentCity)) continue;
                    
                    // Se a próxima cidade correta NÃO é a finalCity,
                    // então a finalCity NÃO deve estar nas opções desta etapa
                    if (correctNext !== finalCity) {
                        const wrongOptions = options.filter(opt => opt !== correctNext);
                        const hasFinalAsWrong = wrongOptions.includes(finalCity);
                        expect(hasFinalAsWrong, 
                            `Scenario ${scenario.id}: finalCity "${finalCity}" should NOT be a wrong travel option at city "${currentCity}" (stage ${i + 1}). ` +
                            `This would cause early mission completion! Options: [${options.join(', ')}]`
                        ).toBe(false);
                    }
                }
            });

            it('should have the penultimate route city leading to finalCity', () => {
                const { finalCity, route, travelTable } = scenario;
                // A penúltima cidade da rota DEVE ter a finalCity como opção
                const penultimateCity = route[route.length - 2];
                const options = travelTable[penultimateCity] || [];
                expect(options,
                    `Scenario ${scenario.id}: penultimate city "${penultimateCity}" must have finalCity "${finalCity}" in its travelTable`
                ).toContain(finalCity);
            });
        });
    });
});
