import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { MEILISEARCH_HOST, MEILISEARCH_KEY } from "./constants";

export const searchClient = instantMeiliSearch(MEILISEARCH_HOST, MEILISEARCH_KEY, {
  primaryKey: "id",
  keepZeroFacets: true,
});
