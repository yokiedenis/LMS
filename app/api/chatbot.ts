import type { NextApiRequest, NextApiResponse } from 'next';

// Replace 'YOUR_HUGGINGFACE_API_TOKEN' with your actual API token
const HUGGINGFACE_API_TOKEN = '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';
const MODEL_URL = 'https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-distilled-squad';

const getAIResponse = async (message: string) => {
  try {
    const response = await fetch(MODEL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: { question: message, context: "Provide a relevant context for the model." } }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.answer || "I couldn't generate an answer.";
  } catch (error) {
    console.error('Error:', error);
    return 'There was an error processing your request.';
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await getAIResponse(message);
    return res.status(200).json({ reply });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
