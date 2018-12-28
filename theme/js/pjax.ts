import onReady from './onReady';

import('pjax-api')
.then(({ Pjax }) => {
    onReady(() => {
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
    })
})