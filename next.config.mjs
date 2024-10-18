// next.config.mjs
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Allow all hostnames
          port: '', // No specific port
          pathname: '/**', // Allow all paths
        },
      ],
    },
  };
  
  export default nextConfig;
  