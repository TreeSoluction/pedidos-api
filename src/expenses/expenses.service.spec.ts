import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

describe('ExpensesController', () => {
  let controller: ExpensesController; // Fixed: Removed incorrect type
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [ExpensesService, PrismaService],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController); // Fixed: Correct controller initialization
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.expenses.deleteMany();
  });

  afterAll(async () => {
    await prisma.expenses.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('CRUD Operations', () => {
    it('should create an expense', async () => {
      const dto: Prisma.expensesCreateInput = {
        name: 'Test Expense',
        price: 100.50
      };

      const expense = await controller.create(dto);

      expect(expense).toHaveProperty('id');
      expect(expense.name).toBe(dto.name);
      expect(expense.price).toBe(dto.price);
      expect(expense.createdAt).toBeDefined();
      expect(expense.updatedAt).toBeDefined();
    });

    it('should find all expenses', async () => {
      // Create multiple test expenses
      const expensesData = [
        { name: 'Test Expense 1', price: 100.50 },
        { name: 'Test Expense 2', price: 200.75 }
      ];

      await Promise.all(
        expensesData.map(data => 
          prisma.expenses.create({ data })
        )
      );

      const expenses = await controller.findAll();
      
      expect(expenses.length).toBe(2);
      expect(expenses[0]).toHaveProperty('id');
      expect(expenses[1]).toHaveProperty('id');
    });

    it('should find one expense', async () => {
      const createdExpense = await prisma.expenses.create({
        data: {
          name: 'Test Expense',
          price: 150.25
        }
      });

      const foundExpense = await controller.findOne(createdExpense.id);
      
      if (foundExpense == null) fail('Expense should be found');
      
      expect(foundExpense.id).toBe(createdExpense.id);
      expect(foundExpense.name).toBe(createdExpense.name);
      expect(foundExpense.price).toBe(createdExpense.price);
    });

    it('should update an expense', async () => {
      const createdExpense = await prisma.expenses.create({
        data: {
          name: 'Initial Expense',
          price: 100.00
        }
      });

      const updateDto: Prisma.expensesUpdateInput = {
        name: 'Updated Expense',
        price: 150.00
      };

      const updatedExpense = await controller.update(
        createdExpense.id,
        updateDto
      );

      expect(updatedExpense.id).toBe(createdExpense.id);
      expect(updatedExpense.name).toBe(updateDto.name);
      expect(updatedExpense.price).toBe(updateDto.price);
      expect(updatedExpense.updatedAt).not.toBe(createdExpense.updatedAt);
    });

    it('should delete an expense', async () => {
      const createdExpense = await prisma.expenses.create({
        data: {
          name: 'Expense to Delete',
          price: 75.50
        }
      });

      await controller.remove(createdExpense.id);

      const deletedExpense = await prisma.expenses.findUnique({
        where: { id: createdExpense.id }
      });

      expect(deletedExpense).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when finding non-existent expense', async () => {
      const nonExistentId = 'non-existent-id';
      
      await expect(
        controller.findOne(nonExistentId)
      ).rejects.toThrow();
    });

    it('should throw error when updating non-existent expense', async () => {
      const nonExistentId = 'non-existent-id';
      const updateDto: Prisma.expensesUpdateInput = {
        name: 'Updated Name',
        price: 200
      };

      await expect(
        controller.update(nonExistentId, updateDto)
      ).rejects.toThrow();
    });

    it('should throw error when deleting non-existent expense', async () => {
      const nonExistentId = 'non-existent-id';

      await expect(
        controller.remove(nonExistentId)
      ).rejects.toThrow();
    });

    it('should throw error when creating expense with invalid data', async () => {
      const invalidDto = {
        name: '',
        price: -100
      };

      await expect(
        controller.create(invalidDto as Prisma.expensesCreateInput)
      ).rejects.toThrow();
    });
  });

  describe('Business Logic', () => {
    it('should maintain correct timestamps', async () => {
      const expense = await controller.create({
        name: 'Timestamp Test',
        price: 100
      });

      expect(expense.createdAt).toBeDefined();
      expect(expense.updatedAt).toBeDefined();
      expect(expense.createdAt).toBeInstanceOf(Date);
      expect(expense.updatedAt).toBeInstanceOf(Date);

      // Small delay to ensure timestamps are different
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedExpense = await controller.update(expense.id, { price: 150 });

      expect(updatedExpense.createdAt).toEqual(expense.createdAt);
      expect(updatedExpense.updatedAt).not.toEqual(expense.updatedAt);
    });

    it('should handle floating point prices correctly', async () => {
      const expense = await controller.create({
        name: 'Float Test',
        price: 100.99
      });

      expect(expense.price).toBe(100.99);
    });
  });
});