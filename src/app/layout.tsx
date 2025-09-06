import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Votex - Secure Digital Voting Platform",
  description: "Cast your vote securely with blockchain-verified transactions. A modern, transparent voting platform for digital democracy.",
  keywords: "voting, blockchain, democracy, digital voting, secure voting, elections",
  authors: [{ name: "Votex Team" }],
  // ❌ Remove viewport from here - it's deprecated
  robots: "index, follow",
  openGraph: {
    title: "Votex - Secure Digital Voting Platform",
    description: "Cast your vote securely with blockchain-verified transactions",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Votex - Secure Digital Voting Platform",
    description: "Cast your vote securely with blockchain-verified transactions",
  },
};

// ✅ Add the new viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* ❌ Remove this meta tag since it's now handled by viewport export */}
      </head>
      <body className="antialiased min-h-screen bg-gray-50">
        <main className="relative">
          {children}
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Votex. Secure Digital Voting Platform.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}