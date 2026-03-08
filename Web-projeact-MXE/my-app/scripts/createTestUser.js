const { PrismaClient } = require('../generated/prisma');

(async () => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.create({
      data: { email: 'tester@example.com', password: 'secret' },
    });
    console.log('CREATED_USER:' + JSON.stringify(user));
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
