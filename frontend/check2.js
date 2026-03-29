const fs = require('fs');
let cidadesJS = fs.readFileSync('./src/game/Cidades.js', 'utf8').replace(/export const/g, 'const').replace(/export function[\s\S]*/, '');
let destRoutesJS = fs.readFileSync('./src/game/DestRoutes.js', 'utf8').replace(/export const/g, 'const');
let caso10JS = fs.readFileSync('./src/game/Caso10Scenarios.js', 'utf8').replace(/export const/g, 'const');
let casoJS = fs.readFileSync('./src/pages/Caso.jsx', 'utf8');
const match = casoJS.match(/export const ORIGIN_COORDS = ({[\s\S]*?});/);
const originCoordsStr = match[1];

eval(cidadesJS);
eval(destRoutesJS);
eval(caso10JS);
eval(`const ORIGIN_COORDS = ${originCoordsStr};`);

let errs = 0;
Caso10Scenarios.forEach(scene => {
    Object.entries(scene.travelTable).forEach(([origin, dests]) => {
        if (origin !== scene.finalCity && !ORIGIN_COORDS[origin]) {
            console.log(`[Missing Origin Coord] ${origin}`);
            errs++;
        }
        dests.forEach(d => {
            if (!ORIGIN_COORDS[d]) {
                console.log(`[Missing Dest Coord] ${d}`);
                errs++;
            }
            const hasRoute = DESTINATION_OPTIONS.find(r => r.origem === origin && r.cidade === d);
            if (!hasRoute) {
                console.log(`[Missing Route] ${origin} -> ${d}`);
                errs++;
            }
        });
    });
});
if (errs === 0) console.log("ALL TESTS PASS NATIVELY");
