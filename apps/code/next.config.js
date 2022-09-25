const withTM = require("next-transpile-modules")(["@dmrk/ui"]);
const withPlugins = require("next-compose-plugins");
const removeImports = require("next-remove-imports")();

const nextJsConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
};

module.exports = withPlugins([withTM, removeImports], nextJsConfig);
