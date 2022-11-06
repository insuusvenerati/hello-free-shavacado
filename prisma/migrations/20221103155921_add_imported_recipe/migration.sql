-- CreateTable
CREATE TABLE "Keywords" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ImportedRecipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
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
    "imageId" TEXT NOT NULL,
    CONSTRAINT "ImportedRecipe_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ImportedRecipe_keywordsId_fkey" FOREIGN KEY ("keywordsId") REFERENCES "Keywords" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "importedRecipeId" TEXT,
    CONSTRAINT "Category_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("createdAt", "iconPath", "id", "name", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Cuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT,
    "importedRecipeId" TEXT,
    CONSTRAINT "Cuisine_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cuisine_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cuisine" ("createdAt", "iconPath", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "recipeId", "updatedAt" FROM "Cuisine";
DROP TABLE "Cuisine";
ALTER TABLE "new_Cuisine" RENAME TO "Cuisine";
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
    "importedRecipeId" TEXT,

    PRIMARY KEY ("recipeId", "index"),
    CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Step_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Step" ("caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt") SELECT "caption", "createdAt", "image", "index", "instructions", "instructionsHTML", "instructionsMarkdown", "recipeId", "updatedAt" FROM "Step";
DROP TABLE "Step";
ALTER TABLE "new_Step" RENAME TO "Step";
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "stepRecipeId" TEXT,
    "stepIndex" INTEGER,
    "importedRecipeId" TEXT,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_stepRecipeId_stepIndex_fkey" FOREIGN KEY ("stepRecipeId", "stepIndex") REFERENCES "Step" ("recipeId", "index") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "stepIndex", "stepRecipeId", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_name_key" ON "Keywords"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");
