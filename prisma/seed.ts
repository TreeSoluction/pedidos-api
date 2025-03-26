import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: 'Artesanal'
      },
      {
        name: 'Tradicional'
      },
      { name: 'Porcoes' },
      {
        name: 'Bebidas'
      }
    ],
  })
  await prisma.product.createMany({
    data: [
      {
        name: 'Brabo Burger',
        buy_price: 40.00,
        sold_price: 40.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Churras Burger',
        buy_price: 24.00,
        sold_price: 24.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Doritos',
        buy_price: 22.99,
        sold_price: 22.99,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Catubom',
        buy_price: 35.50,
        sold_price: 35.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Brabinho',
        buy_price: 22.00,
        sold_price: 22.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Picles Burguer',
        buy_price: 26.00,
        sold_price: 26.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Rib Burguer',
        buy_price: 34.00,
        sold_price: 34.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Bacon Burguer',
        buy_price: 25.00,
        sold_price: 25.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Cheese Burguer',
        buy_price: 23.00,
        sold_price: 23.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Cup Burguer',
        buy_price: 33.00,
        sold_price: 33.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Hamburguer',
        buy_price: 10.00,
        sold_price: 10.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'Misto',
        buy_price: 9.00,
        sold_price: 9.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Burguer',
        buy_price: 12.00,
        sold_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Salada',
        buy_price: 14.00,
        sold_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Egg',
        buy_price: 14.50,
        sold_price: 14.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Egg Bacon',
        buy_price: 15.50,
        sold_price: 15.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Bacon',
        buy_price: 14.00,
        sold_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Tudo',
        buy_price: 18.00,
        sold_price: 18.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Tudo Duplo',
        buy_price: 24.00,
        sold_price: 24.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'Batata Rib',
        buy_price: 18.00,
        sold_price: 18.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Batata Cheddar',
        buy_price: 16.00,
        sold_price: 16.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Aneis De Cebola',
        buy_price: 15.00,
        sold_price: 15.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Coca Cola 2L',
        buy_price: 14.00,
        sold_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Guarana 2L',
        buy_price: 12.00,
        sold_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Coca Cola 1.5L',
        buy_price: 12.00,
        sold_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Coca Lata',
        buy_price: 7.00,
        sold_price: 7.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Maracuja',
        buy_price: 0.00,
        sold_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Graviola',
        buy_price: 0.00,
        sold_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Morango',
        buy_price: 0.00,
        sold_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Abacaxi',
        buy_price: 0.00,
        sold_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Acacaxi C/ Hortela',
        buy_price: 0.00,
        sold_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
    ],
  });

  console.log('✅ Products seeded successfully!');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
