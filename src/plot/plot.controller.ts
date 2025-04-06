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
interface DailyProfit {
  day: number;
  total_cost: number;
  total_sold: number;
}
@Controller('plots')
export class PlotController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get('weeksold/trending-products')
  async getTrendingProducts() {
    const now = new Date();

    const startOfThisWeek = new Date(now);
    startOfThisWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
    startOfThisWeek.setUTCHours(3, 0, 0, 0);

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setUTCDate(startOfThisWeek.getUTCDate() + 6);
    endOfThisWeek.setUTCHours(26, 59, 59, 999);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setUTCDate(startOfThisWeek.getUTCDate() - 7);

    const endOfLastWeek = new Date(endOfThisWeek);
    endOfLastWeek.setUTCDate(endOfThisWeek.getUTCDate() - 7);

    const itemsThisWeek = await this.prismaService.order_items.findMany({
      where: {
        createdAt: {
          gte: startOfThisWeek,
          lte: endOfThisWeek,
        },
      },
      include: { product: true },
    });

    const productCountThisWeek = new Map();
    for (const item of itemsThisWeek) {
      if (item.product) {
        const name = item.product.name;
        productCountThisWeek.set(
          name,
          (productCountThisWeek.get(name) || 0) + 1,
        );
      }
    }

    const topProducts = Array.from(productCountThisWeek.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const itemsLastWeek = await this.prismaService.order_items.findMany({
      where: {
        createdAt: {
          gte: startOfLastWeek,
          lte: endOfLastWeek,
        },
        product: { name: { in: topProducts } },
      },
      include: { product: true },
    });

    const productCountLastWeek = new Map();
    for (const item of itemsLastWeek) {
      if (item.product) {
        const name = item.product.name;
        productCountLastWeek.set(
          name,
          (productCountLastWeek.get(name) || 0) + 1,
        );
      }
    }

    return topProducts.map((name) => ({
      name,
      thisWeek: productCountThisWeek.get(name) || 0,
      lastWeek: productCountLastWeek.get(name) || 0,
    }));
  }

  @Get('weekprofit')
  async getWeeklyProfit(): Promise<DailyProfit[]> {
    const now = new Date();
    const weeklyProfit: DailyProfit[] = [];

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);

      const startOfDay = new Date(currentDay);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDay);
      endOfDay.setHours(23, 59, 59, 999);

      const items = await this.prismaService.order_items.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
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

  @Get('daysold/product')
  async getDayProduct() {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setUTCHours(3, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(26, 59);

    const items = await this.prismaService.order_items.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { product: true },
    });

    const productCountMap = new Map();

    for (const item of items) {
      if (item.product) {
        const productName = item.product.name;
        productCountMap.set(
          productName,
          (productCountMap.get(productName) || 0) + 1,
        );
      }
    }

    return Array.from(productCountMap, ([name, count]) => ({ name, count }));
  }

  @Get('weeksold/product')
  async getWeekProduct() {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
    startOfWeek.setUTCHours(3, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
    endOfWeek.setUTCHours(26, 59);

    const items = await this.prismaService.order_items.findMany({
      where: {
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      include: { product: true },
    });

    const productCountMap = new Map();

    for (const item of items) {
      if (item.product) {
        const productName = item.product.name;
        productCountMap.set(
          productName,
          (productCountMap.get(productName) || 0) + 1,
        );
      }
    }

    return Array.from(productCountMap, ([name, count]) => ({ name, count }));
  }

  @Get('weeksold')
  async getWeek() {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfWeekBRT = new Date(startOfWeek);
    startOfWeekBRT.setHours(startOfWeekBRT.getHours() + 3);

    const endOfWeekBRT = new Date(endOfWeek);
    endOfWeekBRT.setHours(endOfWeekBRT.getHours() + 3);

    const weeklyCount = await this.prismaService.orders.count({
      where: {
        createdAt: {
          gte: startOfWeekBRT,
          lte: endOfWeekBRT,
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
    const now = new Date();

    const startOfDayBRT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0
    );
    startOfDayBRT.setHours(startOfDayBRT.getHours() - 3);

    const endOfDayBRT = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23, 59, 59
    );
    endOfDayBRT.setHours(endOfDayBRT.getHours() - 3);

    const totalCount = await this.prismaService.orders.count({
      where: {
        createdAt: {
          gte: startOfDayBRT,
          lte: endOfDayBRT,
        },
      },
    })

    return {
      goal: 20,
      reach: totalCount
    }
  }
}
