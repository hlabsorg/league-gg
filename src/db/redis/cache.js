import "server-only";

import { redis } from "./redis";

const MAX_AGE = 60000 * 60; // 1 hour

export const setCache = async (
  key,
  data,
  options = {
    px: MAX_AGE,
  },
) => {
  await redis.set(key, JSON.stringify(data), options);
};

export const checkCache = async (key) => {
  try {
    const data = await redis.get(key);
    if (data) {
      // cache hit
      console.log("cache hit: ", key);
      return data;
    }
    // cache miss;
    return;
  } catch (error) {
    console.error(error);
  }
};
