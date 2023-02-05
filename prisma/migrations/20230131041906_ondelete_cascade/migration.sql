-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImportedRecipeKeyword" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeKeyword_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeKeyword" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeKeyword";
DROP TABLE "ImportedRecipeKeyword";
ALTER TABLE "new_ImportedRecipeKeyword" RENAME TO "ImportedRecipeKeyword";
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");
CREATE TABLE "new_ImportedRecipeCuisine" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeCuisine_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeCuisine" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCuisine";
DROP TABLE "ImportedRecipeCuisine";
ALTER TABLE "new_ImportedRecipeCuisine" RENAME TO "ImportedRecipeCuisine";
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");
CREATE TABLE "new_ImportedRecipeStep" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "index" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "caption"),
    CONSTRAINT "ImportedRecipeStep_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeStep" ("caption", "createdAt", "importedRecipeId", "index", "updatedAt") SELECT "caption", "createdAt", "importedRecipeId", "index", "updatedAt" FROM "ImportedRecipeStep";
DROP TABLE "ImportedRecipeStep";
ALTER TABLE "new_ImportedRecipeStep" RENAME TO "ImportedRecipeStep";
CREATE UNIQUE INDEX "ImportedRecipeStep_caption_key" ON "ImportedRecipeStep"("caption");
CREATE TABLE "new_ImportedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "cookTime" TEXT,
    "prepTime" TEXT,
    "totalTime" TEXT,
    "recipeYield" TEXT NOT NULL,
    "cookTimeOriginalFormat" TEXT,
    "prepTimeOriginalFormat" TEXT,
    "totalTimeOriginalFormat" TEXT,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipe" ("cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId") SELECT "cookTime", "cookTimeOriginalFormat", "createdAt", "description", "id", "image", "name", "prepTime", "prepTimeOriginalFormat", "recipeYield", "totalTime", "totalTimeOriginalFormat", "updatedAt", "url", "userId" FROM "ImportedRecipe";
DROP TABLE "ImportedRecipe";
ALTER TABLE "new_ImportedRecipe" RENAME TO "ImportedRecipe";
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
CREATE TABLE "new_ImportedRecipeIngredient" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeIngredient_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeIngredient" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeIngredient";
DROP TABLE "ImportedRecipeIngredient";
ALTER TABLE "new_ImportedRecipeIngredient" RENAME TO "ImportedRecipeIngredient";
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");
CREATE TABLE "new_ImportedRecipeCategory" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL,

    PRIMARY KEY ("importedRecipeId", "name"),
    CONSTRAINT "ImportedRecipeCategory_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ImportedRecipeCategory" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCategory";
DROP TABLE "ImportedRecipeCategory";
ALTER TABLE "new_ImportedRecipeCategory" RENAME TO "ImportedRecipeCategory";
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
