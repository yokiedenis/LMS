// src/react-simple-chatbot.d.ts

declare module 'react-simple-chatbot' {
    import { Component } from 'react';
  
    export interface ChatBotProps {
      steps: any[]; // You can define a more specific type based on your usage
      // Add other props as needed
    }
  
    export default class ChatBot extends Component<ChatBotProps> {}
  }
  