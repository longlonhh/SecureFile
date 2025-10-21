import React, { useEffect, useState } from "react";
import { FaHdd, FaCloud, FaExclamationTriangle } from "react-icons/fa";

export default function StorageCard({ files = [] }) {
  const [used, setUsed] = useState(0);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const maxStorage = 128 * 1024 * 1024 * 1024; // 128GB

  useEffect(() => {
    const totalUsed = files.reduce((acc, file) => acc + (file.size || 0), 0); 
    setUsed(totalUsed);
    
    const targetPercent = Math.min(((totalUsed / maxStorage) * 100), 100);
    const duration = 2000; 
    const steps = 60;
    const stepDuration = duration / steps;
    const stepSize = targetPercent / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setAnimatedPercent(Math.min(stepSize * currentStep, targetPercent));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [files, maxStorage]);

  const percent = Math.min(((used / maxStorage) * 100), 100); 
  const usedGB = (used / (1024 ** 3)).toFixed(2);
  const maxGB = (maxStorage / (1024 ** 3)).toFixed(0);
  const remainingGB = ((maxStorage - used) / (1024 ** 3)).toFixed(2);

  const getStorageStatus = () => {
    if (percent > 90) return { color: "text-red-400", icon: <FaExclamationTriangle />, status: "Critical" };
    if (percent > 75) return { color: "text-yellow-400", icon: <FaHdd />, status: "Warning" };
    return { color: "text-green-400", icon: <FaCloud />, status: "Good" };
  };

  const status = getStorageStatus();

  return (
    <div className="relative w-full max-w-sm sm:w-80 h-80 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-[20px] border border-white/20 rounded-3xl flex flex-col items-center justify-center p-4 sm:p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group">
      
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center mb-6 z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FaHdd className="text-2xl text-purple-400" />
          <h2 className="text-xl font-bold text-white">Storage Summary</h2>
        </div>
        <div className={`flex items-center gap-2 text-sm ${status.color}`}>
          {status.icon}
          <span>{status.status}</span>
        </div>
      </div>
      
      <div className="relative w-32 h-32 mb-6 z-10">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="2.5"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#gradient)" 
            strokeWidth="3"
            strokeDasharray={`${animatedPercent}, 100`} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">
            {animatedPercent.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-300">Used</div>
        </div>
      </div>
      
      <div className="text-center z-10 space-y-2">
        <div className="text-lg font-semibold text-white">
          {usedGB} GB / {maxGB} GB
        </div>
        <div className="text-sm text-gray-300">
          {remainingGB} GB remaining
        </div>
        
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden mt-3">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedPercent}%` }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
