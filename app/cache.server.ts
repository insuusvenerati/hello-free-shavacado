import type { Cache, CacheEntry } from "@epic-web/cachified";
import { totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";

export const lruInstance = new LRUCache<string, CacheEntry>({
  max: 1000,
  updateAgeOnGet: true,
});

export const cache: Cache = {
  set(key, value) {
    const ttl = totalTtl(value?.metadata);
    return lruInstance.set(key, value, {
      ttl: ttl === Infinity ? undefined : ttl,
      start: value?.metadata?.createdTime,
    });
  },
  get(key) {
    return lruInstance.get(key);
  },
  delete(key) {
    return lruInstance.delete(key);
  },
};
