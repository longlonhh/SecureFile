import { useState } from "react";

export default function AuthButton({ children, loading = false, disabled = false, ...props }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      {...props}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform relative overflow-hidden group ${
        disabled || loading
          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:shadow-purple-500/25 active:scale-95'
      } ${isPressed ? 'scale-95' : 'hover:scale-105'}`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Button content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150 rounded-xl"></div>
    </button>
  );
}
