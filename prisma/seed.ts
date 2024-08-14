import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword: string = await bcrypt.hash('password123', 10);

  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      isAdmin: true,
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      isAdmin: false,
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: hashedPassword,
      isAdmin: false,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
