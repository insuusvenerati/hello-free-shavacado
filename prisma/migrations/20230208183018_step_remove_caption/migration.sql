/*
  Warnings:

  - You are about to drop the column `caption` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Step` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT,
    "instructionsMarkdown" TEXT,
    "recipeId" TEXT NOT NULL,

    PRIMARY KEY ("recipeId", "index"),
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("createdAt", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "createdAt", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
