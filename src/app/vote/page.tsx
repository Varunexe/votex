'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCurrentDemoUser,
  createDemoUser,
  indianParties,
  castVote,
  markUserAsVoted,
  type User
} from '../../../lib/firebase';

export default function VotePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedParty, setSelectedParty] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Get or create a demo user
    let user = getCurrentDemoUser();
    
    if (!user) {
      // Create a demo user with random phone
      const randomPhone = `${Math.floor(6000000000 + Math.random() * 4000000000)}`;
      user = createDemoUser(randomPhone);
    }
    
    // Check if user already voted
    if (user.hasVoted) {
      router.push('/results');
      return;
    }
    
    setCurrentUser(user);
  }, [router]);

  const handleVoteSubmit = async () => {
    if (!selectedParty) {
      setError('Please select a party');
      return;
    }

    if (!currentUser) {
      setError('User session not found');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Casting vote for party:', selectedParty);
      
      // Cast the vote with simplified function
      const txHash = await castVote(selectedParty);
      
      console.log('Vote cast successfully, txHash:', txHash);
      
      // Mark user as voted
      markUserAsVoted();
      
      // Store vote details for confirmation page
      const voteDetails = {
        party: selectedParty,
        txHash: txHash,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('voteDetails', JSON.stringify(voteDetails));
      
      // Redirect to confirmation page
      router.push('/confirmation');
      
    } catch (error) {
      console.error('Failed to cast vote:', error);
      setError('Failed to cast vote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="card-premium text-center">
          <div className="spinner-premium mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Setting up demo session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="card-premium animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-royal rounded-2xl mb-6 shadow-royal-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sf-pro">Cast Your Vote</h1>
            <p className="text-gray-600 font-medium">Select a political party to vote for</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-glass-purple-10 rounded-full border border-royal-purple/20">
              <div className="w-2 h-2 bg-royal-purple rounded-full mr-2 animate-pulse-purple"></div>
              <span className="text-royal-purple text-sm font-semibold">Live Demo Mode</span>
            </div>
          </div>

          {/* Party Selection */}
          <div className="space-y-3 mb-8">
            {indianParties.map((party, index) => (
              <label
                key={party}
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedParty === party
                    ? 'border-royal-purple bg-glass-purple-10 shadow-lg'
                    : 'border-gray-200 bg-white/80 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="party"
                  value={party}
                  checked={selectedParty === party}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                  selectedParty === party
                    ? 'border-royal-purple bg-royal-purple'
                    : 'border-gray-300'
                }`}>
                  {selectedParty === party && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className={`text-lg font-medium transition-colors ${
                    selectedParty === party ? 'text-royal-purple' : 'text-gray-900'
                  }`}>
                    {party}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">#{index + 1}</span>
                </div>
              </label>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-red-700 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleVoteSubmit}
              disabled={!selectedParty || isLoading}
              className={`w-full relative overflow-hidden group ${
                !selectedParty || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed py-4 px-6 rounded-xl font-semibold'
                  : 'btn-primary'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-premium w-5 h-5 mr-3"></div>
                  Casting Vote...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Cast Vote
                </div>
              )}
              {/* Hover effect */}
              {!isLoading && selectedParty && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
              )}
            </button>

            <button
              onClick={() => router.push('/results')}
              className="btn-secondary w-full"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              View Live Results
            </button>
          </div>

          {/* User Info */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Demo Session:</span> {currentUser.phone}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Secure Digital Voting Platform • Real-time Updates
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-royal-purple rounded-full"></div>
            <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}