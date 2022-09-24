const withTM = require("next-transpile-modules")(["@dmrk/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
