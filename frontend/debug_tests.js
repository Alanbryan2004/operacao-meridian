const { execSync } = require('child_process');

try {
    // Run vitest with JSON output 
    const output = execSync('npx vitest run src/test/WrongCityValidation.test.jsx --reporter=json', { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
    console.log("All tests passed unexpectedly.");
} catch (error) {
    if (error.stdout) {
        try {
            const data = JSON.parse(error.stdout);
            const fails = data.testResults[0].assertionResults.filter(a => a.status === 'failed');
            fails.forEach(f => {
                console.log(`\nFAIL: ${f.title}`);
                console.log(f.failureMessages[0]);
            });
        } catch (e) {
            console.log("Error parsing JSON:");
            console.log(error.stdout.slice(-1000));
        }
    } else {
        console.log("Execution failed without stdout:", error.message);
    }
}
