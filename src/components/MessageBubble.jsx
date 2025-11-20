export default function MessageBubble({ message, isUser }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-1 sm:px-2`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[60%]`}>
        <div
          className={`px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-2xl sm:rounded-[20px] shadow-sm ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
          }`}
        >
          <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1 px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}