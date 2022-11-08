/*
  Warnings:

  - You are about to alter the column `amount` on the `Nutrition` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nutrition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "recipeId" TEXT,
    CONSTRAINT "Nutrition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Nutrition" ("amount", "createdAt", "id", "name", "recipeId", "unit", "updatedAt") SELECT "amount", "createdAt", "id", "name", "recipeId", "unit", "updatedAt" FROM "Nutrition";
DROP TABLE "Nutrition";
ALTER TABLE "new_Nutrition" RENAME TO "Nutrition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
