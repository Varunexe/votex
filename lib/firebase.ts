// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// You'll need to replace these with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsi0Oi7nerR66PFYE0UUii3g7MLFFs3Ec",
  authDomain: "votex-hackathon.firebaseapp.com",
  projectId: "votex-hackathon",
  storageBucket: "votex-hackathon.firebasestorage.app",
  messagingSenderId: "328704530395",
  appId: "1:328704530395:web:ed9363aff7a574db74b9fe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication helper
export const ensureAuthenticated = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
};

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

// Utility functions
export const generateFakeTxHash = (): string => {
  return '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

export const indianParties: string[] = [
  'Bharatiya Janata Party (BJP)',
  'Indian National Congress (INC)',
  'Aam Aadmi Party (AAP)',
  'Bahujan Samaj Party (BSP)',
  'Trinamool Congress (AITC)',
  'Samajwadi Party (SP)',
  'Communist Party of India (Marxist)',
  'Shiv Sena',
  'Janata Dal (United)',
  'Biju Janata Dal (BJD)'
];