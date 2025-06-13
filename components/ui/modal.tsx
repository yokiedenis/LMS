// components/ui/modal.tsx
import React, { ReactNode } from "react";
import { Button } from "./button"; // Assuming you already have a Button component

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>X</Button>
        </div>
        {children}
      </div>
    </div>
  );
};
