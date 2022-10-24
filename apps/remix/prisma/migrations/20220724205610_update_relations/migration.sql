/*
  Warnings:

  - Added the required column `familyId` to the `ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_id_fkey";

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "familyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
