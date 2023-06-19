-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "colorScheme" TEXT,
    "gridSize" TEXT,
    "recipePageLayout" TEXT,
    "gridLayout" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteRecipe" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipeCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipeCuisine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipeCuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipeIngredient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipeStep" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "caption" TEXT,
    "importedRecipeId" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipeStep_pkey" PRIMARY KEY ("importedRecipeId","index")
);

-- CreateTable
CREATE TABLE "ImportedRecipeKeyword" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ImportedRecipeKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedRecipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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

    CONSTRAINT "ImportedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatedRecipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "ingredients" TEXT,
    "steps" TEXT,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CreatedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "seoDescription" TEXT,
    "imagePath" TEXT NOT NULL,
    "ratingsCount" INTEGER,
    "averageRating" DOUBLE PRECISION,
    "favoritesCount" INTEGER,
    "totalTime" TEXT,
    "prepTime" TEXT,
    "slug" TEXT NOT NULL,
    "nutrition" TEXT NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "imageLink" TEXT,
    "imagePath" TEXT,
    "recipeId" TEXT,
    "stepRecipeId" TEXT,
    "stepIndex" INTEGER,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    "instructionsHTML" TEXT,
    "instructionsMarkdown" TEXT,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("recipeId","index")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergen" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "iconPath" TEXT,
    "recipeId" TEXT,

    CONSTRAINT "Allergen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteRecipeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeCuisine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImportedRecipeToImportedRecipeKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CuisineToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AllergenToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteRecipe_recipeId_key" ON "FavoriteRecipe"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeCategory_name_key" ON "ImportedRecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeCuisine_name_key" ON "ImportedRecipeCuisine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeIngredient_name_key" ON "ImportedRecipeIngredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipeKeyword_name_key" ON "ImportedRecipeKeyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ImportedRecipe_url_key" ON "ImportedRecipe"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteRecipeToUser_AB_unique" ON "_FavoriteRecipeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteRecipeToUser_B_index" ON "_FavoriteRecipeToUser"("B");

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

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedRecipeStep" ADD CONSTRAINT "ImportedRecipeStep_importedRecipeId_fkey" FOREIGN KEY ("importedRecipeId") REFERENCES "ImportedRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedRecipe" ADD CONSTRAINT "ImportedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatedRecipe" ADD CONSTRAINT "CreatedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteRecipeToUser" ADD CONSTRAINT "_FavoriteRecipeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoriteRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteRecipeToUser" ADD CONSTRAINT "_FavoriteRecipeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeCategory" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeCategory" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeCuisine" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeCuisine_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeCuisine" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeCuisine_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeCuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeIngredient" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeIngredient" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeKeyword" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "ImportedRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImportedRecipeToImportedRecipeKeyword" ADD CONSTRAINT "_ImportedRecipeToImportedRecipeKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "ImportedRecipeKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CuisineToRecipe" ADD CONSTRAINT "_CuisineToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CuisineToRecipe" ADD CONSTRAINT "_CuisineToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToRecipe" ADD CONSTRAINT "_AllergenToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToRecipe" ADD CONSTRAINT "_AllergenToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
