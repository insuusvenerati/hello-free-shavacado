/*
  Warnings:

  - Added the required column `caption` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caption" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT NOT NULL,
    "instructionsMarkdown" TEXT NOT NULL,
    "recipeId" TEXT,
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("createdAt", "id", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "createdAt", "id", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
