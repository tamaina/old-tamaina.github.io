import { IconPrefix, IconName, IconParams } from '@fortawesome/fontawesome-svg-core'
import { getNode } from '../../scripts/falib'

export const fainit = (): void => {
    for( let el of Array.from(document.getElementsByTagName('i')) ){
        if(!el.hasChildNodes()){
            try {
                const fa = getNode(
                    {
                        prefix: el.dataset.faPrefix as IconPrefix,
                        iconName: el.dataset.faIconName as IconName
                    },
                    (el.dataset.faOption ? JSON.parse(el.dataset.faOption.replace(/'/g,"\"")) : {}) as IconParams
                )
                el.insertAdjacentElement('beforebegin', fa.item(0))
                el.parentElement.removeChild(el)
            } catch(e) {
                console.log(`FontAwesome: ${el.dataset.faPrefix} ${el.dataset.faIconName}は見つかりませんでした。`)
                console.log(e)
            }
        }
    }
    return
}
