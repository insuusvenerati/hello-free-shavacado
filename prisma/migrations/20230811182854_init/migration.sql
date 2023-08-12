-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `colorScheme` VARCHAR(191) NULL,
    `gridSize` VARCHAR(191) NULL,
    `recipePageLayout` VARCHAR(191) NULL,
    `gridLayout` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Password` (
    `hash` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Password_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteRecipe` (
    `id` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FavoriteRecipe_recipeId_key`(`recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipeCategory` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImportedRecipeCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipeCuisine` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImportedRecipeCuisine_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipeIngredient` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImportedRecipeIngredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipeStep` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `index` INTEGER NOT NULL,
    `caption` VARCHAR(191) NULL,
    `importedRecipeId` VARCHAR(191) NOT NULL,

    INDEX `ImportedRecipeStep_importedRecipeId_idx`(`importedRecipeId`),
    PRIMARY KEY (`importedRecipeId`, `index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipeKeyword` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImportedRecipeKeyword_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportedRecipe` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `cookTime` VARCHAR(191) NULL,
    `prepTime` VARCHAR(191) NULL,
    `totalTime` VARCHAR(191) NULL,
    `recipeYield` VARCHAR(191) NOT NULL,
    `cookTimeOriginalFormat` VARCHAR(191) NULL,
    `prepTimeOriginalFormat` VARCHAR(191) NULL,
    `totalTimeOriginalFormat` VARCHAR(191) NULL,
    `url` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ImportedRecipe_url_key`(`url`),
    INDEX `ImportedRecipe_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatedRecipe` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `difficulty` VARCHAR(191) NULL,
    `ingredients` VARCHAR(191) NULL,
    `steps` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `CreatedRecipe_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `difficulty` INTEGER NOT NULL,
    `seoDescription` TEXT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `ratingsCount` INTEGER NULL,
    `averageRating` DOUBLE NULL,
    `favoritesCount` INTEGER NULL,
    `totalTime` VARCHAR(191) NULL,
    `prepTime` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `nutrition` JSON NOT NULL,
    `categoryId` VARCHAR(191) NULL,

    INDEX `Recipe_categoryId_idx`(`categoryId`),
    INDEX `Recipe_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `imageLink` VARCHAR(191) NULL,
    `imagePath` VARCHAR(191) NULL,
    `recipeId` VARCHAR(191) NULL,
    `stepRecipeId` VARCHAR(191) NULL,
    `stepIndex` INTEGER NULL,

    INDEX `Ingredient_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `Tag_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Step` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `index` INTEGER NOT NULL,
    `instructions` TEXT NOT NULL,
    `instructionsHTML` TEXT NULL,
    `instructionsMarkdown` TEXT NULL,
    `recipeId` VARCHAR(191) NOT NULL,

    INDEX `Step_recipeId_idx`(`recipeId`),
    PRIMARY KEY (`recipeId`, `index`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iconPath` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuisine` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iconPath` VARCHAR(191) NULL,
    `recipeId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Allergen` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iconPath` VARCHAR(191) NULL,
    `recipeId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FavoriteRecipeToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FavoriteRecipeToUser_AB_unique`(`A`, `B`),
    INDEX `_FavoriteRecipeToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImportedRecipeToImportedRecipeCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImportedRecipeToImportedRecipeCategory_AB_unique`(`A`, `B`),
    INDEX `_ImportedRecipeToImportedRecipeCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImportedRecipeToImportedRecipeCuisine` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImportedRecipeToImportedRecipeCuisine_AB_unique`(`A`, `B`),
    INDEX `_ImportedRecipeToImportedRecipeCuisine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImportedRecipeToImportedRecipeIngredient` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImportedRecipeToImportedRecipeIngredient_AB_unique`(`A`, `B`),
    INDEX `_ImportedRecipeToImportedRecipeIngredient_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ImportedRecipeToImportedRecipeKeyword` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImportedRecipeToImportedRecipeKeyword_AB_unique`(`A`, `B`),
    INDEX `_ImportedRecipeToImportedRecipeKeyword_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RecipeToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RecipeToTag_AB_unique`(`A`, `B`),
    INDEX `_RecipeToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IngredientToRecipe` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_IngredientToRecipe_AB_unique`(`A`, `B`),
    INDEX `_IngredientToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CuisineToRecipe` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CuisineToRecipe_AB_unique`(`A`, `B`),
    INDEX `_CuisineToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AllergenToRecipe` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AllergenToRecipe_AB_unique`(`A`, `B`),
    INDEX `_AllergenToRecipe_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Password` ADD CONSTRAINT `Password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteRecipe` ADD CONSTRAINT `FavoriteRecipe_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportedRecipeStep` ADD CONSTRAINT `ImportedRecipeStep_importedRecipeId_fkey` FOREIGN KEY (`importedRecipeId`) REFERENCES `ImportedRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportedRecipe` ADD CONSTRAINT `ImportedRecipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatedRecipe` ADD CONSTRAINT `CreatedRecipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Step` ADD CONSTRAINT `Step_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteRecipeToUser` ADD CONSTRAINT `_FavoriteRecipeToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `FavoriteRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteRecipeToUser` ADD CONSTRAINT `_FavoriteRecipeToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeCategory` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImportedRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeCategory` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `ImportedRecipeCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeCuisine` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeCuisine_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImportedRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeCuisine` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeCuisine_B_fkey` FOREIGN KEY (`B`) REFERENCES `ImportedRecipeCuisine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeIngredient` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeIngredient_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImportedRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeIngredient` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeIngredient_B_fkey` FOREIGN KEY (`B`) REFERENCES `ImportedRecipeIngredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeKeyword` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeKeyword_A_fkey` FOREIGN KEY (`A`) REFERENCES `ImportedRecipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImportedRecipeToImportedRecipeKeyword` ADD CONSTRAINT `_ImportedRecipeToImportedRecipeKeyword_B_fkey` FOREIGN KEY (`B`) REFERENCES `ImportedRecipeKeyword`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipeToTag` ADD CONSTRAINT `_RecipeToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipeToTag` ADD CONSTRAINT `_RecipeToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD CONSTRAINT `_IngredientToRecipe_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD CONSTRAINT `_IngredientToRecipe_B_fkey` FOREIGN KEY (`B`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CuisineToRecipe` ADD CONSTRAINT `_CuisineToRecipe_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cuisine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CuisineToRecipe` ADD CONSTRAINT `_CuisineToRecipe_B_fkey` FOREIGN KEY (`B`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllergenToRecipe` ADD CONSTRAINT `_AllergenToRecipe_A_fkey` FOREIGN KEY (`A`) REFERENCES `Allergen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AllergenToRecipe` ADD CONSTRAINT `_AllergenToRecipe_B_fkey` FOREIGN KEY (`B`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
