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
