import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Brabo Burger',
        purchase_price: 40.00,
        category: "Artesanal"
      },
      {
        name: 'Churras Burger',
        purchase_price: 24.00,
        category: "Artesanal"
      },
      {
        name: 'Doritos',
        purchase_price: 22.99,
        category: "Artesanal"
      },
      {
        name: 'Catubom',
        purchase_price: 35.50,
        category: "Artesanal"
      },
      {
        name: 'Brabinho',
        purchase_price: 22.00,
        category: "Artesanal"
      },
      {
        name: 'Picles Burguer',
        purchase_price: 26.00,
        category: "Artesanal"
      },
      {
        name: 'Rib Burguer',
        purchase_price: 34.00,
        category: "Artesanal"
      },
      {
        name: 'Bacon Burguer',
        purchase_price: 25.00,
        category: "Artesanal"
      },
      {
        name: 'Cheese Burguer',
        purchase_price: 23.00,
        category: "Artesanal"
      },
      {
        name: 'Cup Burguer',
        purchase_price: 33.00,
        category: "Artesanal"
      },
      {
        name: 'Hamburguer',
        purchase_price: 10.00,
        category: "Tradicional"
      },
      {
        name: 'Misto',
        purchase_price: 9.00,
        category: "Tradicional"
      },
      {
        name: 'X-Burguer',
        purchase_price: 12.00,
        category: "Tradicional"
      },
      {
        name: 'X-Salada',
        purchase_price: 14.00,
        category: "Tradicional"
      },
      {
        name: 'X-Egg',
        purchase_price: 14.50,
        category: "Tradicional"
      },
      {
        name: 'X-Egg Bacon',
        purchase_price: 15.50,
        category: "Tradicional"
      },
      {
        name: 'X-Bacon',
        purchase_price: 14.00,
        category: "Tradicional"
      },
      {
        name: 'X-Tudo',
        purchase_price: 18.00,
        category: "Tradicional"
      },
      {
        name: 'X-Tudo Duplo',
        purchase_price: 24.00,
        category: "Tradicional"
      },
      {
        name: 'Batata Rib',
        purchase_price: 18.00,
        category: "Porcoes"
      },
      {
        name: 'Batata Cheddar',
        purchase_price: 16.00,
        category: "Porcoes"
      },
      {
        name: 'Aneis De Cebola',
        purchase_price: 15.00,
        category: "Porcoes"
      },
      {
        name: 'Coca Cola 2L',
        purchase_price: 14.00,
        category: "Bebidas"
      },
      {
        name: 'Guarana 2L',
        purchase_price: 12.00,
        category: "Bebidas"
      },
      {
        name: 'Coca Cola 1.5L',
        purchase_price: 12.00,
        category: "Bebidas"
      },
      {
        name: 'Coca Lata',
        purchase_price: 7.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Maracuja',
        purchase_price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Graviola',
        purchase_price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Morango',
        purchase_price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Abacaxi',
        purchase_price: 0.00,
        category: "Bebidas"
      },
      {
        name: 'Suco / Acacaxi C/ Hortela',
        purchase_price: 0.00,
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
