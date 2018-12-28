import onReady from './onReady';

export const pjaxinit = async (): Promise<void> => {
    const { Pjax } = await import('pjax-api')
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
    return
}