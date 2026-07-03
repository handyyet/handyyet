import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const emails = (await kv.get('customers:list')) || [];

  const customers = await Promise.all(
    emails.map(async (email) => {
      const data = (await kv.get(`customer:${email}`)) || {};
      const charges = (await kv.get(`charges:${email}`)) || [];
      return { email, ...data, charges };
    })
  );

  // Most recently saved first
  customers.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  return NextResponse.json({ customers });
}
