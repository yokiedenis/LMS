"use client";

import { useState } from 'react';
import ChatWindow from '@/components/chatwindow';
import ChatInput from '@/components/chatinput';

const ChatApp: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);

  const handleSend = async (message: string) => {
    setMessages((prev) => [...prev, { user: true, text: message }]);
  
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { user: false, text: data.reply }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [...prev, { user: false, text: 'Error getting response' }]);
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isChatOpen && (
        <div className="absolute bottom-0 right-0 w-full md:w-96 h-96 border border-gray-300 shadow-lg">
          <ChatWindow messages={messages} />
          <div className="mt-auto">
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
