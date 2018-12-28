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
                registration.onupdatefound = () => {
                    if (registration.installing) {
                        registration.installing.onstatechange = () => {
                            if(registration.installing.state == 'installed' && navigator.serviceWorker.controller){
                                console.log('Service Worker: バージョンアップします...')
                                location.reload(true)
                            }
                        }
                    }
                }
            }).catch(err => {
                console.log('Service Worker: 登録時にエラー発生しました: ', err)
            })
        }
    }
}