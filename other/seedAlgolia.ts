import invariant from "tiny-invariant";
import { PrismaClient } from "@prisma/client";
import algoliasearch from "algoliasearch";

invariant(process.env.ALGOLIA_INDEX_KEY, "ALGOLIA_KEY is required");
invariant(process.env.ALGOLIA_APP, "ALGOLIA_APP is required");

const prisma = new PrismaClient();

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP || "",
  process.env.ALGOLIA_INDEX_KEY || ""
);

const hellofreshIndexClient = searchClient.initIndex("hellofresh");

const main = async () => {
  const allRecipesQuery = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      tags: true,
      category: true,
      allergens: true,
      cuisines: true,
    },
  });

  const hellofreshDocuments = allRecipesQuery.map((recipe) => {
    const ingredients = recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      id: ingredient.id,
    }));

    const tags = recipe.tags.map((tag) => ({
      name: tag.name,
      id: tag.id,
    }));

    const allergens = recipe.allergens.map((allergen) => ({
      name: allergen.name,
      id: allergen.id,
    }));

    const categories = recipe.category
      ? { name: recipe.category.name, id: recipe.category.id }
      : {};

    const cuisines = recipe.cuisines.map((cuisine) => ({
      name: cuisine.name,
      id: cuisine.id,
    }));

    return {
      name: recipe.name,
      description: recipe.description,
      id: recipe.id,
      ingredients: ingredients,
      tags: tags,
      slug: recipe.slug,
      imagePath: recipe.imagePath,
      rating: recipe.averageRating,
      allergens: allergens,
      categories: categories,
      cuisines: cuisines,
      ratingsCount: recipe.ratingsCount,
    };
  });
  await hellofreshIndexClient
    .saveObjects(hellofreshDocuments, { autoGenerateObjectIDIfNotExist: true })
    .wait();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
