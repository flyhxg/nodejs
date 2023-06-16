const webpack = require('webpack')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      })
    )
    return config
  },
}

module.exports = nextConfig
