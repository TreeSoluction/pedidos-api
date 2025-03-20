/*
  Warnings:

  - Added the required column `productId` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
