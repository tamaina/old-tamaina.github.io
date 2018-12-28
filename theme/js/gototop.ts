import onReady from "./onReady";

function gototo(){
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
    return false
}
export const gototop = (): void => {
    for(let el of Array.from(document.getElementsByClassName('trigger-gototop'))){
        el.addEventListener('click', gototo)
    }
}
