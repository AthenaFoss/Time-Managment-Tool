/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
  images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
            }, {
                protocol: "https",
                hostname: "github.com"
            }
        ]
    },
}

export default nextConfig

