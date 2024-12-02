import "server-only";

import { redis } from "./redis";

const MAX_AGE = 3600; // 1 hour

export const setCache = async (
  key,
  data,
  options = {
    ex: MAX_AGE,
  },
) => {
  key = key.trim().toLowerCase();
  await redis.set(key, JSON.stringify(data), options);
};

export const checkCache = async (key) => {
  key = key.trim().toLowerCase();
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

export const deleteCache = async (key) => {
  key = key.trim().toLowerCase();
  try {
    console.log("deleting cache", key);
    await redis.del(key);
  } catch (error) {
    console.error(error);
  }
};
