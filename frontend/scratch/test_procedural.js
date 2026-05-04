import { generateProceduralScenario } from './src/game/ProceduralGenerator.js';
import { casesSeed } from './src/game/seed.js';

// Mock Case
const caseDificil = casesSeed.find(c => c.dificuldade === "DIFICIL");

if (caseDificil) {
    console.log("Testing DIFICIL generation...");
    const scenario = generateProceduralScenario(caseDificil);
    console.log("Stage Count:", scenario.route.length);
    console.log("Suspect Tip Schedule:", JSON.stringify(scenario.suspectTipSchedule, null, 2));
    
    const stagesWithTips = scenario.suspectTipSchedule.map(s => s.stage + 1);
    console.log("Stages with tips (1-indexed):", stagesWithTips);
    
    if (scenario.route.length === 10 && JSON.stringify(stagesWithTips) === "[2,4,6,9]") {
        console.log("SUCCESS: Logic is correct.");
    } else {
        console.log("FAILURE: Logic mismatch.");
    }
} else {
    console.log("No DIFICIL case found in seed.");
}
