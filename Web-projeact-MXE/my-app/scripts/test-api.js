const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        console.log(`${path}:`);
        console.log(`  Status: ${res.statusCode}`);
        console.log(`  Data:`, data.substring(0, 500));
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`Error on ${path}:`, err.message);
      reject(err);
    });

    req.end();
  });
}

(async () => {
  try {
    console.log('Testing TopUp API...\n');
    await makeRequest('/api/topup?userId=1&limit=50');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
})();
