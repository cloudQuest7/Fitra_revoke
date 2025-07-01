"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Dumbbell } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = 'First name required';
      if (!formData.lastName) newErrors.lastName = 'Last name required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Agree to terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    if (isLogin) {
      // Simulate login (replace with real login logic if needed)
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/home";
      }, 1200);
    } else {
      // Signup: send data to backend
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.firstName + " " + formData.lastName
          })
        });
        const data = await res.json();
        if (res.ok) {
          setIsLoading(false);
          window.location.href = "/home";
        } else {
          setIsLoading(false);
          setErrors(prev => ({ ...prev, email: data.error || "Signup failed" }));
        }
      } catch (err) {
        setIsLoading(false);
        setErrors(prev => ({ ...prev, email: "Signup failed. Try again." }));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-zinc-100">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-yellow-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4 shadow-lg">
            <Dumbbell className="w-8 h-8 text-zinc-900" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Fitra</h1>
          <p className="text-zinc-600 mt-2 text-base">{isLogin ? 'Welcome back! Sign in to continue.' : 'Create your account and start your journey.'}</p>
        </div>
        <div className="flex mb-8 rounded-lg overflow-hidden border border-zinc-200">
          <button
            className={`flex-1 py-2 font-semibold transition-all duration-200 ${isLogin ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-yellow-100'}`}
            onClick={() => setIsLogin(true)}
            type="button"
          >Sign In</button>
          <button
            className={`flex-1 py-2 font-semibold transition-all duration-200 ${!isLogin ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-100 text-zinc-600 hover:bg-yellow-100'}`}
            onClick={() => setIsLogin(false)}
            type="button"
          >Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          {!isLogin && (
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-1">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-zinc-300 bg-white'}`}
                />
                {errors.firstName && <div className="text-red-600 text-xs mt-1">{errors.firstName}</div>}
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-1">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-zinc-300 bg-white'}`}
                />
                {errors.lastName && <div className="text-red-600 text-xs mt-1">{errors.lastName}</div>}
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black ${errors.email ? 'border-red-500 bg-red-50' : 'border-zinc-300 bg-white'}`}
            />
            {errors.email && <div className="text-red-600 text-xs mt-1">{errors.email}</div>}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10 text-black ${errors.password ? 'border-red-500 bg-red-50' : 'border-zinc-300 bg-white'}`}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-8 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && <div className="text-red-600 text-xs mt-1">{errors.password}</div>}
          </div>
          {!isLogin && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10 text-black ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-zinc-300 bg-white'}`}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-8 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                onClick={() => setShowConfirmPassword(v => !v)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.confirmPassword && <div className="text-red-600 text-xs mt-1">{errors.confirmPassword}</div>}
            </div>
          )}
          {!isLogin && (
            <div className="flex items-center mb-2 mt-2">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-yellow-600 hover:underline">Terms</a> and <a href="#" className="text-yellow-600 hover:underline">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && <div className="text-red-600 text-xs ml-2">{errors.agreeToTerms}</div>}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-md"
          >
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;