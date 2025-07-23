import React from 'react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const hasShownToast = useRef(false);
  const previousUser = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, completeAuthFlow, loading: authLoading } = useAuth();

  const from = location.state?.from?.pathname || '/';
  
  const shouldShowToast = useMemo(() => {
    return !!(location.state?.from && !currentUser);
  }, [location.state?.from, currentUser]);

  useEffect(() => {
    if (currentUser) {
      const toastId = toast.loading('Redirecting...');
      setTimeout(() => {
        toast.dismiss(toastId);
        navigate(from);
      }, 800);
    }
    
    if (previousUser.current && !currentUser) {
      hasShownToast.current = false;
    }
    
    previousUser.current = currentUser;
  }, [currentUser, navigate, from]);

  useEffect(() => {
    if (shouldShowToast && !hasShownToast.current) {
      toast.error('⚠️ You must be logged in to access this page.');
      hasShownToast.current = true;
    }
  }, [shouldShowToast]);

  const checkUserInDatabase = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/email/${email}`);
      const data = await response.json();
      return {
        exists: response.ok,
        userData: data
      };
    } catch (error) {
      console.error('Error checking user in database:', error);
      return { exists: false, userData: null };
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors({});

    try {
      const result = await signInWithGoogle();
      const firebaseUser = result.user;
      const email = firebaseUser.email;

      const { exists } = await checkUserInDatabase(email);
      const toastId = toast.loading(exists ? 'Logging you in...' : 'Creating your account...');

      try {
        await completeAuthFlow(firebaseUser, !exists, {
          name: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || null
        });

        toast.success(exists ? 'Welcome back!' : 'Account created successfully!', { id: toastId });
        navigate(from);
      } catch (backendError) {
        toast.error(backendError.message || 'Server error occurred. Please try again.', { id: toastId });
        setErrors({ general: backendError.message || 'Server error occurred' });
      }
    } catch (error) {
      console.error('Google auth error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
      setErrors({ general: error.message });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const email = formData.email;

      const { exists } = await checkUserInDatabase(email);

      if (isLogin) {
        
        if (!exists) {
          setErrors({ general: 'User not found. Please sign up first.' });
          toast.error('User not found. Please sign up first.');
          setLoading(false);
          return;
        }

        const toastId = toast.loading('Logging you in...');

        try {
          const result = await signInUser(email, formData.password);
          const firebaseUser = result.user;

          await completeAuthFlow(firebaseUser, false);

          toast.success('Welcome back!', { id: toastId });
          navigate(from);
        } catch (backendError) {
          toast.error(backendError.message || 'Server error occurred. Please try again.', { id: toastId });
          setErrors({ general: backendError.message || 'Server error occurred' });
        }

      } else {
        if (exists) {
          setErrors({ general: 'User already exists. Please log in instead.' });
          toast.error('User already exists. Please log in instead.');
          setLoading(false);
          return;
        }

        const toastId = toast.loading('Creating your account...');

        try {
          const result = await createNewUser(email, formData.password);
          const firebaseUser = result.user;

          await completeAuthFlow(firebaseUser, true, {
            name: formData.name
          });

          toast.success('Account created successfully!', { id: toastId });
          navigate(from);
        } catch (backendError) {
          toast.error(backendError.message || 'Server error occurred. Please try again.', { id: toastId });
          setErrors({ general: backendError.message || 'Server error occurred' });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
      setErrors({ general: error.message });
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

  if (authLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto bg-cream p-8 shadow-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-black font-light">Checking authentication...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />        <div className="container mx-auto px-4 py-20">
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
            <div className="mb-4 p-3 bg-cream border border-primary text-textColor text-sm font-light">
              {errors.general}
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
                </a>              </div>) : (
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
              className={`w-full py-3 rounded-none text-white font-light ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark'
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Please wait...
                </div>
              ) : (
                isLogin ? "Log In" : "Create Account"
              )}
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
              className={`py-2 px-8 flex items-center justify-center text-white font-light ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4285F4] hover:bg-[#3367d6]'
                }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Continue with Google'
              )}
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