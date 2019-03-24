/* eslint-disable no-empty-pattern */
// mixin検出用(ここで指定されていなかったら事前に挿入する)
// falib.jsも更新すること

const {
  faGithub,
  faTwitter
} = require("@fortawesome/free-brands-svg-icons")

const {
  faHome,
  faExternalLinkAlt
} = require("@fortawesome/free-solid-svg-icons")

module.exports = {
  icons: [
    faGithub,
    faTwitter,

    faHome,
    faExternalLinkAlt
  ]
}
