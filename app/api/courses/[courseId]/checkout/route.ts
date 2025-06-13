 

// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse, parsedResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // DPO Payment Token Creation
//     tokenResponse = await createToken(amount, serviceType, params);
//     parsedResponse = new XMLParser().parse(tokenResponse);

//     if (parsedResponse.API3G.Result !== '000') {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//     const token = parsedResponse.API3G.TransToken;
//     if (!token) {
//       throw new Error('Invalid token response');
//     }

//     // User Authentication
//     const user = await currentUser();   
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Store transaction details and purchase record in the database
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//       }
//     });

//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     });

//     // Redirect to payment success page
//    // const successRedirectUrl = `${process.env.BASE_URL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//     const successRedirectUrl = `http://localhost:3000/api/payment-success`;

//     return NextResponse.redirect(successRedirectUrl);

//   } catch (error) {
//     if (error instanceof Error) {
//       let errorMessage = error.message;

//       if (tokenResponse && errorMessage.includes('Transaction created')) {
//         parsedResponse = new XMLParser().parse(tokenResponse);
//         return NextResponse.json({
//           url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}`,
//         });
//       }

//       return NextResponse.json({ error: errorMessage }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }





// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = Number(amount).toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse, parsedResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price === 0 ? 0.01 : price;

//     // DPO Payment Token Creation
//     tokenResponse = await createToken(amount, serviceType, params);
//     parsedResponse = new XMLParser().parse(tokenResponse);

//     if (parsedResponse.API3G.Result !== '000') {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//     const token = parsedResponse.API3G.TransToken;
//     if (!token) {
//       throw new Error('Invalid token response');
//     }

//     // User Authentication
//     const user = await currentUser();   
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING', // Initial status
//       }
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to payment success page
//     const successRedirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}&TransactionToken=${token}`;

//     return NextResponse.redirect(successRedirectUrl);

//   } catch (error) {
//     if (error instanceof Error) {
//       let errorMessage = error.message;

//       if (tokenResponse && errorMessage.includes('Transaction created')) {
//         parsedResponse = new XMLParser().parse(tokenResponse);
//         return NextResponse.json({
//           url: `https://secure.3gdirectpay.com/payv3.php?ID=${parsedResponse.API3G.TransToken}`,
//         });
//       }

//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: errorMessage }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }











 
















// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     // Check for success condition. '000' generally means success, but DPO might have other codes for success.
//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation
//     const token = await createToken(amount, serviceType, params);

//     // User Authentication
//     const user = await currentUser();   
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }






// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
// //const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';


// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }


// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token,  // Use dpoToken to find the transaction
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }









// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';



// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction only (no purchase yet)
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       const transaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       console.log('Transaction updated:', transaction);

//       // User Authentication
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the user has already purchased this course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       // Create purchase record only after payment is verified
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       }).catch((error) => {
//         console.error('Failed to create purchase:', error);
//         throw error;
//       });

//       console.log('Purchase created:', purchase);

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }












// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Find the transaction first to ensure it exists
//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     // Update transaction status
//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Double-check the purchase doesn’t already exist
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     if (existingPurchase) {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     }

//     // Create the purchase record
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: courseId,
//         transactionId: updatedTransaction.id,
//       },
//     });

//     console.log('Purchase successfully created:', purchase);

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }





















// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   // Align redirect URL with the GET route path (assuming /api/courses/[courseId]/checkout)
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = params.courseId; // From route params
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET route triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId || !chapterId) {
//     console.error('Missing parameters:', { token, courseId, chapterId });
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       console.error(`Token verification failed for token: ${token}`);
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     console.log('Current user:', user ? user.id : 'No user');
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     console.log('Existing purchase check:', existingPurchase ? 'Found' : 'Not found');

//     if (existingPurchase) {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     }

//     try {
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase successfully created:', purchase);
//     } catch (purchaseError) {
//       console.error('Failed to create purchase:', purchaseError);
//       throw new Error('Purchase creation failed');
//     }

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }







// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser, auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId?: string } // Make chapterId optional
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token') || url.searchParams.get('TransactionToken') || url.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET /checkout triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     // Verify payment token
//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Find transaction and update status
//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     // Get user ID from transaction record
//     const userId = transaction.userId;
//     if (!userId) {
//       return new NextResponse("User not found in transaction", { status: 404 });
//     }

//     // Check if user exists
//     const userExists = await db.user.findUnique({
//       where: { id: userId },
//     });

//     if (!userExists) {
//       return new NextResponse("User not found", { status: 404 });
//     }

//     // Create purchase if not exists
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: userId,
//           courseId: courseId,
//         },
//       },
//     });

//     if (!existingPurchase) {
//       await db.purchase.create({
//         data: {
//           userId: userId,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase created successfully');
//     }

//     // Redirect to success page
//     const redirectUrl = `${baseURL}/payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in payment verification:', error);
    
//     // Update transaction status to failed
//     if (token) {
//       await db.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'FAILED' },
//       }).catch(err => console.error('Failed to update transaction status:', err));
//     }
    
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }












// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId?: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href); // Log the full URL
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   // Broaden the token search to catch DPO's possible parameter names
//   const token = urlObject.searchParams.get('token') || 
//                 urlObject.searchParams.get('TransactionToken') || 
//                 urlObject.searchParams.get('ID') || 
//                 urlObject.searchParams.get('TransID') || 
//                 urlObject.searchParams.get('TransactionID') || // Additional DPO param
//                 urlObject.searchParams.get('transID'); // Case variation
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const authenticatedUser = await currentUser();
//     if (!authenticatedUser || !authenticatedUser.id) {
//       console.error('User not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const result = await db.$transaction(async (prisma) => {
//       const transaction = await prisma.transaction.findUnique({
//         where: { dpoToken: token },
//       });
//       console.log('Fetched transaction:', transaction);

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       if (transaction.userId !== authenticatedUser.id) {
//         throw new Error("Transaction does not belong to authenticated user");
//       }

//       const updatedTransaction = await prisma.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'SUCCESS' },
//       });
//       console.log('Updated transaction to SUCCESS:', updatedTransaction);

//       const userId = transaction.userId;
//       console.log('User ID from transaction:', userId);

//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { profile: true },
//       });
//       console.log('User with profile:', user);
//       if (!user) {
//         throw new Error("User not found");
//       }

//       if (!user.profile) {
//         await prisma.profile.create({
//           data: {
//             userId: userId,
//             name: authenticatedUser.firstName || "Unknown",
//             email: authenticatedUser.emailAddresses[0].emailAddress,
//             dob: new Date(),
//             occupation: "Unknown",
//             bio: null,
//           },
//         });
//         console.log('Created missing profile for user:', userId);
//       }

//       const course = await prisma.course.findUnique({
//         where: { id: courseId },
//       });
//       console.log('Course exists:', course);
//       if (!course) {
//         throw new Error("Course not found");
//       }

//       const existingPurchase = await prisma.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: userId,
//             courseId: courseId,
//           },
//         },
//       });
//       console.log('Existing purchase:', existingPurchase);

//       if (!existingPurchase) {
//         const newPurchase = await prisma.purchase.create({
//           data: {
//             userId: userId,
//             courseId: courseId,
//             transactionId: updatedTransaction.id,
//           },
//         });
//         console.log('Purchase created successfully:', newPurchase);
//       } else {
//         console.log('Purchase already exists, skipping creation');
//       }

//       return updatedTransaction;
//     });

//     const redirectUrl = `${baseURL}payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }








// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser  } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (amount: number | null, serviceType: number, params: { courseId: string; chapterId?: string }) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId?: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser ();
//     if (!user || !user.id) {
//       console.error('User  not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href); // Log the full URL
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   const token = urlObject.searchParams.get('token') || 
//                 urlObject.searchParams.get('TransactionToken') || 
//                 urlObject.searchParams.get('ID') || 
//                 urlObject.searchParams.get('TransID') || 
//                 urlObject.searchParams.get('TransactionID') || 
//                 urlObject.searchParams.get('transID'); 
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const authenticatedUser  = await currentUser ();
//     if (!authenticatedUser  || !authenticatedUser .id) {
//       console.error('User  not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const result = await db.$transaction(async (prisma) => {
//       const transaction = await prisma.transaction.findUnique({
//         where: { dpoToken: token },
//       });
//       console.log('Fetched transaction:', transaction);

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       if (transaction.userId !== authenticatedUser .id) {
//         throw new Error("Transaction does not belong to authenticated user");
//       }

//       const updatedTransaction = await prisma.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'SUCCESS' },
//       });
//       console.log('Updated transaction to SUCCESS:', updatedTransaction);

//       const userId = transaction.userId;
//       console.log('User  ID from transaction:', userId);

//       const user = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { profile: true },
//       });
//       console.log('User  with profile:', user);
//       if (!user) {
//         throw new Error("User  not found");
//       }

//       if (!user.profile) {
//         await prisma.profile.create({
//           data: {
//             userId: userId,
//             name: authenticatedUser .firstName || "Unknown",
//             email: authenticatedUser .emailAddresses[0].emailAddress,
//             dob: new Date(),
//             occupation: "Unknown",
//             bio: null,
//           },
//         });
//         console.log('Created missing profile for user:', userId);
//       }

//       const course = await prisma.course.findUnique({
//         where: { id: courseId },
//       });
//       console.log('Course exists:', course);
//       if (!course) {
//         throw new Error("Course not found");
//       }

//       const existingPurchase = await prisma.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: userId,
//             courseId: courseId,
//           },
//         },
//       });
//       console.log('Existing purchase:', existingPurchase);

//       if (!existingPurchase) {
//         const newPurchase = await prisma.purchase.create({
//           data: {
//             userId: userId,
//             courseId: courseId,
//             transactionId: updatedTransaction.id,
//           },
//         });
//         console.log('Purchase created successfully:', newPurchase);
//       } else {
//         console.log('Purchase already exists, skipping creation');
//       }

//       return updatedTransaction;
//     });

//     const redirectUrl = `${baseURL}payment-success?courseId=${courseId}${chapterId ? `&chapterId=${chapterId}` : ''}`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Payment processing failed' },
//       { status: 500 }
//     );
//   }
// }














// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/';

// const createToken = async (amount: number | null, serviceType: number, params: { courseId: string; chapterId?: string }) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}${params.chapterId ? `&chapterId=${params.chapterId}` : ''}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     console.log('Sending request to DPO API with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 
//         'Content-Type': 'application/xml',
//         'Accept': 'application/xml',
//       },
//     });

//     console.log('DPO API response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G && (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created")) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G?.ResultExplanation || 'Unknown error'}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//       if (error.response?.status === 403) {
//         throw new Error('DPO API access denied (403 Forbidden). Check CompanyToken, IP restrictions, or contact DPO support.');
//       }
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log('Verifying token with payload:', xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     console.log('DPO API verify response:', response.data);
//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(request: Request, { params }: { params: { courseId: string; chapterId?: string } }) {
//   const { price, serviceType } = await request.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createToken(amount, serviceType, params);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       console.error('User not authenticated in POST');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   console.log('GET handler invoked for URL:', request.url);

//   const urlObject = new URL(request.url);
//   console.log('Full Redirect URL from DPO:', urlObject.href);
//   console.log('All Query Parameters:', Object.fromEntries(urlObject.searchParams));

//   const token = urlObject.searchParams.get('TransactionToken') || urlObject.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = urlObject.searchParams.get('chapterId');

//   console.log('Extracted parameters:', { token, courseId, chapterId });

//   if (!token || !courseId) {
//     console.error('Missing required parameters:', { token, courseId });
//     return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=Missing required parameters`);
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=Payment verification failed`);
//     }

//     const authenticatedUser = await currentUser();
//     if (!authenticatedUser || !authenticatedUser.id) {
//       console.error('User not authenticated in GET');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       throw new Error("Transaction not found");
//     }

//     if (transaction.userId !== authenticatedUser.id) {
//       throw new Error("Transaction does not belong to authenticated user");
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Updated transaction to SUCCESS:', updatedTransaction);

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: authenticatedUser.id, courseId: courseId },
//       },
//     });

//     if (!existingPurchase) {
//       const newPurchase = await db.purchase.create({
//         data: {
//           userId: authenticatedUser.id,
//           courseId: courseId,
//           transactionId: updatedTransaction.id,
//         },
//       });
//       console.log('Purchase created successfully:', newPurchase);
//     } else {
//       console.log('Purchase already exists, skipping creation');
//     }

//     const redirectUrl = `${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=success`;
//     console.log('Redirecting to:', redirectUrl);
//     return NextResponse.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);

//     if (token) {
//       try {
//         await db.transaction.update({
//           where: { dpoToken: token },
//           data: { status: 'FAILED' },
//         });
//         console.log('Transaction status updated to FAILED');
//       } catch (updateError) {
//         console.error('Failed to update transaction status:', updateError);
//       }
//     }

//     const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
//     return NextResponse.redirect(`${baseURL}courses/${courseId}/chapters/${chapterId || ''}/payment_success?status=failed&error=${encodeURIComponent(errorMessage)}`);
//   }
// }

















































// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in createToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in createToken:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error in verifyToken:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error in verifyToken:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: params.courseId },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     console.error('Error in POST payment processing:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }

// export async function GET(req: Request, { params }: { params: { courseId: string } }) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token') || url.searchParams.get('TransactionToken') || url.searchParams.get('ID');
//   const courseId = params.courseId;
//   const chapterId = url.searchParams.get('chapterId');

//   console.log('GET route triggered with:', { token, courseId, chapterId });

//   if (!token || !courseId || !chapterId) {
//     console.error('Missing parameters:', { token, courseId, chapterId });
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);
//     console.log('Token verification result:', isVerified);
//     if (!isVerified) {
//       console.error(`Token verification failed for token: ${token}`);
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       console.error(`Transaction not found for token: ${token}`);
//       return new NextResponse("Transaction not found", { status: 404 });
//     }

//     const updatedTransaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'SUCCESS' },
//     });

//     console.log('Transaction updated to SUCCESS:', updatedTransaction);

//     const user = await currentUser();
//     console.log('Current user:', user ? user.id : 'No user');
//     if (!user || !user.id) {
//       console.error('User not authenticated');
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: { userId: user.id, courseId: courseId },
//       },
//     });

//     console.log('Existing purchase check:', existingPurchase ? 'Found' : 'Not found');

//     if (!existingPurchase) {
//       try {
//         await db.$transaction(async (prisma) => {
//           const purchase = await prisma.purchase.create({
//             data: {
//               userId: user.id,
//               courseId: courseId,
//               transactionId: updatedTransaction.id,
//             },
//           });
//           console.log('Purchase successfully created:', purchase);
//           // Verify the purchase exists after creation
//           const verifyPurchase = await prisma.purchase.findUnique({
//             where: {
//               userId_courseId: { userId: user.id, courseId: courseId },
//             },
//           });
//           if (!verifyPurchase) {
//             throw new Error('Purchase record not found after creation');
//           }
//           console.log('Verified purchase:', verifyPurchase);
//         });
//       } catch (purchaseError) {
//         console.error('Failed to create purchase in transaction:', purchaseError);
//         throw new Error('Purchase creation failed');
//       }
//     } else {
//       console.log(`Purchase already exists for user ${user.id} and course ${courseId}`);
//     }

//     return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//   } catch (error) {
//     console.error('Error in GET payment verification:', error);
//     if (token) {
//       await db.transaction.update({
//         where: { dpoToken: token },
//         data: { status: 'FAILED' },
//       }).catch(err => console.error('Failed to update transaction to FAILED:', err));
//     }
//     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
//   }
// }








































































// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token,  // Use dpoToken to find the transaction
//         },
//         data: {
//           status: 'COMPLETED',
//         },
//       });

//       // Redirect to the success page
//      // return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//      return NextResponse.redirect(`${baseURL}/course/${courseId}/chapters/${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }







// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout`; // Simplified base URL for redirect

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   console.log('POST params:', params); // Debug log to verify params
//   console.log('Request body:', { price, serviceType }); // Debug log to verify body

//   try {
//     if (!price) {
//       throw new Error('Price is not provided');
//     }

//     if (!params.chapterId) {
//       throw new Error('ChapterId is missing from route parameters');
//     }

//     const amount = price;

//     // Create DPO payment token and store associated data
//     const { token, courseId, chapterId } = await createToken(amount, serviceType, params);
//     console.log('Token creation result:', { token, courseId, chapterId }); // Debug log

//     // Temporarily store the token and its associated data in the database
//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId: courseId,
//         chapterId: chapterId, // Ensure chapterId is passed here
//         amount: amount,
//         serviceType: serviceType,
//       },
//     });

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<{ token: string; courseId: string; chapterId: string }> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href); // Debug log

//   const token = url.searchParams.get('token');

//   if (!token) {
//     return new NextResponse("Missing token parameter", { status: 400 });
//   }

//   try {
//     // Verify the payment with DPO
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // User Authentication
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Retrieve pending transaction data using the token
//       const pendingTransaction = await db.pendingTransaction.findUnique({
//         where: { dpoToken: token },
//       });

//       if (!pendingTransaction) {
//         return new NextResponse("No pending transaction found", { status: 404 });
//       }

//       const { courseId, chapterId, amount } = pendingTransaction;

//       // Check if course exists and is published
//       const course = await db.course.findUnique({
//         where: {
//           id: courseId,
//           isPublished: true,
//         },
//       });

//       if (!course) {
//         return new NextResponse("Course not found", { status: 404 });
//       }

//       // Create Transaction
//       const transaction = await db.transaction.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           amount: amount,
//           dpoToken: token,
//           status: 'COMPLETED',
//         },
//       });

//       // Create Purchase
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       });

//       // Optionally update user progress
//       await db.userProgress.upsert({
//         where: {
//           userId_chapterId: {
//             userId: user.id,
//             chapterId: chapterId,
//           },
//         },
//         update: {
//           isCompleted: false,
//         },
//         create: {
//           userId: user.id,
//           chapterId: chapterId,
//           courseId: courseId,
//           isCompleted: false,
//         },
//       });

//       // Clean up the pending transaction
//       await db.pendingTransaction.delete({
//         where: { dpoToken: token },
//       });

//       // Redirect to success page
//       return NextResponse.redirect(`${baseURL}/course/${courseId}/chapters/${chapterId}?success=true`);
//     } else {
//       // Payment failed, clean up pending transaction and redirect to failure page
//       await db.pendingTransaction.deleteMany({
//         where: { dpoToken: token },
//       });
//       return NextResponse.redirect(`${baseURL}/payment-failed?token=${token}`);
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }








// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/checkout`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return {
//         token: parsedResponse.API3G.TransToken,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//       };
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to create payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string } }) {
//   const { price, serviceType, chapterId } = await req.json();

//   console.log('POST params:', params);
//   console.log('Request body:', { price, serviceType, chapterId });

//   try {
//     if (!price) throw new Error('Price is not provided');
//     if (!chapterId) throw new Error('ChapterId is missing from request body');

//     const amount = price;

//     const { token, courseId, chapterId: cid } = await createToken(amount, serviceType, {
//       courseId: params.courseId,
//       chapterId,
//     });

//     await db.pendingTransaction.create({
//       data: {
//         dpoToken: token,
//         courseId,
//         chapterId: cid,
//         amount,
//         serviceType,
//       },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     console.error('Error in payment processing:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: { 'Content-Type': 'application/xml' },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' && parsedResponse.API3G.Status === 'CAPTURED') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation || 'Payment not captured'}`);
//     }

//   } catch (error) {
//     console.error('DPO API Error:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   console.log('Incoming GET request URL:', url.href);
//   const token = url.searchParams.get('token'); // if applicable
//   return NextResponse.json({ message: 'GET handler not implemented' });
// }






// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     }).catch((error: unknown) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       const transaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       console.log('Transaction updated to SUCCESS:', transaction);

//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       }).catch((error: unknown) => {
//         console.error('Failed to create purchase:', error);
//         throw error;
//       });

//       console.log('Purchase created:', purchase);

//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           id: transaction.id,
//         },
//         data: {
//           status: 'COMPLETED',
//         },
//       });
//       console.log('Transaction status updated to COMPLETED');

//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error: unknown) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }








// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}&token={{token}}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsedResponse = new XMLParser().parse(response.data);

//   if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//     return parsedResponse.API3G.TransToken;
//   } else {
//     throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsedResponse = new XMLParser().parse(response.data);

//   if (parsedResponse.API3G.Result === '000') {
//     return true;
//   } else {
//     throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//   }
// };

// // STEP 1: Handle POST (create payment + transaction)
// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // STEP 1.1: Create payment token (with retry)
//     const token = await createTokenWithRetry(price, serviceType, params, 3);

//     // STEP 2: Create transaction with PENDING status
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: price,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     console.log('Transaction created:', transaction);

//     // STEP 3: Redirect to payment URL
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error: any) {
//     console.error('Error in POST /checkout:', error);
//     return NextResponse.json({ error: error.message || 'Payment error' }, { status: 500 });
//   }
// }

// // STEP 4+: Handle GET (verification after redirect)
// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // STEP 5: Verify payment
//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // STEP 6: Update transaction to SUCCESS
//     const transaction = await db.transaction.update({
//       where: { dpoToken: token },
//       data: { status: 'COMPLETED' },
//     });

//     console.log('Transaction marked COMPLETED:', transaction);

//     // STEP 7: Check if already purchased
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // STEP 8: Create purchase record
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId,
//         transactionId: transaction.id,
//       },
//     });

//     console.log('Purchase created:', purchase);

//     // STEP 9: Update transaction to COMPLETED
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: 'COMPLETED' },
//     });

//     console.log('Transaction marked COMPLETED');

//     // Final: Redirect to frontend
//     return NextResponse.redirect(`${baseURL}/courses/${courseId}/chapters/${chapterId}/payment-success`);
//   } catch (error: any) {
//     console.error('Error in GET /payment-success:', error);
//     return NextResponse.json({ error: error.message || 'Verification error' }, { status: 500 });
//   }
// }

// // Retry logic (unchanged)
// async function createTokenWithRetry(
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   retries: number
// ): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Token attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create token after multiple attempts');
// }











// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}&token={{token}}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsedResponse = new XMLParser().parse(response.data);

//   if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//     return parsedResponse.API3G.TransToken;
//   } else {
//     throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   const response = await axios.post(DPO_API_URL, xmlPayload, {
//     headers: { 'Content-Type': 'application/xml' },
//   });

//   const parsedResponse = new XMLParser().parse(response.data);

//   if (parsedResponse.API3G.Result === '000') {
//     return true;
//   } else {
//     throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const course = await db.course.findUnique({
//       where: { id: params.courseId, isPublished: true },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const token = await createTokenWithRetry(price, serviceType, params, 3);

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: price,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error: any) {
//     console.error('Error in POST /checkout:', error);
//     return NextResponse.json({ error: error.message || 'Payment error' }, { status: 500 });
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const isVerified = await verifyToken(token);
//     if (!isVerified) {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     const transaction = await db.transaction.findFirst({
//       where: { dpoToken: token },
//     });

//     if (!transaction) {
//       throw new Error("Transaction not found");
//     }

//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: 'COMPLETED' },
//     });

//     let purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId,
//         },
//       },
//     });

//     if (!purchase) {
//       purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId,
//           transactionId: transaction.id,
//         },
//       });
//     }

//     return NextResponse.redirect(`${baseURL}/courses/${courseId}/chapters/${chapterId}`);
//   } catch (error: any) {
//     console.error('Error in GET /payment-success:', error);
//     return NextResponse.json({ error: error.message || 'Verification error' }, { status: 500 });
//   }
// }

// async function createTokenWithRetry(
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   retries: number
// ): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Token attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create token after multiple attempts');
// }










// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       },
//     }).catch((error: unknown) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       const transaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       console.log('Transaction updated:', transaction);

//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         return new NextResponse("Already Purchased", { status: 400 });
//       }

//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       }).catch((error: unknown) => {
//         console.error('Failed to create purchase:', error);
//         throw error;
//       });

//       console.log('Purchase created:', purchase);

//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error: unknown) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }









// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
// //const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';


// const createToken = async (
//   amount: number | null | undefined,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to create payment token');
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         'Content-Type': 'application/xml',
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === '000') {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('DPO API Error:', error.response?.data || error.message);
//     } else {
//       console.error('DPO API Error:', error);
//     }
//     throw new Error('Failed to verify payment token');
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();
//   let tokenResponse;

//   try {
//     if (price == null) {
//       throw new Error('Price is not provided');
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         dpoToken: token,
//         status: 'PENDING',
//       }
//     }).catch((error) => {
//       console.error('Failed to create transaction:', error);
//       throw error;
//     });

//     console.log('Transaction created:', transaction);

//     // Create purchase
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         transactionId: transaction.id,
//       }
//     }).catch((error) => {
//       console.error('Failed to create purchase:', error);
//       throw error;
//     });

//     console.log('Purchase created:', purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment processing:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error('Failed to create payment token after multiple attempts');
// }


// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');
//   const courseId = url.searchParams.get('courseId');
//   const chapterId = url.searchParams.get('chapterId');

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token,  // Use dpoToken to find the transaction
//         },
//         data: {
//           status: 'SUCCESS',
//         },
//       });

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Error in payment verification:', error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error:', error);
//       return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
//     }
//   }
// }









// import { NextResponse } from "next/server";
// import axios from "axios";
// import { XMLParser, XMLBuilder } from "fast-xml-parser";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
// const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

// interface DPORequest {
//   CompanyToken: string;
//   Request: string;
//   Transaction: {
//     PaymentAmount: string;
//     PaymentCurrency: string;
//     RedirectURL: string;
//     BackURL: string;
//     CompanyRefUnique: string;
//     PTL?: string;
//   };
//   Services: {
//     Service: {
//       ServiceType: number;
//       ServiceDescription: string;
//       ServiceDate: string;
//     };
//   };
//   CustomerEmail?: string;
// }

// interface DPOResponse {
//   API3G: {
//     Result: string;
//     ResultExplanation: string;
//     TransToken?: string;
//     TransactionStatus?: string;
//   };
// }

// const createToken = async (
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   userEmail: string
// ): Promise<string> => {
//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split("T")[0];
//   const redirectUrl = `${baseURL}/api/courses/${params.courseId}/chapters/${params.chapterId}/payment-success`;
//   const backUrl = `${baseURL}/api/courses/${params.courseId}/chapters/${params.chapterId}/payment-cancel`;

//   const requestData: DPORequest = {
//     CompanyToken: COMPANY_TOKEN,
//     Request: "createToken",
//     Transaction: {
//       PaymentAmount: formattedAmount,
//       PaymentCurrency: "USD",
//       RedirectURL: redirectUrl,
//       BackURL: backUrl,
//       CompanyRefUnique: "0",
//       PTL: "5",
//     },
//     Services: {
//       Service: {
//         ServiceType: serviceType,
//         ServiceDescription: `Course Purchase - ${params.courseId}`,
//         ServiceDate: serviceDate,
//       },
//     },
//     CustomerEmail: userEmail,
//   };

//   const builder = new XMLBuilder({
//     format: true,
//     ignoreAttributes: false,
//     suppressEmptyNode: true,
//   });

//   const xmlPayload = builder.build({ API3G: requestData });

//   try {
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//       timeout: 10000,
//     });

//     console.log("DPO API Response:", response.data);

//     const parser = new XMLParser();
//     const parsedResponse: DPOResponse = parser.parse(response.data);

//     if (
//       parsedResponse.API3G.Result === "000" ||
//       parsedResponse.API3G.ResultExplanation.includes("Transaction created")
//     ) {
//       if (!parsedResponse.API3G.TransToken) {
//         throw new Error("Transaction token not received");
//       }
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     console.error("DPO API Error:", error);
//     throw new Error("Failed to create payment token");
//   }
// };

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { price, serviceType } = await req.json();

//     if (price === undefined || price === null || isNaN(Number(price))) {
//       return NextResponse.json(
//         { error: "Valid price is required" },
//         { status: 400 }
//       );
//     }

//     if (!serviceType || isNaN(Number(serviceType))) {
//       return NextResponse.json(
//         { error: "Valid service type is required" },
//         { status: 400 }
//       );
//     }

//     const amount = Number(price);
//     const numericServiceType = Number(serviceType);

//     const user = await currentUser();
//     if (!user?.id || !user.emailAddresses?.[0]?.emailAddress) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found or not published", { status: 404 });
//     }

//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already purchased this course", { status: 409 });
//     }

//     // Clean up old pending transactions
//     await db.transaction.updateMany({
//       where: {
//         userId: user.id,
//         courseId: params.courseId,
//         status: "PENDING",
//         createdAt: {
//           lte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expire after 24 hours
//         },
//       },
//       data: {
//         status: "CANCELLED",
//       },
//     });

//     // Create transaction record
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         chapterId: params.chapterId, // Fix: Add chapterId
//         amount: amount,
//         status: "PENDING",
//       },
//     });

//     const token = await createToken(amount, numericServiceType, params, user.emailAddresses[0].emailAddress);

//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { dpoToken: token },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//       transactionId: transaction.id,
//     });
//   } catch (error) {
//     console.error("Checkout Error:", {
//       error: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : undefined,
//       courseId: params.courseId,
//       chapterId: params.chapterId,
//       userId: (await currentUser())?.id,
//     });
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Checkout failed",
//         details:
//           process.env.NODE_ENV === "development"
//             ? error instanceof Error
//               ? error.stack
//               : undefined
//             : undefined,
//       },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import axios from "axios";
// import { XMLParser } from "fast-xml-parser";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
// const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://eduskill-mu.vercel.app/";

// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: { courseId: string; chapterId: string }
// ) => {
//   if (amount == null) {
//     throw new Error("Payment amount is not provided");
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split("T")[0];
//   const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>createToken</Request>
//       <Transaction>
//         <PaymentAmount>${formattedAmount}</PaymentAmount>
//         <PaymentCurrency>USD</PaymentCurrency>
//         <RedirectURL>${redirectUrl}</RedirectURL>
//         <BackURL>${redirectUrl}</BackURL>
//         <CompanyRefUnique>0</CompanyRefUnique>
//       </Transaction>
//       <Services>
//         <Service>
//           <ServiceType>${serviceType}</ServiceType>
//           <ServiceDescription>Test Service</ServiceDescription>
//           <ServiceDate>${serviceDate}</ServiceDate>
//         </Service>
//       </Services>
//     </API3G>`;

//   try {
//     console.log("DPO API Request Payload:", xmlPayload);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === "000" || parsedResponse.API3G.ResultExplanation === "Transaction created") {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("DPO API Error:", error.response?.data || error.message);
//     } else {
//       console.error("DPO API Error:", error);
//     }
//     throw new Error("Failed to create payment token");
//   }
// };

// const verifyToken = async (token: string) => {
//   const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
//     <API3G>
//       <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
//       <Request>verifyToken</Request>
//       <TransactionToken>${token}</TransactionToken>
//     </API3G>`;

//   try {
//     console.log("Verifying token:", token);
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);
//     console.log("DPO Verification Response:", parsedResponse);

//     if (parsedResponse.API3G.Result === "000") {
//       return true;
//     } else {
//       throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("DPO API Error:", error.response?.data || error.message);
//     } else {
//       console.error("DPO API Error:", error);
//     }
//     throw new Error("Failed to verify payment token");
//   }
// };

// export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
//   const { price, serviceType } = await req.json();

//   try {
//     if (price == null) {
//       throw new Error("Price is not provided");
//     }

//     const amount = price;

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // User Authentication
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the user has already purchased this course
//     const existingPurchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (existingPurchase) {
//       return new NextResponse("Already Purchased", { status: 400 });
//     }

//     // Create transaction with chapterId
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//         amount: amount,
//         dpoToken: token,
//         status: "PENDING",
//       },
//     }).catch((error) => {
//       console.error("Failed to create transaction:", {
//         error,
//         userId: user.id,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//         amount,
//         dpoToken: token,
//       });
//       throw new Error("Failed to create transaction");
//     });

//     console.log("Transaction created:", transaction);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in payment processing:", {
//         error: error.message,
//         stack: error.stack,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//         userId: (await currentUser())?.id,
//       });
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error("Unexpected error:", error);
//       return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
//     }
//   }
// }

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get("token");
//   const courseId = url.searchParams.get("courseId");
//   const chapterId = url.searchParams.get("chapterId");

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token
//     const isVerified = await verifyToken(token);

//     if (isVerified) {
//       // Find the transaction
//       const transaction = await db.transaction.findUnique({
//         where: {
//           dpoToken: token,
//         },
//       });

//       if (!transaction) {
//         throw new Error("Transaction not found");
//       }

//       // Update transaction status to COMPLETED
//       const updatedTransaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: "COMPLETED",
//         },
//       });

//       console.log("Transaction updated to COMPLETED:", updatedTransaction);

//       // User Authentication
//       const user = await currentUser();
//       if (!user || !user.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//       // Check if the user has already purchased this course
//       const existingPurchase = await db.purchase.findUnique({
//         where: {
//           userId_courseId: {
//             userId: user.id,
//             courseId: courseId,
//           },
//         },
//       });

//       if (existingPurchase) {
//         console.log("Purchase already exists:", existingPurchase);
//         return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//       }

//       // Create purchase record only after payment is verified
//       const purchase = await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       }).catch((error) => {
//         console.error("Failed to create purchase:", {
//           error,
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         });
//         throw new Error("Failed to create purchase");
//       });

//       console.log("Purchase created:", purchase);

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
//       // Update transaction status to FAILED if verification fails
//       await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: "FAILED",
//         },
//       });
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in payment verification:", {
//         error: error.message,
//         stack: error.stack,
//         token,
//         courseId,
//         chapterId,
//       });
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       console.error("Unexpected error:", error);
//       return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
//     }
//   }
// }

// async function createTokenWithRetry(
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   retries: number
// ): Promise<string> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await createToken(amount, serviceType, params);
//     } catch (error) {
//       if (i < retries - 1) {
//         console.warn(`Attempt ${i + 1} failed. Retrying...`);
//       } else {
//         throw error;
//       }
//     }
//   }
//   throw new Error("Failed to create payment token after multiple attempts");
// }












import { NextResponse } from 'next/server';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
const COMPANY_TOKEN = '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';
//const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';


const createToken = async (
  amount: number | null | undefined,
  serviceType: number,
  params: { courseId: string; chapterId: string }
) => {
  if (amount == null) {
    throw new Error('Payment amount is not provided');
  }

  const formattedAmount = amount.toFixed(2);
  const serviceDate = new Date().toISOString().split('T')[0];
  const redirectUrl = `${baseURL}/api/payment-success?courseId=${params.courseId}&chapterId=${params.chapterId}`;

  const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <API3G>
      <CompanyToken>${COMPANY_TOKEN}</CompanyToken>
      <Request>createToken</Request>
      <Transaction>
        <PaymentAmount>${formattedAmount}</PaymentAmount>
        <PaymentCurrency>USD</PaymentCurrency>
        <RedirectURL>${redirectUrl}</RedirectURL>
        <BackURL>${redirectUrl}</BackURL>
        <CompanyRefUnique>0</CompanyRefUnique>
      </Transaction>
      <Services>
        <Service>
          <ServiceType>${serviceType}</ServiceType>
          <ServiceDescription>Test Service</ServiceDescription>
          <ServiceDate>${serviceDate}</ServiceDate>
        </Service>
      </Services>
    </API3G>`;

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const parsedResponse = new XMLParser().parse(response.data);

    if (parsedResponse.API3G.Result === '000' || parsedResponse.API3G.ResultExplanation === "Transaction created") {
      return parsedResponse.API3G.TransToken;
    } else {
      throw new Error(`DPO API Error: ${parsedResponse.API3G.ResultExplanation}`);
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('DPO API Error:', error.response?.data || error.message);
    } else {
      console.error('DPO API Error:', error);
    }
    throw new Error('Failed to create payment token');
  }
};

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

export async function POST(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
  const { price, serviceType } = await req.json();
  let tokenResponse;

  try {
    if (price == null) {
      throw new Error('Price is not provided');
    }

    const amount = price;

    // DPO Payment Token Creation with Retry
    const token = await createTokenWithRetry(amount, serviceType, params, 3);

    // User Authentication
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if course exists and is published
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if the user has already purchased this course
    const existingPurchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (existingPurchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    // Create transaction
    const transaction = await db.transaction.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        chapterId: params.chapterId,
        amount: amount,
        dpoToken: token,
        status: 'PENDING',
      }
    }).catch((error) => {
      console.error('Failed to create transaction:', error);
      throw error;
    });

    console.log('Transaction created:', transaction);

    // Create purchase
    const purchase = await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
        transactionId: transaction.id,
      }
    }).catch((error) => {
      console.error('Failed to create purchase:', error);
      throw error;
    });

    console.log('Purchase created:', purchase);

    // Redirect to DPO payment page
    return NextResponse.json({
      url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in payment processing:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}

async function createTokenWithRetry(amount: number, serviceType: number, params: { courseId: string; chapterId: string }, retries: number): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      return await createToken(amount, serviceType, params);
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Attempt ${i + 1} failed. Retrying...`);
      } else {
        throw error;
      }
    }
  }
  throw new Error('Failed to create payment token after multiple attempts');
}


export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const courseId = url.searchParams.get('courseId');
  const chapterId = url.searchParams.get('chapterId');

  if (!token || !courseId || !chapterId) {
    return new NextResponse("Missing parameters", { status: 400 });
  }

  try {
    // Verify the token
    const isVerified = await verifyToken(token);

    if (isVerified) {
      // Update transaction status to COMPLETED
      await db.transaction.update({
        where: {
          dpoToken: token,  // Use dpoToken to find the transaction
        },
        data: {
          status: 'SUCCESS',
        },
      });

      // Redirect to the success page
      return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
    } else {
      return new NextResponse("Payment verification failed", { status: 400 });
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in payment verification:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}

