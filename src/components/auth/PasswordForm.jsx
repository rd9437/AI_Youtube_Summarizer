import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Spinner } from '../ui/Spinner';

export function PasswordForm({ onSubmit, buttonText, isLoadingSignIn, isLoadingSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
                      <label className="block text-sm font-medium text-[#7C3AED] mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C3AED]/40" size={20} />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-white/20 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                          placeholder="email@example.com"
                          required
                          disabled={isLoadingSignIn || isLoadingSignUp}
                        />
                      </div>
                    </div>
                    <div>
                <label className="block text-sm font-medium text-[#7C3AED] mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C3AED]/40" size={20} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 rounded-lg bg-white/50 border border-white/20 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                    placeholder="******"
                    required
                    disabled={isLoadingSignIn || isLoadingSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C3AED]/40 hover:text-[#7C3AED]/60"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
      <button
        type="submit"
        disabled={isLoadingSignIn || isLoadingSignUp}
        className="w-full bg-[#6A5ACD] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none h-11 flex items-center justify-center"
      >
        { buttonText==="Sign Up"? isLoadingSignUp ? (
          <Spinner size="sm" className="mx-auto" />
        ) : (
          buttonText
        ): isLoadingSignIn ? (
          <Spinner size="sm" className="mx-auto" />
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
