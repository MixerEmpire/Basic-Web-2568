;(async () => {
  const bases = ['http://localhost:3001', 'http://localhost:3000'];
  for (const base of bases) {
    try {
      console.log('Trying', base);
      const postRes = await fetch(base + '/api/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, amount: 100 }),
      });
      const postJson = await postRes.text();
      console.log('POST', base, postRes.status, postJson);

      const getRes = await fetch(base + '/api/topup?userId=1&limit=10');
      const getJson = await getRes.text();
      console.log('GET', base, getRes.status, getJson);
      break;
    } catch (e) {
      console.error('Failed on', base, e.message || e);
    }
  }
})();
