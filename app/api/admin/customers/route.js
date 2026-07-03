import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';

export async function GET(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch all Stripe customers who have a saved payment method
  const result = await stripe.customers.list({ limit: 100 });

  const customersWithCards = result.data.filter(
    (c) => c.invoice_settings?.default_payment_method
  );

  // For each customer, fetch their charge history
  const customers = await Promise.all(
    customersWithCards.map(async (c) => {
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
        email: c.email || '',
        name: c.metadata?.handyyet_name || c.name || '',
        service: c.metadata?.service || '',
        savedAt: new Date(c.created * 1000).toISOString(),
        charges,
      };
    })
  );

  // Most recently created first
  customers.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  return NextResponse.json({ customers });
}
