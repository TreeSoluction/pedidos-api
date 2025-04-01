-- DropForeignKey
ALTER TABLE "product_ingredients" DROP CONSTRAINT "product_ingredients_product_id_fkey";

-- AddForeignKey
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
