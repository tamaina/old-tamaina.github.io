import { Pjax } from 'pjax-api'

export const pjaxinit = (): Pjax => {
    return new Pjax({
        areas: [
            '#main, #breadcrumb, #mainnav, #sidebar',
            '#grid',
            'body'
        ],
        update: {
            head: 'meta',
            css: false
        }
    })
}