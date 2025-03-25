// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { order, Prisma } from '@prisma/client';

// @Injectable()
// export class OrderService {
//   constructor(private prisma: PrismaService) { }

//   async create(data: Prisma.orderCreateInput): Promise<order> {
//     const items = Array.isArray(data.items?.create) ? data.items.create : [];

//     const itemsWithPrices = await Promise.all(
//       items.map(async (item) => {
//         const product = await this.prisma.product.findUnique({
//           where: { id: item.product.connect.id },
//           select: { price: true }
//         });

//         if (!product) {
//           throw new Error(`Product with ID ${item.productId} not found`);
//         }

//         return {
//           productId: item.product.connect.id,
//           price: product.price,
//           observation: item.observation
//         };
//       })
//     );

//     return this.prisma.order.create({
//       data: {
//         name: data.name,
//         address: data.address,
//         items: {
//           create: itemsWithPrices
//         }
//       },
//       include: {
//         items: {
//           include: { product: true } // Include product details in response
//         }
//       }
//     });
//   }

//   async findAll(): Promise<order[]> {
//     return this.prisma.order.findMany({ include: { items: true } });
//   }

//   async findOne(id: string): Promise<order | null> {
//     return this.prisma.order.findUnique({
//       where: { id },
//       include: { items: true },
//     });
//   }

//   async update(id: string, data: Prisma.orderUpdateInput): Promise<order> {
//     return this.prisma.order.update({ where: { id }, data });
//   }

//   async remove(id: string): Promise<order> {
//     return this.prisma.order.delete({ where: { id } });
//   }
// }
