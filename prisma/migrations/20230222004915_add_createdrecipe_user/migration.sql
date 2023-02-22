/*
  Warnings:

  - Added the required column `userId` to the `CreatedRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreatedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CreatedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreatedRecipe" ("createdAt", "description", "difficulty", "id", "ingredients", "name", "steps", "updatedAt") SELECT "createdAt", "description", "difficulty", "id", "ingredients", "name", "steps", "updatedAt" FROM "CreatedRecipe";
DROP TABLE "CreatedRecipe";
ALTER TABLE "new_CreatedRecipe" RENAME TO "CreatedRecipe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
