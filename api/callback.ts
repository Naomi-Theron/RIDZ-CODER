import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Safaricom sends the callback data in the body
  const callbackData = req.body;

  // Log or store the callback (you can save to a database or send yourself an email)
  console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

  // You can parse the transaction details:
  // const resultCode = callbackData?.Body?.stkCallback?.ResultCode;
  // if (resultCode === 0) => success

  // Return a success response to Safaricom (they expect a simple JSON)
  return res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' });
}