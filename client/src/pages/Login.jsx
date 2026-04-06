import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const storedUser = localStorage.getItem('taskflow_user');
    
    if (!storedUser) {
      setError('No user found. Please sign up first.');
      return;
    }

    const { email, password } = JSON.parse(storedUser);

    if (formData.email !== email || formData.password !== password) {
      setError('Invalid email or password.');
      return;
    }

    // Login successful
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-20">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-indigo-900">Welcome Back</h2>
        <p className="mt-2 text-gray-500 font-medium">Log in to <span className="text-indigo-600 font-bold">TaskFlow</span>.</p>
      </header>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sanjana@example.com" 
                className="w-full bg-transparent text-sm outline-none text-gray-700" 
                required
              />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full bg-transparent text-sm outline-none text-gray-700" 
                required
              />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-12 mt-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
           Log In
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}
