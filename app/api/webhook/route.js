import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';

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

    if (session.mode === 'setup' && session.setup_intent) {
      try {
        const setupIntent = await stripe.setupIntents.retrieve(session.setup_intent);

        // Save payment method + service info directly on the Stripe customer
        await stripe.customers.update(session.customer, {
          invoice_settings: {
            default_payment_method: setupIntent.payment_method,
          },
          metadata: {
            service: session.metadata?.service || '',
            handyyet_name: session.metadata?.name || '',
          },
        });
      } catch (err) {
        console.error('Stripe customer update error:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
