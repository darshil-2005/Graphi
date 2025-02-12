/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', 
  distDir: '.next',
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
}

export default nextConfig