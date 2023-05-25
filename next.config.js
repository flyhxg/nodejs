/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
}

module.exports = nextConfig
