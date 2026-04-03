/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = { fs: false, path: false };
    
    if (dev) {
      config.devtool = false;
    }
    
    return config;
  },
  productionBrowserSourceMaps: false,
  sassOptions: {
    sourceMap: false,
  },
}

module.exports = nextConfig