"use client"; // Ensure this is included for client-side rendering

import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";

import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useUser } from '@clerk/nextjs';
//import styles from '@/styles/ChatInterface.module.css';

type Message = {
    userId: string;
    userType: 'student' | 'teacher';
    userName: string;
    content: string;
    timestamp: string;
};

const ChatInterface: React.FC = () => {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [notification, setNotification] = useState<string | null>(null);

    // Load messages from localStorage on component mount
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
        fetchMessages();

        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            const data: Message[] = await response.json();
            setMessages(data);
            localStorage.setItem('messages', JSON.stringify(data)); // Save to localStorage
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSend = async () => {
        if (input.trim() && user) {
            const newMessage: Message = {
                userId: user.id,
                userType: 'student',
                userName: user.firstName || user.username || 'Unknown User',
                content: input,
                timestamp: new Date().toISOString(),
            };

            try {
                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMessage),
                });

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, newMessage];
                    localStorage.setItem('messages', JSON.stringify(updatedMessages)); // Save to localStorage
                    return updatedMessages;
                });
                setInput('');
                setNotification("Message sent!");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatHeader}>Eduskill Teacher Support</div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div key={index} className={`${styles.messageContainer}`}>
                        <div className={styles.messageHeader}>
                            <strong>{message.userName}</strong>
                            <span className={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className={`${styles.message} ${message.userType === 'student' ? styles.student : styles.teacher}`}>
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.responseInputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.responseInput}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend} className={styles.sendButton}>Send</button>
            </div>
            {notification && (
                <div className={styles.notification}>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
