/*
  Warnings:

  - The `allergens` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `family` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "allergens",
ADD COLUMN     "allergens" JSONB[],
DROP COLUMN "family",
ADD COLUMN     "family" JSONB NOT NULL;
