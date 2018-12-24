import Pjax from 'pjax-api'
new Pjax({  areas: ['#main, #breadcrumb, #mainnav, #updateTime', 'body'], update: { head: 'meta' }  })
