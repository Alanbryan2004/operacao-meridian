
import { CIDADES } from './src/game/Cidades.js';
import { DESTINATION_OPTIONS } from './src/game/DestRoutes.js';
import { generateProceduralScenario } from './src/game/ProceduralGenerator.js';

// Mock suspectsSeed since it's imported from store.js which might have state/side-effects
const mockSuspects = [
    { nome: "Peão de Prata", sexo: "M", passatempo: "Polo", cabelo: "Azevinho", carro: "Conversível", acessorio: "Anel de Sinete" }
];

const caseObj = {
    id: "C039",
    titulo: "Rota Interrompida",
    dificuldade: "MEDIO",
    localInicial: { pais: "Marrocos", cidade: "Casablanca" }
};

try {
    const scenario = generateProceduralScenario(caseObj, mockSuspects);
    console.log("Scenario generated successfully!");
    console.log("Route:", scenario.route);
    console.log("Number of interrogatórios:", scenario.interrogatorios.length);
    if (scenario.route[0] === "Casablanca") {
        console.log("SUCCESS: Start city matches.");
    } else {
        console.log("FAILURE: Start city mismatch.");
    }
} catch (e) {
    console.error("Error generating scenario:", e);
}
