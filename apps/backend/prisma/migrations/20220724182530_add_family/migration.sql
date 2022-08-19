/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ingredient";

-- CreateTable
CREATE TABLE "family" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "type" TEXT,
    "description" TEXT,
    "priority" INTEGER,
    "iconLink" TEXT,
    "iconPath" TEXT,
    "usageByCountry" JSONB,
    "uuid" TEXT,
    "name" TEXT,
    "slug" TEXT,

    CONSTRAINT "family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "country" TEXT,
    "type" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "internal_name" TEXT,
    "shipped" BOOLEAN,
    "image_link" TEXT,
    "image_path" TEXT,
    "usage" INTEGER,
    "hasDuplicatedName" BOOLEAN,
    "allergens" JSONB[],
    "uuid" TEXT,
    "name" TEXT,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_id_fkey" FOREIGN KEY ("id") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
