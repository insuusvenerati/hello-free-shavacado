import { HF_AVATAR_IMAGE_URL, INGREDIENT_PLACEHOLDER_URL } from "~/constants";
import { Yield } from "~/types/recipe";
import { RemixImage } from "./RemixImage";

export const RecipeYields = ({ yields }: { yields: Yield[] }) => {
  return (
    <>
      {yields[0].ingredients.map((ingredient) => (
        <li className="flex gap-2 items-center" key={ingredient.id}>
          <div className="avatar">
            <div className="w-[50px] rounded-full">
              <RemixImage
                height={50}
                width={50}
                transformOptions={{ fit: "cover", quality: 20 }}
                src={
                  ingredient.imagePath
                    ? `${HF_AVATAR_IMAGE_URL}${ingredient.imagePath}`
                    : `${INGREDIENT_PLACEHOLDER_URL}?text=${ingredient.name}`
                }
                alt={ingredient.name}
                responsive={[
                  {
                    size: {
                      width: 50,
                      height: 50,
                    },
                    maxWidth: 50,
                  },
                ]}
              />
            </div>
          </div>
          {ingredient.name}
        </li>
      ))}
    </>
  );
};
