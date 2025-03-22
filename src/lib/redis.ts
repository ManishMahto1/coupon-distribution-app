import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL!,       // MUST be an HTTPS URL
  token: process.env.REDIS_TOKEN!,   // Upstash token
});
