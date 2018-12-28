interface Window {
    jm_pathToWorker: any
}
declare var window: Window

export const sw = (): void => {
    if(typeof window.jm_pathToWorker === 'string') {
        let state = 'active'
        // twbs/bootstrap build/sw.jsより借用
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(window.jm_pathToWorker)
            .then(registration => {
                console.log('Service Worker: 登録: ', registration.scope)
            }).catch(err => {
                console.log('Service Worker: 登録時にエラーが発生しました: ', err)
            })

            navigator.serviceWorker.ready
            .then(() => location.reload(true))
            .catch(err => {
                console.log('error on navigator.serviceWorker.ready', err)
            })
        }
    }
}