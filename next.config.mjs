/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', 
  distDir: './dist',
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
}

export default nextConfig