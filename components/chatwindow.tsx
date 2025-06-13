interface ChatWindowProps {
    messages: { user: boolean; text: string }[];
  }
  
  const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
      <div className="border p-4 h-96 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user ? 'text-right' : 'text-left'}>
            <p className={msg.user ? 'bg-blue-200 p-2' : 'bg-gray-200 p-2'}>{msg.text}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatWindow;
  