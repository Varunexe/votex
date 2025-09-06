// src/app/vote/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, generateFakeTxHash, indianParties } from '../../../lib/firebase';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import type { User, VoteDetails } from '../../../lib/firebase';

export default function Vote() {
  const [selectedParty, setSelectedParty] = useState<string>('');
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
    
    const userData: User = JSON.parse(currentUser);
    if (!userData.verified) {
      router.push('/otp');
      return;
    }
    
    if (userData.hasVoted) {
      router.push('/results');
      return;
    }
    
    setUser(userData);
  }, [router]);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedParty) {
      setError('Please select a political party');
      return;
    }

    if (!user) return;

    setLoading(true);
    
    try {
      // Generate fake transaction hash
      const txHash = generateFakeTxHash();
      
      // Add vote to votes collection
      await addDoc(collection(db, 'votes'), {
        uid: user.uid,
        party: selectedParty,
        txHash: txHash,
        timestamp: serverTimestamp()
      });
      
      // Update user as voted
      await updateDoc(doc(db, 'users', user.uid), {
        hasVoted: true
      });
      
      // Update localStorage
      const updatedUser: User = { ...user, hasVoted: true };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Store vote details for confirmation page
      const voteDetails: VoteDetails = {
        party: selectedParty,
        txHash: txHash,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('voteDetails', JSON.stringify(voteDetails));
      
      router.push('/confirmation');
    } catch (error) {
      console.error('Voting error:', error);
      setError('Failed to cast vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cast Your Vote</h1>
            <p className="text-gray-600 mt-2">
              Select your preferred political party
            </p>
            <p className="text-sm text-green-600 mt-1">
              Verified: {user.phone}
            </p>
          </div>
          
          <form onSubmit={handleVote} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                Choose Political Party:
              </label>
              <div className="space-y-3">
                {indianParties.map((party) => (
                  <div key={party} className="flex items-center">
                    <input
                      id={party}
                      name="party"
                      type="radio"
                      value={party}
                      checked={selectedParty === party}
                      onChange={(e) => setSelectedParty(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={party} className="ml-3 text-gray-700 cursor-pointer">
                      {party}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Casting Vote...' : 'Cast Vote'}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/results')}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                View Results
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}