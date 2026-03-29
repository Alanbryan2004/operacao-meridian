const { Caso10Scenarios } = require('./src/game/Caso10Scenarios.js');
const { DESTINATION_OPTIONS } = require('./src/game/DestRoutes.js');
const { ORIGIN_COORDS } = require('./src/pages/Caso.jsx');

Caso10Scenarios.forEach(scene => {
    Object.entries(scene.travelTable).forEach(([origin, dests]) => {
        if (origin !== scene.finalCity && !ORIGIN_COORDS[origin]) {
            console.log(`[Missing Origin Coord] ${origin}`);
        }
        dests.forEach(d => {
            if (!ORIGIN_COORDS[d]) console.log(`[Missing Dest Coord] ${d}`);
            const hasRoute = DESTINATION_OPTIONS.find(r => r.origem === origin && r.cidade === d);
            if (!hasRoute) console.log(`[Missing Route] ${origin} -> ${d}`);
        });
        
    });
});
