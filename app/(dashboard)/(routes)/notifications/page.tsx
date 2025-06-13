// "use client";
// import { useEffect, useState } from "react";

// interface Notification {
//   title: string;
//   description: string;
//   link: string;
//   date: string;
// }

// export default function Notifications() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         // Fetching AI and Software News from external API
//         const response = await fetch(
//           'https://api.currentsapi.services/v1/latest-news?keywords=AI&apiKey=sk7J3RNz0yTDC4mdMgFc9Ysq8MsKRuqgsu5t0gkMqx-6P8aW'
//         );
//         const data = await response.json();

//         // Extract the 'news' array and map the items to fit your Notification structure
//         const notifications = data.news.map((item: any) => ({
//           title: item.title,
//           description: item.description,
//           link: item.url,
//           date: item.published
//         }));

//         setNotifications(notifications);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();

//     // Set interval to fetch news every minute
//     const interval = setInterval(fetchNotifications, 60000);

//     // Cleanup interval when component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
//         Latest AI and Software News
//       </h2>
//       {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-md font-semibold text-yellow-400 py-3 px-4 mb-4 text-center">
//         <div>Recent Notifications</div>
//       </div> */}

//       <div className="overflow-y-auto max-h-[500px] space-y-4">
//         {notifications.length > 0 ? (
//           notifications.map((notification, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transform transition-transform duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-1s"
//             >
//               <div className="text-xl font-bold text-gray-800">{notification.title}</div>
//               <div className="text-gray-600 mb-2">{notification.description}</div>
//               <a
//                 href={notification.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 Read more
//               </a>
//               <div className="text-sm text-gray-400 mt-2">{new Date(notification.date).toLocaleString()}</div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500">No notifications available</div>
//         )}
//       </div>
//     </div>
//   );
// }






// 'use client';
// import { useEffect, useState } from "react";
// import { FiFilter, FiBell, FiChevronDown, FiMessageSquare, FiClock, FiUser, FiPlus, FiTrash2, FiBookmark } from "react-icons/fi";

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     role: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   timeSince: string;
//   title: string;
//   content: string;
//   replies: Reply[];
//   isPinned?: boolean;
// }

// interface Reply {
//   id: string;
//   author: {
//     name: string;
//     role?: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   content: string;
// }

// interface Notification {
//   id: string;
//   message: string;
//   type: 'new-post' | 'new-reply' | 'update';
//   createdAt: number;
//   read: boolean;
//   postId?: string;
// }

// const LOCAL_STORAGE_KEY = 'forumPosts';
// const NOTIFICATIONS_KEY = 'forumNotifications';
// const POST_EXPIRATION_DAYS = 30;

// export default function Forum() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [newPostContent, setNewPostContent] = useState("");
//   const [newPostTitle, setNewPostTitle] = useState("");
//   const [showNewPostForm, setShowNewPostForm] = useState(false);
//   const [activeSort, setActiveSort] = useState("latest");
//   const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
//   const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  
//   // In a real app, you would get this from your authentication system
//   const [currentUser] = useState({
//     name: "John Doe",
//     role: "Student",
//     avatar: "JD" // Initials for avatar
//   });

//   // Load posts and notifications from localStorage on component mount
//   useEffect(() => {
//     const loadData = () => {
//       try {
//         // Load posts
//         const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
//         if (savedPosts) {
//           const parsedPosts = JSON.parse(savedPosts);
//           const currentTime = Date.now();
//           const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//           const filteredPosts = parsedPosts.filter((post: Post) => 
//             currentTime - post.createdAt < thirtyDaysInMs
//           );

//           if (filteredPosts.length !== parsedPosts.length) {
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredPosts));
//           }

//           setPosts(filteredPosts);
//         }

//         // Load notifications
//         const savedNotifications = localStorage.getItem(NOTIFICATIONS_KEY);
//         if (savedNotifications) {
//           const parsedNotifications = JSON.parse(savedNotifications);
//           // Filter out notifications older than 30 days
//           const currentTime = Date.now();
//           const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//           const filteredNotifications = parsedNotifications.filter(
//             (n: Notification) => currentTime - n.createdAt < thirtyDaysInMs
//           );

//           if (filteredNotifications.length !== parsedNotifications.length) {
//             localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filteredNotifications));
//           }

//           setNotifications(filteredNotifications);
//           setUnreadCount(filteredNotifications.filter((n: Notification) => !n.read).length);
//         }
//       } catch (error) {
//         console.error("Error loading data from localStorage:", error);
//       }
//     };

//     loadData();
//   }, []);

//   // Save posts and notifications to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
//   }, [posts]);

//   useEffect(() => {
//     localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
//   }, [notifications]);

//   const formatPostDate = (timestamp: number): { date: string; timeSince: string } => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
//     let timeSince;
//     if (seconds < 60) {
//       timeSince = "Just now";
//     } else if (seconds < 3600) {
//       timeSince = `${Math.floor(seconds / 60)} minutes ago`;
//     } else if (seconds < 86400) {
//       timeSince = `${Math.floor(seconds / 3600)} hours ago`;
//     } else if (seconds < 2592000) {
//       timeSince = `${Math.floor(seconds / 86400)} days ago`;
//     } else {
//       timeSince = `${Math.floor(seconds / 2592000)} months ago`;
//     }

//     const date = postDate.toLocaleDateString("en-US", { 
//       month: "short", 
//       day: "numeric", 
//       year: "numeric" 
//     });

//     return { date, timeSince };
//   };

//   const addNotification = (message: string, type: 'new-post' | 'new-reply' | 'update', postId?: string) => {
//     const newNotification: Notification = {
//       id: Date.now().toString(),
//       message,
//       type,
//       createdAt: Date.now(),
//       read: false,
//       postId
//     };

//     setNotifications(prev => [newNotification, ...prev]);
//     setUnreadCount(prev => prev + 1);
//   };

//   const handleCreatePost = () => {
//     if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
//     const timestamp = Date.now();
//     const { date, timeSince } = formatPostDate(timestamp);

//     const newPost: Post = {
//       id: timestamp.toString(),
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar
//       },
//       createdAt: timestamp,
//       date,
//       timeSince,
//       title: newPostTitle,
//       content: newPostContent,
//       replies: []
//     };

//     setPosts([newPost, ...posts]);
//     addNotification(`${currentUser.name} created a new post: "${newPostTitle}"`, 'new-post', newPost.id);
//     setNewPostTitle("");
//     setNewPostContent("");
//     setShowNewPostForm(false);
//   };

//   const handleAddReply = (postId: string) => {
//     if (!replyContent[postId]?.trim()) return;

//     const post = posts.find(p => p.id === postId);
//     if (!post) return;

//     const timestamp = Date.now();
//     const { date } = formatPostDate(timestamp);

//     const newReply: Reply = {
//       id: `${postId}-${timestamp}`,
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar
//       },
//       createdAt: timestamp,
//       date,
//       content: replyContent[postId]
//     };

//     const updatedPosts = posts.map(p => {
//       if (p.id === postId) {
//         return { ...p, replies: [...p.replies, newReply] };
//       }
//       return p;
//     });

//     setPosts(updatedPosts);
//     addNotification(`${currentUser.name} replied to "${post.title}"`, 'new-reply', postId);
//     setReplyContent({ ...replyContent, [postId]: "" });
//   };

//   const toggleReplies = (postId: string) => {
//     setShowReplies({
//       ...showReplies,
//       [postId]: !showReplies[postId]
//     });
//   };

//   const togglePinPost = (postId: string) => {
//     setPosts(posts.map(post => {
//       if (post.id === postId) {
//         const isPinning = !post.isPinned;
//         if (isPinning) {
//           addNotification(`Post "${post.title}" was pinned by instructor`, 'update', postId);
//         }
//         return { ...post, isPinned: isPinning };
//       }
//       return post;
//     }));
//   };

//   const deletePost = (postId: string) => {
//     const post = posts.find(p => p.id === postId);
//     if (post) {
//       addNotification(`Post "${post.title}" was deleted`, 'update');
//     }
//     setPosts(posts.filter(post => post.id !== postId));
//   };

//   const sortPosts = (type: string) => {
//     setActiveSort(type);
//     const sortedPosts = [...posts];
    
//     if (type === "latest") {
//       sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
//     } else if (type === "top") {
//       sortedPosts.sort((a, b) => b.replies.length - a.replies.length);
//     } else if (type === "oldest") {
//       sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
//     } else if (type === "pinned") {
//       sortedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
//     }
    
//     setPosts(sortedPosts);
//   };

//   const markNotificationsAsRead = () => {
//     const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
//     setNotifications(updatedNotifications);
//     setUnreadCount(0);
//   };

//   const toggleNotifications = () => {
//     if (!showNotifications) {
//       markNotificationsAsRead();
//     }
//     setShowNotifications(!showNotifications);
//   };

//   // Check for expired posts and notifications periodically
//   useEffect(() => {
//     const checkForExpiredData = () => {
//       const currentTime = Date.now();
//       const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

//       // Check posts
//       const nonExpiredPosts = posts.filter(post => 
//         currentTime - post.createdAt < thirtyDaysInMs
//       );

//       if (nonExpiredPosts.length !== posts.length) {
//         setPosts(nonExpiredPosts);
//       }

//       // Check notifications
//       const nonExpiredNotifications = notifications.filter(
//         n => currentTime - n.createdAt < thirtyDaysInMs
//       );

//       if (nonExpiredNotifications.length !== notifications.length) {
//         setNotifications(nonExpiredNotifications);
//       }
//     };

//     const interval = setInterval(checkForExpiredData, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, [posts, notifications]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Forum</h1>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
//               <FiFilter className="text-gray-500" />
//               <span className="text-gray-700">Filter</span>
//             </button>
//             <div className="relative">
//               <button 
//                 onClick={toggleNotifications}
//                 className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 relative"
//               >
//                 <FiBell className="text-gray-500" />
//                 <span className="text-gray-700">Notifications</span>
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
//                   <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">
//                     Notifications
//                   </div>
//                   {notifications.length > 0 ? (
//                     <div className="divide-y divide-gray-100">
//                       {notifications.map(notification => (
//                         <div 
//                           key={notification.id} 
//                           className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}
//                         >
//                           <div className="text-sm text-gray-700">{notification.message}</div>
//                           <div className="text-xs text-gray-500 mt-1">
//                             {formatPostDate(notification.createdAt).timeSince}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-4 text-center text-gray-500">
//                       No notifications yet
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Stats and Sort */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-gray-500">{posts.length} posts</div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => sortPosts("latest")}
//               className={`px-3 py-1 rounded-md ${activeSort === "latest" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//             >
//               Latest
//             </button>
//             <button 
//               onClick={() => sortPosts("top")}
//               className={`px-3 py-1 rounded-md ${activeSort === "top" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//             >
//               Top
//             </button>
//             <button 
//               onClick={() => sortPosts("oldest")}
//               className={`px-3 py-1 rounded-md ${activeSort === "oldest" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//             >
//               Oldest
//             </button>
//             <button 
//               onClick={() => sortPosts("pinned")}
//               className={`px-3 py-1 rounded-md ${activeSort === "pinned" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//             >
//               Pinned
//             </button>
//           </div>
//         </div>

//         {/* Create New Post */}
//         {!showNewPostForm ? (
//           <button 
//             onClick={() => setShowNewPostForm(true)}
//             className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//           >
//             <FiPlus />
//             <span>Create a new post</span>
//           </button>
//         ) : (
//           <div className="mb-6 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">NEW POST</h2>
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={newPostTitle}
//               onChange={(e) => setNewPostTitle(e.target.value)}
//             />
//             <textarea
//               placeholder="What would you like to discuss?"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={newPostContent}
//               onChange={(e) => setNewPostContent(e.target.value)}
//             />
//             <div className="flex justify-end space-x-3">
//               <button 
//                 onClick={() => setShowNewPostForm(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleCreatePost}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 disabled={!newPostTitle.trim() || !newPostContent.trim()}
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}>
//                 <div className="p-6">
//                   {/* Post Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                         {post.author.avatar || post.author.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">{post.author.name}</div>
//                         <div className="text-sm text-gray-500">{post.author.role}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       <div>{post.date}</div>
//                       <div className="text-xs">{post.timeSince}</div>
//                     </div>
//                   </div>

//                   {/* Post Content */}
//                   <div className="mb-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
//                       <div className="flex space-x-2">
//                         <button 
//                           onClick={() => togglePinPost(post.id)}
//                           className={`p-1 rounded-md ${post.isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
//                           title={post.isPinned ? "Unpin post" : "Pin post"}
//                         >
//                           <FiBookmark />
//                         </button>
//                         {post.author.name === currentUser.name && (
//                           <button 
//                             onClick={() => deletePost(post.id)}
//                             className="p-1 text-red-500 rounded-md hover:bg-red-50"
//                             title="Delete post"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
//                   </div>

//                   {/* Post Actions */}
//                   <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//                     <button 
//                       onClick={() => toggleReplies(post.id)}
//                       className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
//                     >
//                       <FiMessageSquare />
//                       <span>{post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}</span>
//                       <FiChevronDown className={`transition-transform ${showReplies[post.id] ? 'transform rotate-180' : ''}`} />
//                     </button>
//                     <div className="flex space-x-4">
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiClock />
//                         <span>Save</span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiUser />
//                         <span>Follow</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Replies Section */}
//                   {showReplies[post.id] && (
//                     <div className="mt-4 pl-6 border-l-2 border-gray-200">
//                       {/* Reply Form */}
//                       <div className="mb-4">
//                         <textarea
//                           placeholder="Write a reply..."
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           value={replyContent[post.id] || ""}
//                           onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
//                         />
//                         <div className="flex justify-end mt-2">
//                           <button 
//                             onClick={() => handleAddReply(post.id)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                             disabled={!replyContent[post.id]?.trim()}
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>

//                       {/* Replies List */}
//                       {post.replies.length > 0 ? (
//                         <div className="space-y-4">
//                           {post.replies.map((reply) => (
//                             <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center space-x-2">
//                                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
//                                     {reply.author.avatar || reply.author.name.charAt(0)}
//                                   </div>
//                                   <div className="font-medium text-gray-800">{reply.author.name}</div>
//                                   {reply.author.role && (
//                                     <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                                       {reply.author.role}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">{reply.date}</div>
//                               </div>
//                               <div className="text-gray-700 ml-10">{reply.content}</div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center text-gray-500 py-4">No replies yet</div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//               No posts yet. Be the first to create one!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }









// 'use client';
// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { FiFilter, FiBell, FiChevronDown, FiMessageSquare, FiClock, FiUser, FiPlus, FiTrash2, FiBookmark } from 'react-icons/fi';

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     role: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   timeSince: string;
//   title: string;
//   content: string;
//   replies: Reply[];
//   isPinned?: boolean;
// }

// interface Reply {
//   id: string;
//   author: {
//     name: string;
//     role?: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   content: string;
// }

// interface Notification {
//   id: string;
//   message: string;
//   type: 'new-post' | 'new-reply' | 'update';
//   createdAt: number;
//   read: boolean;
//   postId?: string;
// }

// const LOCAL_STORAGE_KEY = 'forumPosts';
// const NOTIFICATIONS_KEY = 'forumNotifications';
// const POST_EXPIRATION_DAYS = 30;

// export default function Forum() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [showNewPostForm, setShowNewPostForm] = useState(false);
//   const [activeSort, setActiveSort] = useState('latest');
//   const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
//   const [replyContent, setReplyContent] = useState<Record<string, string>>({});

//   // Get current user from Clerk
//   const { user } = useUser();

//   // Define currentUser based on Clerk's user data
//   const currentUser = user
//     ? {
//         name: user.fullName || user.username || user.emailAddresses[0].emailAddress.split('@')[0],
//         role: 'Student', // You can customize this based on user metadata if needed
//         avatar: user.imageUrl || user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0),
//       }
//     : null;

//   // Load posts and notifications from localStorage on component mount
//   useEffect(() => {
//     const loadData = () => {
//       try {
//         // Load posts
//         const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
//         if (savedPosts) {
//           const parsedPosts = JSON.parse(savedPosts);
//           const currentTime = Date.now();
//           const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//           const filteredPosts = parsedPosts.filter((post: Post) => currentTime - post.createdAt < thirtyDaysInMs);

//           if (filteredPosts.length !== parsedPosts.length) {
//             localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredPosts));
//           }

//           setPosts(filteredPosts);
//         }

//         // Load notifications
//         const savedNotifications = localStorage.getItem(NOTIFICATIONS_KEY);
//         if (savedNotifications) {
//           const parsedNotifications = JSON.parse(savedNotifications);
//           const currentTime = Date.now();
//           const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//           const filteredNotifications = parsedNotifications.filter(
//             (n: Notification) => currentTime - n.createdAt < thirtyDaysInMs
//           );

//           if (filteredNotifications.length !== parsedNotifications.length) {
//             localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filteredNotifications));
//           }

//           setNotifications(filteredNotifications);
//           setUnreadCount(filteredNotifications.filter((n: Notification) => !n.read).length);
//         }
//       } catch (error) {
//         console.error('Error loading data from localStorage:', error);
//       }
//     };

//     loadData();
//   }, []);

//   // Save posts and notifications to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
//   }, [posts]);

//   useEffect(() => {
//     localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
//   }, [notifications]);

//   const formatPostDate = (timestamp: number): { date: string; timeSince: string } => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

//     let timeSince;
//     if (seconds < 60) {
//       timeSince = 'Just now';
//     } else if (seconds < 3600) {
//       timeSince = `${Math.floor(seconds / 60)} minutes ago`;
//     } else if (seconds < 86400) {
//       timeSince = `${Math.floor(seconds / 3600)} hours ago`;
//     } else if (seconds < 2592000) {
//       timeSince = `${Math.floor(seconds / 86400)} days ago`;
//     } else {
//       timeSince = `${Math.floor(seconds / 2592000)} months ago`;
//     }

//     const date = postDate.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });

//     return { date, timeSince };
//   };

//   const addNotification = (message: string, type: 'new-post' | 'new-reply' | 'update', postId?: string) => {
//     const newNotification: Notification = {
//       id: Date.now().toString(),
//       message,
//       type,
//       createdAt: Date.now(),
//       read: false,
//       postId,
//     };

//     setNotifications((prev) => [newNotification, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   };

//   const handleCreatePost = () => {
//     if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return;

//     const timestamp = Date.now();
//     const { date, timeSince } = formatPostDate(timestamp);

//     const newPost: Post = {
//       id: timestamp.toString(),
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       timeSince,
//       title: newPostTitle,
//       content: newPostContent,
//       replies: [],
//     };

//     setPosts([newPost, ...posts]);
//     addNotification(`${currentUser.name} created a new post: "${newPostTitle}"`, 'new-post', newPost.id);
//     setNewPostTitle('');
//     setNewPostContent('');
//     setShowNewPostForm(false);
//   };

//   const handleAddReply = (postId: string) => {
//     if (!replyContent[postId]?.trim() || !currentUser) return;

//     const post = posts.find((p) => p.id === postId);
//     if (!post) return;

//     const timestamp = Date.now();
//     const { date } = formatPostDate(timestamp);

//     const newReply: Reply = {
//       id: `${postId}-${timestamp}`,
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       content: replyContent[postId],
//     };

//     const updatedPosts = posts.map((p) => {
//       if (p.id === postId) {
//         return { ...p, replies: [...p.replies, newReply] };
//       }
//       return p;
//     });

//     setPosts(updatedPosts);
//     addNotification(`${currentUser.name} replied to "${post.title}"`, 'new-reply', postId);
//     setReplyContent({ ...replyContent, [postId]: '' });
//   };

//   const toggleReplies = (postId: string) => {
//     setShowReplies({
//       ...showReplies,
//       [postId]: !showReplies[postId],
//     });
//   };

//   const togglePinPost = (postId: string) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId) {
//           const isPinning = !post.isPinned;
//           if (isPinning) {
//             addNotification(`Post "${post.title}" was pinned by instructor`, 'update', postId);
//           }
//           return { ...post, isPinned: isPinning };
//         }
//         return post;
//       })
//     );
//   };

//   const deletePost = (postId: string) => {
//     const post = posts.find((p) => p.id === postId);
//     if (post) {
//       addNotification(`Post "${post.title}" was deleted`, 'update');
//     }
//     setPosts(posts.filter((post) => post.id !== postId));
//   };

//   const sortPosts = (type: string) => {
//     setActiveSort(type);
//     const sortedPosts = [...posts];

//     if (type === 'latest') {
//       sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
//     } else if (type === 'top') {
//       sortedPosts.sort((a, b) => b.replies.length - a.replies.length);
//     } else if (type === 'oldest') {
//       sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
//     } else if (type === 'pinned') {
//       sortedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
//     }

//     setPosts(sortedPosts);
//   };

//   const markNotificationsAsRead = () => {
//     const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
//     setNotifications(updatedNotifications);
//     setUnreadCount(0);
//   };

//   const toggleNotifications = () => {
//     if (!showNotifications) {
//       markNotificationsAsRead();
//     }
//     setShowNotifications(!showNotifications);
//   };

//   // Check for expired posts and notifications periodically
//   useEffect(() => {
//     const checkForExpiredData = () => {
//       const currentTime = Date.now();
//       const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

//       // Check posts
//       const nonExpiredPosts = posts.filter((post) => currentTime - post.createdAt < thirtyDaysInMs);

//       if (nonExpiredPosts.length !== posts.length) {
//         setPosts(nonExpiredPosts);
//       }

//       // Check notifications
//       const nonExpiredNotifications = notifications.filter(
//         (n) => currentTime - n.createdAt < thirtyDaysInMs
//       );

//       if (nonExpiredNotifications.length !== notifications.length) {
//         setNotifications(nonExpiredNotifications);
//       }
//     };

//     const interval = setInterval(checkForExpiredData, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, [posts, notifications]);

//   // Prevent rendering until user is loaded
//   if (!user || !currentUser) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Forum</h2>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
//               <FiFilter className="text-gray-500" />
//               <span className="text-gray-700">Filter</span>
//             </button>
//             <div className="relative">
//               <button
//                 onClick={toggleNotifications}
//                 className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 relative"
//               >
//                 <FiBell className="text-gray-500" />
//                 <span className="text-gray-700">Notifications</span>
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
//                   <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">Notifications</div>
//                   {notifications.length > 0 ? (
//                     <div className="divide-y divide-gray-100">
//                       {notifications.map((notification) => (
//                         <div key={notification.id} className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
//                           <div className="text-sm text-gray-700">{notification.message}</div>
//                           <div className="text-xs text-gray-500 mt-1">
//                             {formatPostDate(notification.createdAt).timeSince}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-4 text-center text-gray-500">No notifications yet</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Stats and Sort */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-gray-500">{posts.length} posts</div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => sortPosts('latest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'latest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Latest
//             </button>
//             <button
//               onClick={() => sortPosts('top')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'top' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Top
//             </button>
//             <button
//               onClick={() => sortPosts('oldest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'oldest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Oldest
//             </button>
//             <button
//               onClick={() => sortPosts('pinned')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'pinned' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Pinned
//             </button>
//           </div>
//         </div>

//         {/* Create New Post */}
//         {!showNewPostForm ? (
//           <button
//             onClick={() => setShowNewPostForm(true)}
//             className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//           >
//             <FiPlus />
//             <span>Create a new post</span>
//           </button>
//         ) : (
//           <div className="mb-6 bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">NEW POST</h2>
//             <input
//               type="text"
//               placeholder="Title"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={newPostTitle}
//               onChange={(e) => setNewPostTitle(e.target.value)}
//             />
//             <textarea
//               placeholder="What would you like to discuss?"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={newPostContent}
//               onChange={(e) => setNewPostContent(e.target.value)}
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowNewPostForm(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreatePost}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 disabled={!newPostTitle.trim() || !newPostContent.trim()}
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div
//                 key={post.id}
//                 className={`bg-white rounded-lg shadow-md overflow-hidden ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}
//               >
//                 <div className="p-6">
//                   {/* Post Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                         {post.author.avatar?.startsWith('http') ? (
//                           <img src={post.author.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
//                         ) : (
//                           post.author.avatar || post.author.name.charAt(0)
//                         )}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">{post.author.name}</div>
//                         <div className="text-sm text-gray-500">{post.author.role}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       <div>{post.date}</div>
//                       <div className="text-xs">{post.timeSince}</div>
//                     </div>
//                   </div>

//                   {/* Post Content */}
//                   <div className="mb-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => togglePinPost(post.id)}
//                           className={`p-1 rounded-md ${post.isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
//                           title={post.isPinned ? 'Unpin post' : 'Pin post'}
//                         >
//                           <FiBookmark />
//                         </button>
//                         {post.author.name === currentUser.name && (
//                           <button
//                             onClick={() => deletePost(post.id)}
//                             className="p-1 text-red-500 rounded-md hover:bg-red-50"
//                             title="Delete post"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
//                   </div>

//                   {/* Post Actions */}
//                   <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//                     <button
//                       onClick={() => toggleReplies(post.id)}
//                       className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
//                     >
//                       <FiMessageSquare />
//                       <span>
//                         {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
//                       </span>
//                       <FiChevronDown
//                         className={`transition-transform ${showReplies[post.id] ? 'transform rotate-180' : ''}`}
//                       />
//                     </button>
//                     <div className="flex space-x-4">
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiClock />
//                         <span>Save</span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiUser />
//                         <span>Follow</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Replies Section */}
//                   {showReplies[post.id] && (
//                     <div className="mt-4 pl-6 border-l-2 border-gray-200">
//                       {/* Reply Form */}
//                       <div className="mb-4">
//                         <textarea
//                           placeholder="Write a reply..."
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           value={replyContent[post.id] || ''}
//                           onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
//                         />
//                         <div className="flex justify-end mt-2">
//                           <button
//                             onClick={() => handleAddReply(post.id)}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                             disabled={!replyContent[post.id]?.trim()}
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>

//                       {/* Replies List */}
//                       {post.replies.length > 0 ? (
//                         <div className="space-y-4">
//                           {post.replies.map((reply) => (
//                             <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center space-x-2">
//                                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
//                                     {reply.author.avatar?.startsWith('http') ? (
//                                       <img
//                                         src={reply.author.avatar}
//                                         alt="Avatar"
//                                         className="w-8 h-8 rounded-full object-cover"
//                                       />
//                                     ) : (
//                                       reply.author.avatar || reply.author.name.charAt(0)
//                                     )}
//                                   </div>
//                                   <div className="font-medium text-gray-800">{reply.author.name}</div>
//                                   {reply.author.role && (
//                                     <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                                       {reply.author.role}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">{reply.date}</div>
//                               </div>
//                               <div className="text-gray-700 ml-10">{reply.content}</div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center text-gray-500 py-4">No replies yet</div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//               No posts yet. Be the first to create one!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// 'use client';
// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { FiFilter, FiBell, FiChevronDown, FiMessageSquare, FiClock, FiUser, FiPlus, FiTrash2, FiBookmark } from 'react-icons/fi';

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     role: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   timeSince: string;
//   title: string;
//   content: string;
//   replies: Reply[];
//   isPinned?: boolean;
// }

// interface Reply {
//   id: string;
//   author: {
//     name: string;
//     role?: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   content: string;
// }

// interface Notification {
//   id: string;
//   message: string;
//   type: 'new-post' | 'new-reply' | 'update';
//   createdAt: number;
//   read: boolean;
//   postId?: string;
// }

// const LOCAL_STORAGE_KEY = 'forumPosts';
// const NOTIFICATIONS_KEY = 'forumNotifications';
// const POST_EXPIRATION_DAYS = 30;

// // Default posts to simulate shared public posts (visible to all users on first load)
// const DEFAULT_POSTS: Post[] = [
//   {
//     id: 'default-1',
//     author: {
//       name: 'Forum Admin',
//       role: 'Administrator',
//       avatar: 'FA',
//     },
//     createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
//     date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     }),
//     timeSince: '5 days ago',
//     title: 'Welcome to the Forum!',
//     content: 'This is a public forum where you can discuss various topics. Feel free to create new posts and reply to existing ones!',
//     replies: [],
//     isPinned: true,
//   },
// ];

// export default function Forum() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [showNewPostForm, setShowNewPostForm] = useState(false);
//   const [activeSort, setActiveSort] = useState('latest');
//   const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
//   const [replyContent, setReplyContent] = useState<Record<string, string>>({});

//   // Get current user from Clerk
//   const { user } = useUser();

//   // Define currentUser based on Clerk's user data
//   const currentUser = user
//     ? {
//         name: user.fullName || user.username || user.emailAddresses[0].emailAddress.split('@')[0],
//         role: 'Student', // Customize via user metadata if needed
//         avatar: user.imageUrl || user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0),
//       }
//     : null;

//   // Load posts and notifications from localStorage on component mount
//   useEffect(() => {
//     const loadData = () => {
//       try {
//         // Load posts
//         let savedPosts: Post[] = [];
//         const savedPostsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
//         if (savedPostsRaw) {
//           savedPosts = JSON.parse(savedPostsRaw);
//         } else {
//           // Initialize with default posts if none exist
//           savedPosts = DEFAULT_POSTS;
//           localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedPosts));
//         }

//         const currentTime = Date.now();
//         const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//         const filteredPosts = savedPosts.filter((post: Post) => currentTime - post.createdAt < thirtyDaysInMs);

//         if (filteredPosts.length !== savedPosts.length) {
//           localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredPosts));
//         }

//         setPosts(filteredPosts.length > 0 ? filteredPosts : DEFAULT_POSTS);
//       } catch (error) {
//         console.error('Error loading posts from localStorage:', error);
//         // Fallback to default posts on error
//         setPosts(DEFAULT_POSTS);
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
//       }

//       try {
//         // Load notifications
//         const savedNotificationsRaw = localStorage.getItem(NOTIFICATIONS_KEY);
//         let savedNotifications: Notification[] = [];
//         if (savedNotificationsRaw) {
//           savedNotifications = JSON.parse(savedNotificationsRaw);
//           const currentTime = Date.now();
//           const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
//           const filteredNotifications = savedNotifications.filter(
//             (n: Notification) => currentTime - n.createdAt < thirtyDaysInMs
//           );

//           if (filteredNotifications.length !== savedNotifications.length) {
//             localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filteredNotifications));
//           }

//           setNotifications(filteredNotifications);
//           setUnreadCount(filteredNotifications.filter((n: Notification) => !n.read).length);
//         }
//       } catch (error) {
//         console.error('Error loading notifications from localStorage:', error);
//         setNotifications([]);
//       }
//     };

//     loadData();
//   }, []);

//   // Save posts and notifications to localStorage when they change
//   useEffect(() => {
//     try {
//       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
//     } catch (error) {
//       console.error('Error saving posts to localStorage:', error);
//     }
//   }, [posts]);

//   useEffect(() => {
//     try {
//       localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
//     } catch (error) {
//       console.error('Error saving notifications to localStorage:', error);
//     }
//   }, [notifications]);

//   const formatPostDate = (timestamp: number): { date: string; timeSince: string } => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

//     let timeSince;
//     if (seconds < 60) {
//       timeSince = 'Just now';
//     } else if (seconds < 3600) {
//       timeSince = `${Math.floor(seconds / 60)} minutes ago`;
//     } else if (seconds < 86400) {
//       timeSince = `${Math.floor(seconds / 3600)} hours ago`;
//     } else if (seconds < 2592000) {
//       timeSince = `${Math.floor(seconds / 86400)} days ago`;
//     } else {
//       timeSince = `${Math.floor(seconds / 2592000)} months ago`;
//     }

//     const date = postDate.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });

//     return { date, timeSince };
//   };

//   const addNotification = (message: string, type: 'new-post' | 'new-reply' | 'update', postId?: string) => {
//     const newNotification: Notification = {
//       id: Date.now().toString(),
//       message,
//       type,
//       createdAt: Date.now(),
//       read: false,
//       postId,
//     };

//     setNotifications((prev) => [newNotification, ...prev]);
//     setUnreadCount((prev) => prev + 1);
//   };

//   const handleCreatePost = () => {
//     if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return;

//     const timestamp = Date.now();
//     const { date, timeSince } = formatPostDate(timestamp);

//     const newPost: Post = {
//       id: timestamp.toString(),
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       timeSince,
//       title: newPostTitle,
//       content: newPostContent,
//       replies: [],
//     };

//     setPosts([newPost, ...posts]);
//     addNotification(`${currentUser.name} created a new post: "${newPostTitle}"`, 'new-post', newPost.id);
//     setNewPostTitle('');
//     setNewPostContent('');
//     setShowNewPostForm(false);
//   };

//   const handleAddReply = (postId: string) => {
//     if (!replyContent[postId]?.trim() || !currentUser) return;

//     const post = posts.find((p) => p.id === postId);
//     if (!post) return;

//     const timestamp = Date.now();
//     const { date } = formatPostDate(timestamp);

//     const newReply: Reply = {
//       id: `${postId}-${timestamp}`,
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       content: replyContent[postId],
//     };

//     const updatedPosts = posts.map((p) => {
//       if (p.id === postId) {
//         return { ...p, replies: [...p.replies, newReply] };
//       }
//       return p;
//     });

//     setPosts(updatedPosts);
//     addNotification(`${currentUser.name} replied to "${post.title}"`, 'new-reply', postId);
//     setReplyContent({ ...replyContent, [postId]: '' });
//   };

//   const toggleReplies = (postId: string) => {
//     setShowReplies({
//       ...showReplies,
//       [postId]: !showReplies[postId],
//     });
//   };

//   const togglePinPost = (postId: string) => {
//     setPosts(
//       posts.map((post) => {
//         if (post.id === postId) {
//           const isPinning = !post.isPinned;
//           if (isPinning) {
//             addNotification(`Post "${post.title}" was pinned by instructor`, 'update', postId);
//           }
//           return { ...post, isPinned: isPinning };
//         }
//         return post;
//       })
//     );
//   };

//   const deletePost = (postId: string) => {
//     const post = posts.find((p) => p.id === postId);
//     if (post) {
//       addNotification(`Post "${post.title}" was deleted`, 'update');
//     }
//     setPosts(posts.filter((post) => post.id !== postId));
//   };

//   const sortPosts = (type: string) => {
//     setActiveSort(type);
//     const sortedPosts = [...posts];

//     if (type === 'latest') {
//       sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
//     } else if (type === 'top') {
//       sortedPosts.sort((a, b) => b.replies.length - a.replies.length);
//     } else if (type === 'oldest') {
//       sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
//     } else if (type === 'pinned') {
//       sortedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
//     }

//     setPosts(sortedPosts);
//   };

//   const markNotificationsAsRead = () => {
//     const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
//     setNotifications(updatedNotifications);
//     setUnreadCount(0);
//   };

//   const toggleNotifications = () => {
//     if (!showNotifications) {
//       markNotificationsAsRead();
//     }
//     setShowNotifications(!showNotifications);
//   };

//   // Check for expired posts and notifications periodically
//   useEffect(() => {
//     const checkForExpiredData = () => {
//       const currentTime = Date.now();
//       const thirtyDaysInMs = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

//       // Check posts
//       const nonExpiredPosts = posts.filter((post) => currentTime - post.createdAt < thirtyDaysInMs);

//       if (nonExpiredPosts.length !== posts.length) {
//         setPosts(nonExpiredPosts.length > 0 ? nonExpiredPosts : DEFAULT_POSTS);
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nonExpiredPosts));
//       }

//       // Check notifications
//       const nonExpiredNotifications = notifications.filter(
//         (n) => currentTime - n.createdAt < thirtyDaysInMs
//       );

//       if (nonExpiredNotifications.length !== notifications.length) {
//         setNotifications(nonExpiredNotifications);
//         localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(nonExpiredNotifications));
//       }
//     };

//     const interval = setInterval(checkForExpiredData, 60 * 60 * 1000); // Check hourly
//     return () => clearInterval(interval);
//   }, [posts, notifications]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Forum</h2>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
//               <FiFilter className="text-gray-500" />
//               <span className="text-gray-700">Filter</span>
//             </button>
//             {currentUser && (
//               <div className="relative">
//                 <button
//                   onClick={toggleNotifications}
//                   className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 relative"
//                 >
//                   <FiBell className="text-gray-500" />
//                   <span className="text-gray-700">Notifications</span>
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
//                     <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">Notifications</div>
//                     {notifications.length > 0 ? (
//                       <div className="divide-y divide-gray-100">
//                         {notifications.map((notification) => (
//                           <div key={notification.id} className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
//                             <div className="text-sm text-gray-700">{notification.message}</div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               {formatPostDate(notification.createdAt).timeSince}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-4 text-center text-gray-500">No notifications yet</div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Stats and Sort */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-gray-500">{posts.length} posts</div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => sortPosts('latest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'latest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Latest
//             </button>
//             <button
//               onClick={() => sortPosts('top')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'top' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Top
//             </button>
//             <button
//               onClick={() => sortPosts('oldest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'oldest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Oldest
//             </button>
//             <button
//               onClick={() => sortPosts('pinned')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'pinned' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Pinned
//             </button>
//           </div>
//         </div>

//         {/* Create New Post */}
//         {currentUser ? (
//           !showNewPostForm ? (
//             <button
//               onClick={() => setShowNewPostForm(true)}
//               className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//             >
//               <FiPlus />
//               <span>Create a new post</span>
//             </button>
//           ) : (
//             <div className="mb-6 bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">NEW POST</h2>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newPostTitle}
//                 onChange={(e) => setNewPostTitle(e.target.value)}
//               />
//               <textarea
//                 placeholder="What would you like to discuss?"
//                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newPostContent}
//                 onChange={(e) => setNewPostContent(e.target.value)}
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowNewPostForm(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreatePost}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                   disabled={!newPostTitle.trim() || !newPostContent.trim()}
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           )
//         ) : (
//           <div className="mb-6 bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//             Please sign in to create a new post.
//           </div>
//         )}

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div
//                 key={post.id}
//                 className={`bg-white rounded-lg shadow-md overflow-hidden ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}
//               >
//                 <div className="p-6">
//                   {/* Post Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                         {post.author.avatar?.startsWith('http') ? (
//                           <img src={post.author.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
//                         ) : (
//                           post.author.avatar || post.author.name.charAt(0)
//                         )}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">{post.author.name}</div>
//                         <div className="text-sm text-gray-500">{post.author.role}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       <div>{post.date}</div>
//                       <div className="text-xs">{post.timeSince}</div>
//                     </div>
//                   </div>

//                   {/* Post Content */}
//                   <div className="mb-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
//                       <div className="flex space-x-2">
//                         {currentUser && (
//                           <button
//                             onClick={() => togglePinPost(post.id)}
//                             className={`p-1 rounded-md ${post.isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
//                             title={post.isPinned ? 'Unpin post' : 'Pin post'}
//                           >
//                             <FiBookmark />
//                           </button>
//                         )}
//                         {currentUser && post.author.name === currentUser.name && (
//                           <button
//                             onClick={() => deletePost(post.id)}
//                             className="p-1 text-red-500 rounded-md hover:bg-red-50"
//                             title="Delete post"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
//                   </div>

//                   {/* Post Actions */}
//                   <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//                     <button
//                       onClick={() => toggleReplies(post.id)}
//                       className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
//                     >
//                       <FiMessageSquare />
//                       <span>
//                         {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
//                       </span>
//                       <FiChevronDown
//                         className={`transition-transform ${showReplies[post.id] ? 'transform rotate-180' : ''}`}
//                       />
//                     </button>
//                     <div className="flex space-x-4">
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiClock />
//                         <span>Save</span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiUser />
//                         <span>Follow</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Replies Section */}
//                   {showReplies[post.id] && (
//                     <div className="mt-4 pl-6 border-l-2 border-gray-200">
//                       {/* Reply Form */}
//                       {currentUser ? (
//                         <div className="mb-4">
//                           <textarea
//                             placeholder="Write a reply..."
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={replyContent[post.id] || ''}
//                             onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
//                           />
//                           <div className="flex justify-end mt-2">
//                             <button
//                               onClick={() => handleAddReply(post.id)}
//                               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                               disabled={!replyContent[post.id]?.trim()}
//                             >
//                               Reply
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="mb-4 text-center text-gray-500">Please sign in to reply.</div>
//                       )}

//                       {/* Replies List */}
//                       {post.replies.length > 0 ? (
//                         <div className="space-y-4">
//                           {post.replies.map((reply) => (
//                             <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center space-x-2">
//                                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
//                                     {reply.author.avatar?.startsWith('http') ? (
//                                       <img
//                                         src={reply.author.avatar}
//                                         alt="Avatar"
//                                         className="w-8 h-8 rounded-full object-cover"
//                                       />
//                                     ) : (
//                                       reply.author.avatar || reply.author.name.charAt(0)
//                                     )}
//                                   </div>
//                                   <div className="font-medium text-gray-800">{reply.author.name}</div>
//                                   {reply.author.role && (
//                                     <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                                       {reply.author.role}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">{reply.date}</div>
//                               </div>
//                               <div className="text-gray-700 ml-10">{reply.content}</div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center text-gray-500 py-4">No replies yet</div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//               No posts yet. Be the first to create one!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }









// 'use client';
// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { FiFilter, FiBell, FiChevronDown, FiMessageSquare, FiClock, FiUser, FiPlus, FiTrash2, FiBookmark } from 'react-icons/fi';

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     role: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   timeSince: string;
//   title: string;
//   content: string;
//   replies: Reply[];
//   isPinned?: boolean;
// }

// interface Reply {
//   id: string;
//   author: {
//     name: string;
//     role?: string;
//     avatar?: string;
//   };
//   createdAt: number;
//   date: string;
//   content: string;
// }

// interface Notification {
//   id: string;
//   message: string;
//   type: 'new-post' | 'new-reply' | 'update';
//   createdAt: number;
//   read: boolean;
//   postId?: string;
// }

// const LOCAL_STORAGE_KEY = 'forumPosts';
// const NOTIFICATIONS_KEY = 'forumNotifications';
// const POST_EXPIRATION_DAYS = 30;
// const THIRTY_DAYS_IN_MS = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

// // Default posts to simulate shared public posts (visible to all users on first load)
// const DEFAULT_POSTS: Post[] = [
//   {
//     id: 'default-1',
//     author: {
//       name: 'Forum Admin',
//       role: 'Administrator',
//       avatar: 'FA',
//     },
//     createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
//     date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     }),
//     timeSince: '5 days ago',
//     title: 'Welcome to the Forum!',
//     content: 'This is a public forum where you can discuss various topics. Feel free to create new posts and reply to existing ones!',
//     replies: [],
//     isPinned: true,
//   },
// ];

// export default function Forum() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [showNewPostForm, setShowNewPostForm] = useState(false);
//   const [activeSort, setActiveSort] = useState('latest');
//   const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
//   const [replyContent, setReplyContent] = useState<Record<string, string>>({});

//   // Get current user from Clerk
//   const { user } = useUser();

//   // Define currentUser based on Clerk's user data
//   const currentUser = user
//     ? {
//         name: user.fullName || user.username || user.emailAddresses[0].emailAddress.split('@')[0],
//         role: 'Student', // Customize via user metadata if needed
//         avatar: user.imageUrl || user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0),
//       }
//     : null;

//   // Load posts and notifications from localStorage on component mount
//   useEffect(() => {
//     const loadData = () => {
//       try {
//         // Load posts
//         const savedPostsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
//         let savedPosts: Post[] = savedPostsRaw ? JSON.parse(savedPostsRaw) : [...DEFAULT_POSTS];
        
//         // Filter out expired posts
//         const currentTime = Date.now();
//         savedPosts = savedPosts.filter(post => currentTime - post.createdAt < THIRTY_DAYS_IN_MS);

//         // If no valid posts, use default posts
//         if (savedPosts.length === 0 && (!savedPostsRaw || savedPostsRaw === '[]')) {
//           savedPosts = [...DEFAULT_POSTS];
//         }

//         // Update timeSince for all posts
//         savedPosts = savedPosts.map(post => ({
//           ...post,
//           timeSince: formatPostDate(post.createdAt).timeSince
//         }));

//         setPosts(savedPosts);
//       } catch (error) {
//         console.error('Error loading posts from localStorage:', error);
//         // Fallback to default posts on error
//         setPosts([...DEFAULT_POSTS]);
//       }

//       try {
//         // Load notifications
//         const savedNotificationsRaw = localStorage.getItem(NOTIFICATIONS_KEY);
//         if (savedNotificationsRaw) {
//           const savedNotifications: Notification[] = JSON.parse(savedNotificationsRaw);
//           const currentTime = Date.now();
//           const filteredNotifications = savedNotifications.filter(
//             n => currentTime - n.createdAt < THIRTY_DAYS_IN_MS
//           );
//           setNotifications(filteredNotifications);
//           setUnreadCount(filteredNotifications.filter(n => !n.read).length);
//         }
//       } catch (error) {
//         console.error('Error loading notifications from localStorage:', error);
//         setNotifications([]);
//       }
//     };

//     loadData();
//   }, []);

//   // Save posts to localStorage whenever they change
//   useEffect(() => {
//     const savePosts = () => {
//       try {
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
//       } catch (error) {
//         console.error('Error saving posts to localStorage:', error);
//       }
//     };

//     savePosts();
//   }, [posts]);

//   // Save notifications to localStorage whenever they change
//   useEffect(() => {
//     const saveNotifications = () => {
//       try {
//         localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
//       } catch (error) {
//         console.error('Error saving notifications to localStorage:', error);
//       }
//     };

//     saveNotifications();
//   }, [notifications]);

//   const formatPostDate = (timestamp: number): { date: string; timeSince: string } => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

//     let timeSince;
//     if (seconds < 60) {
//       timeSince = 'Just now';
//     } else if (seconds < 3600) {
//       timeSince = `${Math.floor(seconds / 60)} minutes ago`;
//     } else if (seconds < 86400) {
//       timeSince = `${Math.floor(seconds / 3600)} hours ago`;
//     } else if (seconds < 2592000) {
//       timeSince = `${Math.floor(seconds / 86400)} days ago`;
//     } else {
//       timeSince = `${Math.floor(seconds / 2592000)} months ago`;
//     }

//     const date = postDate.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });

//     return { date, timeSince };
//   };

//   const addNotification = (message: string, type: 'new-post' | 'new-reply' | 'update', postId?: string) => {
//     const newNotification: Notification = {
//       id: Date.now().toString(),
//       message,
//       type,
//       createdAt: Date.now(),
//       read: false,
//       postId,
//     };

//     setNotifications(prev => [newNotification, ...prev]);
//     setUnreadCount(prev => prev + 1);
//   };

//   const handleCreatePost = () => {
//     if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return;

//     const timestamp = Date.now();
//     const { date, timeSince } = formatPostDate(timestamp);

//     const newPost: Post = {
//       id: timestamp.toString(),
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       timeSince,
//       title: newPostTitle,
//       content: newPostContent,
//       replies: [],
//     };

//     setPosts(prevPosts => [newPost, ...prevPosts]);
//     addNotification(`${currentUser.name} created a new post: "${newPostTitle}"`, 'new-post', newPost.id);
//     setNewPostTitle('');
//     setNewPostContent('');
//     setShowNewPostForm(false);
//   };

//   const handleAddReply = (postId: string) => {
//     if (!replyContent[postId]?.trim() || !currentUser) return;

//     const post = posts.find(p => p.id === postId);
//     if (!post) return;

//     const timestamp = Date.now();
//     const { date } = formatPostDate(timestamp);

//     const newReply: Reply = {
//       id: `${postId}-${timestamp}`,
//       author: {
//         name: currentUser.name,
//         role: currentUser.role,
//         avatar: currentUser.avatar,
//       },
//       createdAt: timestamp,
//       date,
//       content: replyContent[postId],
//     };

//     setPosts(prevPosts =>
//       prevPosts.map(p =>
//         p.id === postId
//           ? { ...p, replies: [...p.replies, newReply] }
//           : p
//       )
//     );
//     addNotification(`${currentUser.name} replied to "${post.title}"`, 'new-reply', postId);
//     setReplyContent(prev => ({ ...prev, [postId]: '' }));
//   };

//   const toggleReplies = (postId: string) => {
//     setShowReplies(prev => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   const togglePinPost = (postId: string) => {
//     setPosts(prevPosts =>
//       prevPosts.map(post => {
//         if (post.id === postId) {
//           const isPinning = !post.isPinned;
//           if (isPinning) {
//             addNotification(`Post "${post.title}" was pinned by instructor`, 'update', postId);
//           }
//           return { ...post, isPinned: isPinning };
//         }
//         return post;
//       })
//     );
//   };

//   const deletePost = (postId: string) => {
//     const post = posts.find(p => p.id === postId);
//     if (post) {
//       addNotification(`Post "${post.title}" was deleted`, 'update');
//     }
//     setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
//   };

//   const sortPosts = (type: string) => {
//     setActiveSort(type);
//     setPosts(prevPosts => {
//       const sortedPosts = [...prevPosts];
//       if (type === 'latest') {
//         sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
//       } else if (type === 'top') {
//         sortedPosts.sort((a, b) => b.replies.length - a.replies.length);
//       } else if (type === 'oldest') {
//         sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
//       } else if (type === 'pinned') {
//         sortedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
//       }
//       return sortedPosts;
//     });
//   };

//   const markNotificationsAsRead = () => {
//     setNotifications(prev =>
//       prev.map(n => ({ ...n, read: true }))
//     );
//     setUnreadCount(0);
//   };

//   const toggleNotifications = () => {
//     if (!showNotifications) {
//       markNotificationsAsRead();
//     }
//     setShowNotifications(prev => !prev);
//   };

//   // Check for expired posts and notifications periodically
//   useEffect(() => {
//     const checkForExpiredData = () => {
//       const currentTime = Date.now();
      
//       // Check posts
//       setPosts(prevPosts => {
//         const nonExpiredPosts = prevPosts.filter(post => currentTime - post.createdAt < THIRTY_DAYS_IN_MS);
//         return nonExpiredPosts.length > 0 ? nonExpiredPosts : [...DEFAULT_POSTS];
//       });

//       // Check notifications
//       setNotifications(prevNotifications => 
//         prevNotifications.filter(n => currentTime - n.createdAt < THIRTY_DAYS_IN_MS)
//       );
//     };

//     const interval = setInterval(checkForExpiredData, 60 * 60 * 1000); // Check hourly
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Forum</h2>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
//               <FiFilter className="text-gray-500" />
//               <span className="text-gray-700">Filter</span>
//             </button>
//             {currentUser && (
//               <div className="relative">
//                 <button
//                   onClick={toggleNotifications}
//                   className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 relative"
//                 >
//                   <FiBell className="text-gray-500" />
//                   <span className="text-gray-700">Notifications</span>
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
//                     <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">Notifications</div>
//                     {notifications.length > 0 ? (
//                       <div className="divide-y divide-gray-100">
//                         {notifications.map((notification) => (
//                           <div key={notification.id} className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
//                             <div className="text-sm text-gray-700">{notification.message}</div>
//                             <div className="text-xs text-gray-500 mt-1">
//                               {formatPostDate(notification.createdAt).timeSince}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-4 text-center text-gray-500">No notifications yet</div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Stats and Sort */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-gray-500">{posts.length} posts</div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => sortPosts('latest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'latest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Latest
//             </button>
//             <button
//               onClick={() => sortPosts('top')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'top' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Top
//             </button>
//             <button
//               onClick={() => sortPosts('oldest')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'oldest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Oldest
//             </button>
//             <button
//               onClick={() => sortPosts('pinned')}
//               className={`px-3 py-1 rounded-md ${
//                 activeSort === 'pinned' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               Pinned
//             </button>
//           </div>
//         </div>

//         {/* Create New Post */}
//         {currentUser ? (
//           !showNewPostForm ? (
//             <button
//               onClick={() => setShowNewPostForm(true)}
//               className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//             >
//               <FiPlus />
//               <span>Create a new post</span>
//             </button>
//           ) : (
//             <div className="mb-6 bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">NEW POST</h2>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newPostTitle}
//                 onChange={(e) => setNewPostTitle(e.target.value)}
//               />
//               <textarea
//                 placeholder="What would you like to discuss?"
//                 className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newPostContent}
//                 onChange={(e) => setNewPostContent(e.target.value)}
//               />
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowNewPostForm(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreatePost}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                   disabled={!newPostTitle.trim() || !newPostContent.trim()}
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           )
//         ) : (
//           <div className="mb-6 bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//             Please sign in to create a new post.
//           </div>
//         )}

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div
//                 key={post.id}
//                 className={`bg-white rounded-lg shadow-md overflow-hidden ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}
//               >
//                 <div className="p-6">
//                   {/* Post Header */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                         {post.author.avatar?.startsWith('http') ? (
//                           <img src={post.author.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
//                         ) : (
//                           post.author.avatar || post.author.name.charAt(0)
//                         )}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">{post.author.name}</div>
//                         <div className="text-sm text-gray-500">{post.author.role}</div>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       <div>{post.date}</div>
//                       <div className="text-xs">{post.timeSince}</div>
//                     </div>
//                   </div>

//                   {/* Post Content */}
//                   <div className="mb-4">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
//                       <div className="flex space-x-2">
//                         {currentUser && (
//                           <button
//                             onClick={() => togglePinPost(post.id)}
//                             className={`p-1 rounded-md ${post.isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
//                             title={post.isPinned ? 'Unpin post' : 'Pin post'}
//                           >
//                             <FiBookmark />
//                           </button>
//                         )}
//                         {currentUser && post.author.name === currentUser.name && (
//                           <button
//                             onClick={() => deletePost(post.id)}
//                             className="p-1 text-red-500 rounded-md hover:bg-red-50"
//                             title="Delete post"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
//                   </div>

//                   {/* Post Actions */}
//                   <div className="flex items-center justify-between border-t border-gray-100 pt-4">
//                     <button
//                       onClick={() => toggleReplies(post.id)}
//                       className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
//                     >
//                       <FiMessageSquare />
//                       <span>
//                         {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
//                       </span>
//                       <FiChevronDown
//                         className={`transition-transform ${showReplies[post.id] ? 'transform rotate-180' : ''}`}
//                       />
//                     </button>
//                     <div className="flex space-x-4">
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiClock />
//                         <span>Save</span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
//                         <FiUser />
//                         <span>Follow</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Replies Section */}
//                   {showReplies[post.id] && (
//                     <div className="mt-4 pl-6 border-l-2 border-gray-200">
//                       {/* Reply Form */}
//                       {currentUser ? (
//                         <div className="mb-4">
//                           <textarea
//                             placeholder="Write a reply..."
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={replyContent[post.id] || ''}
//                             onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
//                           />
//                           <div className="flex justify-end mt-2">
//                             <button
//                               onClick={() => handleAddReply(post.id)}
//                               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                               disabled={!replyContent[post.id]?.trim()}
//                             >
//                               Reply
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="mb-4 text-center text-gray-500">Please sign in to reply.</div>
//                       )}

//                       {/* Replies List */}
//                       {post.replies.length > 0 ? (
//                         <div className="space-y-4">
//                           {post.replies.map((reply) => (
//                             <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center space-x-2">
//                                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
//                                     {reply.author.avatar?.startsWith('http') ? (
//                                       <img
//                                         src={reply.author.avatar}
//                                         alt="Avatar"
//                                         className="w-8 h-8 rounded-full object-cover"
//                                       />
//                                     ) : (
//                                       reply.author.avatar || reply.author.name.charAt(0)
//                                     )}
//                                   </div>
//                                   <div className="font-medium text-gray-800">{reply.author.name}</div>
//                                   {reply.author.role && (
//                                     <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//                                       {reply.author.role}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="text-xs text-gray-500">{reply.date}</div>
//                               </div>
//                               <div className="text-gray-700 ml-10">{reply.content}</div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center text-gray-500 py-4">No replies yet</div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
//               No posts yet. Be the first to create one!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }










'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FiFilter, FiBell, FiChevronDown, FiMessageSquare, FiClock, FiUser, FiPlus, FiTrash2, FiBookmark, FiX } from 'react-icons/fi';

interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: number;
  date: string;
  timeSince: string;
  title: string;
  content: string;
  replies: Reply[];
  isPinned?: boolean;
}

interface Reply {
  id: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  createdAt: number;
  date: string;
  content: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'new-post' | 'new-reply' | 'update';
  createdAt: number;
  read: boolean;
  postId?: string;
}

const NOTIFICATIONS_KEY = 'forumNotifications';
const POST_EXPIRATION_DAYS = 30;
const THIRTY_DAYS_IN_MS = POST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeSort, setActiveSort] = useState('latest');
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});

  const { user } = useUser();

  const currentUser = user
    ? {
        name: user.fullName || user.username || user.emailAddresses[0].emailAddress.split('@')[0],
        role: 'Student',
        avatar: user.imageUrl || user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0),
      }
    : null;

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      let fetchedPosts: Post[] = await response.json();

      // Filter out expired posts
      const currentTime = Date.now();
      fetchedPosts = fetchedPosts.filter(post => currentTime - post.createdAt < THIRTY_DAYS_IN_MS);

      // Update timeSince for all posts
      fetchedPosts = fetchedPosts.map(post => ({
        ...post,
        timeSince: formatPostDate(post.createdAt).timeSince,
      }));

      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Load posts and notifications on mount
  useEffect(() => {
    fetchPosts();

    try {
      const savedNotificationsRaw = localStorage.getItem(NOTIFICATIONS_KEY);
      if (savedNotificationsRaw) {
        const savedNotifications: Notification[] = JSON.parse(savedNotificationsRaw);
        const currentTime = Date.now();
        const filteredNotifications = savedNotifications.filter(
          n => currentTime - n.createdAt < THIRTY_DAYS_IN_MS
        );
        setNotifications(filteredNotifications);
        setUnreadCount(filteredNotifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
      setNotifications([]);
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  }, [notifications]);

  const formatPostDate = (timestamp: number): { date: string; timeSince: string } => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    let timeSince;
    if (seconds < 60) {
      timeSince = 'Just now';
    } else if (seconds < 3600) {
      timeSince = `${Math.floor(seconds / 60)} minutes ago`;
    } else if (seconds < 86400) {
      timeSince = `${Math.floor(seconds / 3600)} hours ago`;
    } else if (seconds < 2592000) {
      timeSince = `${Math.floor(seconds / 86400)} days ago`;
    } else {
      timeSince = `${Math.floor(seconds / 2592000)} months ago`;
    }

    const date = postDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return { date, timeSince };
  };

  const addNotification = (message: string, type: 'new-post' | 'new-reply' | 'update', postId?: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      createdAt: Date.now(),
      read: false,
      postId,
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return;

    const timestamp = Date.now();
    const { date, timeSince } = formatPostDate(timestamp);

    const newPost: Post = {
      id: timestamp.toString(),
      author: {
        name: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.avatar,
      },
      createdAt: timestamp,
      date,
      timeSince,
      title: newPostTitle,
      content: newPostContent,
      replies: [],
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error('Failed to create post');

      setPosts(prevPosts => [newPost, ...prevPosts]);
      addNotification(`${currentUser.name} created a new post: "${newPostTitle}"`, 'new-post', newPost.id);
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleAddReply = async (postId: string) => {
    if (!replyContent[postId]?.trim() || !currentUser) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const timestamp = Date.now();
    const { date } = formatPostDate(timestamp);

    const newReply: Reply = {
      id: `${postId}-${timestamp}`,
      author: {
        name: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.avatar,
      },
      createdAt: timestamp,
      date,
      content: replyContent[postId],
    };

    try {
      const updatedPost = {
        ...post,
        replies: [...post.replies, newReply],
      };
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) throw new Error('Failed to add reply');

      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === postId ? updatedPost : p
        )
      );
      addNotification(`${currentUser.name} replied to "${post.title}"`, 'new-reply', postId);
      setReplyContent(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const toggleReplies = (postId: string) => {
    setShowReplies(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const togglePinPost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const updatedPost = { ...post, isPinned: !post.isPinned };
    try {
      const response = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) throw new Error('Failed to update post');

      setPosts(prevPosts =>
        prevPosts.map(p => (p.id === postId ? updatedPost : p))
      );
      if (!post.isPinned) {
        addNotification(`Post "${post.title}" was pinned by instructor`, 'update', postId);
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const deletePost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      const response = await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');

      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      addNotification(`Post "${post.title}" was deleted`, 'update');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const sortPosts = (type: string) => {
    setActiveSort(type);
    setPosts(prevPosts => {
      const sortedPosts = [...prevPosts];
      if (type === 'latest') {
        sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
      } else if (type === 'top') {
        sortedPosts.sort((a, b) => b.replies.length - a.replies.length);
      } else if (type === 'oldest') {
        sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
      } else if (type === 'pinned') {
        sortedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      }
      return sortedPosts;
    });
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    if (!showNotifications) {
      markNotificationsAsRead();
    }
    setShowNotifications(prev => !prev);
  };

  // Check for expired posts and notifications
  useEffect(() => {
    const checkForExpiredData = async () => {
      const currentTime = Date.now();
      const nonExpiredPosts = posts.filter(post => currentTime - post.createdAt < THIRTY_DAYS_IN_MS);
      if (nonExpiredPosts.length !== posts.length) {
        await fetchPosts(); // Refresh posts to sync with server
      }

      setNotifications(prevNotifications =>
        prevNotifications.filter(n => currentTime - n.createdAt < THIRTY_DAYS_IN_MS)
      );
    };

    const interval = setInterval(checkForExpiredData, 60 * 60 * 1000); // Check hourly
    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Eduskill Community Forum</h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
              <FiFilter className="text-gray-500" />
              <span className="text-gray-700">Filter</span>
            </button>
            {currentUser && (
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 relative"
                >
                  <FiBell className="text-gray-500" />
                  <span className="text-gray-700">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-96 overflow-y-auto">
                    <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">Notifications</div>
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div key={notification.id} className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}>
                            <div className="text-sm text-gray-700">{notification.message}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatPostDate(notification.createdAt).timeSince}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications yet</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats and Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-500">{posts.length} posts</div>
          <div className="flex space-x-2">
            <button
              onClick={() => sortPosts('latest')}
              className={`px-3 py-1 rounded-md ${
                activeSort === 'latest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => sortPosts('top')}
              className={`px-3 py-1 rounded-md ${
                activeSort === 'top' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Top
            </button>
            <button
              onClick={() => sortPosts('oldest')}
              className={`px-3 py-1 rounded-md ${
                activeSort === 'oldest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Oldest
            </button>
            <button
              onClick={() => sortPosts('pinned')}
              className={`px-3 py-1 rounded-md ${
                activeSort === 'pinned' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pinned
            </button>
          </div>
        </div>

        {/* Create New Post Button */}
        {currentUser ? (
          <button
            onClick={() => setShowNewPostModal(true)}
            className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <FiPlus />
            <span>Create a new post</span>
          </button>
        ) : (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            Please sign in to create a new post.
          </div>
        )}

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">New Post</h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <textarea
                placeholder="What would you like to discuss?"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${post.isPinned ? 'border-l-4 border-blue-500' : ''}`}
              >
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {post.author.avatar?.startsWith('http') ? (
                          <img src={post.author.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          post.author.avatar || post.author.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{post.author.name}</div>
                        <div className="text-sm text-gray-500">{post.author.role}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>{post.date}</div>
                      <div className="text-xs">{post.timeSince}</div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                      <div className="flex space-x-2">
                        {currentUser && (
                          <button
                            onClick={() => togglePinPost(post.id)}
                            className={`p-1 rounded-md ${post.isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
                            title={post.isPinned ? 'Unpin post' : 'Pin post'}
                          >
                            <FiBookmark />
                          </button>
                        )}
                        {currentUser && post.author.name === currentUser.name && (
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-1 text-red-500 rounded-md hover:bg-red-50"
                            title="Delete post"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <button
                      onClick={() => toggleReplies(post.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                    >
                      <FiMessageSquare />
                      <span>
                        {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                      </span>
                      <FiChevronDown
                        className={`transition-transform ${showReplies[post.id] ? 'transform rotate-180' : ''}`}
                      />
                    </button>
                    <div className="flex space-x-4">
                      <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                        <FiClock />
                        <span>Save</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                        <FiUser />
                        <span>Follow</span>
                      </button>
                    </div>
                  </div>

                  {/* Replies Section */}
                  {showReplies[post.id] && (
                    <div className="mt-4 pl-6 border-l-2 border-gray-200">
                      {/* Reply Form */}
                      {currentUser ? (
                        <div className="mb-4">
                          <textarea
                            placeholder="Write a reply..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={replyContent[post.id] || ''}
                            onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => handleAddReply(post.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                              disabled={!replyContent[post.id]?.trim()}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 text-center text-gray-500">Please sign in to reply.</div>
                      )}

                      {/* Replies List */}
                      {post.replies.length > 0 ? (
                        <div className="space-y-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-semibold">
                                    {reply.author.avatar?.startsWith('http') ? (
                                      <img
                                        src={reply.author.avatar}
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      reply.author.avatar || reply.author.name.charAt(0)
                                    )}
                                  </div>
                                  <div className="font-medium text-gray-800">{reply.author.name}</div>
                                  {reply.author.role && (
                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                      {reply.author.role}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">{reply.date}</div>
                              </div>
                              <div className="text-gray-700 ml-10">{reply.content}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-4">No replies yet</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              No posts yet. Be the first to create one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}