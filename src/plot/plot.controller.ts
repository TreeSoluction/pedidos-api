import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment-timezone';

interface DailyProfit {
  day: number;
  total_cost: number;
  total_sold: number;
}
@Controller('plots')
export class PlotController {
  constructor(private readonly prismaService: PrismaService) { }

  // @Get('weeksold/trending-products')
  // async getTrendingProducts() {
  //   const now = new Date();

  //   const startOfThisWeek = new Date(now);
  //   startOfThisWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
  //   startOfThisWeek.setUTCHours(3, 0, 0, 0);

  //   const endOfThisWeek = new Date(startOfThisWeek);
  //   endOfThisWeek.setUTCDate(startOfThisWeek.getUTCDate() + 6);
  //   endOfThisWeek.setUTCHours(26, 59, 59, 999);

  //   const startOfLastWeek = new Date(startOfThisWeek);
  //   startOfLastWeek.setUTCDate(startOfThisWeek.getUTCDate() - 7);

  //   const endOfLastWeek = new Date(endOfThisWeek);
  //   endOfLastWeek.setUTCDate(endOfThisWeek.getUTCDate() - 7);

  //   const itemsThisWeek = await this.prismaService.order_items.findMany({
  //     where: {
  //       createdAt: {
  //         gte: startOfThisWeek,
  //         lte: endOfThisWeek,
  //       },
  //     },
  //     include: { product: true },
  //   });

  //   const productCountThisWeek = new Map();
  //   for (const item of itemsThisWeek) {
  //     if (item.product) {
  //       const name = item.product.name;
  //       productCountThisWeek.set(
  //         name,
  //         (productCountThisWeek.get(name) || 0) + 1,
  //       );
  //     }
  //   }

  //   const topProducts = Array.from(productCountThisWeek.entries())
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 3)
  //     .map(([name]) => name);

  //   const itemsLastWeek = await this.prismaService.order_items.findMany({
  //     where: {
  //       createdAt: {
  //         gte: startOfLastWeek,
  //         lte: endOfLastWeek,
  //       },
  //       product: { name: { in: topProducts } },
  //     },
  //     include: { product: true },
  //   });

  //   const productCountLastWeek = new Map();
  //   for (const item of itemsLastWeek) {
  //     if (item.product) {
  //       const name = item.product.name;
  //       productCountLastWeek.set(
  //         name,
  //         (productCountLastWeek.get(name) || 0) + 1,
  //       );
  //     }
  //   }

  //   return topProducts.map((name) => ({
  //     name,
  //     thisWeek: productCountThisWeek.get(name) || 0,
  //     lastWeek: productCountLastWeek.get(name) || 0,
  //   }));
  // }

  @Get('weekprofit')
  async getWeeklyProfit(): Promise<DailyProfit[]> {
    const timezone = 'America/Sao_Paulo';
    const now = moment().tz(timezone);

    let startOfWeek = now.clone().startOf('week').add(1, 'day').startOf('day');
    if (now.day() === 0) {
      startOfWeek = now.clone().subtract(6, 'days').startOf('day');
    }

    const weeklyProfit: DailyProfit[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = startOfWeek.clone().add(i, 'days');
      const startOfDay = currentDay.clone().startOf('day');
      const endOfDay = currentDay.clone().endOf('day');

      const items = await this.prismaService.order_items.findMany({
        where: {
          createdAt: {
            gte: startOfDay.toDate(),
            lte: endOfDay.toDate(),
          },
        },
        include: { product: true },
      });

      let total_cost = 0;
      let total_sold = 0;

      items.forEach((element) => {
        total_sold += element.sold_price;
        total_cost += element.buy_price;
      });

      weeklyProfit.push({
        day: i,
        total_cost,
        total_sold,
      });
    }

    return weeklyProfit;
  }

  // @Get('daysold/product')
  // async getDayProduct() {
  //   const now = new Date();

  //   const startOfDay = new Date(now);
  //   startOfDay.setUTCHours(3, 0);

  //   const endOfDay = new Date(now);
  //   endOfDay.setHours(26, 59);

  //   const items = await this.prismaService.order_items.findMany({
  //     where: {
  //       createdAt: {
  //         gte: startOfDay,
  //         lte: endOfDay,
  //       },
  //     },
  //     include: { product: true },
  //   });

  //   const productCountMap = new Map();

  //   for (const item of items) {
  //     if (item.product) {
  //       const productName = item.product.name;
  //       productCountMap.set(
  //         productName,
  //         (productCountMap.get(productName) || 0) + 1,
  //       );
  //     }
  //   }

  //   return Array.from(productCountMap, ([name, count]) => ({ name, count }));
  // }

  // @Get('weeksold/product')
  // async getWeekProduct() {
  //   const now = new Date();

  //   const startOfWeek = new Date(now);
  //   startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
  //   startOfWeek.setUTCHours(3, 0);

  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  //   endOfWeek.setUTCHours(26, 59);

  //   const items = await this.prismaService.order_items.findMany({
  //     where: {
  //       createdAt: {
  //         gte: startOfWeek,
  //         lte: endOfWeek,
  //       },
  //     },
  //     include: { product: true },
  //   });

  //   const productCountMap = new Map();

  //   for (const item of items) {
  //     if (item.product) {
  //       const productName = item.product.name;
  //       productCountMap.set(
  //         productName,
  //         (productCountMap.get(productName) || 0) + 1,
  //       );
  //     }
  //   }

  //   return Array.from(productCountMap, ([name, count]) => ({ name, count }));
  // }

  @Get('weeksold')
  async getWeek() {
    const timezone = 'America/Sao_Paulo';

    const now = moment().tz(timezone);

    const startOfWeek = now.clone().startOf('week').add(1, 'day').startOf('day');
    if (now.day() === 0) {
      startOfWeek.subtract(7, 'days');
    }

    const endOfWeek = startOfWeek.clone().add(6, 'days').endOf('day');

    const weeklyCount = await this.prismaService.orders.count({
      where: {
        createdAt: {
          gte: startOfWeek.toDate(),
          lte: endOfWeek.toDate(),
        },
      },
    });

    return {
      goal: 200,
      reach: weeklyCount,
    };
  }

  @Get('diarysold')
  async getDay() {
    const timezone = 'America/Sao_Paulo';

    const now = moment().tz(timezone);
    const startOfDayBRT = now.clone().startOf('day').toDate();
    const endOfDayBRT = now.clone().endOf('day').toDate();

    const reach = await this.prismaService.orders.count({
      where: {
        createdAt: {
          gte: startOfDayBRT,
          lte: endOfDayBRT,
        },
      },
    });

    return {
      goal: 20,
      reach,
    };
  }
}
