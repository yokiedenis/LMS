





// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { revalidatePath } from 'next/cache';

// const DPO_API_URL = 'https://secure.3gdirectpay.com/API/v6/';
// const COMPANY_TOKEN = process.env.COMPANY_TOKEN || '8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3';
// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://eduskill-mu.vercel.app/';

// interface PaymentParams {
//   courseId: string;
//   chapterId: string;
// }

// // Token Creation Function
// const createToken = async (
//   amount: number | null,
//   serviceType: number,
//   params: PaymentParams
// ) => {
//   if (amount == null) {
//     throw new Error('Payment amount is not provided');
//   }

//   const formattedAmount = amount.toFixed(2);
//   const serviceDate = new Date().toISOString().split('T')[0];
//   const redirectUrl = `${baseURL}/courses/${params.courseId}/chapters/${params.chapterId}`; // Updated to point to GET endpoint

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

// // Token Verification Function
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

//     // Create transaction with PENDING status before payment
//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         chapterId: params.chapterId,
//         amount: amount,
//         dpoToken: null, // Will be updated later
//         status: 'PENDING',
//       },
//     });

//     // DPO Payment Token Creation with Retry
//     const token = await createTokenWithRetry(amount, serviceType, params, 3);

//     // Update the transaction with the DPO token
//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { dpoToken: token },
//     });

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}&transactionId=${transaction.id}`,
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
//   const transactionId = url.searchParams.get('transactionId');

//   if (!token || !courseId || !chapterId || !transactionId) {
//     return new NextResponse("Missing parameters", { status: 400 });
//   }

//   try {
//     // Verify the token (ensure payment was successful)
//     const isVerified = await verifyToken(token);

//     if (!isVerified) {
//       // Update transaction status to FAILED if verification fails
//       await db.transaction.update({
//         where: { id: transactionId },
//         data: { status: 'FAILED' },
//       });
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }

//     // Get the current user
//     const user = await currentUser();
//     if (!user || !user.id) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Check if course exists and is published
//     const course = await db.course.findUnique({
//       where: {
//         id: courseId,
//         isPublished: true,
//       },
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Update transaction status to COMPLETED
//     const updatedTransaction = await db.transaction.update({
//       where: { id: transactionId },
//       data: {
//         status: 'COMPLETED',
//         dpoToken: token, // Ensure DPO token is stored
//       },
//     });

//     // Create purchase after successful payment
//     const purchase = await db.purchase.create({
//       data: {
//         userId: user.id,
//         courseId: courseId,
//         transactionId: updatedTransaction.id,
//       },
//     });

//     console.log('Transaction updated and Purchase created after successful DPO payment:', { transaction: updatedTransaction, purchase });

//     // Revalidate the chapter page to ensure UI updates
//     revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);

//     // Redirect to the payment success page
//     return NextResponse.redirect(
//       `${baseURL}/courses/${courseId}/chapters/${chapterId}/payment-success`
//     );

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
//         chapterId: params.chapterId,
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
//           status: 'COMPLETED',
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
//         chapterId: params.chapterId, // Added missing chapterId
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
//       throw error;
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
//       // Update transaction status to COMPLETED
//       const transaction = await db.transaction.update({
//         where: {
//           dpoToken: token,
//         },
//         data: {
//           status: "COMPLETED",
//         },
//       });

//       console.log("Transaction updated:", transaction);

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
//         console.error("Failed to create purchase:", {
//           error,
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         });
//         throw error;
//       });

//       console.log("Purchase created:", purchase);

//       // Redirect to the success page
//       return NextResponse.redirect(`${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`);
//     } else {
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
//           status: "SUCCESS",
//         },
//       });

//       console.log("Transaction updated to SUCCESS:", updatedTransaction);

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












// import { NextResponse } from "next/server";
// import axios from "axios";
// import { XMLParser } from "fast-xml-parser";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
// const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduskill-mu.vercel.app/';

// const createToken = async (
//   amount: number | null | undefined,
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
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (
//       parsedResponse.API3G.Result === "000" ||
//       parsedResponse.API3G.ResultExplanation === "Transaction created"
//     ) {
//       return parsedResponse.API3G.TransToken;
//     } else {
//       throw new Error(
//         `DPO API Error: ${parsedResponse.API3G.ResultExplanation}`
//       );
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
//     const response = await axios.post(DPO_API_URL, xmlPayload, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const parsedResponse = new XMLParser().parse(response.data);

//     if (parsedResponse.API3G.Result === "000") {
//       return true;
//     } else {
//       throw new Error(
//         `DPO API Error: ${parsedResponse.API3G.ResultExplanation}`
//       );
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

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const body = await req.json();
//     console.log("Request body:", body); // Log the request body for debugging

//     const { price, serviceType } = body;

//     if (price == null || serviceType == null) {
//       return new NextResponse(
//         JSON.stringify({
//           error: "Missing required fields: price and serviceType are required",
//         }),
//         { status: 400 }
//       );
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
//     const transaction = await db.transaction
//       .create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           chapterId: params.chapterId,
//           amount: amount,
//           dpoToken: token,
//           status: "PENDING",
//         },
//       })
//       .catch((error) => {
//         console.error("Failed to create transaction:", error);
//         throw error;
//       });

//     console.log("Transaction created:", transaction);

//     // Create purchase
//     const purchase = await db.purchase
//       .create({
//         data: {
//           userId: user.id,
//           courseId: params.courseId,
//           transactionId: transaction.id,
//         },
//       })
//       .catch((error) => {
//         console.error("Failed to create purchase:", error);
//         throw error;
//       });

//     console.log("Purchase created:", purchase);

//     // Redirect to DPO payment page
//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//     });
//   } catch (error) {
//     if (error instanceof SyntaxError) {
//       console.error("Invalid JSON in request body:", error);
//       return new NextResponse(
//         JSON.stringify({ error: "Invalid request body" }),
//         { status: 400 }
//       );
//     } else if (error instanceof Error) {
//       console.error("Error in payment processing:", error);
//       return new NextResponse(
//         JSON.stringify({ error: error.message }),
//         { status: 500 }
//       );
//     } else {
//       console.error("Unexpected error:", error);
//       return new NextResponse(
//         JSON.stringify({ error: "An unexpected error occurred" }),
//         { status: 500 }
//       );
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
//       // Update transaction status to COMPLETED
//       await db.transaction.update({
//         where: {
//           dpoToken: token, // Use dpoToken to find the transaction
//         },
//         data: {
//           status: "SUCCESS",
//         },
//       });

//       // Redirect to the success page
//       return NextResponse.redirect(
//         `${baseURL}/payment-success?courseId=${courseId}&chapterId=${chapterId}`
//       );
//     } else {
//       return new NextResponse("Payment verification failed", { status: 400 });
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in payment verification:", error);
//       return new NextResponse(
//         JSON.stringify({ error: error.message }),
//         { status: 500 }
//       );
//     } else {
//       console.error("Unexpected error:", error);
//       return new NextResponse(
//         JSON.stringify({ error: "An unexpected error occurred" }),
//         { status: 500 }
//       );
//     }
//   }
// }







 
//export default GET



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
//   const redirectUrl = `${baseURL}/api/payment/success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//   const backUrl = `${baseURL}/api/payment/cancel?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

// const verifyPayment = async (token: string): Promise<boolean> => {
//   const requestData = {
//     CompanyToken: COMPANY_TOKEN,
//     Request: "verifyToken",
//     TransactionToken: token,
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
//       timeout: 5000,
//     });

//     const parser = new XMLParser();
//     const parsedResponse: DPOResponse = parser.parse(response.data);

//     return (
//       parsedResponse.API3G.Result === "000" &&
//       parsedResponse.API3G.TransactionStatus === "Completed"
//     );
//   } catch (error) {
//     console.error("DPO API Verification Error:", error);
//     throw new Error("Failed to verify payment token");
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

//     // Clean up old pending transactions for this user and course
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

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
//         amount: amount,
//         status: "PENDING",
//       },
//     });

//     const token = await createTokenWithRetry(
//       amount,
//       numericServiceType,
//       params,
//       user.emailAddresses[0].emailAddress,
//       3
//     );

//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { dpoToken: token },
//     });

//     return NextResponse.json({
//       url: `https://secure.3gdirectpay.com/payv3.php?ID=${token}`,
//       transactionId: transaction.id,
//     });
//   } catch (error) {
//     console.error("Checkout Error:", error);
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

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get("token");
//   const courseId = url.searchParams.get("courseId");
//   const chapterId = url.searchParams.get("chapterId");

//   if (!token || !courseId || !chapterId) {
//     return new NextResponse("Missing required parameters", { status: 400 });
//   }

//   try {
//     const isPaymentCompleted = await verifyPayment(token);
//     if (!isPaymentCompleted) {
//       return NextResponse.redirect(
//         `${baseURL}/payment-error?reason=payment_not_verified`
//       );
//     }

//     const user = await currentUser();
//     if (!user?.id) {
//       return NextResponse.redirect(`${baseURL}/login?redirect=/payment-success`);
//     }

//     const transaction = await db.transaction.findUnique({
//       where: { dpoToken: token },
//       include: { purchases: true },
//     });

//     if (!transaction) {
//       return NextResponse.redirect(
//         `${baseURL}/payment-error?reason=transaction_not_found`
//       );
//     }

//     if (transaction.status === "COMPLETED" && transaction.purchases.length > 0) {
//       return NextResponse.redirect(
//         `${baseURL}/courses/${courseId}/chapters/${chapterId}`
//       );
//     }

//     await db.transaction.update({
//       where: { id: transaction.id },
//       data: { status: "COMPLETED" },
//     });

//     if (transaction.purchases.length === 0) {
//       await db.purchase.create({
//         data: {
//           userId: user.id,
//           courseId: courseId,
//           transactionId: transaction.id,
//         },
//       });
//     }

//     return NextResponse.redirect(
//       `${baseURL}/courses/${courseId}/chapters/${chapterId}`
//     );
//   } catch (error) {
//     console.error("Payment Verification Error:", error);
//     return NextResponse.redirect(`${baseURL}/payment-error?reason=server_error`);
//   }
// }

// async function createTokenWithRetry(
//   amount: number,
//   serviceType: number,
//   params: { courseId: string; chapterId: string },
//   userEmail: string,
//   maxRetries: number
// ): Promise<string> {
//   let lastError: Error | undefined;

//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     try {
//       return await createToken(amount, serviceType, params, userEmail);
//     } catch (error) {
//       lastError = error instanceof Error ? error : new Error(String(error));
//       console.warn(`Attempt ${attempt} failed:`, lastError.message);

//       if (attempt < maxRetries) {
//         await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
//       }
//     }
//   }

//   throw lastError || new Error("Failed to create payment token after multiple attempts");
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
//   const redirectUrl = `${baseURL}/api/payment/success?courseId=${params.courseId}&chapterId=${params.chapterId}`;
//   const backUrl = `${baseURL}/api/payment/cancel?courseId=${params.courseId}&chapterId=${params.chapterId}`;

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

//     const transaction = await db.transaction.create({
//       data: {
//         userId: user.id,
//         courseId: params.courseId,
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
//     console.error("Checkout Error:", error);
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
//     console.log("DPO API Request Payload:", xmlPayload); // Log request payload
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
//         chapterId: params.chapterId,
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
// import { XMLParser, XMLBuilder } from "fast-xml-parser";
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
// const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
// const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://eduskill-mu.vercel.app/";

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
//   userEmail: string,
//   userId: string
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
//       CompanyRefUnique: userId, // Using user ID as unique reference
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
//     console.log("DPO API Request Payload:", xmlPayload);
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
//         chapterId: params.chapterId,
//         amount: amount,
//         status: "PENDING",
//       },
//     });

//     const token = await createToken(
//       amount,
//       numericServiceType,
//       params,
//       user.emailAddresses[0].emailAddress,
//       user.id
//     );

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