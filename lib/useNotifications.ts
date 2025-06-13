'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

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

export function useNotifications() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useUser();

  const currentUser = user
    ? {
        name: user.fullName || user.username || user.emailAddresses[0].emailAddress.split('@')[0],
        role: 'Student',
        avatar: user.imageUrl || user.firstName?.charAt(0) || user.emailAddresses[0].emailAddress.charAt(0),
      }
    : null;

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

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
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

  return {
    posts,
    setPosts,
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount,
    currentUser,
    fetchPosts,
    formatPostDate,
    addNotification,
    markNotificationsAsRead,
  };
}