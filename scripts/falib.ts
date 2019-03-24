// クライアント挿入用
// falibs.jsも更新すること

import { icon, Icon, IconLookup, IconParams, library } from "@fortawesome/fontawesome-svg-core"

import {
  faGithub,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
library.add(
  faGithub,
  faTwitter
)

import {
  faExternalLinkAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons"
library.add(
  faHome,
  faExternalLinkAlt
)

export const getHTML = (query: IconLookup, option: IconParams): string => {
  return icon(query, option).html[0]
}
export const getNode = (query: IconLookup, option: IconParams): HTMLCollection => {
  return icon(query, option).node
}

export const getIcon = (query: IconLookup, option: IconParams): Icon => {
  return icon(query, option)
}
