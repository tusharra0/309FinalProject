const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({ select: { id: true, utorid: true, email: true, role: true } });
    console.log('\n--- USERS ---');
    console.log(JSON.stringify(users, null, 2));
  } catch (e) {
    console.error('Error fetching users:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
