import { NextResponse } from 'next/server';
import axios from 'axios';

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

const verifyToken = async (token: string) => {
  const payload = {
    CompanyToken: COMPANY_TOKEN,
    Token: token,
  };

  const response = await axios.post(`${DPO_API_URL}verifyToken`, payload);
  return response.data;
};

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    const verificationResponse = await verifyToken(token);
    return NextResponse.json(verificationResponse);
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Failed to verify payment token' }, { status: 500 });
  }
}