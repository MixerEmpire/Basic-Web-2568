// Direct Prisma client test to seed data
const path = require('path');
const appDir = path.join(__dirname, '..');

const { PrismaClient } = require(path.join(appDir, 'generated/prisma'));

(async () => {
  const prisma = new PrismaClient();
  try {
    console.log('[Seed] Connecting to database...');
    
    // Check existing data
    const count = await prisma.topUpHistory.count();
    console.log(`[Seed] Current records: ${count}`);

    // Delete old test data (optional)
    // await prisma.topUpHistory.deleteMany({ where: { userId: 1 } });

    // Create test records
    const result = await prisma.topUpHistory.create({
      data: {
        userId: 1,
        game: 'MOBILE LEGENDS',
        amount: 5000,
        currency: 'THB',
        method: 'online-banking',
        status: 'SUCCESS',
        reference: `test-${Date.now()}`,
      },
    });

    console.log('[Seed] Created record:', result);

    // Verify it's there
    const allRecords = await prisma.topUpHistory.findMany({ where: { userId: 1 } });
    console.log(`[Seed] Total records for userId=1: ${allRecords.length}`);
    allRecords.forEach(r => {
      console.log(`  - ID: ${r.id}, Amount: ${r.amount}, Status: ${r.status}`);
    });

  } catch (e) {
    console.error('[Seed] Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
})();
