/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["pt-br"],
    defaultLocale: "pt-br",
  },
  reactStrictMode: false,
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
}

module.exports = nextConfig
