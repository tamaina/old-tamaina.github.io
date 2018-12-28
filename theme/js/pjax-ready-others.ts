interface Window {
    gtag(a: string, b: string): void
    DISQUS: {
        reset(a: any): void
    }
    disqus_config: any
}

window.addEventListener('pjax:load', function(){
    if(window.gtag){
        window.gtag('event', 'page_view')
    }
    if(window.DISQUS){
        window.DISQUS.reset({
            reload: true,
            config: window.disqus_config
        })
    }
})