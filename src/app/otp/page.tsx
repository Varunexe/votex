// src/app/otp/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { User } from '../../../lib/firebase';

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
      // Update user as verified in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        verified: true
      });
      
      // Update localStorage
      const updatedUser: User = { ...user, verified: true };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to {user.phone}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            (Demo: Enter any 6-digit code)
          </p>
        </div>
        
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
              placeholder="000000"
              required
              maxLength={6}
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full text-sm text-blue-600 hover:text-blue-800"
          >
            Back to Signup
          </button>
        </form>
      </div>
    </div>
  );
}