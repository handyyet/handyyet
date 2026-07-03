export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getStripe } from '../../../lib/stripe';

export async function POST(req) {
  try {
    const stripe = getStripe();
    const { email, name, service } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    const existing = await stripe.customers.list({ email, limit: 1 });
    let customer = existing.data[0];
    if (!customer) {
      customer = await stripe.customers.create({ email, name });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://handyyet.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'setup',
      customer: customer.id,
      payment_method_types: ['card'],
      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/booking`,
      metadata: { email, name, service: service || 'General quote' },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
