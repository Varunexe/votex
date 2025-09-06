// src/app/page.tsx (Signup Page)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, ensureAuthenticated } from '../../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import type { User } from '../../lib/firebase';

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate Indian phone number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid 10-digit Indian phone number starting with 6-9');
      return;
    }

    setLoading(true);
    
    try {
      // Create user document in Firestore
      const uid = `user_${phoneNumber}_${Date.now()}`;
      const userData: User = {
        uid: uid,
        phone: `+91${phoneNumber}`,
        verified: false,
        hasVoted: false
      };
      
      await setDoc(doc(db, 'users', uid), userData);
      
      // Store user data in localStorage for this demo
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      router.push('/otp');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Votex</h1>
          <p className="text-gray-600 mt-2">Secure Digital Voting Platform</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 10-digit number"
                required
                maxLength={10}
              />
            </div>
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
            {loading ? 'Creating Account...' : 'Get OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}