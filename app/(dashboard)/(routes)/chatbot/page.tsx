"use client";

import React from "react";
import Chatbot from "@/components/chatbot";
import Head from "next/head";

const App: React.FC = () => {
  const apiKey = "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";
  const apiEndpoint = "https://openrouter.ai/api/v1/chat/completions";

  return (
    <>
      <Head>
        <title>Eduskill AI | Advanced Learning Assistant</title>
        <meta name="description" content="Experience next-generation AI learning with Eduskill" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl animate-fadeIn">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Eduskill AI
              </h1>
            </div>
            <p className="text-gray-600 text-center max-w-md">
              Your intelligent learning companion. Ask anything about education and skills development.
            </p>
          </div>
          <Chatbot apiKey={apiKey} apiEndpoint={apiEndpoint} />
          <div className="text-center text-gray-500 text-xs mt-4">
            Powered by Eduskill Team • Secured connection • v1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

export default App;