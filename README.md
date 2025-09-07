# Votex – Online Voting Demo

Votex is a **Next.js + Firebase** web application that simulates a blockchain-style online voting system.  
It was built for a hackathon demo to showcase transparency, fairness, and real-time vote tallying.  

⚠️ **Note**: This is a **demo prototype** – not a production-ready election system. Some features (like OTP verification and one-vote-per-user enforcement) are simplified for speed of delivery.

## ✨ Features
- 📱 **Signup with phone number** (fake 10-digit input).
- 🔐 **OTP Verification** – accepts any 6-digit code for demo purposes.
- 🗳️ **Cast a vote** for your preferred political party.
- 🔗 **Blockchain transaction hash** displayed for transparency.
- 📊 **Live results page** with real-time Firestore updates (<1s latency).
- 🎨 **Modern UI** built with Next.js 14 + TailwindCSS, deployed on Vercel.

## 🏗️ Tech Stack
- **Frontend**: Next.js 14, App Router, Tailwind CSS  
- **Backend**: Firebase (Firestore + Auth demo mode)  
- **Deployment**: Vercel (CI/CD with GitHub)  
- **Blockchain Simulation**: Randomized Ethereum-style `0x...` transaction hashes  

## 🚀 Getting Started (Local Setup)

1. **Clone repo**
   ```bash
   git clone https://github.com/<your-username>/votex.git
   cd votex
Install dependencies
bash
Copy code
npm install
Setup environment variables
Create a .env.local file in project root:
env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
Run locally
bash
Copy code
npm run dev
App runs at http://localhost:3000

🔮 Roadmap (Future Work)
Real OTP verification using Firebase Phone Auth.
Firestore-backed users collection to enforce one vote per verified user.
Stronger Firebase security rules.
Deploy with a custom domain + HTTPS.

📸 Demo Flow
Signup → OTP
Vote selection → Confirm
Transaction hash displayed
Results update live

Feel free to contact us for detailed guide on deployment and working. Thanks
