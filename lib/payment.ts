import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = process.env.COMPANY_TOKEN || '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

const verifyToken = async (token: string) => {
  const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <API3G>
      <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
      <Request>verifyToken</Request>
      <TransactionToken>${token}</TransactionToken>
    </API3G>`;

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const parsedResponse = new XMLParser().parse(response.data);

    if (parsedResponse.API3G.Result === '000') {
      return true;
    } else {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to verify payment token');
  }
};

export default verifyToken;  // Default export
