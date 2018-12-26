import Pjax from 'pjax-api'
new Pjax({
    areas: [
        '#main, #breadcrumb, #mainnav, #updateTime, #sidebar',
        '#grid',
        'body'
    ],
    update: {
        head: 'meta'
    }
})
