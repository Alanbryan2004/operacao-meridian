
import { CIDADES } from './src/game/Cidades.js';
import { DESTINATION_OPTIONS, ORIGIN_COORDS } from './src/game/DestRoutes.js';

const allCities = CIDADES.map(c => c.cidade);
const originCities = [...new Set(DESTINATION_OPTIONS.map(d => d.origem))];
const destCities = [...new Set(DESTINATION_OPTIONS.map(d => d.cidade))];
const coordCities = Object.keys(ORIGIN_COORDS);

console.log("Cities total:", allCities.length);

const missingAsOrigin = allCities.filter(c => !originCities.includes(c));
const missingAsDest = allCities.filter(c => !destCities.includes(c));
const missingCoords = allCities.filter(c => !coordCities.includes(c));

console.log("\nMissing as Origin:", missingAsOrigin);
console.log("\nMissing as Destination:", missingAsDest);
console.log("\nMissing Coordinates:", missingCoords);
