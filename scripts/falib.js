// クライアント挿入用
// falibs.jsも更新すること

import { library, icon } from "@fortawesome/fontawesome-svg-core"

import {
} from '@fortawesome/free-brands-svg-icons'
library.add(
)

import {
} from '@fortawesome/free-solid-svg-icons'
library.add(
)

export const getHTML = (query, option) => {
    return icon(query, option).html[0]
}

export const getNode = (query, option) => {
    return icon(query, option).node
}

export const getIcon = (query, option) => {
    return icon(query, option)
}