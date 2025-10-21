import { useState } from "react";

export default function AuthInput({ label, type, placeholder, value, onChange, icon, required = false, disabled = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (icon) return icon;
    if (type === "password") {
      return showPassword ? (
        <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setShowPassword(!showPassword)}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setShowPassword(!showPassword)}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      );
    }
    if (type === "text") {
      return (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
        disabled 
          ? 'border-gray-600/50 bg-gray-500/10 opacity-50 cursor-not-allowed'
          : isFocused 
            ? 'border-purple-400 bg-white/5 shadow-lg shadow-purple-500/20' 
            : 'border-gray-500/50 bg-white/5 hover:border-gray-400'
      }`}>
        <div className="pl-4 pr-2">
          {getIcon()}
        </div>
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent outline-none py-4 px-2 text-white placeholder-gray-400 transition-all duration-300"
          required={required}
          disabled={disabled}
        />
        {type === "password" && (
          <div className="pr-4">
            {getIcon()}
          </div>
        )}
      </div>
      
      {/* Animated border effect */}
      <div className={`h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
        isFocused ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      }`}></div>
    </div>
  );
}
