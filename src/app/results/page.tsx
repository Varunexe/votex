// src/app/results/page.tsx - FIXED VERSION WITH PREMIUM STYLING
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { subscribeToVoteResults, indianParties } from '../../../lib/firebase';

interface VoteResult {
  party: string;
  votes: number;
  percentage: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<VoteResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    try {
      console.log('Setting up vote results subscription...');
      
      // Subscribe to real-time vote results
      unsubscribe = subscribeToVoteResults((voteCounts: Record<string, number>) => {
        console.log('Received vote results:', voteCounts);
        
        // Calculate total votes
        const total = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
        setTotalVotes(total);

        // Create results array with percentages
        const resultsArray: VoteResult[] = indianParties.map(party => {
          const votes = voteCounts[party] || 0;
          const percentage = total > 0 ? (votes / total) * 100 : 0;
          return {
            party,
            votes,
            percentage
          };
        });

        // Sort by vote count (descending)
        resultsArray.sort((a, b) => b.votes - a.votes);
        
        setResults(resultsArray);
        setLastUpdated(new Date());
        setIsLoading(false);
        setError('');
      });

    } catch (err) {
      console.error('Error setting up vote results subscription:', err);
      setError('Failed to load results. Please check your internet connection.');
      setIsLoading(false);
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const getProgressBarGradient = (index: number) => {
    const gradients = [
      'from-purple-500 to-purple-600',
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600'
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="card-premium text-center animate-fade-in-up">
          <div className="spinner-premium mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Results...</h2>
          <p className="text-gray-600 font-medium">Fetching real-time vote data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <div className="card-premium text-center max-w-md animate-fade-in-up">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Results</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-royal rounded-2xl mb-6 shadow-royal-glow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 font-sf-pro">Live Election Results</h1>
          <p className="text-gray-600 font-medium mb-6">Real-time voting results across all parties</p>
          
          {/* Status Bar */}
          <div className="glass-purple rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-semibold">Live Updates</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Total Votes:</span> 
                <span className="text-royal-purple font-bold ml-1">{totalVotes.toLocaleString()}</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Updated:</span> {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-4 mb-8">
          {results.map((result, index) => (
            <div
              key={result.party}
              className="card-premium transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getProgressBarGradient(index)} flex items-center justify-center text-white font-bold shadow-lg`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{result.party}</h3>
                    <p className="text-sm text-gray-500 font-medium">Political Party</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.votes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">votes</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-2">
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressBarGradient(index)} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${Math.max(result.percentage, 1)}%` }}
                  ></div>
                </div>
                <div className="absolute right-0 -top-6 text-sm font-bold text-gray-700">
                  {result.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/vote')}
            className="btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Cast Your Vote
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh Results
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Votex • Secure Digital Voting Platform • Results update in real-time
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-royal-purple rounded-full animate-pulse"></div>
            <span className="text-xs text-royal-purple font-semibold">Blockchain Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}