import { NextResponse } from 'next/server';
import * as z from 'zod';

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
    
    // In a real application, you would connect to Nodemailer, Resend, or SendGrid here:
    // await sendEmail(parsedData);
    
    // Mock success delay
    await new Promise((resolve) => setTimeout(resolve, 800));

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
    
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
