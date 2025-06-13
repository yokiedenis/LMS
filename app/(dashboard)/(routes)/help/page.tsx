// "use client"; // Ensure this is included for client-side rendering

// import styles from "@/app/(dashboard)/(routes)/teacher/feedback/supportquerytable.module.css";
// import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
// import { useUser  } from "@clerk/nextjs";

// type Message = {
//   userId: string;
//   userType: "student" | "teacher";
//   userName: string;
//   content: string;
//   timestamp: string;
//   fileUrl?: string; // For file uploads
// };

// const ChatInterface: React.FC = () => {
//   const { user } = useUser ();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [notification, setNotification] = useState<string | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   // Fetching messages on component mount
//   useEffect(() => {
//     const savedMessages = localStorage.getItem("messages");
//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//     }
//     fetchMessages();  // Initial fetch

//     const interval = setInterval(fetchMessages, 5000);  // Poll every 5 seconds
//     return () => clearInterval(interval);  // Clean up interval on unmount
//   }, []);

//   // Function to fetch messages from the API
//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       const data: Message[] = await response.json();
//       setMessages(data);
//       localStorage.setItem("messages", JSON.stringify(data)); // Cache messages in localStorage
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Function to handle sending a message
//   const handleSend = async () => {
//     if (input.trim() && user) {
//       const newMessage: Message = {
//         userId: user.id,
//         userType: "student",
//         userName: user.firstName || user.username || "Unknown User",
//         content: input,
//         timestamp: new Date().toISOString(),
//       };

//       try {
//         await fetch("/api/messages", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newMessage),
//         });

//         setMessages((prevMessages) => {
//           const updatedMessages = [...prevMessages, newMessage];
//           localStorage.setItem("messages", JSON.stringify(updatedMessages)); // Cache updated messages
//           return updatedMessages;
//         });
//         setInput("");
//         setNotification("Message sent!");
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && user) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewImage(reader.result as string); // Set the preview image
//       };
//       reader.readAsDataURL(file);  // Create a preview of the image

//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });
//         const data = await response.json();

//         if (data.fileUrl) {
//           const newMessage: Message = {
//             userId: user.id,
//             userType: "student",
//             userName: user.firstName || user.username || "Unknown User",
//             content: "File uploaded",
//             fileUrl: data.fileUrl, // Store the URL returned by the server
//             timestamp: new Date().toISOString(),
//           };

//           // Save the message with the file URL to the database
//           await fetch("/api/messages", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newMessage),
//           });

//           setMessages((prevMessages) => {
//             const updatedMessages = [...prevMessages, newMessage];
//             localStorage.setItem("messages", JSON.stringify(updatedMessages));
//             return updatedMessages;
//           });
//           setPreviewImage(null); // Clear the preview
//           setNotification("File uploaded successfully!");
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         setNotification("File upload failed!");
//       }
//     }
//   };

//   // Handle the 'Enter' key press for sending the message
//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.chatHeader}>Eduskill Teacher Support</div>
//       <div className={styles.chatMessages}>
//         {messages.map((message, index) => (
//           <div key={index} className={styles.messageContainer}>
//             <div className={styles.messageHeader}>
//               <strong>{message.userName}</strong>
//               <span className={styles.timestamp}>
//                 {/* Ensure the timestamp is parsed and displayed correctly */}
//                 {new Date(message.timestamp).toString() !== "Invalid Date" ? 
//                   new Date(message.timestamp).toLocaleString() : "Invalid Date"}
//               </span>
//             </div>
//             <div
//               className={`${styles.message} ${
//                 message.userType === "student" ? styles.student : styles.teacher
//               }`}
//             >
//               {message.content}
//               {message.fileUrl && (
//                 <div className={styles.imageContainer}>
//                   <img
//                     src={message.fileUrl} // Use the file URL received from the server
//                     alt="Uploaded"
//                     className={styles.uploadedImage}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//         {previewImage && (
//           <div className={styles.previewContainer}>
//             <strong>Preview:</strong>
//             <img src={previewImage} alt="Preview" className={styles.previewImage} />
//           </div>
//         )}
//       </div>
//       <div className={styles.responseInputContainer}>
//         <label htmlFor="file-upload" className={styles.fileUploadLabel}>
//           <input
//             id="file-upload"
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             className={styles.hiddenFileInput}
//           />
//         </label>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className={styles.responseInput}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSend} className={styles.sendButton}>
//           Send
//         </button>
//       </div>

//       {notification && <div className={styles.notification}>{notification}</div>}
//     </div>
//   );
// };

// export default ChatInterface;







// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
// import { FiSend, FiImage, FiPaperclip, FiX, FiCheck, FiClock } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// type Message = {
//   id: string;
//   userId: string;
//   userType: "student" | "teacher";
//   userName: string;
//   content: string;
//   createdAt: string;
//   fileUrl?: string;
//   fileType?: string;
// };

// const ChatInterface: React.FC = () => {
//   const { user } = useUser();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch messages with cleanup of old messages
//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       if (!response.ok) throw new Error("Failed to fetch messages");
      
//       const data: Message[] = await response.json();
      
//       // Filter out messages older than 30 days
//       const thirtyDaysAgo = new Date();
//       thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
//       const filteredMessages = data.filter(msg => {
//         const msgDate = new Date(msg. createdAt);
//         return msgDate > thirtyDaysAgo;
//       });
      
//       // If any messages were filtered out, update the database
//       if (filteredMessages.length < data.length) {
//         await fetch("/api/messages/cleanup", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ threshold: thirtyDaysAgo.toISOString() }),
//         });
//       }
      
//       setMessages(filteredMessages);
//       localStorage.setItem("messages", JSON.stringify(filteredMessages));
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       showNotification("Failed to load messages. Please refresh.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Show notification with auto-hide
//   const showNotification = (message: string, type: "success" | "error") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   // Initial fetch and setup polling
//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 10000); // Poll every 10 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle sending a message
//   const handleSend = async () => {
//     if ((!input.trim() && !previewFile) || !user || isSending) return;

//     setIsSending(true);
//     const tempId = Date.now().toString(); // Temporary ID for optimistic UI

//     const newMessage: Message = {
//       id: tempId,
//       userId: user.id,
//       userType: "student",
//       userName: user.fullName || user.firstName || user.username || "Anonymous",
//       content: input,
//       createdAt: new Date().toISOString(),
//       ...(previewFile && { 
//         fileUrl: previewFile.url,
//         fileType: previewFile.type 
//       }),
//     };

//     // Optimistic update
//     setMessages(prev => [...prev, newMessage]);
//     setInput("");
//     setPreviewFile(null);

//     try {
//       const response = await fetch("/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newMessage),
//       });

//       if (!response.ok) throw new Error("Failed to send message");

//       const savedMessage = await response.json();
      
//       // Replace optimistic message with saved message from server
//       setMessages(prev => prev.map(msg => 
//         msg.id === tempId ? { ...savedMessage, id: savedMessage.id } : msg
//       ));
      
//       showNotification("Message sent!", "success");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       // Remove optimistic message if failed
//       setMessages(prev => prev.filter(msg => msg.id !== tempId));
//       showNotification("Failed to send message", "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       showNotification("File size should be less than 5MB", "error");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewFile({
//         url: reader.result as string,
//         type: file.type.startsWith("image/") ? "image" : "file",
//         name: file.name
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   // Remove preview file
//   const removePreview = () => {
//     setPreviewFile(null);
//   };

//   // Handle key events
//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   // Format timestamp
//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     if (isNaN(date.getTime())) return "Just now";

//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (diffInHours < 48) {
//       return "Yesterday";
//     } else if (diffInHours < 168) {
//       return date.toLocaleDateString([], { weekday: 'short' });
//     } else {
//       return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//     }
//   };

//   // Get full date for tooltip
//   const getFullDate = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return isNaN(date.getTime()) ? "" : date.toLocaleString();
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-indigo-600 text-white p-4 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Eduskill Teacher Support</h1>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm bg-indigo-500 px-2 py-1 rounded-full">
//               {user?.fullName || user?.firstName || "User"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 container mx-auto">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-gray-500">
//             <FiSend className="text-4xl mb-2" />
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                       message.userId === user?.id
//                         ? "bg-indigo-500 text-white rounded-br-none"
//                         : "bg-white text-gray-800 rounded-bl-none shadow"
//                     }`}
//                   >
//                     {message.userId !== user?.id && (
//                       <div className="font-semibold text-sm mb-1">
//                         {message.userName}
//                       </div>
//                     )}
                    
//                     {message.content && (
//                       <p className="whitespace-pre-wrap break-words">{message.content}</p>
//                     )}
                    
//                     {message.fileUrl && (
//                       <div className="mt-2">
//                         {message.fileType?.startsWith("image/") ? (
//                           <img
//                             src={message.fileUrl}
//                             alt="Uploaded content"
//                             className="max-h-60 rounded-md object-cover"
//                           />
//                         ) : (
//                           <a
//                             href={message.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center text-indigo-600 hover:underline"
//                           >
//                             <FiPaperclip className="mr-1" />
//                             {message.fileUrl.split('/').pop()}
//                           </a>
//                         )}
//                       </div>
//                     )}
                    
//                     <div
//                       className={`text-xs mt-1 flex items-center ${
//                         message.userId === user?.id ? "text-indigo-100" : "text-gray-500"
//                       }`}
//                       title={getFullDate(message. createdAt)}
//                     >
//                       <FiClock className="mr-1" size={12} />
//                       {formatTimestamp(message. createdAt)}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="border-t border-gray-200 bg-white p-4">
//         <div className="container mx-auto">
//           {/* Preview Area */}
//           {previewFile && (
//             <div className="mb-3 relative bg-gray-100 rounded-lg p-3">
//               <button
//                 onClick={removePreview}
//                 className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200"
//               >
//                 <FiX size={16} />
//               </button>
              
//               {previewFile.type === "image" ? (
//                 <img
//                   src={previewFile.url}
//                   alt="Preview"
//                   className="max-h-40 rounded-md"
//                 />
//               ) : (
//                 <div className="flex items-center">
//                   <FiPaperclip size={20} className="mr-2" />
//                   <span className="truncate max-w-xs">{previewFile.name}</span>
//                 </div>
//               )}
//             </div>
//           )}
          
//           <div className="flex space-x-2">
//             <label className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer transition">
//               <input
//                 type="file"
//                 accept="image/*,.pdf,.doc,.docx,.txt"
//                 onChange={handleFileUpload}
//                 className="hidden"
//               />
//               <FiImage className="text-gray-600" />
//             </label>
            
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Type your message..."
//               disabled={isSending}
//             />
            
//             <button
//               onClick={handleSend}
//               disabled={(!input.trim() && !previewFile) || isSending}
//               className={`flex items-center justify-center rounded-full p-2 ${
//                 (input.trim() || previewFile) && !isSending
//                   ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               } transition`}
//             >
//               {isSending ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//               ) : (
//                 <FiSend />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification */}
//       <AnimatePresence>
//         {notification && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${
//               notification.type === "success" ? "bg-green-500" : "bg-red-500"
//             } text-white`}
//           >
//             <div className="flex items-center">
//               {notification.type === "success" ? (
//                 <FiCheck className="mr-2" />
//               ) : (
//                 <FiX className="mr-2" />
//               )}
//               {notification.message}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ChatInterface;







// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
// import { FiSend, FiImage, FiPaperclip, FiX, FiCheck, FiClock, FiSun, FiMoon } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// type Message = {
//   id: string;
//   userId: string;
//   userType: "student" | "teacher";
//   userName: string;
//   content: string;
//   createdAt: string;
//   fileUrl?: string;
//   fileType?: string;
// };

// const ChatInterface: React.FC = () => {
//   const { user } = useUser();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Fetch messages
//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       if (!response.ok) throw new Error("Failed to fetch messages");
//       const data: Message[] = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       showNotification("Failed to load messages. Please try again.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Show notification with auto-hide
//   const showNotification = (message: string, type: "success" | "error") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Initial fetch and setup polling
//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Toggle theme
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // Handle sending a message
//   const handleSend = async () => {
//     if ((!input.trim() && !previewFile) || !user || isSending) return;

//     setIsSending(true);
//     const tempId = Date.now().toString();

//     const newMessage: Message = {
//       id: tempId,
//       userId: user.id,
//       userType: "student",
//       userName: user.fullName || user.firstName || user.username || "Anonymous",
//       content: input,
//       createdAt: new Date().toISOString(),
//       ...(previewFile && {
//         fileUrl: previewFile.url,
//         fileType: previewFile.type,
//       }),
//     };

//     // Optimistic update
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setPreviewFile(null);

//     try {
//       // If there's a file, upload it first
//       let fileUrl = previewFile?.url;
//       let fileType = previewFile?.type;

//       if (previewFile) {
//         const formData = new FormData();
//         const file = (document.querySelector('input[type="file"]') as HTMLInputElement).files?.[0];
//         if (file) {
//           formData.append("file", file);
//           const uploadResponse = await fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//           });
//           if (!uploadResponse.ok) throw new Error("Failed to upload file");
//           const uploadData = await uploadResponse.json();
//           fileUrl = uploadData.url;
//           fileType = uploadData.type;
//         }
//       }

//       const response = await fetch("/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: newMessage.userId,
//           userType: newMessage.userType,
//           userName: newMessage.userName,
//           content: newMessage.content,
//           fileUrl,
//           fileType,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to send message");

//       const savedMessage = await response.json();

//       // Replace optimistic message with saved message from server
//       setMessages((prev) =>
//         prev.map((msg) => (msg.id === tempId ? { ...savedMessage, id: savedMessage.id } : msg))
//       );

//       showNotification("Message sent!", "success");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
//       showNotification("Failed to send message", "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Check file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       showNotification("File size should be less than 5MB", "error");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewFile({
//         url: reader.result as string,
//         type: file.type.startsWith("image/") ? "image" : "file",
//         name: file.name,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   // Remove preview file
//   const removePreview = () => {
//     setPreviewFile(null);
//   };

//   // Handle key events
//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   // Format timestamp
//   const formatTimestamp = (createdAt: string) => {
//     const date = new Date(createdAt);
//     if (isNaN(date.getTime())) return "Just now";

//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     } else if (diffInHours < 48) {
//       return "Yesterday";
//     } else if (diffInHours < 168) {
//       return date.toLocaleDateString([], { weekday: "short" });
//     } else {
//       return date.toLocaleDateString([], { month: "short", day: "numeric" });
//     }
//   };

//   return (
//     <div className={`flex flex-col h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
//       {/* Header */}
//       <div className={`${theme === "light" ? "bg-indigo-600" : "bg-indigo-800"} text-white p-4 shadow-md`}>
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Eduskill Teacher Support</h1>
//           <div className="flex items-center space-x-2">
//             <span className={`text-sm ${theme === "light" ? "bg-indigo-500" : "bg-indigo-700"} px-2 py-1 rounded-full`}>
//               {user?.fullName || user?.firstName || "User"}
//             </span>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-indigo-700 transition"
//               title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
//             >
//               {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className={`flex-1 overflow-y-auto p-4 container mx-auto ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
//         {isLoading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === "light" ? "border-indigo-500" : "border-indigo-400"}`}></div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className={`flex flex-col items-center justify-center h-full ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
//             <FiSend className="text-4xl mb-2" />
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                       message.userId === user?.id
//                         ? `${theme === "light" ? "bg-indigo-500 text-white" : "bg-indigo-700 text-white"} rounded-br-none`
//                         : `${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"} rounded-bl-none shadow`
//                     }`}
//                   >
//                     {message.userId !== user?.id && (
//                       <div className="font-semibold text-sm mb-1">{message.userName}</div>
//                     )}
//                     {message.content && (
//                       <p className="whitespace-pre-wrap break-words">{message.content}</p>
//                     )}
//                     {message.fileUrl && (
//                       <div className="mt-2">
//                         {message.fileType?.startsWith("image/") ? (
//                           <img
//                             src={message.fileUrl}
//                             alt="Uploaded content"
//                             className="max-h-60 rounded-md object-cover"
//                           />
//                         ) : (
//                           <a
//                             href={message.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`inline-flex items-center ${theme === "light" ? "text-indigo-600 hover:underline" : "text-indigo-400 hover:underline"}`}
//                           >
//                             <FiPaperclip className="mr-1" />
//                             {message.fileUrl.split("/").pop()}
//                           </a>
//                         )}
//                       </div>
//                     )}
//                     <div
//                       className={`text-xs mt-1 flex items-center ${
//                         message.userId === user?.id
//                           ? "text-indigo-100"
//                           : theme === "light"
//                           ? "text-gray-500"
//                           : "text-gray-400"
//                       }`}
//                       title={new Date(message.createdAt).toLocaleString()}
//                     >
//                       <FiClock className="mr-1" size={12} />
//                       {formatTimestamp(message.createdAt)}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className={`border-t ${theme === "light" ? "border-gray-200 bg-white" : "border-gray-700 bg-gray-800"} p-4`}>
//         <div className="container mx-auto">
//           {/* Preview Area */}
//           {previewFile && (
//             <div className={`mb-3 relative ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg p-3`}>
//               <button
//                 onClick={removePreview}
//                 className={`${theme === "light" ? "bg-white hover:bg-gray-200" : "bg-gray-600 hover:bg-gray-500"} absolute top-2 right-2 rounded-full p-1 shadow`}
//               >
//                 <FiX size={16} />
//               </button>
//               {previewFile.type === "image" ? (
//                 <img src={previewFile.url} alt="Preview" className="max-h-40 rounded-md" />
//               ) : (
//                 <div className="flex items-center">
//                   <FiPaperclip size={20} className="mr-2" />
//                   <span className="truncate max-w-xs">{previewFile.name}</span>
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="flex space-x-2">
//             <label
//               className={`flex items-center justify-center ${
//                 theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-700 hover:bg-gray-600"
//               } rounded-full p-2 cursor-pointer transition`}
//             >
//               <input
//                 type="file"
//                 accept="image/*,.pdf,.doc,.docx,.txt"
//                 onChange={handleFileUpload}
//                 className="hidden"
//               />
//               <FiImage className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`} />
//             </label>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className={`flex-1 border ${
//                 theme === "light" ? "border-gray-300" : "border-gray-600"
//               } rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"
//               }`}
//               placeholder="Type your message..."
//               disabled={isSending}
//             />
//             <button
//               onClick={handleSend}
//               disabled={(!input.trim() && !previewFile) || isSending}
//               className={`flex items-center justify-center rounded-full p-2 ${
//                 (input.trim() || previewFile) && !isSending
//                   ? `${theme === "light" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-800 hover:bg-indigo-900"} text-white`
//                   : `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
//               } transition`}
//             >
//               {isSending ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//               ) : (
//                 <FiSend />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification Popup */}
//       <AnimatePresence>
//         {notification && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full"
//           >
//             <div className="flex items-center justify-center">
//               {notification.type === "success" ? (
//                 <FiCheck className="text-green-500 mr-2" size={24} />
//               ) : (
//                 <FiX className="text-red-500 mr-2" size={24} />
//               )}
//               <p className={`text-lg ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{notification.message}</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ChatInterface;








// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
// import { FiSend, FiImage, FiPaperclip, FiX, FiCheck, FiClock, FiSun, FiMoon } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// type Message = {
//   id: string;
//   userId: string;
//   userType: "student" | "teacher";
//   userName: string;
//   content: string;
//   createdAt: string;
//   fileUrl?: string;
//   fileType?: string;
// };

// const ChatInterface: React.FC = () => {
//   const { user } = useUser();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       if (!response.ok) throw new Error("Failed to fetch messages");
//       const data: Message[] = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       showNotification("Failed to load messages. Please try again.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showNotification = (message: string, type: "success" | "error") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const handleSend = async () => {
//     if ((!input.trim() && !previewFile) || !user || isSending) return;

//     setIsSending(true);
//     const tempId = Date.now().toString();
//     let fileUrl: string | undefined;
//     let fileType: string | undefined;

//     try {
//       // Handle file upload first if there's a file
//       if (previewFile && fileInputRef.current?.files?.[0]) {
//         const formData = new FormData();
//         formData.append("file", fileInputRef.current.files[0]);

//         const uploadResponse = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (!uploadResponse.ok) {
//           throw new Error("Failed to upload file");
//         }

//         const uploadData = await uploadResponse.json();
//         fileUrl = uploadData.url;
//         fileType = uploadData.type;
//       }

//       // Create message object
//       const messageData = {
//         userId: user.id,
//         userType: "student",
//         userName: user.fullName || user.firstName || user.username || "Anonymous",
//         content: input.trim(),
//         fileUrl,
//         fileType,
//       };

//       // Send message to API
//       const response = await fetch("/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(messageData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       const savedMessage = await response.json();

//       // Update messages with the saved message
//       setMessages((prev) => [...prev, savedMessage]);
//       setInput("");
//       setPreviewFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       showNotification("Message sent!", "success");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       showNotification("Failed to send message", "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       showNotification("File size should be less than 5MB", "error");
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewFile({
//         url: reader.result as string,
//         type: file.type.startsWith("image/") ? "image" : "file",
//         name: file.name,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const removePreview = () => {
//     setPreviewFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   const formatTimestamp = (createdAt: string) => {
//     const date = new Date(createdAt);
//     if (isNaN(date.getTime())) return "Just now";

//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     } else if (diffInHours < 48) {
//       return "Yesterday";
//     } else if (diffInHours < 168) {
//       return date.toLocaleDateString([], { weekday: "short" });
//     } else {
//       return date.toLocaleDateString([], { month: "short", day: "numeric" });
//     }
//   };

//   return (
//     <div className={`flex flex-col h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
//       {/* Header */}
//       <div className={`${theme === "light" ? "bg-indigo-600" : "bg-indigo-800"} text-white p-4 shadow-md`}>
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Eduskill Teacher Support</h1>
//           <div className="flex items-center space-x-2">
//             <span className={`text-sm ${theme === "light" ? "bg-indigo-500" : "bg-indigo-700"} px-2 py-1 rounded-full`}>
//               {user?.fullName || user?.firstName || "User"}
//             </span>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-indigo-700 transition"
//               title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
//             >
//               {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className={`flex-1 overflow-y-auto p-4 container mx-auto ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
//         {isLoading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === "light" ? "border-indigo-500" : "border-indigo-400"}`}></div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className={`flex flex-col items-center justify-center h-full ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
//             <FiSend className="text-4xl mb-2" />
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                       message.userId === user?.id
//                         ? `${theme === "light" ? "bg-indigo-500 text-white" : "bg-indigo-700 text-white"} rounded-br-none`
//                         : `${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"} rounded-bl-none shadow`
//                     }`}
//                   >
//                     {message.userId !== user?.id && (
//                       <div className="font-semibold text-sm mb-1">{message.userName}</div>
//                     )}
//                     {message.content && (
//                       <p className="whitespace-pre-wrap break-words">{message.content}</p>
//                     )}
//                     {message.fileUrl && (
//                       <div className="mt-2">
//                         {message.fileType?.startsWith("image/") ? (
//                           <img
//                             src={message.fileUrl}
//                             alt="Uploaded content"
//                             className="max-h-60 rounded-md object-cover"
//                             loading="lazy"
//                           />
//                         ) : (
//                           <a
//                             href={message.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`inline-flex items-center ${theme === "light" ? "text-indigo-600 hover:underline" : "text-indigo-400 hover:underline"}`}
//                           >
//                             <FiPaperclip className="mr-1" />
//                             {message.fileUrl.split("/").pop()}
//                           </a>
//                         )}
//                       </div>
//                     )}
//                     <div
//                       className={`text-xs mt-1 flex items-center ${
//                         message.userId === user?.id
//                           ? "text-indigo-100"
//                           : theme === "light"
//                           ? "text-gray-500"
//                           : "text-gray-400"
//                       }`}
//                       title={new Date(message.createdAt).toLocaleString()}
//                     >
//                       <FiClock className="mr-1" size={12} />
//                       {formatTimestamp(message.createdAt)}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className={`border-t ${theme === "light" ? "border-gray-200 bg-white" : "border-gray-700 bg-gray-800"} p-4`}>
//         <div className="container mx-auto">
//           {/* Preview Area */}
//           {previewFile && (
//             <div className={`mb-3 relative ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg p-3`}>
//               <button
//                 onClick={removePreview}
//                 className={`${theme === "light" ? "bg-white hover:bg-gray-200" : "bg-gray-600 hover:bg-gray-500"} absolute top-2 right-2 rounded-full p-1 shadow`}
//               >
//                 <FiX size={16} />
//               </button>
//               {previewFile.type === "image" ? (
//                 <img src={previewFile.url} alt="Preview" className="max-h-40 rounded-md" />
//               ) : (
//                 <div className="flex items-center">
//                   <FiPaperclip size={20} className="mr-2" />
//                   <span className="truncate max-w-xs">{previewFile.name}</span>
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="flex space-x-2">
//             <label
//               className={`flex items-center justify-center ${
//                 theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-700 hover:bg-gray-600"
//               } rounded-full p-2 cursor-pointer transition`}
//             >
//               <input
//                 type="file"
//                 accept="image/*,.pdf,.doc,.docx,.txt"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 ref={fileInputRef}
//               />
//               <FiImage className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`} />
//             </label>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className={`flex-1 border ${
//                 theme === "light" ? "border-gray-300" : "border-gray-600"
//               } rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"
//               }`}
//               placeholder="Type your message..."
//               disabled={isSending}
//             />
//             <button
//               onClick={handleSend}
//               disabled={(!input.trim() && !previewFile) || isSending}
//               className={`flex items-center justify-center rounded-full p-2 ${
//                 (input.trim() || previewFile) && !isSending
//                   ? `${theme === "light" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-800 hover:bg-indigo-900"} text-white`
//                   : `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
//               } transition`}
//             >
//               {isSending ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//               ) : (
//                 <FiSend />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification Popup */}
//       <AnimatePresence>
//         {notification && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full"
//           >
//             <div className="flex items-center justify-center">
//               {notification.type === "success" ? (
//                 <FiCheck className="text-green-500 mr-2" size={24} />
//               ) : (
//                 <FiX className="text-red-500 mr-2" size={24} />
//               )}
//               <p className={`text-lg ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{notification.message}</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ChatInterface;







// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
// import { FiSend, FiImage, FiPaperclip, FiX, FiCheck, FiClock, FiSun, FiMoon } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// type Message = {
//   id: string;
//   userId: string;
//   userType: "student" | "teacher";
//   userName: string;
//   content: string;
//   createdAt: string;
//   fileUrl?: string;
//   fileType?: string;
// };

// const ChatInterface: React.FC = () => {
//   const { user } = useUser();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
//   const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSending, setIsSending] = useState(false);
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("/api/messages");
//       if (!response.ok) throw new Error("Failed to fetch messages");
//       const data: Message[] = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       showNotification("Failed to load messages. Please try again.", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const showNotification = (message: string, type: "success" | "error") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const handleSend = async () => {
//     if ((!input.trim() && !previewFile) || !user || isSending) return;

//     setIsSending(true);
//     let fileUrl: string | undefined;
//     let fileType: string | undefined;

//     try {
//       // Handle file upload first if there's a file
//       if (previewFile && fileInputRef.current?.files?.[0]) {
//         const formData = new FormData();
//         formData.append("file", fileInputRef.current.files[0]);

//         const uploadResponse = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (!uploadResponse.ok) {
//           const errorData = await uploadResponse.json();
//           throw new Error(errorData.error || "Failed to upload file");
//         }

//         const uploadData = await uploadResponse.json();
//         fileUrl = `/api/files/${uploadData.fileId}`; // Construct fileUrl
//         fileType = uploadData.type;
//       }

//       // Create message object
//       const messageData = {
//         userId: user.id,
//         userType: "student",
//         userName: user.fullName || user.firstName || user.username || "Anonymous",
//         content: input.trim(),
//         fileUrl,
//         fileType,
//       };

//       // Send message to API
//       const response = await fetch("/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(messageData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to send message");
//       }

//       const savedMessage = await response.json();

//       // Update messages with the saved message
//       setMessages((prev) => [...prev, savedMessage]);
//       setInput("");
//       setPreviewFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       showNotification("Message sent!", "success");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       showNotification(error instanceof Error ? error.message : "Failed to send message", "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       showNotification("File size should be less than 5MB", "error");
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     // Validate file type
//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ];
//     if (!allowedTypes.includes(file.type)) {
//       showNotification("Unsupported file type. Allowed: images, PDF, DOC, DOCX, TXT", "error");
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewFile({
//         url: reader.result as string,
//         type: file.type.startsWith("image/") ? "image" : "file",
//         name: file.name,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const removePreview = () => {
//     setPreviewFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       handleSend();
//     }
//   };

//   const formatTimestamp = (createdAt: string) => {
//     const date = new Date(createdAt);
//     if (isNaN(date.getTime())) return "Just now";

//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     } else if (diffInHours < 48) {
//       return "Yesterday";
//     } else if (diffInHours < 168) {
//       return date.toLocaleDateString([], { weekday: "short" });
//     } else {
//       return date.toLocaleDateString([], { month: "short", day: "numeric" });
//     }
//   };

//   return (
//     <div className={`flex flex-col h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
//       {/* Header */}
//       <div className={`${theme === "light" ? "bg-indigo-600" : "bg-indigo-800"} text-white p-4 shadow-md`}>
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-bold">Eduskill Teacher Support</h1>
//           <div className="flex items-center space-x-2">
//             <span className={`text-sm ${theme === "light" ? "bg-indigo-500" : "bg-indigo-700"} px-2 py-1 rounded-full`}>
//               {user?.fullName || user?.firstName || "User"}
//             </span>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-full hover:bg-indigo-700 transition"
//               title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
//             >
//               {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className={`flex-1 overflow-y-auto p-4 container mx-auto ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
//         {isLoading ? (
//           <div className="flex justify-center items-center h-full">
//             <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === "light" ? "border-indigo-500" : "border-indigo-400"}`}></div>
//           </div>
//         ) : messages.length === 0 ? (
//           <div className={`flex flex-col items-center justify-center h-full ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
//             <FiSend className="text-4xl mb-2" />
//             <p>No messages yet. Start the conversation!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                       message.userId === user?.id
//                         ? `${theme === "light" ? "bg-indigo-500 text-white" : "bg-indigo-700 text-white"} rounded-br-none`
//                         : `${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"} rounded-bl-none shadow`
//                     }`}
//                   >
//                     {message.userId !== user?.id && (
//                       <div className="font-semibold text-sm mb-1">{message.userName}</div>
//                     )}
//                     {message.content && (
//                       <p className="whitespace-pre-wrap break-words">{message.content}</p>
//                     )}
//                     {message.fileUrl && (
//                       <div className="mt-2">
//                         {message.fileType?.startsWith("image/") ? (
//                           <img
//                             src={message.fileUrl}
//                             alt="Uploaded content"
//                             className="max-h-60 rounded-md object-cover"
//                             loading="lazy"
//                           />
//                         ) : (
//                           <a
//                             href={message.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`inline-flex items-center ${theme === "light" ? "text-indigo-600 hover:underline" : "text-indigo-400 hover:underline"}`}
//                           >
//                             <FiPaperclip className="mr-1" />
//                             {message.fileUrl.split("/").pop()}
//                           </a>
//                         )}
//                       </div>
//                     )}
//                     <div
//                       className={`text-xs mt-1 flex items-center ${
//                         message.userId === user?.id
//                           ? "text-indigo-100"
//                           : theme === "light"
//                           ? "text-gray-500"
//                           : "text-gray-400"
//                       }`}
//                       title={new Date(message.createdAt).toLocaleString()}
//                     >
//                       <FiClock className="mr-1" size={12} />
//                       {formatTimestamp(message.createdAt)}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className={`border-t ${theme === "light" ? "border-gray-200 bg-white" : "border-gray-700 bg-gray-800"} p-4`}>
//         <div className="container mx-auto">
//           {/* Preview Area */}
//           {previewFile && (
//             <div className={`mb-3 relative ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg p-3`}>
//               <button
//                 onClick={removePreview}
//                 className={`${theme === "light" ? "bg-white hover:bg-gray-200" : "bg-gray-600 hover:bg-gray-500"} absolute top-2 right-2 rounded-full p-1 shadow`}
//               >
//                 <FiX size={16} />
//               </button>
//               {previewFile.type === "image" ? (
//                 <img src={previewFile.url} alt="Preview" className="max-h-40 rounded-md" />
//               ) : (
//                 <div className="flex items-center">
//                   <FiPaperclip size={20} className="mr-2" />
//                   <span className="truncate max-w-xs">{previewFile.name}</span>
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="flex space-x-2">
//             <label
//               className={`flex items-center justify-center ${
//                 theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-700 hover:bg-gray-600"
//               } rounded-full p-2 cursor-pointer transition`}
//             >
//               <input
//                 type="file"
//                 accept="image/*,.pdf,.doc,.docx,.txt"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 ref={fileInputRef}
//               />
//               <FiImage className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`} />
//             </label>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className={`flex-1 border ${
//                 theme === "light" ? "border-gray-300" : "border-gray-600"
//               } rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                 theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"
//               }`}
//               placeholder="Type your message..."
//               disabled={isSending}
//             />
//             <button
//               onClick={handleSend}
//               disabled={(!input.trim() && !previewFile) || isSending}
//               className={`flex items-center justify-center rounded-full p-2 ${
//                 (input.trim() || previewFile) && !isSending
//                   ? `${theme === "light" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-800 hover:bg-indigo-900"} text-white`
//                   : `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
//               } transition`}
//             >
//               {isSending ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//               ) : (
//                 <FiSend />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification Popup */}
//       <AnimatePresence>
//         {notification && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full"
//           >
//             <div className="flex items-center justify-center">
//               {notification.type === "success" ? (
//                 <FiCheck className="text-green-500 mr-2" size={24} />
//               ) : (
//                 <FiX className="text-red-500 mr-2" size={24} />
//               )}
//               <p className={`text-lg ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{notification.message}</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ChatInterface;











// app/help/page.tsx
// app/help/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { FiSend, FiImage, FiPaperclip, FiX, FiCheck, FiClock, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  userId: string;
  userType: "student" | "teacher";
  userName: string;
  content: string;
  createdAt: string;
  fileUrl?: string;
  fileType?: string;
};

const ChatInterface: React.FC = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [previewFile, setPreviewFile] = useState<{ url: string; type: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      showNotification("Failed to load messages. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSend = async () => {
    if ((!input.trim() && !previewFile) || !user || isSending) return;

    setIsSending(true);
    let fileUrl: string | undefined;
    let fileType: string | undefined;

    try {
      // Handle file upload first if there's a file
      if (previewFile && fileInputRef.current?.files?.[0]) {
        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Failed to upload file");
        }

        const uploadData = await uploadResponse.json();
        fileUrl = `/api/files/${uploadData.fileId}`; // Construct fileUrl
        fileType = uploadData.type; // Use the MIME type from upload response
      }

      // Create message object
      const messageData = {
        userId: user.id,
        userType: "student",
        userName: user.fullName || user.firstName || user.username || "Anonymous",
        content: input.trim(),
        fileUrl,
        fileType, // Ensure fileType is included
      };

      // Send message to API
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const savedMessage = await response.json();

      // Update messages with the saved message
      setMessages((prev) => [...prev, savedMessage]);
      setInput("");
      setPreviewFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showNotification("Message sent!", "success");
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification(error instanceof Error ? error.message : "Failed to send message", "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("File size should be less than 5MB", "error");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      showNotification("Unsupported file type. Allowed: images, PDF, DOC, DOCX, TXT", "error");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewFile({
        url: reader.result as string,
        type: file.type.startsWith("image/") ? "image" : "file",
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const removePreview = () => {
    setPreviewFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const formatTimestamp = (createdAt: string) => {
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return "Just now";

    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* Header */}
      <div className={`${theme === "light" ? "bg-indigo-600" : "bg-indigo-800"} text-white p-4 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Eduskill Teacher Support</h1>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${theme === "light" ? "bg-indigo-500" : "bg-indigo-700"} px-2 py-1 rounded-full`}>
              {user?.fullName || user?.firstName || "User"}
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-indigo-700 transition"
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 container mx-auto ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === "light" ? "border-indigo-500" : "border-indigo-400"}`}></div>
          </div>
        ) : messages.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
            <FiSend className="text-4xl mb-2" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.userId === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                      message.userId === user?.id
                        ? `${theme === "light" ? "bg-indigo-500 text-white" : "bg-indigo-700 text-white"} rounded-br-none`
                        : `${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"} rounded-bl-none shadow`
                    }`}
                  >
                    {message.userId !== user?.id && (
                      <div className="font-semibold text-sm mb-1">{message.userName}</div>
                    )}
                    {message.content && (
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    )}
                    {message.fileUrl && (
                      <div className="mt-2">
                        {message.fileType?.startsWith("image/") ? (
                          <img
                            src={message.fileUrl}
                            alt="Uploaded image"
                            className="max-h-60 rounded-md object-cover"
                            loading="lazy"
                            onError={(e) => {
                              console.error(`Failed to load image: ${message.fileUrl}`);
                              e.currentTarget.style.display = 'none'; // Hide broken image
                              const nextSibling = e.currentTarget.nextSibling;
                              if (nextSibling instanceof HTMLElement) {
                                nextSibling.removeAttribute('hidden'); // Show fallback
                              }
                            }}
                          />
                        ) : (
                          <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center ${theme === "light" ? "text-indigo-600 hover:underline" : "text-indigo-400 hover:underline"}`}
                          >
                            <FiPaperclip className="mr-1" />
                            {message.fileUrl.split("/").pop()}
                          </a>
                        )}
                        {/* Fallback for broken images */}
                        {message.fileType?.startsWith("image/") && (
                          <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center ${theme === "light" ? "text-indigo-600 hover:underline" : "text-indigo-400 hover:underline"} mt-2 hidden`}
                          >
                            <FiPaperclip className="mr-1" />
                            View drier uploaded image
                          </a>
                        )}
                      </div>
                    )}
                    <div
                      className={`text-xs mt-1 flex items-center ${
                        message.userId === user?.id
                          ? "text-indigo-100"
                          : theme === "light"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                      title={new Date(message.createdAt).toLocaleString()}
                    >
                      <FiClock className="mr-1" size={12} />
                      {formatTimestamp(message.createdAt)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`border-t ${theme === "light" ? "border-gray-200 bg-white" : "border-gray-700 bg-gray-800"} p-4`}>
        <div className="container mx-auto">
          {/* Preview Area */}
          {previewFile && (
            <div className={`mb-3 relative ${theme === "light" ? "bg-gray-100" : "bg-gray-700"} rounded-lg p-3`}>
              <button
                onClick={removePreview}
                className={`${theme === "light" ? "bg-white hover:bg-gray-200" : "bg-gray-600 hover:bg-gray-500"} absolute top-2 right-2 rounded-full p-1 shadow`}
              >
                <FiX size={16} />
              </button>
              {previewFile.type === "image" ? (
                <img src={previewFile.url} alt="Preview" className="max-h-40 rounded-md" />
              ) : (
                <div className="flex items-center">
                  <FiPaperclip size={20} className="mr-2" />
                  <span className="truncate max-w-xs">{previewFile.name}</span>
                </div>
              )}
            </div>
          )}
          <div className="flex space-x-2">
            <label
              className={`flex items-center justify-center ${
                theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-700 hover:bg-gray-600"
              } rounded-full p-2 cursor-pointer transition`}
            >
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <FiImage className={`${theme === "light" ? "text-gray-600" : "text-gray-300"}`} />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 border ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              } rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Type your message..."
              disabled={isSending}
            />
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !previewFile) || isSending}
              className={`flex items-center justify-center rounded-full p-2 ${
                (input.trim() || previewFile) && !isSending
                  ? `${theme === "light" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-800 hover:bg-indigo-900"} text-white`
                  : `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
              } transition`}
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <FiSend />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full"
          >
            <div className="flex items-center justify-center">
              {notification.type === "success" ? (
                <FiCheck className="text-green-500 mr-2" size={24} />
              ) : (
                <FiX className="text-red-500 mr-2" size={24} />
              )}
              <p className={`text-lg ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;