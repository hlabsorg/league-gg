import "server-only";

import Redis from "ioredis";
import { redisConfig } from "./config";

const createRedisInstance = () => {
  try {
    const options = {
      ...redisConfig,
      retryStrategy: (times) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }
        return Math.min(times * 200, 1000);
      },
    };

    const redis = new Redis(options);

    redis.on("error", (error) => {
      console.warn("[Redis] Error connecting", error);
    });

    redis.on("connect", () => {
      console.log("[Redis] successfully connected to Redis instance.");
    });
    return redis;
  } catch (error) {
    console.error(error);
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
};

const redis = createRedisInstance();

export { redis };
