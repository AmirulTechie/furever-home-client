/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
};

export default nextConfig;
