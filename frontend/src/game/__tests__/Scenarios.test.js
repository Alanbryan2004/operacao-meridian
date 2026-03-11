import { describe, it, expect } from 'vitest';
import { CASO_1_SCENARIOS } from '../Caso1Scenarios';
import { CASO_2_SCENARIOS } from '../Caso2Scenarios';
import { CASO_3_SCENARIOS } from '../Caso3Scenarios';
import { CASO_4_SCENARIOS } from '../Caso4Scenarios';
import { DESTINATION_OPTIONS } from '../../pages/Caso';

const ALL_SCENARIOS = [
    ...CASO_1_SCENARIOS,
    ...CASO_2_SCENARIOS,
    ...CASO_3_SCENARIOS,
    ...CASO_4_SCENARIOS
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
                    destinations.forEach(dest => {
                        const exists = DESTINATION_OPTIONS.some(opt => opt.origem === origin && opt.cidade === dest);
                        expect(exists, `Travel route from "${origin}" to "${dest}" in scenario ${scenario.id} must be defined in DESTINATION_OPTIONS in Caso.jsx`).toBe(true);
                    });
                });
            });

            it('should ensure travel options are unique for each city in travelTable', () => {
                Object.entries(scenario.travelTable).forEach(([origin, destinations]) => {
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
        });
    });
});
