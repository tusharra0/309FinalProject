const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({ select: { id: true, utorid: true, email: true, role: true } });
    console.log('\n--- USERS ---');
    users.forEach(u => console.log(`${u.utorid} (${u.role}) verified:${u.verified}`));
  } catch (e) {
    console.error('Error fetching users:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
