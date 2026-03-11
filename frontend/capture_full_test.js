const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log("Running MissionFlow tests...");
    const output = execSync('npm run test:run src/game/__tests__/MissionFlow.test.jsx', { 
        encoding: 'utf8',
        env: { ...process.env, CI: 'true' }
    });
    console.log(output);
} catch (e) {
    console.log("TEST FAILED. Full Output:");
    console.log(e.stdout);
    console.log(e.stderr);
    fs.writeFileSync('full_test_output.txt', e.stdout + "\n" + e.stderr);
}
