export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getStripe } from '../../../../lib/stripe';

export async function GET(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stripe = getStripe();
  const result = await stripe.customers.list({ limit: 100 });

  const customers = await Promise.all(
    result.data
      .filter((c) => c.email) // только с email
      .map(async (c) => {
        // Ищем карту напрямую — не зависим от вебхука
        const paymentMethods = await stripe.paymentMethods.list({
          customer: c.id,
          type: 'card',
        });

        if (paymentMethods.data.length === 0) return null; // нет карты — пропускаем

        const intents = await stripe.paymentIntents.list({
          customer: c.id,
          limit: 50,
        });

        const charges = intents.data.map((pi) => ({
          id: pi.id,
          amount: pi.amount / 100,
          description: pi.description || 'HandyYet service',
          status: pi.status,
          date: new Date(pi.created * 1000).toISOString(),
        }));

        return {
          email: c.email,
          name: c.metadata?.handyyet_name || c.name || '',
          service: c.metadata?.service || '',
          savedAt: new Date(c.created * 1000).toISOString(),
          paymentMethodId: paymentMethods.data[0].id,
          charges,
        };
      })
  );

  const filtered = customers.filter(Boolean);
  filtered.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  return NextResponse.json({ customers: filtered });
}
