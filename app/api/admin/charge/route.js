import { NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { kv } from '@vercel/kv';

export async function POST(req) {
  // Verify admin cookie
  const token = req.cookies.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, amount, description } = await req.json();

  if (!email || !amount || Number(amount) <= 0) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  // Look up saved customer
  const customer = await kv.get(`customer:${email}`);
  if (!customer) {
    return NextResponse.json(
      { error: 'No saved card found for this customer. Ask them to re-book and select "Save card".' },
      { status: 404 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // Stripe uses cents
      currency: 'usd',
      customer: customer.customerId,
      payment_method: customer.paymentMethodId,
      confirm: true,
      off_session: true, // Customer is not present — charge their saved card
      description: description || 'HandyYet service',
      metadata: { email, customerName: customer.name },
    });

    // Save to charge history
    const history = (await kv.get(`charges:${email}`)) || [];
    const newCharge = {
      id: paymentIntent.id,
      amount: Number(amount),
      description: description || 'HandyYet service',
      status: paymentIntent.status,
      date: new Date().toISOString(),
    };
    await kv.set(`charges:${email}`, [newCharge, ...history].slice(0, 50));

    return NextResponse.json({ success: true, id: paymentIntent.id, status: paymentIntent.status });
  } catch (err) {
    console.error('Charge error:', err);
    // Stripe error codes: authentication_required means the bank blocked it
    const message =
      err.code === 'authentication_required'
        ? 'Card requires authentication. Contact the customer to update their card.'
        : err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
