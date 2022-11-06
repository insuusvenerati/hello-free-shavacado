/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `importedRecipeId` on the `Cuisine` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `ImportedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ImportedRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `importedRecipeId` on the `Step` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Image";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ImportedRecipeCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT,
    CONSTRAINT "ImportedRecipeCategory_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportedRecipeCuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT,
    CONSTRAINT "ImportedRecipeCuisine_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportedRecipeIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT,
    CONSTRAINT "ImportedRecipeIngredient_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportedRecipeStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "importedRecipeId" TEXT,
    CONSTRAINT "ImportedRecipeStep_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT,
    CONSTRAINT "Cuisine_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cuisine" ("createdAt", "iconPath", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "recipeId", "updatedAt" FROM "Cuisine";
DROP TABLE "Cuisine";
ALTER TABLE "new_Cuisine" RENAME TO "Cuisine";
CREATE TABLE "new_ImportedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "cookTime" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "totalTime" TEXT,
    "recipeYield" TEXT NOT NULL,
    "cookTimeOriginalFormat" TEXT,
    "prepTimeOriginalFormat" TEXT,
    "totalTimeOriginalFormat" TEXT,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "keywordsId" TEXT,
    CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ImportedRecipe_keywordsId_fkey" FOREIGN KEY ("keywordsId") REFERENCES "Keywords" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipe" ("cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "keywordsId", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId") SELECT "cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "keywordsId", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId" FROM "ImportedRecipe";
DROP TABLE "ImportedRecipe";
ALTER TABLE "new_ImportedRecipe" RENAME TO "ImportedRecipe";
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "stepRecipeId" TEXT,
    "stepIndex" INTEGER,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_stepRecipeId_stepIndex_fkey" FOREIGN KEY ("stepRecipeId", "stepIndex") REFERENCES "Step" ("recipeId", "index") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT
);
INSERT INTO "new_Category" ("createdAt", "iconPath", "id", "name", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Step" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caption" TEXT,
    "index" INTEGER NOT NULL,
    "image" TEXT,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT,
    "instructionsMarkdown" TEXT,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "index"),
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");
