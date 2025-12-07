// app/login/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, LogIn } from 'lucide-react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define types locally if you don't have them in @/types/user
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginValidationErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export default function LoginPage() {
  const router = useRouter();
  
  const [LoginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signInWithEmailAndPassword, user, loading, firebaseError] = useSignInWithEmailAndPassword(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginValidationErrors>({});

  // Load remembered email from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setLoginFormData(prev => ({
          ...prev,
          email: rememberedEmail,
          rememberMe: true,
        }));
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setLoginFormData({
      ...LoginFormData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name as keyof LoginValidationErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }

    if (errors.submit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: undefined,
      }));
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: LoginValidationErrors = {};
    
    if (!LoginFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(LoginFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!LoginFormData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (errors.submit) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: undefined,
      }));
    }
    
    try {
      const res = await signInWithEmailAndPassword(LoginFormData.email, LoginFormData.password);
      
      if (res) {
        if (LoginFormData.rememberMe) {
          localStorage.setItem('rememberedEmail', LoginFormData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* ... rest of your JSX remains exactly the same ... */}
    </div>
  );
}