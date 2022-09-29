/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@dmrk/ui"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
