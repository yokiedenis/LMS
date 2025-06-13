// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { Message, ChatbotProps } from "../types/types";

// const Chatbot: React.FC<ChatbotProps> = ({ apiKey, apiEndpoint }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Sample welcome message
//   useEffect(() => {
//     const welcomeMessage: Message = {
//       id: Date.now(),
//       content: "Hello! I'm Eduskill AI. How can I assist you with your learning today?",
//       sender: "bot",
//     };
//     setMessages([welcomeMessage]);
//     inputRef.current?.focus();
//   }, []);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       content: input,
//       sender: "user",
//     };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         apiEndpoint,
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             { 
//               role: "system", 
//               content: "You are Eduskill AI, an advanced learning assistant. You help students and professionals with educational content, skill development, and learning strategies. Be concise, professional, and supportive." 
//             },
//             ...updatedMessages.map(msg => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.content
//             }))
//           ],
//           max_tokens: 300,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const botMessage: Message = {
//         id: Date.now() + 1,
//         content:
//           response.data.choices[0].message.content || "I couldn't process that request. Could you try again?",
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       let errorMessage = "Sorry, there was an error processing your request.";
//       if (axios.isAxiosError(error)) {
//         errorMessage += ` (${error.response?.data?.error?.message || error.message})`;
//       }
//       const errorMsg: Message = {
//         id: Date.now() + 2,
//         content: errorMessage,
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-[#f8fafc] text-gray-800'} backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border ${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'} transition-all duration-300`}>
//       {/* Theme toggle */}
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={toggleTheme}
//           aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
//         >
//           {darkMode ? (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Chat header */}
//       <div className={`flex items-center justify-between mb-4 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="flex items-center">
//           <div className="relative">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           <div className="ml-3">
//             <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Eduskill AI</h2>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online • Learning Assistant</p>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button 
//             type="button"
//             aria-label="Menu"
//             className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Chat messages */}
//       <div className={`h-[60vh] overflow-y-auto rounded-xl p-4 mb-4 border ${darkMode ? 'bg-gray-700/30 border-gray-600 scrollbar-thumb-gray-600' : 'bg-gray-50 border-gray-200 scrollbar-thumb-gray-300'} scrollbar-thin scrollbar-track-transparent`}>
//         {messages.map((message, index) => (
//           <div
//             key={message.id}
//             className={`mb-4 transition-all duration-300 ${index === messages.length - 1 ? 'animate-fadeInUp' : ''}`}
//           >
//             <div
//               className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                   message.sender === "user"
//                     ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none"
//                     : darkMode 
//                       ? "bg-gray-600 text-gray-100 rounded-bl-none"
//                       : "bg-gray-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <div className="flex items-start">
//                   {message.sender === "bot" && (
//                     <div className="mr-2 mt-0.5 flex-shrink-0">
//                       <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                         AI
//                       </div>
//                     </div>
//                   )}
//                   <div className="whitespace-pre-wrap">
//                     {message.content}
//                     {message.sender === "bot" && (
//                       <div className="mt-1 flex justify-end">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-3 w-3 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start mb-4">
//             <div className={`max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 ${darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                   AI
//                 </div>
//                 <div className="flex space-x-1">
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-0 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-150 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-300 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input area */}
//       <div className="relative">
//         <div className="absolute -top-8 left-0 right-0 flex justify-center">
//           <button 
//             type="button"
//             aria-label="Version information"
//             className={`text-xs ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-200 flex items-center shadow-sm`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-3 w-3 mr-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//             Eduskill AI v1.0
//           </button>
//         </div>
//         <div className="flex gap-3 items-center">
//           <div className="flex-1 relative">
//             <input
//               ref={inputRef}
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything about learning and skills..."
//               className={`w-full p-4 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-gray-400 ${
//                 darkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500' 
//                   : 'bg-white border-gray-300 text-gray-800'
//               }`}
//               disabled={isLoading}
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
//               <button 
//                 type="button"
//                 aria-label="Attach file"
//                 className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                   />
//                 </svg>
//               </button>
//               <button 
//                 type="button"
//                 aria-label="Insert emoji"
//                 className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             onClick={handleSendMessage}
//             disabled={isLoading || !input.trim()}
//             aria-label="Send message"
//             className={`p-4 rounded-xl transition-all duration-200 flex items-center justify-center ${
//               isLoading || !input.trim()
//                 ? darkMode 
//                   ? "bg-gray-600 cursor-not-allowed" 
//                   : "bg-gray-300 cursor-not-allowed"
//                 : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20"
//             }`}
//           >
//             {isLoading ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 animate-spin text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//         <div className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//           Eduskill AI may produce inaccurate information. Consider verifying important information.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { Message, ChatbotProps } from "../types/types";

// const Chatbot: React.FC<ChatbotProps> = ({ apiKey, apiEndpoint }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const [files, setFiles] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Eduskill specific information
//   const eduskillInfo = {
//     faqs: [
//       {
//         question: "What is Eduskill?",
//         answer: "EduSkill an upskilling platform by Pic-Ed Limited. We look at offering students the relevant technical & soft skills to upskill and strive for better job opportunities. Join an Eduskill course and Work on a fast track to achieving your dream job in the technology industry."
//       },
//       {
//         question: "How does Eduskill personalize learning?",
//         answer: "Eduskill uses AI algorithms to analyze your learning patterns and preferences, then tailors content and recommendations to optimize your learning experience."
//       },
//       {
//         question: "What subjects does Eduskill cover?",
//         answer: "Eduskill covers a wide range of subjects including programming, data science, business, languages, and professional development skills."
//       }
//     ],
//     costStructure: {
//       basic: "Free - Access to basic courses and limited AI assistance",
//       price: "Our course fees are from UGX 1 Millon to UGX 6.5 Million with a get financing option, or you can pay upfront from UGX 1 Millon to UGX 5.5 Millon.",
//       enterprise: "Custom pricing - For organizations with team management and analytics"
//     },
//     partnership: {
//       types: [
//         "Bank institutions -  Stanbic Bank,Interswitch, Centenary Bank,Equity Bank,EcoBank",
//         "Other institutions - Picfare, Visa, Nina Interiors,Brighter Monday,Sanlam,",
//         "Other - Clinic Pesa,MU,Pivot Pay"
//       ],
//       benefits: [
//         "Revenue sharing opportunities",
//         "Co-branded marketing",
//         "Access to our user base",
//         "Technical integration support"
//       ],
//       contact: "Visit https://eduskill.me/About-us.aspx"
//     }
//   };

//   // Sample welcome message with Eduskill features
//   useEffect(() => {
//     const welcomeMessage: Message = {
//       id: Date.now(),
//       content: "Hello! I'm Eduskill AI. How can I assist you with your learning today?\n\nYou can ask me about:\n- Course information\n- Pricing (ask 'What are your pricing options?')\n- Partnerships (ask 'Tell me about partnerships')\n- Or upload files for me to analyze",
//       sender: "bot",
//     };
//     setMessages([welcomeMessage]);
//     inputRef.current?.focus();
//   }, []);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFiles([...files, ...newFiles]);
      
//       // Notify user about uploaded files as a bot message
//       const fileMessage: Message = {
//         id: Date.now(),
//         content: `Uploaded ${newFiles.length} file(s): ${newFiles.map(f => f.name).join(', ')}`,
//         sender: "bot"
//       };
//       setMessages(prev => [...prev, fileMessage]);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSendMessage = async () => {
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       content: input,
//       sender: "user",
//     };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // Check for specific Eduskill-related queries first
//       const lowerInput = input.toLowerCase();
      
//       if (lowerInput.includes('faq') || lowerInput.includes('frequently asked')) {
//         const faqResponse = eduskillInfo.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
//         const botMessage: Message = {
//           id: Date.now() + 1,
//           content: `Here are some frequently asked questions about Eduskill:\n\n${faqResponse}\n\nFor more specific questions, feel free to ask!`,
//           sender: "bot",
//         };
//         setMessages(prev => [...prev, botMessage]);
//         setIsLoading(false);
//         return;
//       }

//       if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('pricing')) {
//         const costResponse = `Eduskill offers these pricing options:\n\n` +
//           `Basic: ${eduskillInfo.costStructure.basic}\n\n` +
//           `Pro: ${eduskillInfo.costStructure.price}\n\n` +
//           `Enterprise: ${eduskillInfo.costStructure.enterprise}\n\n` +
//           `Visit https://eduskill.me/pricing for more details.`;
//         const botMessage: Message = {
//           id: Date.now() + 1,
//           content: costResponse,
//           sender: "bot",
//         };
//         setMessages(prev => [...prev, botMessage]);
//         setIsLoading(false);
//         return;
//       }

//       if (lowerInput.includes('partner') || lowerInput.includes('collaborat')) {
//         const partnerResponse = `Eduskill partnership opportunities:\n\n` +
//           `Types of partnerships:\n- ${eduskillInfo.partnership.types.join('\n- ')}\n\n` +
//           `Benefits:\n- ${eduskillInfo.partnership.benefits.join('\n- ')}\n\n` +
//           `How to get started:\n${eduskillInfo.partnership.contact}`;
//         const botMessage: Message = {
//           id: Date.now() + 1,
//           content: partnerResponse,
//           sender: "bot",
//         };
//         setMessages(prev => [...prev, botMessage]);
//         setIsLoading(false);
//         return;
//       }

//       // For file attachments
//       let fileContext = '';
//       if (files.length > 0) {
//         fileContext = `The user has attached these files: ${files.map(f => f.name).join(', ')}. ` +
//           `Please consider their content when responding. ` +
//           `Note: You can't directly analyze file contents but can guide the user based on file names and types.`;
//       }

//       // For regular queries, use OpenAI API
//       const response = await axios.post(
//         apiEndpoint,
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             { 
//               role: "system", 
//               content: `You are Eduskill AI, an advanced learning assistant for the Eduskill platform (https://eduskill.me). 
//               You help students and professionals with educational content, skill development, and learning strategies. 
//               Be concise, professional, and supportive. 
//               ${fileContext}
//               About Eduskill:
//               - Platform for AI-powered learning
//               - Offers courses in various subjects
//               - Provides personalized learning paths
//               - Has different pricing tiers
//               - Offers partnership opportunities`
//             },
//             ...updatedMessages.map(msg => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.content
//             }))
//           ],
//           max_tokens: 300,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const botMessage: Message = {
//         id: Date.now() + 1,
//         content:
//           response.data.choices[0].message.content || "I couldn't process that request. Could you try again?",
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//       setFiles([]); // Clear files after message is sent
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       let errorMessage = "Sorry, there was an error processing your request.";
//       if (axios.isAxiosError(error)) {
//         errorMessage += ` (${error.response?.data?.error?.message || error.message})`;
//       }
//       const errorMsg: Message = {
//         id: Date.now() + 2,
//         content: errorMessage,
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, errorMsg]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-[#f8fafc] text-gray-800'} backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border ${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200'} transition-all duration-300`}>
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         multiple
//         style={{ display: 'none' }}
//       />

//       {/* Theme toggle */}
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={toggleTheme}
//           aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
//         >
//           {darkMode ? (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Chat header */}
//       <div className={`flex items-center justify-between mb-4 pb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="flex items-center">
//           <div className="relative">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           <div className="ml-3">
//             <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Eduskill AI</h2>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online • Learning Assistant</p>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button 
//             type="button"
//             aria-label="Menu"
//             className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Chat messages */}
//       <div className={`h-[60vh] overflow-y-auto rounded-xl p-4 mb-4 border ${darkMode ? 'bg-gray-700/30 border-gray-600 scrollbar-thumb-gray-600' : 'bg-gray-50 border-gray-200 scrollbar-thumb-gray-300'} scrollbar-thin scrollbar-track-transparent`}>
//         {messages.map((message, index) => (
//           <div
//             key={message.id}
//             className={`mb-4 transition-all duration-300 ${index === messages.length - 1 ? 'animate-fadeInUp' : ''}`}
//           >
//             <div
//               className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                   message.sender === "user"
//                     ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none"
//                     : darkMode 
//                       ? "bg-gray-600 text-gray-100 rounded-bl-none"
//                       : "bg-gray-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <div className="flex items-start">
//                   {message.sender === "bot" && (
//                     <div className="mr-2 mt-0.5 flex-shrink-0">
//                       <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                         AI
//                       </div>
//                     </div>
//                   )}
//                   <div className="whitespace-pre-wrap">
//                     {message.content}
//                     {message.sender === "bot" && (
//                       <div className="mt-1 flex justify-end">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-3 w-3 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13 10V3L4 14h7v7l9-11h-7z"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="flex justify-start mb-4">
//             <div className={`max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 ${darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                   AI
//                 </div>
//                 <div className="flex space-x-1">
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-0 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-150 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                   <div className={`w-2 h-2 rounded-full animate-bounce delay-300 ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* File preview */}
//       {files.length > 0 && (
//         <div className={`mb-3 p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//           <div className="flex flex-wrap gap-2">
//             {files.map((file, index) => (
//               <div key={index} className={`flex items-center text-xs p-2 rounded ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
//                 <span className="truncate max-w-xs">{file.name}</span>
//                 <button 
//                   onClick={() => setFiles(files.filter((_, i) => i !== index))}
//                   className="ml-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Input area */}
//       <div className="relative">
//         <div className="absolute -top-8 left-0 right-0 flex justify-center">
//           <button 
//             type="button"
//             aria-label="Version information"
//             className={`text-xs ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-100'} px-3 py-1 rounded-full transition-colors duration-200 flex items-center shadow-sm`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-3 w-3 mr-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//             Eduskill AI v1.1
//           </button>
//         </div>
//         <div className="flex gap-3 items-center">
//           <div className="flex-1 relative">
//             <input
//               ref={inputRef}
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything about learning and skills..."
//               className={`w-full p-4 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-gray-400 ${
//                 darkMode 
//                   ? 'bg-gray-700 border-gray-600 text-white hover:border-gray-500' 
//                   : 'bg-white border-gray-300 text-gray-800'
//               }`}
//               disabled={isLoading}
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
//               <button 
//                 type="button"
//                 onClick={triggerFileInput}
//                 aria-label="Attach file"
//                 className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                   />
//                 </svg>
//               </button>
//               <button 
//                 type="button"
//                 aria-label="Insert emoji"
//                 className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             onClick={handleSendMessage}
//             disabled={isLoading || !input.trim()}
//             aria-label="Send message"
//             className={`p-4 rounded-xl transition-all duration-200 flex items-center justify-center ${
//               isLoading || !input.trim()
//                 ? darkMode 
//                   ? "bg-gray-600 cursor-not-allowed" 
//                   : "bg-gray-300 cursor-not-allowed"
//                 : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20"
//             }`}
//           >
//             {isLoading ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 animate-spin text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//         <div className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//           Eduskill AI may produce inaccurate information. Consider verifying important information.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;








"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Message, ChatbotProps } from "../types/types";

const Chatbot: React.FC<ChatbotProps> = ({ apiKey, apiEndpoint }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Eduskill specific information
  const eduskillInfo = {
    faqs: [
      {
        question: "How much is the course fee?",
        answer: "Our course fees are from UGX 1 Millon to UGX 6.5 Million with a get financing option, or you can pay upfront from UGX 1 Millon to UGX 5.5 Millon."
      },
      {
        question: "What is the minimum salary I will get placed at?",
        answer: "Minimum package from UGX 700k to UGX 1.5 million per Month."
      },
      {
        question: "I am not from Computer Science Field. Am I eligible?",
        answer: "Yes, any final-year university student or a working professional that wishes to get into computer programming, Data analytics and is willing to work diligently can join our course. No matter what your degree, graduation percentage or career is, all students are welcome!"
      },
      {
        question: "Can I do this part-time? What are the timings?",
        answer: "Yes, Our live online classes are between 5 - 8 pm East African Time. We also do offline sessions one Saturday a month in Kampala."
      },
      {
        question: "What if I decide not to continue the course?",
        answer: "Once the program begins there will be a penalty for dropouts.."
      },
      {
        question: "When do the placement drives start?",
        answer: "You can take as many mentorship sessions as you would like till you feel that you are better prepared for your new career. You have to specifically request for mentorship, it is not offered to all only those that request it."
      },
      {
        question: "How many mocks/ mentorship sessions will I get?",
        answer: "Once the program begins there will be a penalty for dropouts.."
      },
      {
        question: "Will I be placed in Uganda?",
        answer: "You can be placed in Uganda or even have access to global opportunities once you have completed your course, based on availability and performance."
      },
      {
        question: "What if I do not get a job placement post the course?",
        answer: "For 1 to 6 months post the course we will work on opportunities for your placement."
      },
      {
        question: "What is the age bracket for students?",
        answer: "18 Years + so they can legally work post the course."
      },
        {
        question: "What do I need to be a part of the course, apart from clearing the examination?",
        answer: "1. Electricity 2. Internet 3. Laptop with Camera and Microphone"
      },
        {
        question: "Is the course online or in person?",
        answer: "As of now, the course is online and we do a few sessions through the 30 days to 6 months period in person."
      },



    ],
    costStructure: {
      basic: "Free - Access to basic courses and limited AI assistance",
      price: "Our course fees are from UGX 1 Million to UGX 6.5 Million with a financing option, or you can pay upfront from UGX 1 Million to UGX 5.5 Million.",
      enterprise: "Custom pricing - For organizations with team management and analytics"
    },
    partnership: {
      types: [
        "Bank institutions - Stanbic Bank, Interswitch, Centenary Bank, Equity Bank, EcoBank",
        "Other institutions - Picfare, Visa, Nina Interiors, Brighter Monday, Sanlam",
        "Other - Clinic Pesa, MU, Pivot Pay"
      ],
      benefits: [
        "Revenue sharing opportunities",
        "Co-branded marketing",
        "Access to our user base",
        "Technical integration support"
      ],
      contact: "Visit https://eduskill.me/About-us.aspx"
    }
  };

  // Sample welcome message with Eduskill features
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      content: "Hello! I'm Eduskill AI. How can I assist you with your learning today?\n\nYou can ask me about:\n- Course information\n- Pricing (ask 'What are your pricing options?')\n- Partnerships (ask 'Tell me about partnerships')\n- Or upload files for me to analyze",
      sender: "bot"
    };
    setMessages([welcomeMessage]);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      const fileMessage: Message = {
        id: Date.now(),
        content: `Uploaded ${newFiles.length} file(s): ${newFiles.map(f => f.name).join(', ')}`,
        sender: "bot"
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user"
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("faq") || lowerInput.includes("frequently asked")) {
        const faqResponse = eduskillInfo.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
        const botMessage: Message = {
          id: Date.now() + 1,
          content: `Here are some frequently asked questions about Eduskill:\n\n${faqResponse}\n\nFor more specific questions, feel free to ask!`,
          sender: "bot"
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      if (lowerInput.includes("cost") || lowerInput.includes("price") || lowerInput.includes("pricing")) {
        const costResponse = `Eduskill offers these pricing options:\n\n` +
          `Basic: ${eduskillInfo.costStructure.basic}\n\n` +
          `Pro: ${eduskillInfo.costStructure.price}\n\n` +
          `Enterprise: ${eduskillInfo.costStructure.enterprise}\n\n` +
          `Visit https://eduskill.me/pricing for more details.`;
        const botMessage: Message = {
          id: Date.now() + 1,
          content: costResponse,
          sender: "bot"
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      if (lowerInput.includes("partner") || lowerInput.includes("collaborat")) {
        const partnerResponse = `Eduskill partnership opportunities:\n\n` +
          `Types of partnerships:\n- ${eduskillInfo.partnership.types.join("\n- ")}\n\n` +
          `Benefits:\n- ${eduskillInfo.partnership.benefits.join("\n- ")}\n\n` +
          `How to get started:\n${eduskillInfo.partnership.contact}`;
        const botMessage: Message = {
          id: Date.now() + 1,
          content: partnerResponse,
          sender: "bot"
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      let fileContext = "";
      if (files.length > 0) {
        fileContext = `The user has attached these files: ${files.map(f => f.name).join(", ")}. ` +
          `Please consider their content when responding. ` +
          `Note: You can't directly analyze file contents but can guide the user based on file names and types.`;
      }

      const response = await axios.post(
        apiEndpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are Eduskill AI, an advanced learning assistant for the Eduskill platform (https://eduskill.me). 
              You help students and professionals with educational content, skill development, and learning strategies. 
              Be concise, professional, and supportive. 
              ${fileContext}
              About Eduskill:
              - Platform for AI-powered learning
              - Offers courses in various subjects
              - Provides personalized learning paths
              - Has different pricing tiers
              - Offers partnership opportunities`
            },
            ...updatedMessages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.content
            }))
          ],
          max_tokens: 300,
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        content: response.data.choices[0].message.content || "I couldn't process that request. Could you try again?",
        sender: "bot"
      };

      setMessages(prev => [...prev, botMessage]);
      setFiles([]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      let errorMessage = "Sorry, there was an error processing your request.";
      if (axios.isAxiosError(error)) {
        errorMessage += ` (${error.response?.data?.error?.message || error.message})`;
      }
      const errorMsg: Message = {
        id: Date.now() + 2,
        content: errorMessage,
        sender: "bot"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-[#f8fafc] text-gray-800"} backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border ${darkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-100 hover:border-gray-200"} transition-all duration-300`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        style={{ display: "none" }}
      />

      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors duration-200`}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className={`flex items-center justify-between mb-4 pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-3">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Eduskill AI</h2>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Online • Learning Assistant</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            aria-label="Menu"
            className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors duration-200`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`h-[60vh] overflow-y-auto rounded-xl p-4 mb-4 border ${darkMode ? "bg-gray-700/30 border-gray-600 scrollbar-thumb-gray-600" : "bg-gray-50 border-gray-200 scrollbar-thumb-gray-300"} scrollbar-thin scrollbar-track-transparent`}>
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`mb-4 transition-all duration-300 ${index === messages.length - 1 ? "animate-fadeInUp" : ""}`}
          >
            <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none"
                    : darkMode
                    ? "bg-gray-600 text-gray-100 rounded-bl-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="flex items-start">
                  {message.sender === "bot" && (
                    <div className="mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        AI
                      </div>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">
                    {message.content}
                    {message.sender === "bot" && (
                      <div className="mt-1 flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className={`max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 ${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  AI
                </div>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce delay-0 ${darkMode ? "bg-gray-400" : "bg-gray-500"}`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce delay-150 ${darkMode ? "bg-gray-400" : "bg-gray-500"}`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce delay-300 ${darkMode ? "bg-gray-400" : "bg-gray-500"}`}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {files.length > 0 && (
        <div className={`mb-3 p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className={`flex items-center text-xs p-2 rounded ${darkMode ? "bg-gray-600" : "bg-white"}`}>
                <span className="truncate max-w-xs">{file.name}</span>
                <button
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute -top-8 left-0 right-0 flex justify-center">
          <button
            type="button"
            aria-label="Version information"
            className={`text-xs ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-gray-500 hover:bg-gray-100"} px-3 py-1 rounded-full transition                                                              -colors duration-200 flex items-center shadow-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Eduskill AI v1.1
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about learning and skills..."
              className={`w-full p-4 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder-gray-400 hover:border-gray-400 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white hover:border-gray-500" : "bg-white border-gray-300 text-gray-800"
              }`}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                type="button"
                onClick={triggerFileInput}
                aria-label="Attach file"
                className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"} transition-colors duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Insert emoji"
                className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"} transition-colors duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className={`p-4 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isLoading || !input.trim()
                ? darkMode
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20"
            }`}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={`text-xs mt-2 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Eduskill AI may produce inaccurate information. Consider verifying important information.
        </div>
      </div>
    </div>
  );
};

export default Chatbot;




















