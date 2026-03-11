const fs = require('fs');
const results = JSON.parse(fs.readFileSync('test_results.json', 'utf8'));
results.testResults.forEach(tr => {
    tr.assertionResults.filter(r => r.status === 'failed' && r.fullName.includes('ensure all travel options exist')).forEach(r => {
        const msg = r.failureMessages[0];
        const match = msg.match(/Travel route from \"(.*?)\" to \"(.*?)\"/);
        if (match) {
            console.log(`MISSING ROUTE: ${match[1]} -> ${match[2]}`);
        } else {
            console.log(`FAIL: ${r.fullName} - ${msg.substring(0, 100)}`);
        }
    });
});
