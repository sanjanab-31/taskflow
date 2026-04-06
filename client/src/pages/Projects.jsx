import React from 'react';

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Project Management</h2>
        <p className="mt-2 text-gray-500 font-medium">Track and manage all your ongoing projects from a single view.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <div key={id} className="h-48 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-white/50 animate-pulse">
            <span className="text-gray-400 font-medium italic">Project Card Placeholder {id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
