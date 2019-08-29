// 何か処理を追加し、オブジェクトに格納して返すことでpug内やgulpfile内(base)で参照することができます。
// eslint-disable-next-line arrow-body-style

const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)

const { promisify } = require("util")
const sass = require("node-sass")
const CleanCss = require("clean-css")
const glog = require("fancy-log")
const colors = require("colors")

async function getAmpCss() {
  let ampcss = ""
  try {
    ampcss += "/*Based on Bootstrap v4.1.3 (https://getbootstrap.com)|Copyright 2011-2018 The Bootstrap Authors|Copyright 2011-2018 Twitter, Inc.|Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)*/\n"
    ampcss += (await promisify(sass.render)({ file: "theme/styl/amp_main.sass" })).css.toString()
    ampcss += "\n"
    ampcss += fontawesome.dom.css()
    ampcss += "\n"
    ampcss = new CleanCss().minify(ampcss).styles.replace(/!important/g, "").replace(/@charset "UTF-8";/g, "").replace(/@-ms-viewport{width:device-width}/g, "")

    glog(`making amp css: ${Buffer.byteLength(ampcss)}Byte`)
  } catch (e) {
    glog(colors.red("making amp css failed"))
    glog(colors.red(e))
    ampcss = "/* oops */"
  }
  return ampcss
}

module.exports = async () => {
  const [ampcss] = await Promise.all([getAmpCss()])
  return {
    ampcss
  }
}
