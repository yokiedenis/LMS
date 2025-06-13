// components/UserModal.tsx
import React from 'react';

interface UserModalProps {
  users: { id: string; email: string; username: string }[]; // Adjust based on your user model
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ users, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Registered Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Close </button>
      </div>
    </div>
  );
};

export default UserModal;