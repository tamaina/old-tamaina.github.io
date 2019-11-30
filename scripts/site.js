const path = require("path")
const extend = require("extend")
const loadyaml = require("./builder/loadyaml")
const argv = require("./argv")

module.exports = extend(true,
  loadyaml(path.join(__dirname, "../.config/default.yml")),
  loadyaml(path.join(__dirname, "../.config/images.yml")),
  // process.env.CI === "true" ? loadyaml("../.config/actions-override.yml") : {},
  argv._.some(e => e === "local-server") ? loadyaml(path.join(__dirname, "../.config/debug-override.yml")) : {})
