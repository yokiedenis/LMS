"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from './Student.module.css'; // Assuming you have styles

// Define the type for messages
type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const StudentHelper: React.FC = () => {
  const [isHelperVisible, setIsHelperVisible] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  // Toggle the helper visibility
  const toggleHelper = () => {
    setIsHelperVisible(!isHelperVisible);
  };

  // Handle sending the user's message
  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const userMessage: Message = { sender: 'user', text: userInput };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
  
      try {
        const response = await axios.post<{ reply: string }>('/chat', { userMessage: userInput }); // Updated endpoint
  
        const botMessage: Message = { sender: 'bot', text: response.data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        const botError: Message = { sender: 'bot', text: 'Sorry, I am having trouble responding right now.' };
        setMessages((prevMessages) => [...prevMessages, botError]);
      }
  
      // Clear the input field
      setUserInput('');
    }
  };
  

  return (
    <div>
      {/* Chatbot toggle button */}
      <button onClick={toggleHelper} className={styles['chatbot-toggle-btn']}>
        {isHelperVisible ? 'Hide Helper' : 'Chat with Helper'}
      </button>

      {/* Chatbot UI */}
      {isHelperVisible && (
        <div className={styles['chatbot-container']}>
          <div className={styles['chatbot-header']}>
            <h2>Student Helper</h2>
          </div>

          <div className={styles['chatbot-body']}>
            {messages.map((message, index) => (
              <p
                key={index}
                className={message.sender === 'user' ? styles['user-message'] : styles['bot-message']}
              >
                {message.text}
              </p>
            ))}
          </div>

          <div className={styles['chatbot-footer']}>
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter key
              className={styles['chatbot-input']}
            />
            <button onClick={handleSendMessage} className={styles['send-btn']}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHelper;
