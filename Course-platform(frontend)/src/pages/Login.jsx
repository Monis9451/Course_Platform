import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Header from './Header'
import { createNewUser, signInUser, signInWithGoogle } from '../firebase/auth'
import { useAuth } from '../context/authContext'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, markAsNewUser, authError, clearAuthError } = useAuth();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/';

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(from);
    }
  }, [currentUser, navigate, from]);

  // Handle auth errors from context
  useEffect(() => {
    if (authError) {
      setErrors({ general: authError });
      setLoading(false);
      clearAuthError();
    }
  }, [authError, clearAuthError]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit for login/signup with retry logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      if (isLogin) {
        // Login
        await signInUser(formData.email, formData.password);
        setRetryAttempts(0); // Reset retry attempts on success
        // Navigation will be handled by auth context after successful backend sync
      } else {
        markAsNewUser();
        await createNewUser(formData.email, formData.password);
        setRetryAttempts(0); // Reset retry attempts on success
        // Navigation will be handled by auth context after successful backend sync
      }
    } catch (error) {
      console.error('Firebase auth error:', error);
      let errorMessage = 'Authentication failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setErrors({ general: errorMessage });
      setRetryAttempts(prev => prev + 1);
      setLoading(false);
    }
  };

  // Retry function for failed requests
  const handleRetry = () => {
    setErrors({});
    handleSubmit({ preventDefault: () => {} });
  };

  // Handle Google login
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors({});
    try {
      const result = await signInWithGoogle();
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        markAsNewUser();
      }
      // Navigation will be handled by auth context after successful backend sync
    } catch (error) {
      console.error('Google auth error:', error);
      setErrors({ general: 'Google authentication failed. Please try again.' });
      setLoading(false);
    }
  };

  const handleModeSwitch = (loginMode) => {
    setIsLogin(loginMode);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };
  return (
    <div>
        <Header />
        <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-cream p-8 shadow-md">
          <h1 className="text-3xl font-fitzgerald font-light text-center text-black mb-8">
            {isLogin ? "Log In to Your Account" : "Create an Account"}
          </h1>
            <div className="flex mb-8">
            <button 
              type="button"
              className={`flex-1 py-2 text-center font-light ${isLogin ? 'bg-primary text-white' : 'bg-white text-black'}`}
              onClick={() => handleModeSwitch(true)}
            >
              Log In
            </button>
            <button 
              type="button"
              className={`flex-1 py-2 text-center font-light ${!isLogin ? 'bg-primary text-white' : 'bg-white text-black'}`}
              onClick={() => handleModeSwitch(false)}
            >
              Sign Up
            </button>
          </div>

          {errors.general && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-light rounded">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium mb-1">Authentication Error</p>
                  <p>{errors.general}</p>
                  {retryAttempts > 0 && retryAttempts < 3 && (
                    <p className="text-xs mt-2 text-red-600">
                      Attempt {retryAttempts} of 3
                    </p>
                  )}
                </div>
                {(errors.general.includes('Server') || errors.general.includes('Network')) && retryAttempts < 3 && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={loading}
                    className="ml-3 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-black mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-primary font-light">{errors.name}</p>
                  )}
                </div>
              </>
            )}
              <div>
              <label htmlFor="email" className="block text-sm font-light text-black mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-primary font-light">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-light text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 pr-12 border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-primary font-light">{errors.password}</p>
              )}
            </div>
            
            {isLogin ? (
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline font-light">
                  Forgot password?
                </a>              </div>            ) : (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-light text-black mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 pr-12 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-primary font-light">{errors.confirmPassword}</p>
                )}
              </div>
            )}
              <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 rounded-none text-white font-light ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              {loading ? 'Please wait...' : (isLogin ? "Log In" : "Create Account")}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <span className="text-black font-light">Or log in with</span>
          </div>
            <div className="mt-4 flex justify-center">
            <button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className={`py-2 px-8 flex items-center justify-center text-white font-light ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4285F4] hover:bg-[#3367d6]'
              }`}
            >
              {loading ? 'Loading...' : 'Google'}
            </button>
          </div>
            <div className="mt-6 text-center text-sm">
            <p className="text-black font-light">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="text-primary hover:underline font-light"
                onClick={() => handleModeSwitch(!isLogin)}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login