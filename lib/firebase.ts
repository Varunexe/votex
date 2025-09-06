// lib/firebase.ts - SIMPLIFIED VERSION FOR DEMO
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, addDoc, collection, onSnapshot, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Types
export interface User {
  uid: string;
  phone: string;
  verified: boolean;
  hasVoted: boolean;
}

export interface Vote {
  uid: string;
  party: string;
  txHash: string;
  timestamp: any;
}

export interface VoteDetails {
  party: string;
  txHash: string;
  timestamp: string;
}

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsi0Oi7nerR66PFYE0UUii3g7MLFFs3Ec",
  authDomain: "votex-hackathon.firebaseapp.com",
  projectId: "votex-hackathon",
  storageBucket: "votex-hackathon.firebasestorage.app",
  messagingSenderId: "328704530395",
  appId: "1:328704530395:web:ed9363aff7a574db74b9fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Indian political parties list
export const indianParties = [
  "Bharatiya Janata Party (BJP)",
  "Indian National Congress (INC)",
  "Aam Aadmi Party (AAP)",
  "Bahujan Samaj Party (BSP)",
  "Samajwadi Party (SP)",
  "Trinamool Congress (TMC)",
  "Dravida Munnetra Kazhagam (DMK)",
  "Shiv Sena",
  "Janata Dal (United)",
  "Telugu Desam Party (TDP)",
  "Biju Janata Dal (BJD)",
  "Communist Party of India (Marxist)",
  "Nationalist Congress Party (NCP)",
  "All India Anna Dravida Munnetra Kazhagam (AIADMK)"
];

// Generate fake transaction hash
export const generateFakeTxHash = (): string => {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate unique session ID for demo purposes
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// SIMPLIFIED: Cast vote function for demo
export const castVote = async (party: string): Promise<string> => {
  try {
    console.log('Casting vote for party:', party);
    
    const txHash = generateFakeTxHash();
    const sessionId = generateSessionId();
    
    // Add vote to votes collection with minimal data
    const voteData = {
      sessionId,
      party,
      txHash,
      timestamp: serverTimestamp(),
      ip: typeof window !== 'undefined' ? 'demo' : 'server' // Simple demo identifier
    };
    
    console.log('Adding vote to collection:', voteData);
    
    // Add the vote to Firestore
    await addDoc(collection(db, 'votes'), voteData);
    
    console.log('Vote successfully added to Firestore');
    
    return txHash;
  } catch (error) {
    console.error('Error casting vote:', error);
    throw new Error('Failed to cast vote. Please try again.');
  }
};

// Real-time vote results subscription
export const subscribeToVoteResults = (callback: (results: Record<string, number>) => void) => {
  try {
    console.log('Setting up real-time vote results subscription...');
    
    const votesRef = collection(db, 'votes');
    
    return onSnapshot(votesRef, 
      (snapshot) => {
        console.log('Received vote update. Total documents:', snapshot.size);
        
        const voteCounts: Record<string, number> = {};
        
        // Initialize all parties with 0 votes
        indianParties.forEach(party => {
          voteCounts[party] = 0;
        });
        
        // Count votes from snapshot
        snapshot.forEach((doc) => {
          const vote = doc.data() as Vote;
          console.log('Processing vote:', vote);
          
          if (vote.party && voteCounts.hasOwnProperty(vote.party)) {
            voteCounts[vote.party]++;
          }
        });
        
        console.log('Final vote counts:', voteCounts);
        callback(voteCounts);
      },
      (error) => {
        console.error('Error in vote results subscription:', error);
      }
    );
  } catch (error) {
    console.error('Error setting up vote subscription:', error);
    return () => {}; // Return empty cleanup function
  }
};

// Simplified user creation for demo (stores in localStorage only)
export const createDemoUser = (phone: string): User => {
  const user: User = {
    uid: generateSessionId(),
    phone: `+91${phone}`,
    verified: true, // Auto-verify for demo
    hasVoted: false
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('demoUser', JSON.stringify(user));
  }
  
  return user;
};

// Get current demo user
export const getCurrentDemoUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('demoUser');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Mark user as voted (localStorage only for demo)
export const markUserAsVoted = (): void => {
  const user = getCurrentDemoUser();
  if (user) {
    user.hasVoted = true;
    localStorage.setItem('demoUser', JSON.stringify(user));
  }
};

// Dummy for deployment – not used in demo
export const createOrUpdateUser = (_?: any) => {
  console.warn("createOrUpdateUser is a stub in demo mode");
};
