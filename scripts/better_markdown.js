/* eslint-disable camelcase */
const path = require("path")
const cheerio = require("cheerio")
const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas, require("@fortawesome/free-regular-svg-icons").far, require("@fortawesome/free-brands-svg-icons").fab)
const punycode = require("punycode")

module.exports = (htm, urlprefix, image_compressing_strategy_version) => {
  const suf = `?v=${image_compressing_strategy_version}`

  const $ = cheerio.load(htm, { decodeEntities: false })

  $("body > h2, body > h3, body > h4, body > h5, body > h6").addClass("blogstyle")
  const hs = []
  $("h2, h3, h4, h5, h6").each((i, el) => { hs.push(encodeURIComponent($(el).text())) })
  $("h2, h3, h4, h5, h6").each(i => { $("h2, h3, h4, h5, h6").eq(i).attr("id", hs[i]) })
  $("img:not(.notblogstyle)").each((i, el) => {
    let img = null
    const imgurl = (() => {
      if ($(el).is("img[src^=\"/\"]")) return $(el).attr("src")
      if ($(el).is("img[src^=\"files/\"]")) return `/${$(el).attr("src")}`
      return null
    })()
    if (imgurl && imgurl.match("png$|jpg$|jpeg$|gif$|webp$".replace("?", "\\?"))) {
      const iu = path.parse(imgurl)
      const sizes = "calc(100vw - 30px), (min-width: 576px) 510px, (min-width: 768px) 40em"
      img = `<picture><source srcset="${urlprefix}${iu.dir}/${iu.name}.360.webp${suf} 360w, ${urlprefix}${iu.dir}/${iu.name}.720.webp${suf} 720w, ${urlprefix}${iu.dir}/${iu.name}.webp${suf} 1200w" type="image/webp" sizes="${sizes}"><source srcset="${urlprefix}${iu.dir}/${iu.name}.360${iu.ext}${suf} 360w, ${urlprefix}${iu.dir}/${iu.name}.720${iu.ext}${suf} 720w, ${urlprefix}${iu.dir}/${iu.base}${suf} 1200w" sizes="${sizes}">${$.html($(el))}</picture>`
    }
    if (!img) {
      $(el).attr("src", `${$(el).attr("src")}${suf}`)
      img = $.html($(el))
    }
    const tit = $(el).attr("title")
    const str = `<div class="blogstyle blogstyle-image"><${imgurl ? `a href="${imgurl}" target="_blank"` : "div"}>${img}${tit && tit.length > 0 ? `<p>${tit}</p>` : ""}</${imgurl ? "a" : "div"}></div>`
    $(el).after(str)
    $(el).remove()
  })
  $("img[src^=\"/\"]").each((i, el) => { $(el).attr("src", `${urlprefix}${$(el).attr("src")}`) })
  $("img[src^=\"files/\"]").each((i, el) => { $(el).attr("src", `${urlprefix}/${$(el).attr("src")}`) })
  $("table").each((i, el) => {
    $(el).addClass("table table-sm table-bordered")
    $(el).after(`<div class="blogstyle blogstyle-table">${$.html($(el))}</div>`)
    $(el).remove()
  })
  $(":not([data-mfm]) > blockquote").addClass("blockquote rounded px-3 px-md-4 py-3 font-weight-light")
  $(":not([data-mfm]) > a[href^=\"http\"], :not([data-mfm]) > a[href^=\"//\"]").append(String.raw`<i class="fa fas external-link-alt" data-fa-prefix="fas" data-fa-icon-name="external-link-alt" data-fa-option="{'classes':['fa-fw', 'fa-sm']}"></i>`)
  const as = []
  $("a[href^=\"http\"], a[href^=\"//\"]").each((i, el) => { as.push($(el).text()) })
  $("a[href^=\"http\"], a[href^=\"//\"]").each(i => {
    const e = $("a[href^=\"http\"], a[href^=\"//\"]").eq(i)
    const text = as[i]
    e.attr({ target: "_blank", rel: "noopener" })
    if (e.attr("href") === text) e.text(decodeURIComponent(punycode.toUnicode(text)))
  })

  return $("body").html()
}
