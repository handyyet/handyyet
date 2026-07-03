import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe';

export async function POST(req) {
  try {
    const { email, name, service } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Find existing Stripe customer by email, or create new one
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customer = existing.data[0];
    if (!customer) {
      customer = await stripe.customers.create({ email, name });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://handyyet.com';

    // Setup mode: saves the card without charging anything yet
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
