import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json(); // Process the request data


    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: { id: Date.now() }
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
