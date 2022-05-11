// mercadopago-service.js
import Env from 'react-native-config';


// You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity
export const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=TEST-4444868198312058-092700-8836b0e132535cddd57811bd62199818__LD_LA__-148407430`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};