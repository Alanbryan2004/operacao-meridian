const fs = require('fs');
try {
    const content = fs.readFileSync('test_results.json', 'utf8');
    const results = JSON.parse(content);
    let report = '';
    if (results.testResults) {
        results.testResults.forEach(tr => {
            if (tr.assertionResults) {
                tr.assertionResults.filter(r => r.status === 'failed').forEach(r => {
                    if (r.fullName.includes('ensure all travel options exist')) {
                        const msg = r.failureMessages[0];
                        const match = msg.match(/Travel route from "(.*?)" to "(.*?)"/);
                        if (match) {
                            report += `MISSING ROUTE: ${match[1]} -> ${match[2]}\n`;
                        } else {
                            report += `FAIL ROUTE: ${r.fullName} - ${msg.substring(0, 100)}\n`;
                        }
                    } else {
                        report += `FAIL OTHER: ${r.fullName} - ${r.failureMessages[0].split('\n')[0]}\n`;
                    }
                });
            }
        });
    }
    fs.writeFileSync('missing_report.txt', report);
} catch (e) {
    fs.writeFileSync('missing_report.txt', 'ERROR: ' + e.stack);
}
