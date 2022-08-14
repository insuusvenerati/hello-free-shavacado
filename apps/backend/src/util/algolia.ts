import algoliasearch from "algoliasearch";

const ALGOLIA_KEY = process.env.ALGOLIA_KEY;
const ALGOLIA_APP = process.env.ALGOLIA_APP;

export const client = algoliasearch(ALGOLIA_APP, ALGOLIA_KEY);
export const hellofreshIndex = client.initIndex("hellofresh");
