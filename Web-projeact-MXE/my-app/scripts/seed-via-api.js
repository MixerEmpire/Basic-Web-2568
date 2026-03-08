const http = require('http');

function makePostRequest(path, data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': jsonData.length,
      },
    };

    const req = http.request(options, (res) => {
      let response = '';
      res.on('data', (chunk) => (response += chunk));
      res.on('end', () => {
        console.log(`POST ${path}:`);
        console.log(`  Status: ${res.statusCode}`);
        console.log(`  Response:`, response.substring(0, 300));
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`Error on POST ${path}:`, err.message);
      reject(err);
    });

    req.write(jsonData);
    req.end();
  });
}

async function seedData() {
  const records = [
    { userId: 1, amount: 5000, currency: 'THB', method: 'online-banking', status: 'SUCCESS', reference: 'seed-001' },
    { userId: 1, amount: 1000, currency: 'THB', method: 'creditcard', status: 'SUCCESS', reference: 'seed-002' },
    { userId: 1, amount: 2500, currency: 'THB', method: 'mobile-banking', status: 'PENDING', reference: 'seed-003' },
  ];

  for (const record of records) {
    await makePostRequest('/api/topup', record);
    await new Promise(r => setTimeout(r, 500)); // wait 500ms between requests
  }
}

seedData().then(() => {
  console.log('\n✓ Seeding complete');
  process.exit(0);
}).catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
