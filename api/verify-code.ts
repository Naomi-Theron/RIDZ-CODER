import type { VercelRequest, VercelResponse } from '@vercel/node';

// Same store from send-verification – in production, share a database
const codeStore: Record<string, { code: string; expires: number }> = {};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code required' });
  }

  const stored = codeStore[email];
  if (!stored) {
    return res.status(400).json({ error: 'No code sent to this email' });
  }

  if (Date.now() > stored.expires) {
    delete codeStore[email];
    return res.status(400).json({ error: 'Code expired' });
  }

  if (stored.code !== code) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  // Successful – remove code
  delete codeStore[email];
  return res.status(200).json({ success: true });
}