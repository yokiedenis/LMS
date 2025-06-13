"use client"; // Add this directive to mark the component as a Client Component

import { useSearchParams } from 'next/navigation';

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const error = searchParams.get('error');
  const courseId = searchParams.get('courseId');
  const chapterId = searchParams.get('chapterId');

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
        <h1 className="text-3xl font-bold text-green-800">Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-700">Thank you for your purchase.</p>
        {courseId && (
          <p className="mt-2 text-gray-600">You have successfully purchased course ID: {courseId}</p>
        )}
        {chapterId && (
          <p className="mt-2 text-gray-600">Chapter ID: {chapterId}</p>
        )}
      </div>
    );
  } else if (status === 'failed' && error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
        <h1 className="text-3xl font-bold text-red-800">Payment Failed!</h1>
        <p className="mt-4 text-lg text-gray-700">Sorry, your payment could not be processed.</p>
        <p className="mt-2 text-gray-600">Error: {decodeURIComponent(error)}</p>
        {courseId && (
          <p className="mt-2 text-gray-600">Course ID: {courseId}</p>
        )}
        {chapterId && (
          <p className="mt-2 text-gray-600">Chapter ID: {chapterId}</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Unknown Payment Status</h1>
        <p className="mt-4 text-lg text-gray-700">There was an issue determining the payment status.</p>
      </div>
    );
  }
};

export default PaymentResult;