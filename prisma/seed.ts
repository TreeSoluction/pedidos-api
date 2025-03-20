import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Brabo Burger',
        price: 40.00,
        category: "Artesanal"
      },
      {
        name: 'Churras Burger',
        price: 24.00,
        category: "Artesanal"
      },
      {
        name: 'Doritos',
        price: 22.99,
        category: "Artesanal"
      },
      {
        name: 'Catubom',
        price: 35.50,
        category: "Artesanal"
      },
      {
        name: 'Brabinho',
        price: 22.00,
        category: "Artesanal"
      },
      {
        name: 'Picles Burguer',
        price: 26.00,
        category: "Artesanal"
      },
      {
        name: 'Rib Burguer',
        price: 34.00,
        category: "Artesanal"
      },
      {
        name: 'Bacon Burguer',
        price: 25.00,
        category: "Artesanal"
      },
      {
        name: 'Cheese Burguer',
        price: 23.00,
        category: "Artesanal"
      },
      {
        name: 'Cup Burguer',
        price: 33.00,
        category: "Artesanal"
      },
      {
        name: 'Hamburguer',
        price: 10.00,
        category: "Tradicional"
      },
      {
        name: 'Misto',
        price: 9.00,
        category: "Tradicional"
      },
      {
        name: 'X-Burguer',
        price: 12.00,
        category: "Tradicional"
      },
      {
        name: 'X-Salada',
        price: 14.00,
        category: "Tradicional"
      },
      {
        name: 'X-Egg',
        price: 14.50,
        category: "Tradicional"
      },
      {
        name: 'X-Egg Bacon',
        price: 15.50,
        category: "Tradicional"
      },
      {
        name: 'X-Bacon',
        price: 14.00,
        category: "Tradicional"
      },
      {
        name: 'X-Tudo',
        price: 18.00,
        category: "Tradicional"
      },
      {
        name: 'X-Tudo Duplo',
        price: 24.00,
        category: "Tradicional"
      },
      {
        name: 'Batata Rib',
        price: 18.00,
        category: "Porcoes"
      },
      {
        name: 'Batata Cheddar',
        price: 16.00,
        category: "Porcoes"
      },
      {
        name: 'Aneis De Cebola',
        price: 15.00,
        category: "Porcoes"
      },
      {
        name: 'Coca Cola 2L',
        price: 14.00,
        category: "Bebidas"
      },
      {
        name: 'Guarana 2L',
        price: 12.00,
        category: "Bebidas"
      },
      {
        name: 'Coca Cola 1.5L',
        price: 12.00,
        category: "Bebidas"
      },
      {
        name: 'Coca Lata',
        price: 7.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Maracuja',
        price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Graviola',
        price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Morango',
        price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Abacaxi',
        price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Acacaxi C/ Hortela',
        price: 0.00,
        category: "Bebidas"
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
