import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('Contact form submission:', data);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: { id: Date.now() }
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
