"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function PaymentCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const chapterId = searchParams.get("chapterId");
  const reason = searchParams.get("reason");

  const getErrorMessage = () => {
    switch (reason) {
      case "payment_not_verified":
        return "The payment could not be verified. Please try again.";
      case "transaction_not_found":
        return "The transaction was not found. Please contact support.";
      case "missing_parameters":
        return "Invalid request. Please try again.";
      case "server_error":
        return "An unexpected error occurred. Please try again later.";
      default:
        return "Your payment was cancelled or failed. Please try again.";
    }
  };

  const handleRetry = () => {
    if (courseId && chapterId) {
      router.push(`/courses/${courseId}/chapters/${chapterId}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-105">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>
        {courseId && chapterId ? (
          <div className="mb-6">
            <p className="text-gray-700 font-semibold">Course Access Not Granted</p>
            <p className="text-gray-500">You can retry the payment or contact support.</p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Redirecting to your dashboard...</p>
        )}
        <Button
          onClick={handleRetry}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Retry Payment
        </Button>
        <Link href="/" className="block mt-4 text-blue-600 hover:underline">
          Return to Home
        </Link>
        <p className="mt-4 text-gray-500 text-sm">
          Need help?{" "}
          <a href="mailto:support@eduskill.com" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}