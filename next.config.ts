import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gymbox.ams3.digitaloceanspaces.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
