declare namespace propertyTransformerMap {
    export { transformToString as name };
    export { transformImage as image };
    export { transformToCleanString as description };
    export { transformToTime as cookTime };
    export { transformToTime as prepTime };
    export { transformToTime as totalTime };
    export { transformToString as cookTimeOriginalFormat };
    export { transformToString as prepTimeOriginalFormat };
    export { transformToString as totalTimeOriginalFormat };
    export { transformToString as recipeYield };
    export { transformIngredients as recipeIngredients };
    export { transformInstructions as recipeInstructions };
    export { transformToList as recipeCategories };
    export { transformToList as recipeCuisines };
    export { transformToList as recipeTypes };
    export { transformToList as keywords };
}
export type Recipe = {
    name: string;
    image: string;
    description: string;
    cookTime: string;
    prepTime: string;
    totalTime: string;
    recipeYield: string;
    recipeIngredients: string[];
    recipeInstructions: string[];
    recipeCategories: string[];
    recipeCuisines: string[];
    recipeTypes: string[];
    keywords: string[];
};
declare const _default: (url: string) => Promise<Recipe & {
    url: string;
}>;
export default _default;

//# sourceMappingURL=index.d.ts.map
