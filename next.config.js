/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
  },
};

module.exports = nextConfig;