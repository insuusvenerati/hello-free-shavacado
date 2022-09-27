import algoliasearch from "algoliasearch/lite";

const ALGOLIA_APP = process.env.NEXT_PUBLIC_ALGOLIA_APP || "";
const ALGOLIA_KEY = process.env.NEXT_PUBLIC_ALGOLIA_KEY || "";

export const algoliaSearch = algoliasearch(ALGOLIA_APP, ALGOLIA_KEY);
