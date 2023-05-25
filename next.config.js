const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "src/styles"),
    };

    return config;
  },
  images: {
    domains: ["picsum.photos", "127.0.0.1","randomuser.me"], //THIS IS TEMPORARY FOR TESTING
    path: '/_next/image'
  },
});
