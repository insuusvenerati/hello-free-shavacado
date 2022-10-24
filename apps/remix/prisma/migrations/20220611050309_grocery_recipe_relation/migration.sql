/*
  Warnings:

  - Added the required column `recipe_id` to the `groceries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groceries" ADD COLUMN     "recipe_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "groceries" ADD CONSTRAINT "groceries_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
