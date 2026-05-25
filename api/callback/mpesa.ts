import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  console.log('M-Pesa callback:', req.body);
  // Here you can update your database, send an email, etc.
  return res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' });
}