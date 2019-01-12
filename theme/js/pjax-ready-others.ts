interface Window {
    gtag(a: string, b: string): void
    DISQUS: {
        reset(a: any): void
    }
    disqus_config: any
    twttr: any
}
declare var window: Window


export const pjaxLoaded = (): void => {
    if (window.gtag) {
        window.gtag('event', 'page_view')
    }
    if (window.DISQUS) {
        window.DISQUS.reset({
            reload: true,
            config: window.disqus_config
        })
    }
    if (window.twttr) {
        window.twttr.widgets.load()
    }
}