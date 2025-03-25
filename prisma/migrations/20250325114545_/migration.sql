/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "buy_price" DOUBLE PRECISION,
ADD COLUMN     "purchase_price" DOUBLE PRECISION;
