-- AlterTable
ALTER TABLE "groceries" ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "unit" DROP NOT NULL;