declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    DISQUS: {
      reset(a: any): void
    }
    twttr: any
    disqus_config: any
    gtag(...args: any[]): void
  }
}

export const pjaxLoaded = (): void => {
  if (window.gtag) {
    window.gtag("event", "page_view")
  }
  if (window.DISQUS) {
    window.DISQUS.reset({
      config: window.disqus_config,
      reload: true
    })
  }
  if (window.twttr) {
    window.twttr.widgets.load()
  }
}
