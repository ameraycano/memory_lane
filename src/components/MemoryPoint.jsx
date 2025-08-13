import React from 'react';

export default function MemoryPoint({ memory, isActive, onClick, isUnlocked }) {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
        isUnlocked ? 'opacity-100' : 'opacity-50'
      }`}
      style={{ left: `${memory.position.x}%`, top: `${memory.position.y}%` }}
      onClick={() => isUnlocked && onClick(memory)}
    >
      {/* 📍 Red pin above */}
      {isUnlocked && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xl">
          📍
        </div>
      )}

      {/* Main memory circle */}
      <div
        className={`w-12 h-12 rounded-full ${memory.color} flex items-center justify-center text-white text-xl shadow-lg hover:scale-110 transition-transform ${
          isActive ? 'ring-4 ring-white' : ''
        }`}
      >
        {memory.image}
      </div>

      {/* Hover / always visible date snippet */}
      {isUnlocked && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 text-xs font-medium shadow-md whitespace-nowrap">
          {memory.date}
        </div>
      )}
    </div>
  );
}
