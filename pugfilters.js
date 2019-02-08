const kramed = require("kramed")
const { minify } = require("html-minifier")
const mfmf = require("mfmf")
const readyaml = require("js-yaml").safeLoad
const fs = require("fs")

const betterMarkdown = require("./scripts/better_markdown")
const highl = require("./scripts/highl")

function loadyaml(filepath) {
  return readyaml(fs.readFileSync(filepath))
}
const site = loadyaml("./.config/messages.yml")

module.exports = {
  md: (str) => {
    let htm = kramed(str)
    htm = betterMarkdown(htm, site.url.path)
    htm = highl(htm)
    htm = minify(htm, {
      collapseWhitespace: true, removeEmptyAttributes: false, removeEmptyElements: false
    })
    return htm
  },
  markdown: str => kramed(str),
  mfm: (str) => {
    const htm = mfmf.render(str, {})
    return htm
  },
  oneline: str => str.replace(/\r?\n/g, "")
}
