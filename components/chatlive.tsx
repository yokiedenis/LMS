"use client";
import React, { useState } from "react";
import Notification from "./notificationlive";

interface Message {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  type?: "message" | "hand";
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "You",
      avatar: "https://i.pravatar.cc/1?img=1", // Replace with your user avatar URL
    };
    setMessages((prev) => [...prev, newMessage]);
    setNotification("New message sent!");
    setInput("");

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const raiseHand = () => {
    const handMessage: Message = {
      id: Date.now().toString(),
      text: "raised their hand ✋",
      sender: "You",
      avatar: "https://i.pravatar.cc/1?img=1", // Replace with your user avatar URL
      type: "hand",
    };
    setMessages((prev) => [...prev, handMessage]);
    setNotification("You raised your hand!");

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#202124",
          color: "#fff",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Chat</span>
        <button
          onClick={raiseHand}
          style={{
            backgroundColor: "#34a853",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "transform 0.3s",
          }}
        >
          ✋ Raise Hand
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: "10px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <img
              src={msg.avatar}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                backgroundColor: msg.sender === "You" ? "#34a853" : "#e0e0e0",
                color: msg.sender === "You" ? "#fff" : "#000",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                position: "relative",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong style={{ display: "block", fontSize: "12px" }}>
                {msg.sender}
              </strong>
              <span style={{ fontSize: "14px" }}>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Send
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Chat;
