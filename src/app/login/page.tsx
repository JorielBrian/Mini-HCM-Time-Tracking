// app/login/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, LogIn } from 'lucide-react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginFormData, LoginValidationErrors } from '@/src/types/user';

export default function LoginPage() {
  const router = useRouter();
  
  // State for form data
  const [LoginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signInWithEmailAndPassword, user, loading, firebaseError] = useSignInWithEmailAndPassword(auth);

  // State for visibility of password
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form validation errors
  const [errors, setErrors] = useState<LoginValidationErrors>({});

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setLoginFormData({
      ...LoginFormData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginValidationErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }

    // Clear submit error when user starts typing
    if (errors.submit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: undefined,
      }));
    }
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: LoginValidationErrors = {};
    
    // Email validation
    if (!LoginFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(LoginFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!LoginFormData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Clear any previous submit errors
    if (errors.submit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: undefined,
      }));
    }
    
    try {
      const res = await signInWithEmailAndPassword(LoginFormData.email, LoginFormData.password);
      
      if (res) {
        console.log('Login successful:', res);
        
        // If remember me is checked, store email in localStorage
        if (LoginFormData.rememberMe) {
          localStorage.setItem('rememberedEmail', LoginFormData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect to dashboard or home page
        router.push('/dashboard');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: 'An error occurred during login. Please try again.',
      }));
    }
  };

  // Check if there's a remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setLoginFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">NextAuth</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Firebase error message */}
            {firebaseError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">
                    {firebaseError.message.includes('invalid-credential') 
                      ? 'Invalid email or password. Please try again.'
                      : firebaseError.message || 'Authentication failed'}
                  </p>
                </div>
              </div>
            )}

            {/* Custom submit error message */}
            {errors.submit && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={LoginFormData.email}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 border rounded-lg text-black shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
                {LoginFormData.email && !errors.email && isValidEmail(LoginFormData.email) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={LoginFormData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-3 border rounded-lg text-black shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Demo Login */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={LoginFormData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="font-medium text-gray-600 hover:text-gray-500">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-gray-600 hover:text-gray-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}