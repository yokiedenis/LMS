// types.ts
export interface Message {
    id: number;
    content: string;
    sender: 'user' | 'bot';
  }
  
  export interface ChatbotProps {
    apiKey: string;
    apiEndpoint: string;
  }