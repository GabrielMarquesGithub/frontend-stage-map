/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    //adicionar domínios onde é permitido a realização de importações para imagens
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
