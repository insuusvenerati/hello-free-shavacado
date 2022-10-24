-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_familyId_fkey";

-- AlterTable
ALTER TABLE "ingredient" ALTER COLUMN "familyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE SET NULL ON UPDATE CASCADE;
