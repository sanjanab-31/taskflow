import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const storedUser = localStorage.getItem('taskflow_user');
      
      if (!storedUser) {
        setError('No account found with this email. Please sign up.');
        setIsSubmitting(false);
        return;
      }

      const { email, password } = JSON.parse(storedUser);

      if (formData.email !== email || formData.password !== password) {
        setError('Invalid email or password.');
        setIsSubmitting(false);
        return;
      }

      // Login successful
      localStorage.setItem('taskflow_isLoggedIn', 'true');
      setIsSubmitting(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 animate-slideDown">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-indigo-900">Welcome Back</h2>
          <p className="mt-2 text-gray-500 font-medium tracking-tight">Log in to access your projects on <span className="text-indigo-600 font-bold">TaskFlow</span>.</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200 flex items-center animate-pulse">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sanjana@example.com" 
              className="w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border border-gray-100 transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-end mb-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[11px] text-indigo-600 font-bold hover:underline transition-all">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border border-gray-100 transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
              required
            />
          </div>

          <div className="flex justify-end p-1">
            <span className="text-[11px] text-gray-400 font-medium hover:text-indigo-600 cursor-pointer transition-colors">
              Forgot password?
            </span>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-14 mt-4 rounded-xl text-white font-bold flex items-center justify-center transition-all ${isSubmitting ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5'}`}
          >
             {isSubmitting ? (
               <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
             ) : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline transition-all">Create account</Link>
        </p>
      </div>
    </div>
  );
}
