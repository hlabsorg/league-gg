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
  await redis.set(key.trim().toLowerCase(), JSON.stringify(data), options);
};

export const checkCache = async (key) => {
  try {
    const data = await redis.get(key.trim().toLowerCase());
    if (data) {
      // cache hit
      console.log("cache hit: ", key);
      console.log("DATA", data);
      return data;
    }
    // cache miss;
    return;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCache = async (key) => {
  try {
    console.log("deleting cache", key.trim().toLowerCase());
    await redis.del(key);
  } catch (error) {
    console.error(error);
  }
};
