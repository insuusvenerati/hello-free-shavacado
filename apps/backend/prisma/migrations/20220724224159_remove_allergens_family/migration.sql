/*
  Warnings:

  - You are about to drop the column `familyId` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the `allergen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `family` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ingredient" DROP COLUMN "familyId";

-- DropTable
DROP TABLE "allergen";

-- DropTable
DROP TABLE "family";
