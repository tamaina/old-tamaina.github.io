import { fainit } from "./fainit"
import { gototop } from "./gototop"
import onReady from "./onReady"
import { scrolltoshow } from "./scrolltoshow"

import importCss from "./import-css"
import { detectOldBrowser } from "./old-browsers"
import { pjaxinit } from "./pjax"
import { pjaxLoaded } from "./pjax-ready-others"
import { Sidebar } from "./sidebar"

function contentReady() {
  fainit()
  scrolltoshow()
  gototop()
  importCss()
}

onReady(contentReady)
document.addEventListener("pjax:content", contentReady)

new Sidebar()
pjaxinit()

detectOldBrowser()

window.addEventListener("pjax:load", pjaxLoaded)
