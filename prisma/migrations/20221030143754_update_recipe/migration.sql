/*
  Warnings:

  - You are about to alter the column `amount` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT,
    "stepId" TEXT,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE TABLE "new_Nutrition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "recipeId" TEXT,
    CONSTRAINT "Nutrition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Nutrition" ("amount", "createdAt", "id", "name", "recipeId", "unit", "updatedAt") SELECT "amount", "createdAt", "id", "name", "recipeId", "unit", "updatedAt" FROM "Nutrition";
DROP TABLE "Nutrition";
ALTER TABLE "new_Nutrition" RENAME TO "Nutrition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
