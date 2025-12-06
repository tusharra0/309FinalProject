(async () => {
  try {
    const base = 'http://localhost:3000';
    const creds = { utorid: 'alexjohn', password: 'Password123!' };

    console.log('Logging in as', creds.utorid);
    const loginRes = await fetch(base + '/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    });
    console.log('login status', loginRes.status);
    const loginBody = await loginRes.json();
    console.log('login body snippet:', JSON.stringify(loginBody).slice(0, 200));
    if (!loginBody.token) {
      console.error('No token returned, aborting');
      process.exit(1);
    }
    const token = loginBody.token;

    const auth = { Authorization: 'Bearer ' + token };

    // Check user transactions with sorting by createdAt desc
    console.log('\nChecking /users/me/transactions sorted by createdAt desc');
    const txRes1 = await fetch(base + '/users/me/transactions?page=1&limit=10&orderBy=createdAt&order=desc', { headers: auth });
    console.log('status', txRes1.status);
    const txBody1 = await txRes1.json();
    console.log('transactions count (server):', txBody1.count ?? (txBody1.results?.length));
    const txs1 = txBody1.results || txBody1.records || txBody1.transactions || [];
    console.log('first txs:', txs1.slice(0,3));

    // Check user transactions sorted by pointsDelta asc
    console.log('\nChecking /users/me/transactions sorted by pointsDelta asc');
    const txRes2 = await fetch(base + '/users/me/transactions?page=1&limit=10&orderBy=pointsDelta&order=asc', { headers: auth });
    console.log('status', txRes2.status);
    const txBody2 = await txRes2.json();
    const txs2 = txBody2.results || txBody2.records || txBody2.transactions || [];
    console.log('first txs by amount:', txs2.slice(0,3));

    // Quick heuristic: compare first two amounts to verify ordering if available
    const amt = (t) => t.pointsDelta ?? t.amount ?? t.sent ?? t.awarded ?? 0;
    if (txs2.length >= 2) {
      console.log('amounts first two (asc):', amt(txs2[0]), amt(txs2[1]));
    }

    // List events (regular user should only see published/active)
    console.log('\nChecking /events for regular user');
    const evRes = await fetch(base + '/events?page=1&limit=10&orderBy=startTime&order=asc', { headers: auth });
    console.log('status', evRes.status);
    const evBody = await evRes.json();
    console.log('events count (server):', evBody.count ?? evBody.results?.length);
    const evs = evBody.results || evBody.events || [];
    console.log('first events:', evs.slice(0,3));

    // List promotions (regular user should only see active ones)
    console.log('\nChecking /promotions for regular user');
    const prRes = await fetch(base + '/promotions?page=1&limit=10&orderBy=startTime&order=asc', { headers: auth });
    console.log('status', prRes.status);
    const prBody = await prRes.json();
    console.log('promotions count (server):', prBody.count ?? prBody.results?.length);
    const prs = prBody.results || prBody.promotions || [];
    console.log('first promotions:', prs.slice(0,3));

    console.log('\nDone');
    process.exit(0);
  } catch (e) {
    console.error('Test script error', e);
    process.exit(1);
  }
})();
