import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  constructor() {
    super();
    this.$use(async (params, next) => {
      if (params.model === 'products' && ['findMany', 'findUnique', 'create', 'update'].includes(params.action)) {
        const result = await next(params);
        
        const computeBuyPrice = async (product) => {
          const ingredients = await this.product_ingredients.findMany({
            where: { product_id: product.id },
            include: { ingredient: true },
          });

          const buyPrice = ingredients.reduce((total, item) => {
            return total + (item.ingredient.sold_price * item.quantity) / 1000;
          }, 0);

          return { ...product, buy_price: buyPrice };
        };

        if (Array.isArray(result)) {
          return await Promise.all(result.map(computeBuyPrice));
        } else {
          return await computeBuyPrice(result);
        }
      }
      return next(params);
    });
  }
}