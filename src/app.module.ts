import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ProductModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
