function sw(){
  if(typeof jm_pathToWorker === 'string') {
    // twbs/bootstrap build/sw.jsより借用
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(jm_pathToWorker)
      .then(registration => {
        console.log('Service Worker: 登録: ', registration.scope);
          registration.onupdatefound = () => {
            const installingWorker = registration.installing
            installingWorker.onstatechange = () => {
              if(installingWorker.state == 'installed' && navigator.serviceWorker.controller){
                console.log('Service Worker: バージョンアップします...')
                location.reload(true)
              }
            }
        }
      }).catch(err => {
        console.log('Service Worker: 登録時にエラー発生しました: ', err)
      })
    }
  }
}
sw()
document.addEventListener('pjax:content', sw)