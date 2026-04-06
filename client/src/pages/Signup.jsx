import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // For now, just navigate to the dashboard
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-20">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-indigo-900">Create Account</h2>
        <p className="mt-2 text-gray-500 font-medium">Get started with <span className="text-indigo-600 font-bold">TaskFlow</span> today.</p>
      </header>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="text" placeholder="John Doe" className="w-full bg-transparent text-sm outline-none text-gray-700" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="email" placeholder="sanjana@example.com" className="w-full bg-transparent text-sm outline-none text-gray-700" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="password" placeholder="••••••••" className="w-full bg-transparent text-sm outline-none text-gray-700" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="password" placeholder="••••••••" className="w-full bg-transparent text-sm outline-none text-gray-700" />
          </div>
        </div>

        <button 
          onClick={handleSignup}
          className="w-full h-12 mt-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
           Create Account
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account? <span onClick={() => navigate('/')} className="text-indigo-600 font-semibold cursor-pointer hover:underline">Log In</span>
      </p>
    </div>
  );
}
