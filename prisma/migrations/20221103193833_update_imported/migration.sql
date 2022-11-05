/*
  Warnings:

  - You are about to drop the `Keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `keywordsId` on the `ImportedRecipe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Keywords_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Keywords";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ImportedRecipeKeyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT,
    CONSTRAINT "ImportedRecipeKeyword_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipe" ("cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId") SELECT "cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId" FROM "ImportedRecipe";
DROP TABLE "ImportedRecipe";
ALTER TABLE "new_ImportedRecipe" RENAME TO "ImportedRecipe";
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");
