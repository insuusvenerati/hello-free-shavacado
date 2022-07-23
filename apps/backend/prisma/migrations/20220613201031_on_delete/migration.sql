-- DropForeignKey
ALTER TABLE "groceries" DROP CONSTRAINT "groceries_recipe_id_fkey";

-- AddForeignKey
ALTER TABLE "groceries" ADD CONSTRAINT "groceries_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
