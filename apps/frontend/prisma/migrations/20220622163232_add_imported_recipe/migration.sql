/*
  Warnings:

  - You are about to drop the `groceries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groceries" DROP CONSTRAINT "groceries_recipe_id_fkey";

-- DropTable
DROP TABLE "groceries";

-- DropTable
DROP TABLE "recipes";

-- CreateTable
CREATE TABLE "recipe" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "name" TEXT,
    "image_path" TEXT,
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "slug" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grocery" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ingredient" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "unit" TEXT,
    "image_path" TEXT,
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "user_id" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "grocery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipe" (
    "id" TEXT NOT NULL DEFAULT fn_ksuid(),
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cook_time" TEXT NOT NULL,
    "prep_time" TEXT NOT NULL,
    "total_time" TEXT NOT NULL,
    "yield" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "categories" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_slug_key" ON "recipe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_uuid_key" ON "recipe"("uuid");

-- AddForeignKey
ALTER TABLE "grocery" ADD CONSTRAINT "grocery_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
