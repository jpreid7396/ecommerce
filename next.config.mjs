/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: 'firebasestorage.googleapis.com' }, { hostname: 'rstr.in' }]
  }
}

export default nextConfig
