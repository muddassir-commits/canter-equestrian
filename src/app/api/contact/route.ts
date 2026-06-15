import { NextResponse } from 'next/server';
import * as z from 'zod';
import { sendEmail } from '@/lib/mail';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(['general', 'product', 'order', 'wholesale', 'other']),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side Zod validation
    const parsedData = contactSchema.parse(body);
    
    // Send email to owner
    await sendEmail({
      subject: `[Canter Contact] ${parsedData.subject.toUpperCase()} - ${parsedData.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #EDE7DA; border-radius: 8px; background-color: #F8F4ED;">
          <h2 style="color: #1B3A4B; border-bottom: 2px solid #C9A84C; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 100px; color: #1B3A4B;">Name:</td>
              <td style="padding: 6px 0;">${parsedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1B3A4B;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${parsedData.email}" style="color: #C9A84C; text-decoration: none;">${parsedData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #1B3A4B;">Subject:</td>
              <td style="padding: 6px 0; text-transform: capitalize;">${parsedData.subject}</td>
            </tr>
          </table>
          <div style="background-color: #FFFFFF; padding: 15px; border-radius: 6px; border: 1px solid #EDE7DA; white-space: pre-wrap; line-height: 1.6;">${parsedData.message}</div>
          <p style="font-size: 11px; color: #9CA3AF; margin-top: 20px; text-align: center;">Sent from Canter Equestrians Website</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
