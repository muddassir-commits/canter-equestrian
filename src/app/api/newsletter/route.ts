import { NextResponse } from 'next/server';
import * as z from 'zod';
import { sendEmail } from '@/lib/mail';

const newsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('footer'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const { email, source } = newsletterSchema.parse(body);
    
    // Send email using shared email utility
    const emailResult = await sendEmail({
      subject: `📧 Canter Equestrians - New Newsletter Signup: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EDE7DA; background-color: #F8F4ED;">
          <h2 style="color: #1B3A4B; border-bottom: 2px solid #C9A84C; padding-bottom: 10px; font-family: Georgia, serif; margin-top: 0;">New Newsletter Subscriber</h2>
          <p style="color: #333333; font-size: 14px; line-height: 1.6;">
            A user has subscribed to the Canter Equestrians newsletter:
          </p>
          <div style="background-color: #FFFFFF; padding: 15px; border: 1px solid #EDE7DA; border-radius: 4px; margin: 20px 0; text-align: center;">
            <a href="mailto:${email}" style="color: #1B3A4B; font-weight: bold; font-size: 18px; text-decoration: none;">${email}</a>
          </div>
          <p style="color: #6B7280; font-size: 12px;">
            <strong>Signup Source:</strong> ${source === 'coming-soon' ? 'Horse Collection Countdown Page' : 'Website Footer/Newsletter Form'}
          </p>
          <div style="margin-top: 30px; border-top: 1px solid #EDE7DA; padding-top: 15px; font-size: 11px; color: #9CA3AF; text-align: center;">
            Sent from Canter Equestrians Newsletter System
          </div>
        </div>
      `,
    });
    
    return NextResponse.json(
      { success: true, message: 'Subscribed successfully.', provider: emailResult.provider },
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
