/*
  Warnings:

  - The primary key for the `ImportedRecipeKeyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ImportedRecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ImportedRecipeCuisine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ImportedRecipeCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ImportedRecipeKeyword` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ImportedRecipeIngredient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ImportedRecipeCuisine` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ImportedRecipeCategory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImportedRecipeToImportedRecipeCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImportedRecipeToImportedRecipeCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeCuisine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImportedRecipeToImportedRecipeCuisine_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImportedRecipeToImportedRecipeCuisine_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeCuisine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImportedRecipeToImportedRecipeIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImportedRecipeToImportedRecipeIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeIngredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImportedRecipeToImportedRecipeKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImportedRecipeToImportedRecipeKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeKeyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RecipeToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RecipeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RecipeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CuisineToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CuisineToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CuisineToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AllergenToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AllergenToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergen" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AllergenToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT
);
INSERT INTO "new_Cuisine" ("createdAt", "iconPath", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "recipeId", "updatedAt" FROM "Cuisine";
DROP TABLE "Cuisine";
ALTER TABLE "new_Cuisine" RENAME TO "Cuisine";
CREATE UNIQUE INDEX "Cuisine_name_key" ON "Cuisine"("name");
CREATE TABLE "new_ImportedRecipeKeyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeKeyword" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeKeyword";
DROP TABLE "ImportedRecipeKeyword";
ALTER TABLE "new_ImportedRecipeKeyword" RENAME TO "ImportedRecipeKeyword";
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "imageLink" TEXT,
    "imagePath" TEXT,
    "recipeId" TEXT,
    "stepRecipeId" TEXT,
    "stepIndex" INTEGER
);
INSERT INTO "new_Ingredient" ("createdAt", "description", "id", "imageLink", "imagePath", "name", "recipeId", "slug", "stepIndex", "stepRecipeId", "type", "updatedAt") SELECT "createdAt", "description", "id", "imageLink", "imagePath", "name", "recipeId", "slug", "stepIndex", "stepRecipeId", "type", "updatedAt" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
CREATE TABLE "new_Allergen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT
);
INSERT INTO "new_Allergen" ("createdAt", "iconPath", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "iconPath", "id", "name", "recipeId", "updatedAt" FROM "Allergen";
DROP TABLE "Allergen";
ALTER TABLE "new_Allergen" RENAME TO "Allergen";
CREATE UNIQUE INDEX "Allergen_name_key" ON "Allergen"("name");
CREATE TABLE "new_ImportedRecipeIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeIngredient" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeIngredient";
DROP TABLE "ImportedRecipeIngredient";
ALTER TABLE "new_ImportedRecipeIngredient" RENAME TO "ImportedRecipeIngredient";
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");
CREATE TABLE "new_ImportedRecipeCuisine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeCuisine" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCuisine";
DROP TABLE "ImportedRecipeCuisine";
ALTER TABLE "new_ImportedRecipeCuisine" RENAME TO "ImportedRecipeCuisine";
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("createdAt", "id", "name", "recipeId", "updatedAt") SELECT "createdAt", "id", "name", "recipeId", "updatedAt" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE TABLE "new_ImportedRecipeCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "importedRecipeId" TEXT NOT NULL
);
INSERT INTO "new_ImportedRecipeCategory" ("createdAt", "importedRecipeId", "name", "updatedAt") SELECT "createdAt", "importedRecipeId", "name", "updatedAt" FROM "ImportedRecipeCategory";
DROP TABLE "ImportedRecipeCategory";
ALTER TABLE "new_ImportedRecipeCategory" RENAME TO "ImportedRecipeCategory";
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ImportedRecipeToImportedRecipeCategory_AB_unique" ON "_ImportedRecipeToImportedRecipeCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ImportedRecipeToImportedRecipeCategory_B_index" ON "_ImportedRecipeToImportedRecipeCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImportedRecipeToImportedRecipeCuisine_AB_unique" ON "_ImportedRecipeToImportedRecipeCuisine"("A", "B");

-- CreateIndex
CREATE INDEX "_ImportedRecipeToImportedRecipeCuisine_B_index" ON "_ImportedRecipeToImportedRecipeCuisine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImportedRecipeToImportedRecipeIngredient_AB_unique" ON "_ImportedRecipeToImportedRecipeIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_ImportedRecipeToImportedRecipeIngredient_B_index" ON "_ImportedRecipeToImportedRecipeIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImportedRecipeToImportedRecipeKeyword_AB_unique" ON "_ImportedRecipeToImportedRecipeKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_ImportedRecipeToImportedRecipeKeyword_B_index" ON "_ImportedRecipeToImportedRecipeKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToTag_AB_unique" ON "_RecipeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToTag_B_index" ON "_RecipeToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToRecipe_AB_unique" ON "_IngredientToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CuisineToRecipe_AB_unique" ON "_CuisineToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CuisineToRecipe_B_index" ON "_CuisineToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AllergenToRecipe_AB_unique" ON "_AllergenToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergenToRecipe_B_index" ON "_AllergenToRecipe"("B");
