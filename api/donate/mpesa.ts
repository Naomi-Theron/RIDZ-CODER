// /api/donate/mpesa.ts
import axios from 'axios';

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const passkey = process.env.MPESA_PASSKEY;
const shortCode = process.env.MPESA_SHORTCODE;

// 1. Get OAuth token
const getToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
};

// 2. Initiate STK push
const stkPush = async (phoneNumber: string, amount: number) => {
  const token = await getToken();
  const timestamp = getTimestamp(); // YYYYMMDDHHMMSS
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.CALLBACK_URL}/api/callback`,
      AccountReference: 'Donation',
      TransactionDesc: 'Support Ridz Coder'
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};