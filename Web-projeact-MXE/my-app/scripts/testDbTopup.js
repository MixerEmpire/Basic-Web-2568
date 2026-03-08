const { PrismaClient } = require('../generated/prisma');

(async () => {
  const prisma = new PrismaClient();
  try {
    console.log('=== Testing TopUp System ===\n');
    
    // Test 1: Create a topup record
    console.log('1. Creating topup record for userId=1...');
    const created = await prisma.topUpHistory.create({
      data: { 
        userId: 1, 
        amount: 500, 
        currency: 'THB', 
        method: 'online-banking',
        status: 'SUCCESS',
        reference: `test-${Date.now()}`
      },
    });
    console.log('✓ Created:', JSON.stringify(created, null, 2));

    // Test 2: Fetch all topups for user
    console.log('\n2. Fetching all topups for userId=1...');
    const list = await prisma.topUpHistory.findMany({ 
      where: { userId: 1 }, 
      orderBy: { createdAt: 'desc' }, 
      take: 10 
    });
    console.log(`✓ Found ${list.length} records:`);
    list.forEach((record, i) => {
      console.log(`  ${i+1}. Amount: ${record.amount} ${record.currency}, Status: ${record.status}, Date: ${record.createdAt}`);
    });

    // Test 3: Fetch with specific status
    console.log('\n3. Fetching successful topups...');
    const successful = await prisma.topUpHistory.findMany({
      where: { userId: 1, status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' }
    });
    console.log(`✓ Found ${successful.length} successful transactions`);

    console.log('\n=== All tests passed! ===');
  } catch (e) {
    console.error('ERROR:', e.message || e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
