// src/app/confirmation/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { VoteDetails } from '../../../lib/firebase';

export default function Confirmation() {
  const [voteDetails, setVoteDetails] = useState<VoteDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const details = localStorage.getItem('voteDetails');
    if (!details) {
      router.push('/');
      return;
    }
    setVoteDetails(JSON.parse(details));
  }, [router]);

  if (!voteDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vote Successfully Cast!</h1>
          <p className="text-gray-600 mb-8">Your vote has been recorded on the blockchain</p>
          
          {/* Vote Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Voted For:</span>
                <p className="text-gray-900 font-semibold">{voteDetails.party}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Transaction Hash:</span>
                <p className="text-blue-600 font-mono text-sm break-all">{voteDetails.txHash}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Timestamp:</span>
                <p className="text-gray-900">{new Date(voteDetails.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/results')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Live Results
            </button>
            
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}