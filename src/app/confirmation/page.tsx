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
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="card-premium animate-fade-in-up">
          <div className="text-center">
            {/* Success Icon */}
            <div className="relative mx-auto mb-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg mx-auto">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-2xl bg-green-400 animate-ping opacity-20"></div>
              <div className="absolute inset-2 rounded-xl bg-green-500 animate-pulse opacity-30"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3 font-sf-pro">Vote Successfully Cast!</h1>
            <p className="text-gray-600 font-medium mb-8">Your vote has been recorded on the blockchain</p>

            {/* Vote Details */}
            <div className="glass-purple rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-royal-purple rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Voted For:</span>
                  <p className="text-gray-900 font-bold text-lg mt-1">{voteDetails.party}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Transaction Hash:</span>
                  <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                    <p className="text-green-400 font-mono text-sm break-all">{voteDetails.txHash}</p>
                  </div>
                  <button className="text-royal-purple text-xs font-semibold mt-2 hover:text-royal-purple-dark transition-colors duration-200">
                    Copy to clipboard
                  </button>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Timestamp:</span>
                  <p className="text-gray-900 font-semibold mt-1">{new Date(voteDetails.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Blockchain confirmation status */}
            <div className="mb-8 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-semibold text-sm">Blockchain Confirmed</span>
                  <div className="px-2 py-1 bg-green-200 rounded-full text-green-800 text-xs font-bold">
                    12/12 Confirmations
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push('/results')}
                className="btn-primary w-full relative overflow-hidden group"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  View Live Results
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
              </button>
              
              <button
                onClick={() => {
                  localStorage.clear();
                  router.push('/');
                }}
                className="btn-secondary w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Completion indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
          </div>
        </div>

        {/* Security notice */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Your vote is secured by blockchain technology and cannot be altered or deleted.
          </p>
        </div>
      </div>
    </div>
  );
}