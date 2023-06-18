import { lruCacheAdapter, type CacheEntry } from "cachified";
import { LRUCache } from "lru-cache";

export const lru = new LRUCache<string, CacheEntry>({
  max: 1000,
  updateAgeOnGet: true,
});

export const cache = lruCacheAdapter(lru);
