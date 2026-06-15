import nodemailer from 'nodemailer';

interface SendEmailParams {
  to?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const recipient = to || process.env.EMAIL_TO || 'muhammadshadabhasan@gmail.com';
  
  // 1. Try Resend if API key is present
  if (process.env.RESEND_API_KEY) {
    try {
      console.log('Sending email via Resend API...');
      const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Canter Equestrians <${fromEmail}>`,
          to: recipient,
          subject,
          html,
          text: text || html.replace(/<[^>]*>/g, ''),
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log('Email sent successfully via Resend:', data);
        return { success: true, provider: 'resend', data };
      } else {
        const errText = await res.text();
        console.error('Resend API returned error status:', res.status, errText);
      }
    } catch (err) {
      console.error('Failed to send email via Resend API:', err);
    }
  }

  // 2. Try SMTP if host, user, and pass are present
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log('Sending email via SMTP...');
      const port = Number(process.env.SMTP_PORT) || 465;
      const secure = port === 465;
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Canter Equestrians" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      });

      console.log('Email sent successfully via SMTP:', info.messageId);
      return { success: true, provider: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('Failed to send email via SMTP:', err);
    }
  }

  // 3. Fallback to FormSubmit.co API so they get real emails even without Resend or SMTP configured!
  try {
    console.log(`Forwarding email via FormSubmit.co to ${recipient}...`);
    const res = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        subject: subject,
        message: text || html.replace(/<[^>]*>/g, ''),
        _honey: '', // honeypot field
      }),
    });
    if (res.ok) {
      console.log('Email forwarded successfully via FormSubmit.co!');
      return { success: true, provider: 'formsubmit' };
    } else {
      const errText = await res.text();
      console.error('FormSubmit API returned error status:', res.status, errText);
    }
  } catch (err) {
    console.error('Failed to forward email via FormSubmit.co:', err);
  }

  // 4. Ultimate Mock Fallback
  console.log('--- Mock Email Log ---');
  console.log(`To: ${recipient}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content:\n${html}`);
  console.log('----------------------');
  console.log('Email mocked successfully (configure RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in Vercel to send real emails).');
  
  return { success: true, provider: 'mock' };
}
