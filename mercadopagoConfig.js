import mercadopago from 'mercadopago';

// Usar el método .configure para versiones anteriores
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default mercadopago;
