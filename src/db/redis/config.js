const { REDIS_HOST = "", REDIS_PASSWORD = "", REDIS_PORT = 6379, REDIS_ENABLE_TLS = "false" } = process.env;

export const redisConfig = {
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  port: REDIS_PORT,
  tls: REDIS_ENABLE_TLS === "true" ? {} : undefined,
};
