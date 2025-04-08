import { Injectable } from '@nestjs/common';
import { expenses, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) { }

  async create(createExpenseDto: Prisma.expensesCreateInput): Promise<expenses> {
    return await this.prisma.expenses.create({
      data: createExpenseDto
    });
  }

  async findAll(): Promise<expenses[]> {
    return this.prisma.expenses.findMany();
  }

  async findOne(id: string): Promise<expenses | null> {
    return this.prisma.expenses.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.expensesUpdateInput,
  ): Promise<expenses> {
    return this.prisma.expenses.update({
      where: { id },
      data
    });
  }

  async remove(id: string): Promise<expenses> {
    return this.prisma.expenses.delete({
      where: { id }
    });
  }
}