import React from 'react';
import Sidenav from './components/Sidenav';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidenav />

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] p-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Main Content Area</h2>
            <p className="mt-2 text-gray-500 font-medium">Welcome back, Sanjana! Here's what's happening today.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards for premium look */}
            {[1, 2, 3].map((id) => (
              <div key={id} className="h-48 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center bg-white/50 animate-pulse">
                <span className="text-gray-400 font-medium italic">Content Placeholder {id}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
