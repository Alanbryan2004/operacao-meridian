const { execSync } = require('child_process');
const fs = require('fs');

try {
    execSync('npx vitest run src/test/WrongCityValidation.test.jsx --reporter=json', {encoding: 'utf8', stdio: ['pipe','pipe','ignore']});
} catch(e) {
    try {
        const data = JSON.parse(e.stdout);
        const fails = data.testResults[0].assertionResults.filter(a=>a.status==='failed');
        let out = "";
        fails.forEach(f => {
            out += 'FAIL: ' + f.title + '\n';
            out += f.failureMessages.join('\n') + '\n\n';
        });
        fs.writeFileSync('test_errors.txt', out);
    } catch(err) {
        fs.writeFileSync('test_errors.txt', "JSON parse error: " + err.message);
    }
}
