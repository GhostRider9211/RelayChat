import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: {},
  maxRetriesPerRequest: 3,
});

export default redis;
