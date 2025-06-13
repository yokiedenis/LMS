import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#34a853",
        color: "#fff",
        padding: "15px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontSize: "16px",
        zIndex: 1000,
        animation: "fadeInOut 3s",
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "10px",
          backgroundColor: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ✖
      </button>
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default Notification;
