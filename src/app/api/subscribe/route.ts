import { NextResponse } from 'next/server';
import * as z from 'zod';
import { sendEmail } from '@/lib/mail';

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const parsedData = subscribeSchema.parse(body);
    
    // Send email alert to admin
    await sendEmail({
      subject: `[Canter Signup] New Subscriber from ${parsedData.source}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #EDE7DA; border-radius: 8px; background-color: #F8F4ED;">
          <h2 style="color: #1B3A4B; border-bottom: 2px solid #C9A84C; padding-bottom: 10px; margin-top: 0;">New Subscription Registration</h2>
          <p style="margin-top: 15px;">A user has registered their email address for updates.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #1B3A4B;">Email Address:</td>
              <td style="padding: 6px 0;"><a href="mailto:${parsedData.email}" style="color: #C9A84C; text-decoration: none; font-weight: bold;">${parsedData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1B3A4B;">Source Form:</td>
              <td style="padding: 6px 0; text-transform: uppercase; font-size: 12px; font-family: monospace; background-color: #EDE7DA; padding: 2px 6px; border-radius: 4px; display: inline-block;">${parsedData.source}</td>
            </tr>
          </table>
          <p style="font-size: 11px; color: #9CA3AF; margin-top: 20px; text-align: center;">Sent from Canter Equestrians Website</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Subscription API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
