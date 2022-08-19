/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `allergen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "allergen" DROP CONSTRAINT "allergen_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_familyId_fkey";

-- AlterTable
ALTER TABLE "allergen" DROP COLUMN "ingredientId";

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "allergens" JSONB[],
ADD COLUMN     "family" JSONB;
