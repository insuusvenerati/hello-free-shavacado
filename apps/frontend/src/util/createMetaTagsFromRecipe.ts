import { Item } from "../types/recipes";
import { getOgImageUrl } from "./constants";
import { ImportedRecipe, isImportedRecipe } from "../types/importedRecipe";

export const createMetaTagsFromRecipe = (recipe: Item | ImportedRecipe) => {
  return {
    openGraphData: [
      {
        property: "og:image",
        content: isImportedRecipe(recipe) ? recipe.image : getOgImageUrl(recipe.imagePath),
        key: "ogimage",
      },
      {
        property: "og:title",
        content: recipe.name,
        key: "ogtitle",
      },
      {
        property: "og:description",
        content: recipe.description,
        key: "ogdescription",
      },
      {
        property: "og:type",
        content: "website",
        key: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: recipe.name,
      },
      {
        name: "twitter:description",
        content: recipe.description,
      },
    ],
  };
};
