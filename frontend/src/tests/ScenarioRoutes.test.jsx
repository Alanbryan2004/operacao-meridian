import { expect, test, describe } from 'vitest';
import { Caso9Scenarios } from '../game/Caso9Scenarios';
import { DESTINATION_OPTIONS } from '../game/DestRoutes';
import { ORIGIN_COORDS } from '../pages/Caso';

describe('Case 9 Scenario Routes Consistency', () => {
  Caso9Scenarios.forEach((scenario, sIdx) => {
    describe(`Scenario ${sIdx + 1}: ${scenario.id}`, () => {
      Object.entries(scenario.travelTable).forEach(([origin, destinations]) => {
        test(`Origin "${origin}" has valid connections and coordinates`, () => {
          // 1. Check if origin has coordinates (required for travel line)
          if (origin !== scenario.finalCity) {
             expect(ORIGIN_COORDS[origin], `City "${origin}" missing in ORIGIN_COORDS`).toBeDefined();
          }

          // 2. Check if each destination in travelTable exists in DESTINATION_OPTIONS for this origin
          destinations.forEach(dest => {
            const hasRoute = DESTINATION_OPTIONS.some(route => 
              route.origem === origin && route.cidade === dest
            );
            
            expect(hasRoute, `Route from "${origin}" to "${dest}" missing in DESTINATION_OPTIONS`).toBe(true);
            
            // 3. Check if destination also has coordinates
            expect(ORIGIN_COORDS[dest], `Destination city "${dest}" missing in ORIGIN_COORDS`).toBeDefined();
          });
        });
      });

      test(`Route sequence is valid and each step exists in travelTable`, () => {
        for (let i = 0; i < scenario.route.length - 1; i++) {
          const current = scenario.route[i];
          const next = scenario.route[i + 1];
          const options = scenario.travelTable[current] || [];
          expect(options, `Travel options for "${current}" in scenario ${scenario.id} should include next city "${next}"`).toContain(next);
        }
      });
    });
  });
});
