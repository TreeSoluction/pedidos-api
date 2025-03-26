-- Rename and add columns in order_item table
ALTER TABLE "order_item"
RENAME COLUMN "price" TO "buy_price";

ALTER TABLE "order_item"
ADD COLUMN "sold_price" DOUBLE PRECISION NOT NULL;

-- Rename and add columns in product table
ALTER TABLE "product"
RENAME COLUMN "buy_price" TO "sold_price";

ALTER TABLE "product"
RENAME COLUMN "purchase_price" TO "buy_price";
