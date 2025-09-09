import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await request.json(); // Process the request data

    // Here you will add logic to save the data (DB, email, etc.)

    return NextResponse.json({
      success: true,
      message: 'Campaign submitted successfully',
      data: { id: Date.now() }
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
