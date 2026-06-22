import { registerCapture } from './src/game/store.js';

let state = {
    capturedSuspects: {
        "026": 1,
        "001": 2
    }
};

const newState = registerCapture(state, "034");
console.log(newState);
