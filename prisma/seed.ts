import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.categories.createMany({
    data: [
      {
        name: 'Artesanal',
      },
      {
        name: 'Tradicional',
      },
      { name: 'Porcoes' },
      {
        name: 'Bebidas',
      },
    ],
  });

  console.log('✅ productss seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
