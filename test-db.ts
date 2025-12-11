import { prisma } from './src/lib/prisma'

async function testDatabase() {
  try {
    console.log('🔌 Testing database connection...')
    
    // Test 1: Simple query to verify connection
    const userCount = await prisma.user.count()
    console.log(`✅ Database connected! Current user count: ${userCount}`)
    
    // Test 2: Create a test user
    console.log('\n📝 Creating test user...')
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
      },
    })
    console.log('✅ Test user created:', testUser)
    
    // Test 3: Query the user back
    console.log('\n🔍 Querying test user...')
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    })
    console.log('✅ User found:', foundUser)
    
    // Test 4: List all users
    console.log('\n📋 Listing all users...')
    const allUsers = await prisma.user.findMany()
    console.log(`✅ Found ${allUsers.length} user(s):`, allUsers)
    
    console.log('\n🎉 All tests passed! Database is working correctly.')
  } catch (error) {
    console.error('❌ Database test failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()

