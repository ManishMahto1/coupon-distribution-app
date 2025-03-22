import { redis } from "@/lib/redis";

export async function rateLimit(ip: string) {
  const key = `claims:${ip}`;
  const claims = await redis.get(key);
  if (claims) {
    const ttl = await redis.ttl(key);
    return { limited: true, ttl };
  }
  await redis.set(key, "1");
  await redis.expire(key, 24 * 60 * 60);
  return { limited: false };
}