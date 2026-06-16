import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) return Response.json({ blocked: [] });

  try {
    const blocked = await redis.get(`blocked:${date}`) || [];
    return Response.json({ blocked });
  } catch {
    return Response.json({ blocked: [] });
  }
}
