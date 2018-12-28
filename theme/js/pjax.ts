export const pjaxinit = async (): Promise<void> => {
    const { Pjax } = await import('pjax-api')
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
    return
}