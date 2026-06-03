/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/agents/_next/:path*',
          destination: 'https://atlas-synapse-ai.vercel.app/_next/:path*',
        },
        {
          source: '/agents',
          destination: 'https://atlas-synapse-ai.vercel.app/agents',
        },
        {
          source: '/agents/:path*',
          destination: 'https://atlas-synapse-ai.vercel.app/agents/:path*',
        },
        {
          source: '/Atlas-Synapse-CRM/:path*',
          destination: 'https://atlas-synapse-crm.vercel.app/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
