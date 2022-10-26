/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `ImportedRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
