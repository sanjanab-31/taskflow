import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    // Min 6 chars, at least 1 alphabet, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long and include an alphabet, a number, and a special character.');
      return;
    }

    // Save to localStorage
    const userToSave = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    };
    localStorage.setItem('taskflow_user', JSON.stringify(userToSave));

    // Navigate to login or dashboard
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100 mt-10">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-indigo-900">Create Account</h2>
        <p className="mt-2 text-gray-500 font-medium">Get started with <span className="text-indigo-600 font-bold">TaskFlow</span> today.</p>
      </header>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-transparent text-sm outline-none text-gray-700" required />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sanjana@example.com" className="w-full bg-transparent text-sm outline-none text-gray-700" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-transparent text-sm outline-none text-gray-700" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
          <div className="h-12 rounded-xl bg-gray-50 flex items-center px-4 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white transition-all">
             <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full bg-transparent text-sm outline-none text-gray-700" required />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-12 mt-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
           Create Account
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log In</Link>
      </p>
    </div>
  );
}
