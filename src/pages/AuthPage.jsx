import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Activity } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  // Validation State
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Run validation on form data change
  useEffect(() => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full Name is required';
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
      if (!formData.role) {
        newErrors.role = 'Please select a role';
        isValid = false;
      }
    }

    // Only set errors if we've touched the form or submitted, but for disabling the button, we just track isValid.
    // To not spam the user with errors before they type, we won't set state errors here directly for all fields unless they are touched,
    // but the requirement is simple. Let's just track isValid for the button.
    setIsFormValid(isValid);
    
    // We will update errors state only if there are existing errors for that field (real-time clearance)
    setErrors(prev => {
      const updatedErrors = { ...prev };
      Object.keys(updatedErrors).forEach(key => {
        if (!newErrors[key]) {
          delete updatedErrors[key];
        } else {
          updatedErrors[key] = newErrors[key];
        }
      });
      return updatedErrors;
    });
  }, [formData, isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation check before submission
    const finalErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) finalErrors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6) finalErrors.password = 'Password must be at least 6 characters';
    if (!isLogin) {
      if (!formData.fullName) finalErrors.fullName = 'Full Name is required';
      if (formData.password !== formData.confirmPassword) finalErrors.confirmPassword = 'Passwords do not match';
      if (!formData.role) finalErrors.role = 'Please select a role';
    }

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    // Simulate successful login/signup
    let finalRole = isLogin ? (localStorage.getItem('userRole') || 'Admin') : formData.role;
    
    if (!isLogin) {
      localStorage.setItem('userRole', formData.role);
      finalRole = formData.role;
    }

    // Navigate based on role
    switch (finalRole) {
      case 'Admin':
        navigate('/admin/dashboard');
        break;
      case 'Doctor':
        navigate('/doctor/dashboard');
        break;
      case 'Reception':
        navigate('/reception/dashboard');
        break;
      default:
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-0 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-100 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="z-10 flex-1 flex flex-col justify-center items-center text-center">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-8 text-blue-600">
              <Activity size={48} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">OPD Clinic</h1>
            <p className="text-slate-500 text-lg mb-8 uppercase tracking-widest font-semibold">Management System</p>
            <p className="text-slate-400 font-medium">Secure. Efficient. Paperless.</p>
          </div>
          <div className="z-10 text-center text-sm text-slate-400 flex gap-4 justify-center">
            <span>Admin</span> &bull; <span>Doctor</span> &bull; <span>Reception</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative">
          
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2 transition-all duration-300">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-500">
                {isLogin 
                  ? 'Enter your credentials to access the system' 
                  : 'Register a new staff member to the system'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Full Name - Signup Only */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? 'max-h-0 opacity-0 m-0' : 'max-h-24 opacity-100'}`}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl bg-slate-50 focus:bg-white text-sm transition-colors duration-200 outline-none`}
                    placeholder="John Doe"
                    disabled={false}
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl bg-slate-50 focus:bg-white text-sm transition-colors duration-200 outline-none`}
                    placeholder="email@clinic.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl bg-slate-50 focus:bg-white text-sm transition-colors duration-200 outline-none`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password - Signup Only */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? 'max-h-0 opacity-0 m-0' : 'max-h-24 opacity-100'}`}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl bg-slate-50 focus:bg-white text-sm transition-colors duration-200 outline-none`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

              {/* Role Selection - Signup Only */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? 'max-h-0 opacity-0 m-0' : 'max-h-24 opacity-100'}`}>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Role *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${errors.role ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl bg-slate-50 focus:bg-white text-sm transition-colors duration-200 outline-none appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Choose a role...</option>
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Reception">Reception</option>
                  </select>
                </div>
                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full mt-4 font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 ${
                  isFormValid 
                    ? 'bg-slate-800 hover:bg-slate-900 text-white transform hover:-translate-y-0.5 hover:shadow-xl' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400">OR</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 mb-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors focus:outline-none"
                >
                  {isLogin ? 'Sign up here' : 'Login here'}
                </button>
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Demo Quick Access</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { localStorage.setItem('userRole', 'Admin'); navigate('/admin/dashboard'); }}
                    className="py-2 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all shadow-sm"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => { localStorage.setItem('userRole', 'Reception'); navigate('/reception/dashboard'); }}
                    className="py-2 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all shadow-sm"
                  >
                    Reception
                  </button>
                  <button
                    type="button"
                    onClick={() => { localStorage.setItem('userRole', 'Doctor'); navigate('/doctor/dashboard'); }}
                    className="py-2 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all shadow-sm"
                  >
                    Doctor
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
