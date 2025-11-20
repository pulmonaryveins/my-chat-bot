import { useState } from 'react';

export default function InputArea({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 bg-gray-100 rounded-full text-gray-800 placeholder-gray-400 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 transition-all"
      />
      
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-full font-medium text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        Send
      </button>
    </form>
  );
}