export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-1 sm:px-2">
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 shadow-sm">
        <div className="flex space-x-1 sm:space-x-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}