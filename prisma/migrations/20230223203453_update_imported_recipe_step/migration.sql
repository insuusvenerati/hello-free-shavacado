/*
  Warnings:

  - The primary key for the `ImportedRecipeStep` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImportedRecipeStep" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "caption" TEXT,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "index"),
    CONSTRAINT "ImportedRecipeStep_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeStep" ("caption", "createdAt", "importedRecipeId", "index", "updatedAt") SELECT "caption", "createdAt", "importedRecipeId", "index", "updatedAt" FROM "ImportedRecipeStep";
DROP TABLE "ImportedRecipeStep";
ALTER TABLE "new_ImportedRecipeStep" RENAME TO "ImportedRecipeStep";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
