import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider 
} from 'firebase/auth'
import { auth } from '../config/firebase'
import Header from './Header'


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/';

  // Google Auth Provider with proper configuration
  const googleProvider = new GoogleAuthProvider();
  
  // Configure Google provider for better production compatibility
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  // Check for redirect result on component mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Google redirect sign in successful:', result.user);
          navigate(from, { replace: true });
        }
      } catch (error) {
        console.error('Google redirect auth error:', error);
        setErrors({ general: 'Google authentication failed. Please try again.' });
      }
    };

    checkRedirectResult();
  }, [navigate, from]);

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

  // Handle email/password authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});    try {
      if (isLogin) {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User signed in:', userCredential.user);
        navigate(from, { replace: true }); // Redirect to intended page or home
      } else {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('User created:', userCredential.user);
        navigate(from, { replace: true }); // Redirect to intended page or home
      }
    } catch (error) {
      console.error('Authentication error:', error);
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google authentication
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Clear any existing auth state
      await auth.signOut().catch(() => {});
      
      try {
        // Try popup first
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign in successful:', result.user);
        navigate(from, { replace: true });
      } catch (popupError) {
        console.warn('Popup failed, trying redirect:', popupError);
        
        // If popup fails (common in production), use redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/cancelled-popup-request' ||
            popupError.code === 'auth/popup-closed-by-user') {
          
          await signInWithRedirect(auth, googleProvider);
          return; // signInWithRedirect doesn't return a promise result
        }
        
        throw popupError; // Re-throw if it's not a popup-related error
      }
    } catch (error) {
      console.error('Google auth error:', error);
      let errorMessage = 'Google authentication failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Google sign-in was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked. Redirecting to Google...';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Another popup is already open. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        case 'auth/invalid-api-key':
          errorMessage = 'Configuration error. Please contact support.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'This domain is not authorized for Google sign-in.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      setErrors({ general: errorMessage });
      setLoading(false);
    }
  };

  // Reset form when switching between login/signup
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
            </div>            <div>
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