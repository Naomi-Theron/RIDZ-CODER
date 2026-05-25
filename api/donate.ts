import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import crypto from 'crypto';

// Helper: generate timestamp in format YYYYMMDDHHMMSS
const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// Helper: get OAuth token from Safaricom
async function getAccessToken() {
  const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: 'Phone number and amount are required' });
  }

  // Format phone number: remove leading 0 or +254, ensure 254XXXXXXXXX
  let formattedPhone = phoneNumber.toString().trim();
  if (formattedPhone.startsWith('0')) formattedPhone = `254${formattedPhone.slice(1)}`;
  if (formattedPhone.startsWith('+')) formattedPhone = formattedPhone.slice(1);
  if (!formattedPhone.startsWith('254')) formattedPhone = `254${formattedPhone}`;

  const shortcode = process.env.BUSINESS_SHORTCODE!;
  const passkey = process.env.PASSKEY!;
  const timestamp = getTimestamp();
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  try {
    const token = await getAccessToken();

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.CALLBACK_URL}`,
        AccountReference: 'Donation',
        TransactionDesc: 'Support Ridz Coder',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Safaricom response: { MerchantRequestID, CheckoutRequestID, ResponseCode, ResponseDescription }
    if (response.data.ResponseCode === '0') {
      return res.status(200).json({ success: true, message: 'STK Push sent. Check your phone.' });
    } else {
      return res.status(500).json({ error: response.data.ResponseDescription });
    }
  } catch (error: any) {
    console.error('M-Pesa error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
}