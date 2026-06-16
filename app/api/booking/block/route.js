import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "handyyet2026";

export async function POST(req) {
  const { password, date, time, action } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = `blocked:${date}`;
  const current = await redis.get(key) || [];

  let updated;
  if (action === "block") {
    updated = [...new Set([...current, time])];
  } else {
    updated = current.filter(t => t !== time);
  }

  await redis.set(key, updated);
  return Response.json({ success: true, blocked: updated });
}
