import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Example: Create a user
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'example@example.com',
  //     name: 'Example User',
  //   },
  // })
  // console.log('Created user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

