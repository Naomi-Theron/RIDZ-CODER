import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, service, budget, timeline } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Build the email content
    const subject = service 
      ? `New Service Order: ${service} from ${name}`
      : `New Contact Form Message from ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            .field { margin: 12px 0; }
            .label { font-weight: bold; color: #555; display: inline-block; width: 120px; }
            .value { color: #222; }
            .message-box { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <h2>${service ? '📦 New Service Order' : '📩 New Contact Form Message'}</h2>
          
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${name}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${email}</span>
          </div>
          ${phone ? `<div class="field"><span class="label">Phone:</span><span class="value">${phone}</span></div>` : ''}
          ${service ? `<div class="field"><span class="label">Service:</span><span class="value">${service}</span></div>` : ''}
          ${budget ? `<div class="field"><span class="label">Budget:</span><span class="value">${budget}</span></div>` : ''}
          ${timeline ? `<div class="field"><span class="label">Timeline:</span><span class="value">${timeline}</span></div>` : ''}
          
          <div class="message-box">
            <strong>Message:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div class="footer">
            <p>This message was sent from your Ridz Coder Website.</p>
            <p>Reply directly to ${email} to respond.</p>
          </div>
        </body>
      </html>
    `;

    const textContent = `
      ${service ? '📦 New Service Order' : '📩 New Contact Form Message'}
      ------------------------------------------
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      ${service ? `Service: ${service}` : ''}
      ${budget ? `Budget: ${budget}` : ''}
      ${timeline ? `Timeline: ${timeline}` : ''}
      ------------------------------------------
      Message:
      ${message}
      ------------------------------------------
      Reply to: ${email}
    `;

    // Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'ridzcoder@gmail.com'],
      subject: subject,
      reply_to: email,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data,
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}