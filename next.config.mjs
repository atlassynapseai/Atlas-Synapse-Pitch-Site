/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/Atlas-Synapse-CRM/:path*',
          destination: 'https://atlas-synapse-crm.vercel.app/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
