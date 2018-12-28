// クライアント挿入用
// falibs.jsも更新すること

import { library, icon, IconLookup, IconParams, Icon } from "@fortawesome/fontawesome-svg-core"

import {
} from '@fortawesome/free-brands-svg-icons'
library.add(
)

import {
    faHome
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faHome
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