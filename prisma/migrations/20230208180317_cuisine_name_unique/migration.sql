/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cuisine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cuisine_name_key" ON "Cuisine"("name");
