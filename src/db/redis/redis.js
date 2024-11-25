import "server-only";

import { Redis } from "@upstash/redis";

const createRedisInstance = () => {
  try {
    const redis = Redis.fromEnv();
    console.log(`[Redis] Successfuly connected to Redis.`);
    return redis;
  } catch (error) {
    console.error(error);
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
};

const redis = createRedisInstance();

export { redis };
