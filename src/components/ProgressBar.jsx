import React from 'react';
import { Camera } from 'lucide-react';

export default function ProgressBar({ currentMemory, totalMemories }) {
  return (
    <div className="fixed top-4 left-4 right-4 z-20 bg-stone-100 rounded-full p-2 shadow-lg border border-gray-300">
      <div className="flex items-center space-x-3">
        <Camera className="w-5 h-5 text-amber-700" />
        <div className="flex-1 bg-gray-300 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-700 to-slate-700 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentMemory / totalMemories) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-stone-700">
          {currentMemory}/{totalMemories}
        </span>
      </div>
    </div>
  );
}