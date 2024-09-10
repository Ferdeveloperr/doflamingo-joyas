import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,  // Tu client ID de PayPal
  process.env.PAYPAL_CLIENT_SECRET  // Tu client Secret de PayPal
);

const client = new paypal.core.PayPalHttpClient(environment);

export default client;
