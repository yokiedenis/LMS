// pages/certificate-view.tsx (or app/certificate-view/page.tsx with appropriate routing)
'use client'; // Only for app dir in Next.js
import { useSearchParams } from 'next/navigation'; // for app dir
// import { useRouter } from 'next/router'; // for pages dir
import Certificate from '@/components/certificate'; // adjust import based on your project
import React from 'react';

const CertificateView = () => {
  const searchParams = useSearchParams();
  const recipientName = searchParams.get('name') || '';
  const courseName = searchParams.get('course') || '';
  const date = searchParams.get('date') || '';
  const score = searchParams.get('score') ? parseInt(searchParams.get('score')!) : undefined;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Certificate
        recipientName={recipientName}
        courseName={courseName}
        date={date}
        score={score}
      />
    </div>
  );
};

export default CertificateView;
