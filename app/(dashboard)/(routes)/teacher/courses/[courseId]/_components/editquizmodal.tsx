import { useState } from "react";

interface Quiz {
  id?: string; // Adjust properties as per your actual Quiz object
  title?: string;
  chapterId?: string;
}

interface EditQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz | null;
  onSave: (updatedQuiz: Quiz) => void;
}

const EditQuizModal: React.FC<EditQuizModalProps> = ({ isOpen, onClose, quiz, onSave }) => {
  const [title, setTitle] = useState(quiz?.title || "");
  const [chapterId, setChapterId] = useState(quiz?.chapterId || "");

  const handleSave = () => {
    onSave({ ...quiz, title, chapterId }); // Save changes
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Quiz</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Quiz Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chapterId" className="block text-sm font-medium mb-2">
            Chapter ID
          </label>
          <input
            id="chapterId"
            type="text"
            value={chapterId}
            onChange={(e) => setChapterId(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 text-gray-500">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuizModal;
