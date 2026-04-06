import React from 'react';

export default function UserProfile() {
  return (
    <div className="max-w-medium mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <header className="mb-10 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
           <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana" 
              alt="Avatar" 
              className="w-16 h-16 rounded-full"
            />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sanjana B</h2>
        <p className="mt-1 text-gray-500 font-medium italic">Project Manager</p>
      </header>

      <div className="space-y-6">
        <div className="h-10 rounded-lg bg-gray-50 flex items-center px-4">
          <span className="text-sm text-gray-400">Email: sanjana.b@taskflow.com</span>
        </div>
        <div className="h-10 rounded-lg bg-gray-50 flex items-center px-4">
          <span className="text-sm text-gray-400">Department: Engineering</span>
        </div>
        <div className="h-10 rounded-lg bg-indigo-600 flex items-center justify-center px-4 text-white font-semibold cursor-not-allowed">
           Edit Profile (Placeholder)
        </div>
      </div>
    </div>
  );
}
