"use client";

import React, { useState } from 'react';
import styles from '@/app/(dashboard)/(routes)/help/supportcenter.module.css';
import { toast } from 'react-hot-toast';

// Define a type for the form
type SupportQueryForm = {
  email: string;
  message: string;
};

// Define a type for the chat messages
type ChatMessage = {
  sender: 'user' | 'support';
  text: string;
};

const SupportCenter: React.FC = () => {
  const [form, setForm] = useState<SupportQueryForm>({ email: '', message: '' });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false); // State for loading message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: ChatMessage = { sender: 'user', text: form.message };
    setChatMessages((prev) => [...prev, newMessage]);

    // Clear the message input
    setForm({ email: form.email, message: '' });
    
    // Simulate loading response
    setLoading(true);
    
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const replyMessage: ChatMessage = { sender: 'support', text: 'Thank you! We’ll get back to you soon.' };
        setChatMessages((prev) => [...prev, replyMessage]);
      } else {
        toast.error('Failed to send query');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.supportCenter}>
        <h1 className={styles.title}>Support Chat</h1>
        <div className={styles.chatDisplay}>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === 'user' ? styles.userMessage : styles.supportMessage}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className={styles.loadingMessage}>
              🤖 Waiting for a response...
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Type your message"
            required
          ></textarea>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Your email address"
            required
          />
          <button type="submit" className={styles.submitButton}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default SupportCenter;
