-- DropForeignKey
ALTER TABLE "grocery" DROP CONSTRAINT "grocery_recipe_id_fkey";

-- AddForeignKey
ALTER TABLE "grocery" ADD CONSTRAINT "grocery_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
