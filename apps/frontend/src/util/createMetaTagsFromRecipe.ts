import { Item } from "../types/recipes";
import { getOgImageUrl } from "./constants";

export const createMetaTagsFromRecipe = (recipe: Item) => {
  return {
    openGraphData: [
      {
        property: "og:image",
        content: getOgImageUrl(recipe.imagePath),
        key: "ogimage",
      },
      {
        property: "og:image:height",
        content: "630",
        key: "ogimageheight",
      },
      {
        property: "og:image:width",
        content: "1200",
        key: "ogimagewidth",
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
    ],
  };
};
