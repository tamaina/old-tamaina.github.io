export default () => {
  const top = require("../styl/lazy/top.sass")
  const tjwf = require("../styl/lazy/tjwf.sass")

  const p = window.location.pathname

  if (p === "/") top.use()
  else top.unuse()
  if (p.startsWith("/")) tjwf.use()
  else top.unuse()
}
