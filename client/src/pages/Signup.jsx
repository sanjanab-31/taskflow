import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: 'bg-gray-200' });

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    
    // Name validation
    if (formData.fullName && formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (formData.password) {
      const hasAlpha = /[a-zA-Z]/.test(formData.password);
      const hasNum = /\d/.test(formData.password);
      const hasSpecial = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(formData.password);
      
      let score = 0;
      if (formData.password.length >= 6) score++;
      if (hasAlpha) score++;
      if (hasNum) score++;
      if (hasSpecial) score++;

      let label = 'Weak';
      let color = 'bg-red-500';
      if (score === 3) { label = 'Medium'; color = 'bg-yellow-500'; }
      if (score === 4) { label = 'Strong'; color = 'bg-green-500'; }
      
      setStrength({ score, label, color });

      if (formData.password.length < 6 || !hasAlpha || !hasNum || !hasSpecial) {
        newErrors.password = 'Min 6 chars, 1 alphabet, 1 number, and 1 special character.';
      }
    } else {
      setStrength({ score: 0, label: 'Weak', color: 'bg-gray-200' });
    }

    // Confirm Password validation
    if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      strength.score === 4 &&
      formData.password === formData.confirmPassword &&
      Object.keys(errors).length === 0
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('taskflow_user', JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      }));
      
      setIsSubmitting(false);
      setSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => navigate('/login'), 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 animate-slideDown">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-gray-500 font-medium">Join <span className="text-indigo-600 font-bold">TaskFlow</span> and boost productivity.</p>
        </header>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-200 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Account created successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" name="fullName" value={formData.fullName} onChange={handleChange}
              placeholder="John Doe" 
              className={`w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${errors.fullName ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`}
              required 
            />
            {errors.fullName && <p className="text-[10px] text-red-500 font-semibold ml-1">{errors.fullName}</p>}
          </div>
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="john@example.com" 
              className={`w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${errors.email ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`}
              required 
            />
            {errors.email && <p className="text-[10px] text-red-500 font-semibold ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-end mb-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[11px] text-indigo-600 font-bold hover:underline">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
              placeholder="••••••••" 
              className={`w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${errors.password ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`}
              required 
            />
            {/* Strength indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1 px-1">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Strength: <span className={strength.label === 'Strong' ? 'text-green-600' : strength.label === 'Medium' ? 'text-yellow-600' : 'text-red-500'}>{strength.label}</span></span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: `${(strength.score / 4) * 100}%` }}></div>
                </div>
              </div>
            )}
            {errors.password && <p className="text-[10px] text-red-500 font-semibold ml-1 mt-2">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              placeholder="••••••••" 
              className={`w-full h-12 rounded-xl bg-gray-50 px-4 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${errors.confirmPassword ? 'border-red-300 bg-red-50/10' : 'border-gray-100'}`}
              required 
            />
            {errors.confirmPassword && <p className="text-[10px] text-red-500 font-semibold ml-1">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full h-14 mt-6 rounded-xl font-bold flex items-center justify-center transition-all ${isFormValid() ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
             {isSubmitting ? (
               <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
             ) : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}
