import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { kv } from '@vercel/kv';

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Only handle setup sessions (card save, not purchases)
    if (session.mode === 'setup' && session.setup_intent) {
      try {
        const setupIntent = await stripe.setupIntents.retrieve(session.setup_intent);
        const email = session.metadata?.email;
        if (!email) return NextResponse.json({ received: true });

        const customerData = {
          customerId: session.customer,
          paymentMethodId: setupIntent.payment_method,
          name: session.metadata?.name || '',
          service: session.metadata?.service || '',
          savedAt: new Date().toISOString(),
        };

        // Save customer data to KV
        await kv.set(`customer:${email}`, customerData);

        // Add to master customers list
        const list = (await kv.get('customers:list')) || [];
        if (!list.includes(email)) {
          await kv.set('customers:list', [...list, email]);
        }
      } catch (err) {
        console.error('KV save error:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
