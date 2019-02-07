import onReady from "./onReady";

type sidebarOption = {
    thresholdToDetectPx: number,
    thresholdToOpenPx: number,
    sidebarTogglerClassName: string,
    targetsClassName: string,
    backdropWrapperId: string
}

export class Sidebar {
    opened: boolean
    startX: number
    diffX: number
    option: sidebarOption
    targets: HTMLElement[]
    grid: HTMLElement
    backdrop: HTMLElement

    constructor(option: sidebarOption = {
        thresholdToDetectPx: window.innerWidth * 0.2,
        thresholdToOpenPx: window.innerWidth * 0.6,
        sidebarTogglerClassName: 'sidebar-toggler',
        targetsClassName: 'sidebar-target',
        backdropWrapperId: 'grid'
    }) {
        this.opened = false
        this.startX = 0
        this.diffX = 0
        this.option = option

        onReady(this.registerOnReady.bind(this))

        document.addEventListener('pjax:content', this.registerClick.bind(this))
        window.addEventListener('pjax:fetch', this.sidebarClose.bind(this))

        window.addEventListener('resize', this.sidebarClose.bind(this))
    }

    private registerOnReady() {
        const backdrop = document.createElement('div')
        backdrop.setAttribute('id', 'backdrop')

        this.targets = Array.from(document.getElementsByClassName(this.option.targetsClassName) as HTMLCollectionOf<HTMLElement>)
        this.grid = document.getElementById(this.option.backdropWrapperId)
        this.backdrop = this.grid.appendChild(backdrop)
        this.backdrop.addEventListener('click', this.backdropf.bind(this))

        document.body.addEventListener('touchstart', this.touchstart.bind(this))
        document.body.addEventListener('touchmove', this.touchmove.bind(this))
        document.body.addEventListener('touchend', this.touchend.bind(this))
        this.registerClick()
    }

    private backdropf() {
        if (this.opened) this.sidebarClose()
    }

    private sidebarOpen() {
        for (const target of this.targets) target.style.left = '0'
        this.backdrop.style.opacity = '0.2'
        this.backdrop.style.pointerEvents = 'auto'
        this.backdrop.style.visibility = 'visible'
        document.getElementsByTagName('html').item(0).style.overflowY = 'hidden'
        this.opened = true
    }

    private sidebarClose() {
        for (const target of this.targets) target.style.left = ''
        this.backdrop.style.opacity = ''
        this.backdrop.style.pointerEvents = ''
        this.backdrop.style.visibility = ''
        document.getElementsByTagName('html').item(0).style.overflowY = ''
        this.opened = false
    }

    private registerClick() {
        for (const el of Array.from(document.getElementsByClassName('sidebar-toggler'))) {
            el.addEventListener('click', this.sidebarToggle.bind(this))
        }
    }
    private sidebarToggle() {
        if (!this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }

    private touchstart(e: TouchEvent) {
        this.startX = e.changedTouches[0].pageX
    }
    private touchmove(e: TouchEvent) {
        this.diffX = e.changedTouches[0].pageX - this.startX
        if (this.diffX >= 120) {
            if(this.startX < 20 && !this.opened) this.sidebarOpen()
        } else if (this.diffX > 0) {
            if (this.startX < 20 && !this.opened) {
                document.getElementsByTagName('html').item(0).style.overflowY = 'hidden'
                for (const target of this.targets) target.style.left = `calc(-70vw + ${this.diffX}px)`
            }
        } else if (this.diffX > -120) {
            if (this.opened) {
                document.getElementsByTagName('html').item(0).style.overflowY = ''
                for (const target of this.targets) target.style.left = `${this.diffX}px`
            }
        } else if (this.diffX <= -120) {
            if (this.opened) this.sidebarClose()
        }
    }
    private touchend() {
        this.startX = 0
        this.diffX = 0
        if (this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }
}
