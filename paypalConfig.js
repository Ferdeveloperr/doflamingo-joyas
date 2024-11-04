import paypal from '@paypal/checkout-server-sdk';

// Cambiar a LiveEnvironment para producción
const environment = new paypal.core.LiveEnvironment(
  process.env.PAYPAL_CLIENT_ID,  // Client ID de producción
  process.env.PAYPAL_CLIENT_SECRET  // Client Secret de producción
);

const client = new paypal.core.PayPalHttpClient(environment);

export default client;
