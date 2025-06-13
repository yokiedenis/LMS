import { NextResponse } from "next/server";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import axios from "axios";
import { db } from "@/lib/db";

const DPO_API_URL = "https://secure.3gdirectpay.com/API/v6/";
const COMPANY_TOKEN = "8D3DA73D-9D7F-4E09-96D4-3D44E7A83EA3";
const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://eduskill-mu.vercel.app/";

interface DPOWebhookPayload {
  API3G: {
    TransactionToken: string;
    TransactionStatus: string;
    Result: string;
    ResultExplanation: string;
    CustomerEmail?: string;
  };
}

interface DPOVerifyResponse {
  API3G: {
    Result: string;
    ResultExplanation: string;
    TransactionStatus?: string;
    TransactionApproval?: string;
    TransactionCurrency?: string;
    TransactionAmount?: string;
  };
}

const verifyPayment = async (token: string): Promise<DPOVerifyResponse["API3G"]> => {
  const requestData = {
    CompanyToken: COMPANY_TOKEN,
    Request: "verifyToken",
    TransactionToken: token,
  };

  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
    suppressEmptyNode: true,
  });

  const xmlPayload = builder.build({ API3G: requestData });

  try {
    const response = await axios.post(DPO_API_URL, xmlPayload, {
      headers: { "Content-Type": "application/xml" },
      timeout: 10000,
    });

    const parser = new XMLParser();
    const parsedResponse: DPOVerifyResponse = parser.parse(response.data);

    console.log("DPO Verification Response:", parsedResponse);
    return parsedResponse.API3G;
  } catch (error) {
    console.error("DPO API Verification Error:", error);
    throw new Error("Failed to verify payment token");
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    console.log("DPO Webhook Payload:", body);

    const parser = new XMLParser();
    const parsedPayload: DPOWebhookPayload = parser.parse(body);

    const { TransactionToken, TransactionStatus, Result, ResultExplanation } = parsedPayload.API3G;

    if (!TransactionToken) {
      console.error("Missing TransactionToken in webhook payload");
      return NextResponse.json({ error: "Missing TransactionToken" }, { status: 400 });
    }

    // Verify payment status
    const verificationResult = await verifyPayment(TransactionToken);

    if (verificationResult.Result !== "000" || verificationResult.TransactionStatus !== "Completed") {
      console.error("Payment not verified:", verificationResult);
      await db.transaction.updateMany({
        where: { dpoToken: TransactionToken, status: "PENDING" },
        data: { status: "CANCELLED" },
      });
      return NextResponse.json({ status: "failed" }, { status: 200 });
    }

    // Find transaction
    const transaction = await db.transaction.findFirst({
      where: { dpoToken: TransactionToken, status: "PENDING" },
      include: { purchases: true },
    });

    if (!transaction) {
      console.error("Transaction not found for token:", TransactionToken);
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // Update transaction and create purchase
    await db.$transaction(async (prisma) => {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "COMPLETED" },
      });

      if (transaction.purchases.length === 0) {
        await prisma.purchase.create({
          data: {
            userId: transaction.userId,
            courseId: transaction.courseId,
            transactionId: transaction.id,
           // profile: { connect: { userId: transaction.userId } },
          },
        });
      }
    });

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("DPO Webhook Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}