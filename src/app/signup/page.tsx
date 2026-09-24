'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Logo from '@/components/brand/Logo';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sun,
  Moon,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const {
    signup,
    loginWithGoogle,
    handleGoogleSuccess,
    handleGoogleError,
    googleClientId,
    isLoading
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to continue.');
      return;
    }

    setIsSubmitting(true);
    const res = await signup(name, email, password);
    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMessage(res.error || 'Signup failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleManualGoogleSignup = async () => {
    setErrorMessage('');
    setIsSubmitting(true);
    const res = await loginWithGoogle();
    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMessage(res.error || 'Google registration failed.');
      setIsSubmitting(false);
    }
  };

  const onGoogleSignupSuccess = (response: any) => {
    handleGoogleSuccess(response);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-dvh w-full max-w-[100vw] flex flex-col justify-between bg-[var(--bg-canvas)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-300 select-none p-3.5 sm:p-6 lg:p-8">
      {/* Background Google AI Studio & Relay Grid Mesh Layers */}
      <div className="absolute inset-0 bg-studio-grid pointer-events-none opacity-70 dark:opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-studio-beam pointer-events-none" />

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-emerald-500/10 dark:bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Brand & Controls */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 pt-1 gap-2">
        <Link href="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-all font-medium flex items-center gap-1.5 touch-target"
            title="Return to Home"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Back to Home</span>
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full text-[#1E3A2B] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all shadow-xs touch-target cursor-pointer flex-shrink-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#1E3A2B]" />}
          </button>
        </div>
      </header>

      {/* Main Centered Signup Card */}
      <main className="max-w-md w-full mx-auto my-auto py-6 sm:py-8 z-10">
        <div className="card-glass bg-white/85 dark:bg-[#0E1210]/90 backdrop-blur-2xl rounded-3xl p-5 sm:p-10 border border-black/10 dark:border-white/15 shadow-2xl shadow-emerald-950/10 space-y-6 relative overflow-hidden">
          {/* Top Subtle Specular Light Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started Free</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-[#F2F4F3] tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-[#2E503B] dark:text-[#8E9690] leading-relaxed">
              Start extracting & auditing documents with multimodal intelligence
            </p>
          </div>

          {/* Google OAuth Button */}
          {googleClientId ? (
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={onGoogleSignupSuccess}
                onError={handleGoogleError}
                theme={theme === 'dark' ? 'filled_black' : 'outline'}
                shape="rectangular"
                text="signup_with"
                size="large"
                width="100%"
              />
            </div>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || isLoading}
              onClick={handleManualGoogleSignup}
              className="w-full py-2.5 px-4 rounded-full bg-white/90 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-black/15 dark:border-white/15 text-[#0F172A] dark:text-[#F2F4F3] text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          )}

          {/* Clean Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            <span className="text-[10px] text-slate-500 dark:text-[#8E9690] font-mono uppercase tracking-wider font-semibold">
              Or with email
            </span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-[#0F172A] dark:text-[#F2F4F3] block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 dark:text-[#8E9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Roshan Kodi"
                  className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-full text-xs sm:text-sm text-[#0F172A] dark:text-[#F2F4F3] placeholder:text-slate-400 dark:placeholder:text-[#8E9690] focus:bg-white dark:focus:bg-[#141a18] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#0F172A] dark:text-[#F2F4F3] block mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-[#8E9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-full text-xs sm:text-sm text-[#0F172A] dark:text-[#F2F4F3] placeholder:text-slate-400 dark:placeholder:text-[#8E9690] focus:bg-white dark:focus:bg-[#141a18] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#0F172A] dark:text-[#F2F4F3] block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-[#8E9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-full text-xs sm:text-sm text-[#0F172A] dark:text-[#F2F4F3] placeholder:text-slate-400 dark:placeholder:text-[#8E9690] focus:bg-white dark:focus:bg-[#141a18] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8E9690] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs text-slate-600 dark:text-[#8E9690]">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-black/20 text-emerald-600 focus:ring-emerald-500 mt-0.5"
              />
              <label htmlFor="terms" className="leading-snug cursor-pointer font-medium">
                I agree to DocFin's{' '}
                <Link href="/" className="text-emerald-700 dark:text-emerald-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/" className="text-emerald-700 dark:text-emerald-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn-primary w-full py-3 sm:py-3.5 px-4 rounded-full bg-[#288E4F] dark:bg-[#4CAF6B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="text-center pt-2 border-t border-black/[0.06] dark:border-white/10">
            <p className="text-xs text-slate-600 dark:text-[#8E9690]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Security Trust Badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>SOC-2 Type II Certified • 256-Bit SSL Encrypted</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center text-[11px] text-slate-500 dark:text-slate-400 pb-2 z-10">
        <Link href="/" className="hover:underline">← Back to Homepage</Link>
      </footer>
    </div>
  );
}
