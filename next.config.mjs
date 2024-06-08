/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com'
        }
      ]
    },
    webpack: (config) => {
      config.resolve.alias['canvas'] = false;
      return config;
    },
  };
  
  export default nextConfig;
  