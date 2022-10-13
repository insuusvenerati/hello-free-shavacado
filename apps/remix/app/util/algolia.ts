import algoliasearch from "algoliasearch/lite";

const getAlgoliaConfig = () => {
  if (typeof window !== "undefined") {
    return {
      appId: window.ENV.ALGOLIA_APP,
      apiKey: window.ENV.ALGOLIA_KEY,
    };
  }
};

const config = getAlgoliaConfig();

export const algoliaSearch = algoliasearch(config?.appId, config?.apiKey);
