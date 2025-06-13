"use client"; // Ensure this is a Client Component

import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Notification = ({ message }: { message: string }) => {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return null; // This component doesn't need to render anything
};

export default Notification;
