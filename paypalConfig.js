import paypal from '@paypal/checkout-server-sdk';

const environment = process.env.PAYPAL_MODE === 'live'
    new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,  // Tu client ID de PayPal Live
      process.env.PAYPAL_CLIENT_SECRET  // Tu client Secret de PayPal Live
    )

const client = new paypal.core.PayPalHttpClient(environment);

export default client;
