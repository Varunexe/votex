// src/app/results/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, indianParties } from '../../../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import type { Vote } from '../../../lib/firebase';

interface VoteResults {
  [party: string]: number;
}

export default function Results() {
  const [results, setResults] = useState<VoteResults>({});
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Real-time listener for votes
    const q = query(collection(db, 'votes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const voteCount: VoteResults = {};
      let total = 0;
      
      // Initialize all parties with 0 votes
      indianParties.forEach(party => {
        voteCount[party] = 0;
      });
      
      // Count votes for each party
      querySnapshot.forEach((doc) => {
        const vote = doc.data() as Vote;
        if (voteCount.hasOwnProperty(vote.party)) {
          voteCount[vote.party]++;
          total++;
        }
      });
      
      setResults(voteCount);
      setTotalVotes(total);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const getPercentage = (votes: number): string => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0';
  };

  const sortedResults = Object.entries(results).sort(([,a], [,b]) => b - a);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Live Election Results</h1>
            <p className="text-gray-600 mt-2">Real-time vote tally</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-800 font-medium">Live Updates</span>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading results...</p>
            </div>
          ) : (
            <>
              {/* Total Votes */}
              <div className="text-center mb-8 p-4 bg-blue-50 rounded-lg">
                <h2 className="text-2xl font-bold text-blue-900">{totalVotes}</h2>
                <p className="text-blue-700">Total Votes Cast</p>
              </div>
              
              {/* Results */}
              <div className="space-y-4">
                {sortedResults.map(([party, votes], index) => {
                  const percentage = getPercentage(votes);
                  return (
                    <div key={party} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">
                          #{index + 1} {party}
                        </h3>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">{votes}</span>
                          <span className="text-gray-600 ml-1">votes</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      
                      <p className="text-right text-gray-600">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
              
              {totalVotes === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No votes cast yet. Be the first to vote!
                </div>
              )}
            </>
          )}
          
          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => router.push('/vote')}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cast Your Vote
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              New User? Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}