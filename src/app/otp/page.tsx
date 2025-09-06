// src/app/otp/page.tsx - FIXED VERSION
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrUpdateUser, type User } from '../../../lib/firebase';

export default function OTP() {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [router]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate OTP (any 6-digit code)
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    if (!user) return;

    setLoading(true);

    try {
      console.log('Demo mode: Verifying OTP...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Update user as verified in both Firestore and localStorage
      const updatedUser: User = { ...user, verified: true };
      
      // FIXED: Actually update user in Firestore
      await createOrUpdateUser(updatedUser);
      
      console.log('Mock OTP verification successful! User updated in Firestore.');
      router.push('/vote');
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card-premium animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-royal rounded-2xl mb-6 shadow-royal-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 font-sf-pro">Verify OTP</h1>
            <p className="text-gray-600 font-medium mb-1">
              Enter the 6-digit code sent to
            </p>
            <p className="text-royal-purple font-semibold">{user.phone}</p>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-blue-700 text-sm font-medium">Demo: Enter any 6-digit code</span>
            </div>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="input-premium w-full text-center text-2xl tracking-[0.5em] font-bold"
                placeholder="000000"
                required
                maxLength={6}
              />
              {/* OTP input visual indicators */}
              <div className="flex justify-center mt-3 space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      i < otp.length ? 'bg-royal-purple' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-premium w-5 h-5 mr-3"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Verify OTP
                  </div>
                )}
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn-secondary w-full"
              >
                Back to Signup
              </button>
            </div>
          </form>

          {/* Resend option */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Didn't receive the code?
              <button className="text-royal-purple hover:text-royal-purple-dark font-semibold ml-1 transition-colors duration-200">
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}