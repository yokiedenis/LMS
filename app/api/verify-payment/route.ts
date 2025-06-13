import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    // Verify the token using DPO API
    const verifyRequestData = {
      companyToken: "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3",
      token,
    };

    const { data } = await axios.post("https://secure.3gdirectpay.com/API/v6/VerifyToken", verifyRequestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data && data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
