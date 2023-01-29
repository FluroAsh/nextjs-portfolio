/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'at-strapi-blog.s3.ap-southeast-2.amazonaws.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
}

module.exports = nextConfig
