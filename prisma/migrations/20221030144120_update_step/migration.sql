-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Step" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caption" TEXT,
    "index" INTEGER NOT NULL,
    "image" TEXT,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT NOT NULL,
    "instructionsMarkdown" TEXT NOT NULL,
    "recipeId" TEXT,
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("caption", "createdAt", "id", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "caption", "createdAt", "id", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
