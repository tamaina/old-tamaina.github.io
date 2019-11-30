import { fainit } from "./lib/fainit"
import { gototop } from "./lib/gototop"
import onReady from "./lib/onReady"
import { scrolltoshow } from "./lib/scrolltoshow"

import importCss from "./lib/import-css"
import { detectOldBrowser } from "./lib/old-browsers"
import { Sidebar } from "./lib/sidebar"

function contentReady() {
  fainit()
  scrolltoshow()
  gototop()
  importCss()
}

onReady(contentReady)

new Sidebar()

detectOldBrowser()
