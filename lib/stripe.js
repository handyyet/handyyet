import Stripe from 'stripe';

// Lazy: new Stripe() вызывается только при первом запросе, не при билде
let _client;
export function getStripe() {
  if (!_client) {
    _client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _client;
}
