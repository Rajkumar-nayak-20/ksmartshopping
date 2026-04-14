import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Wave dots */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-yellow-400 animate-wave"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Loading text */}
        <span className="text-gray-700 font-medium tracking-widest">
          Loading<span className="animate-pulse">...</span>
        </span>
      </div>

      {/* NORMAL STYLE TAG (React compatible) */}
      <style>{`
        @keyframes wave {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          30% {
            transform: translateY(-10px);
            opacity: 0.5;
          }
        }

        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
