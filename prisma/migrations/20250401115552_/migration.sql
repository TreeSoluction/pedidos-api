-- AlterTable
ALTER TABLE "categories" RENAME CONSTRAINT "category_pkey" TO "categories_pkey";

-- AlterTable
ALTER TABLE "ingredients" RENAME CONSTRAINT "ingredient_pkey" TO "ingredients_pkey";

-- AlterTable
ALTER TABLE "order_items" RENAME CONSTRAINT "order_item_pkey" TO "order_items_pkey";

-- AlterTable
ALTER TABLE "orders" RENAME CONSTRAINT "order_pkey" TO "orders_pkey";

-- AlterTable
ALTER TABLE "products" RENAME CONSTRAINT "product_pkey" TO "products_pkey";

-- RenameForeignKey
ALTER TABLE "order_items" RENAME CONSTRAINT "order_item_order_id_fkey" TO "order_items_order_id_fkey";

-- RenameForeignKey
ALTER TABLE "order_items" RENAME CONSTRAINT "order_item_product_id_fkey" TO "order_items_product_id_fkey";

-- RenameForeignKey
ALTER TABLE "products" RENAME CONSTRAINT "product_category_id_fkey" TO "products_category_id_fkey";
