import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Tu Access Token
});

export default mercadopago;
