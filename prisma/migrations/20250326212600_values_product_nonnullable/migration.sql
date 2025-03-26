/*
  Warnings:

  - Made the column `buy_price` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sold_price` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "buy_price" SET NOT NULL,
ALTER COLUMN "buy_price" SET DEFAULT 0,
ALTER COLUMN "sold_price" SET NOT NULL,
ALTER COLUMN "sold_price" SET DEFAULT 0;
