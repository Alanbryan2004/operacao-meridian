const fs = require('fs');

const cidadesText = fs.readFileSync('c:/Users/alanb/Projetos/operacao-meridian/frontend/src/game/Cidades.js', 'utf8');
const destRoutesText = fs.readFileSync('c:/Users/alanb/Projetos/operacao-meridian/frontend/src/game/DestRoutes.js', 'utf8');
const casoText = fs.readFileSync('c:/Users/alanb/Projetos/operacao-meridian/frontend/src/pages/Caso.jsx', 'utf8');

const requests = {
    // S1
    "Londres": ["Dubai", "Paris", "Roma", "Seul", "Tóquio", "Bangcoc", "Lisboa", "Madrid"],
    "Dubai": ["Mumbai", "Cairo", "Istambul", "Roma", "Trípoli", "Paris"],
    "Mumbai": ["Bangcoc", "Tóquio", "Seul", "Dubai", "Istambul", "Cairo", "Nova Delhi", "Singapura"],
    "Bangcoc": ["Pequim", "Dubai", "Roma", "Mumbai", "Seul", "Tóquio"],
    "Pequim": ["Seul", "Tóquio", "Istambul", "Hong Kong", "Bangcoc"],
    "Seul": ["Tóquio", "Pequim", "Bangcoc", "Mumbai"],
    "Tóquio": ["Vancouver", "Toronto", "Nova York", "Bangcoc", "Mumbai", "Dubai", "Seul", "Pequim"],
    "Vancouver": ["Roma", "Paris", "Lisboa", "Nova York", "Toronto"],
    "Roma": ["Berlim", "Madrid", "Viena", "Paris", "Lisboa", "São Paulo", "Rio de Janeiro", "Buenos Aires", "Londres"],
    "Cairo": ["Dubai", "Istambul", "Paris", "Trípoli", "Roma", "Madrid"],
    "Istambul": ["Roma", "Paris", "Berlim", "Lisboa"],
    "Paris": ["Trípoli", "Cairo", "Dubai", "Toronto", "Vancouver", "Nova York", "Viena", "Berlim", "Roma"],
    "Trípoli": ["Madrid", "Roma", "Lisboa"],
    "Madrid": ["São Paulo", "Buenos Aires", "Lisboa", "Roma", "Paris", "Berlim"],
    "São Paulo": ["Rio de Janeiro", "Salvador", "Buenos Aires", "Dubai", "Cairo", "Istambul"],
    "Rio de Janeiro": ["Buenos Aires", "São Paulo", "Santiago", "Lisboa"],
    "Buenos Aires": ["Madrid", "Lisboa", "Roma", "São Paulo", "Rio de Janeiro"],
    "Toronto": ["Roma", "Paris", "Madrid"],
    "Lisboa": ["Rio de Janeiro", "São Paulo", "Buenos Aires", "Zurich", "Viena", "Berlim", "Madrid", "Paris", "Londres"],
    "Viena": ["Berlim", "Paris", "Roma"],
    "Berlim": ["Amsterdã", "Paris", "Madrid"],
    "Amsterdã": ["Roma", "Paris", "Lisboa"],
    "Zurich": ["Dubai", "Istambul", "Roma", "Viena", "Paris"]
};

let missingOrigins = [];
let missingDests = [];
let missingRoutes = [];

Object.keys(requests).forEach(origin => {
    const rxOrigin = new RegExp(`"${origin}"\\s*:\\s*{`, 'i');
    if (!casoText.match(rxOrigin)) missingOrigins.push(origin);
    
    requests[origin].forEach(d => {
        const rxd = new RegExp(`"${d}"\\s*:\\s*{`, 'i');
        if (!casoText.match(rxd)) missingDests.push(d);
        
        const routeRx = new RegExp(`cidade:\\s*"${d}"[\\s\\S]*?origem:\\s*"${origin}"|origem:\\s*"${origin}"[\\s\\S]*?cidade:\\s*"${d}"`, 'g');
        if (!destRoutesText.match(routeRx)) {
            missingRoutes.push(`${origin} -> ${d}`);
        }
    });
});

console.log("Missing Origins (Caso.jsx):", missingOrigins);
console.log("Missing Dests (Caso.jsx):", [...new Set(missingDests)]);
console.log("Missing Routes (DestRoutes.js):", missingRoutes);
