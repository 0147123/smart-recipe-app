/*
  Warnings:

  - A unique constraint covering the columns `[i_id,u_id]` on the table `ingredient_stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ingredient_stock_i_id_u_id_key" ON "ingredient_stock"("i_id", "u_id");
