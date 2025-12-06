(async () => {
  try {
    const base = 'http://localhost:3000';
    const loginRes = await (await import('node-fetch')).default(`${base}/auth/tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utorid: 'admin123', password: 'Password123!' })
    });
    const login = await loginRes.json();
    console.log('login status', loginRes.status);
    if (!login.token) {
      console.log('login body', login);
      process.exit(1);
    }
    const token = login.token;
    console.log('token:', token.slice(0, 20) + '...');

    const evRes = await (await import('node-fetch')).default(`${base}/events`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const evBody = await evRes.json();
    console.log('/events', evRes.status, 'count=', evBody.count || evBody.results?.length);

    const prRes = await (await import('node-fetch')).default(`${base}/promotions`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const prBody = await prRes.json();
    console.log('/promotions', prRes.status, 'count=', prBody.count || prBody.results?.length);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
