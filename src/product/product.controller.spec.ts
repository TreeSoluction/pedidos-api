import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { connect } from 'http2';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.category.create({ data: { name: 'Teste' } });
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const productData: Prisma.productCreateInput = {
      name: 'Test Product',
      sold_price: 100.0,
      buy_price: 120.0,
      category: {
        connect: { id: (await prisma.category.findFirstOrThrow()).id },
      },
    };

    const createdProduct = await service.create(productData);
    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct.name).toBe(productData.name);
    expect(createdProduct.sold_price).toBe(productData.sold_price);
    expect(createdProduct.buy_price).toBe(productData.buy_price);
  });

  it('should retrieve all products', async () => {
    const products = await service.findAll();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should retrieve one product by ID', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Findable Product',
        sold_price: 80.0,
        buy_price: 100.0,
        category: {
          connect: { id: (await prisma.category.findFirstOrThrow()).id },
        },
      },
    });

    const foundProduct = await service.findOne(product.id);
    if (foundProduct == null) fail();
    expect(foundProduct).toHaveProperty('id');
    expect(foundProduct.id).toBe(product.id);
    expect(foundProduct.name).toBe('Findable Product');
  });

  it('should update a product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Product to Update',
        sold_price: 90.0,
        buy_price: 110.0,
        category: {
          connect: { id: (await prisma.category.findFirstOrThrow()).id },
        },
      },
    });

    const updatedData: Prisma.productUpdateInput = {
      name: 'Updated Product',
      sold_price: 95.0,
      buy_price: 115.0,
    };

    const updatedProduct = await service.update(product.id, updatedData);
    expect(updatedProduct.name).toBe('Updated Product');
    expect(updatedProduct.sold_price).toBe(95.0);
    expect(updatedProduct.buy_price).toBe(115.0);
  });

  it('should delete a product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Product to Delete',
        sold_price: 60.0,
        buy_price: 80.0,
        category: {
          connect: { id: (await prisma.category.findFirstOrThrow()).id },
        },
      },
    });

    const deletedProduct = await service.remove(product.id);
    expect(deletedProduct.id).toBe(product.id);

    const foundProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });
    expect(foundProduct).toBeNull();
  });
});
