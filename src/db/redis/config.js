export const redisConfig = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
  tls: process.env.REDIS_ENABLE_TLS === "true" ? {} : undefined,
};
