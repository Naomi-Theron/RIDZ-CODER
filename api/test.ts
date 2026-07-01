import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ridzcoder@gmail.com',
    subject: 'Test from API',
    html: '<p>API test successful!</p>',
  });
  if (error) return res.status(500).json({ error });
  return res.status(200).json({ success: true, data });
}