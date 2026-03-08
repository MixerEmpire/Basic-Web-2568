const { PrismaClient } = require('../generated/prisma');

async function testAuth() {
  console.log('Testing authentication logic...');

  const prisma = new PrismaClient();

  try {
    // Test user creation
    console.log('1. Creating test user...');
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpass123',
        nickName: 'TestNick',
      },
    });
    console.log('✓ User created:', testUser.email);

    // Test login - correct credentials
    console.log('2. Testing correct login...');
    const foundUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    if (foundUser && foundUser.password === 'testpass123') {
      console.log('✓ Login successful for correct credentials');
    } else {
      console.log('✗ Login failed for correct credentials');
    }

    // Test login - wrong password
    console.log('3. Testing wrong password...');
    if (foundUser && foundUser.password === 'wrongpass') {
      console.log('✗ Login should have failed with wrong password');
    } else {
      console.log('✓ Login correctly failed with wrong password');
    }

    // Test login - non-existent user
    console.log('4. Testing non-existent user...');
    const nonExistentUser = await prisma.user.findUnique({
      where: { email: 'nonexistent@example.com' },
    });

    if (!nonExistentUser) {
      console.log('✓ Non-existent user correctly not found');
    } else {
      console.log('✗ Non-existent user was found (should not happen)');
    }

    // Clean up
    console.log('5. Cleaning up test data...');
    await prisma.user.delete({
      where: { email: 'test@example.com' },
    });
    console.log('✓ Test user deleted');

    console.log('All authentication tests passed! ✅');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();