import React from 'react';
import { Calendar } from 'lucide-react';

export default function MemoryModal({ memory, isOpen, onClose }) {
  if (!isOpen || !memory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-50 rounded-xl p-6 max-w-md w-full mx-4 transform transition-all border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-stone-800">{memory.title}</h2>
          <button 
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-stone-600">
            <Calendar className="w-4 h-4 mr-2" />
            {memory.date}
          </div>
          
          <div className={`w-full h-32 ${memory.color} rounded-lg flex items-center justify-center text-6xl`}>
            {memory.image}
          </div>
          
          <p className="text-stone-700 leading-relaxed">
            {memory.description}
          </p>
          
          <div className="text-center text-sm text-stone-500 italic">
            "From Ray's POV"
          </div>
        </div>
      </div>
    </div>
  );
}