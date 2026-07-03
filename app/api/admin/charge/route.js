export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getStripe } from '../../../../lib/stripe';

export async function POST(req) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, amount, description } = await req.json();

  if (!email || !amount || Number(amount) <= 0) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  const stripe = getStripe();

  // Найти клиента по email
  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0];

  if (!customer) {
    return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });
  }

  // Найти карту напрямую
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customer.id,
    type: 'card',
  });

  if (paymentMethods.data.length === 0) {
    return NextResponse.json({ error: 'No saved card for this customer.' }, { status: 404 });
  }

  const paymentMethodId = paymentMethods.data[0].id;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
      description: description || 'HandyYet service',
      metadata: { email, customerName: customer.name || '' },
    });

    return NextResponse.json({
      success: true,
      id: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (err) {
    console.error('Charge error:', err);
    const message =
      err.code === 'authentication_required'
        ? 'Card requires authentication. Contact the customer to update their card.'
        : err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
