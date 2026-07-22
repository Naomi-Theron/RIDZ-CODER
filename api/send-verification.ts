import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store (use Redis or DB in production)
const codeStore: Record<string, { code: string; expires: number }> = {};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Store code
  codeStore[email] = { code, expires };

  try {
    const { error } = await resend.emails.send({
      from: 'Ridz Network UG',
      to: email,
      subject: 'Your verification code for Ridz Coder Portfolio',
      html: `
        <h1>Verification Code</h1>
        <p>Your login verification code is:</p>
        <h2 style="font-size: 32px; letter-spacing: 4px; background: #f0f0f0; padding: 12px 24px; display: inline-block;">${code}</h2>
        <p>This code expires in 10 minutes.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send code' });
    }

    return res.status(200).json({ success: true, message: 'Code sent' });
  } catch (error) {
    console.error('Send code error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}