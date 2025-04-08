import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderModule } from './order/order.module';
import { PlotModule } from './plot/plot.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    OrderModule,
    PlotModule,
    IngredientModule,
    ExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
