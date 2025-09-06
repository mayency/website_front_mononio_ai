import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Here you will add logic to save the data (DB, email, etc.)
    console.log('Campaign submission:', data);

    return NextResponse.json({
      success: true,
      message: 'Campaign submitted successfully',
      data: { id: Date.now() }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
