'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDemoUser } from '../../lib/firebase';

export default function Homepage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleStartDemo = async () => {
    setLoading(true);
    
    try {
      // Create demo user with random phone number
      const randomPhone = `${Math.floor(6000000000 + Math.random() * 4000000000)}`;
      createDemoUser(randomPhone);
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Go directly to voting
      router.push('/vote');
      
    } catch (error) {
      console.error('Demo setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-royal rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card-premium animate-fade-in-up">
          {/* Logo and header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-royal rounded-2xl mb-6 shadow-royal-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sf-pro">Votex</h1>
            <p className="text-gray-600 font-medium">Secure Digital Voting Platform</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-glass-purple-10 rounded-full border border-royal-purple/20">
              <div className="w-2 h-2 bg-royal-purple rounded-full mr-2 animate-pulse-purple"></div>
              <span className="text-royal-purple text-sm font-semibold">Live Demo Mode</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Demo Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">Demo Mode Active</h3>
                  <p className="text-blue-700 text-sm">
                    Authentication bypassed for hackathon demo. Click below to start voting immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={handleStartDemo}
              disabled={loading}
              className="btn-primary w-full relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-premium w-5 h-5 mr-3"></div>
                  Setting up demo...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Start Voting Demo
                </div>
              )}
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
            </button>

            {/* Alternative Action */}
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

          {/* Features showcase */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Real-time</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Secure</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <p className="text-xs text-gray-600 font-medium">Transparent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}