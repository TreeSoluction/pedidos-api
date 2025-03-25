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
        purchase_price: 40.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Churras Burger',
        purchase_price: 24.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Doritos',
        purchase_price: 22.99,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Catubom',
        purchase_price: 35.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Brabinho',
        purchase_price: 22.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Picles Burguer',
        purchase_price: 26.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Rib Burguer',
        purchase_price: 34.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Bacon Burguer',
        purchase_price: 25.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Cheese Burguer',
        purchase_price: 23.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Cup Burguer',
        purchase_price: 33.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Artesanal" } }))?.id
      },
      {
        name: 'Hamburguer',
        purchase_price: 10.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'Misto',
        purchase_price: 9.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Burguer',
        purchase_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Salada',
        purchase_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Egg',
        purchase_price: 14.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Egg Bacon',
        purchase_price: 15.50,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Bacon',
        purchase_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Tudo',
        purchase_price: 18.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'X-Tudo Duplo',
        purchase_price: 24.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Tradicional" } }))?.id
      },
      {
        name: 'Batata Rib',
        purchase_price: 18.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Batata Cheddar',
        purchase_price: 16.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Aneis De Cebola',
        purchase_price: 15.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Porcoes" } }))?.id
      },
      {
        name: 'Coca Cola 2L',
        purchase_price: 14.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Guarana 2L',
        purchase_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Coca Cola 1.5L',
        purchase_price: 12.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Coca Lata',
        purchase_price: 7.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Maracuja',
        purchase_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Graviola',
        purchase_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Morango',
        purchase_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Abacaxi',
        purchase_price: 0.00,
        category_id: (await prisma.category.findFirstOrThrow({ where: { name: "Bebidas" } }))?.id
      },
      {
        name: 'Suco / Acacaxi C/ Hortela',
        purchase_price: 0.00,
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
