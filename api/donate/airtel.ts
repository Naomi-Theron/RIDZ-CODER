// /api/donate/airtel.ts
import axios from 'axios';

const clientId = process.env.AIRTEL_CLIENT_ID;
const clientSecret = process.env.AIRTEL_CLIENT_SECRET;

const airtelMoney = async (phoneNumber: string, amount: number, countryCode: string) => {
  // Get token
  const tokenResponse = await axios.post(
    'https://openapi.airtel.africa/auth/oauth2/token',
    { client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }
  );
  const token = tokenResponse.data.access_token;

  // Initiate collection
  const response = await axios.post(
    'https://openapi.airtel.africa/merchant/v1/payments/',
    {
      reference: `DON-${Date.now()}`,
      subscriber: { country: countryCode, currency: getCurrency(countryCode), msisdn: phoneNumber },
      transaction: { amount: amount.toString(), country: countryCode, currency: getCurrency(countryCode), id: `TX-${Date.now()}` },
      requestor: { country: countryCode, msisdn: phoneNumber }
    },
    { headers: { Authorization: `Bearer ${token}`, 'X-Country': countryCode, 'X-Currency': getCurrency(countryCode) } }
  );
  return response.data;
};

const getCurrency = (countryCode: string): string => ({
  KE: 'KES', UG: 'UGX', TZ: 'TZS', RW: 'RWF', ZM: 'ZMW',
  MW: 'MWK', MG: 'MGA', NE: 'XOF', TD: 'XAF', CD: 'CDF',
  CG: 'XAF', GA: 'XAF', SC: 'SCR'
}[countryCode] || 'USD');