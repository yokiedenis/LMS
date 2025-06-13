import { useSearchParams } from 'next/navigation';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const chapterId = searchParams.get('chapterId');

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
};

export default PaymentSuccess;
