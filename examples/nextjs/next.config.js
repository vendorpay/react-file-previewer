/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (
      config,
      options,
    ) => {
      config.module.rules.push({
        test: /\.node$/,
        use: [
          {
            loader: "node-loader",
          },
        ],
      });
      config.resolve.alias.canvas = false;
      return config;
    },
  }
  
  module.exports = nextConfig
  