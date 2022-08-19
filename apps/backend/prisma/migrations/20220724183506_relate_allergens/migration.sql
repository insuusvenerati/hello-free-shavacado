/*
  Warnings:

  - You are about to drop the column `allergens` on the `ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "allergen" ADD COLUMN     "ingredientId" TEXT;

-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "allergens";

-- AddForeignKey
ALTER TABLE "allergen" ADD CONSTRAINT "allergen_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
