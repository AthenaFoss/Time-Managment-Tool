/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  //*NOTE: added this to have seemless experience with authentication flow
  reactStrictMode: false,
}

export default nextConfig
