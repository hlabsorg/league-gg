import "server-only";

import { redis } from "./redis";

export const setCache = async (key, data) => {
  const MAX_AGE = 60000 * 60; // 1 hour

  await redis.set(key, JSON.stringify(data), {
    px: MAX_AGE,
  });
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
