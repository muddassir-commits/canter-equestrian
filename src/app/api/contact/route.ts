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
    
    // Send email using shared email utility
    const emailResult = await sendEmail({
      subject: `🐴 Canter Equestrians - New Contact Message: ${parsedData.subject.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EDE7DA; background-color: #F8F4ED;">
          <h2 style="color: #1B3A4B; border-bottom: 2px solid #C9A84C; padding-bottom: 10px; font-family: Georgia, serif; margin-top: 0;">New Contact Message Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1B3A4B; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #333333;">${parsedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1B3A4B;">Email:</td>
              <td style="padding: 8px 0; color: #333333;"><a href="mailto:${parsedData.email}" style="color: #C9A84C; text-decoration: none;">${parsedData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1B3A4B;">Subject:</td>
              <td style="padding: 8px 0; color: #333333; text-transform: capitalize;">${parsedData.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1B3A4B; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #333333; line-height: 1.6; white-space: pre-wrap;">${parsedData.message}</td>
            </tr>
          </table>
          <div style="margin-top: 30px; border-top: 1px solid #EDE7DA; padding-top: 15px; font-size: 11px; color: #9CA3AF; text-align: center;">
            Sent from Canter Equestrians Contact Form
          </div>
        </div>
      `,
    });
    
    return NextResponse.json(
      { success: true, message: 'Message received successfully.', provider: emailResult.provider },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
