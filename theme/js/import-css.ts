export default () => {
  const top = require("../styl/lazy/top.sass")
  top.unuse()
  const tjwf = require("../styl/lazy/tjwf.sass")
  tjwf.unuse()

  const p = window.location.pathname

  if (p === "/") top.use()
  else if (top.unuse) top.unuse()
  if (p.startsWith("/The-Japanese-Web-Fonts/")) tjwf.use()
  else if (tjwf.unuse) tjwf.unuse()
}
