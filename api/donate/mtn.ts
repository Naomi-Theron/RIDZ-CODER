// /api/donate/mtn.ts
import axios from 'axios';
import crypto from 'crypto';

const mtnMoney = async (phoneNumber: string, amount: number, countryCode: string) => {
  const subscriptionKey = process.env.MTN_SUBSCRIPTION_KEY;
  const userId = process.env.MTN_USER_ID;
  const apiKey = process.env.MTN_API_KEY;
  const targetEnvironment = countryCode === 'UG' ? 'sandbox' : 'production';

  // Get token
  const tokenResponse = await axios.post(
    `https://${targetEnvironment}.momodeveloper.mtn.com/collection/token/`,
    { grant_type: 'client_credentials' },
    { headers: { Authorization: `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`, 'Ocp-Apim-Subscription-Key': subscriptionKey } }
  );
  const token = tokenResponse.data.access_token;

  // Reference ID
  const referenceId = crypto.randomUUID();

  // Create payment request
  await axios.post(
    `https://${targetEnvironment}.momodeveloper.mtn.com/collection/v1_0/requesttopay`,
    {
      amount: amount.toString(),
      currency: countryCode === 'UG' ? 'UGX' : getMtnCurrency(countryCode),
      externalId: `DON-${Date.now()}`,
      payer: { partyIdType: 'MSISDN', partyId: phoneNumber },
      payerMessage: `Donation to Ridz Coder`,
      payeeNote: `Support development`
    },
    { headers: { Authorization: `Bearer ${token}`, 'X-Reference-Id': referenceId, 'Ocp-Apim-Subscription-Key': subscriptionKey } }
  );

  // Check status after 5 seconds
  const statusResponse = await axios.get(`https://${targetEnvironment}.momodeveloper.mtn.com/collection/v1_0/requesttopay/${referenceId}`, {
    headers: { Authorization: `Bearer ${token}`, 'Ocp-Apim-Subscription-Key': subscriptionKey }
  });
  return statusResponse.data;
};

const getMtnCurrency = (countryCode: string): string => ({
  UG: 'UGX', GH: 'GHS', CM: 'XAF', ZM: 'ZMW', SZ: 'SZL',
  CI: 'XOF', BJ: 'XOF', RW: 'RWF', GN: 'GNF', ZA: 'ZAR', LR: 'LRD'
}[countryCode] || 'USD');