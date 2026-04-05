/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
  },
  webpack: (config, { dev }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    if (dev) {
      config.devtool = false;
    }

    return config;
  },
  productionBrowserSourceMaps: false,
  sassOptions: {
    sourceMap: false,
  },
};

module.exports = nextConfig;