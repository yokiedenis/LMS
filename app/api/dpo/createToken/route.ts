import express from 'express';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const app = express();
app.use(express.json());

app.post('/api/dpo/createToken', async (req, res) => {
  const { amount, currency, companyToken, serviceType, redirectUrl, cancelUrl } = req.body;

  const payload = `<?xml version="1.0" encoding="utf-8"?>
  <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>createToken</Request>
    <TransactionAmount>${amount}</TransactionAmount>
    <CurrencyCode>${currency}</CurrencyCode>
    <ServiceType>${serviceType}</ServiceType>
    <RedirectURL>${redirectUrl}</RedirectURL>
    <CancelURL>${cancelUrl}</CancelURL>
  </API3G>`;

  try {
    const response = await fetch('https://secure.3gdirectpay.com/API/v6/', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: payload
    });

    const text = await response.text();
    
    // Parse XML to JSON using xml2js
    const jsonData = await parseStringPromise(text, { explicitArray: false });
    
    res.json(jsonData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create token' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));