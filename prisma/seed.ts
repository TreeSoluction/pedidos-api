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
  await prisma.products.createMany({
    data: [
      {
        name: 'Brabo Burger',
        buy_price: 40.0,
        sold_price: 40.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Churras Burger',
        buy_price: 24.0,
        sold_price: 24.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Doritos',
        buy_price: 22.99,
        sold_price: 22.99,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Catubom',
        buy_price: 35.5,
        sold_price: 35.5,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Brabinho',
        buy_price: 22.0,
        sold_price: 22.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Picles Burguer',
        buy_price: 26.0,
        sold_price: 26.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Rib Burguer',
        buy_price: 34.0,
        sold_price: 34.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Bacon Burguer',
        buy_price: 25.0,
        sold_price: 25.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Cheese Burguer',
        buy_price: 23.0,
        sold_price: 23.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Cup Burguer',
        buy_price: 33.0,
        sold_price: 33.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Artesanal' },
          })
        )?.id,
      },
      {
        name: 'Hamburguer',
        buy_price: 10.0,
        sold_price: 10.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'Misto',
        buy_price: 9.0,
        sold_price: 9.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Burguer',
        buy_price: 12.0,
        sold_price: 12.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Salada',
        buy_price: 14.0,
        sold_price: 14.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Egg',
        buy_price: 14.5,
        sold_price: 14.5,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Egg Bacon',
        buy_price: 15.5,
        sold_price: 15.5,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Bacon',
        buy_price: 14.0,
        sold_price: 14.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Tudo',
        buy_price: 18.0,
        sold_price: 18.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'X-Tudo Duplo',
        buy_price: 24.0,
        sold_price: 24.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Tradicional' },
          })
        )?.id,
      },
      {
        name: 'Batata Rib',
        buy_price: 18.0,
        sold_price: 18.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Porcoes' },
          })
        )?.id,
      },
      {
        name: 'Batata Cheddar',
        buy_price: 16.0,
        sold_price: 16.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Porcoes' },
          })
        )?.id,
      },
      {
        name: 'Aneis De Cebola',
        buy_price: 15.0,
        sold_price: 15.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Porcoes' },
          })
        )?.id,
      },
      {
        name: 'Coca Cola 2L',
        buy_price: 14.0,
        sold_price: 14.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Guarana 2L',
        buy_price: 12.0,
        sold_price: 12.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Coca Cola 1.5L',
        buy_price: 12.0,
        sold_price: 12.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Coca Lata',
        buy_price: 7.0,
        sold_price: 7.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Suco / Maracuja',
        buy_price: 0.0,
        sold_price: 0.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Suco / Graviola',
        buy_price: 0.0,
        sold_price: 0.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Suco / Morango',
        buy_price: 0.0,
        sold_price: 0.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Suco / Abacaxi',
        buy_price: 0.0,
        sold_price: 0.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
      },
      {
        name: 'Suco / Acacaxi C/ Hortela',
        buy_price: 0.0,
        sold_price: 0.0,
        category_id: (
          await prisma.categories.findFirstOrThrow({
            where: { name: 'Bebidas' },
          })
        )?.id,
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
