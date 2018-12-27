import Pjax from 'pjax-api'
import onReady from './onReady';
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