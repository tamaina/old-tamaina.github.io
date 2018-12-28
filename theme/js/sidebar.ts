/* @flow */

import onReady from "./onReady";

type sidebarOption = {
    thresholdToDetectPx: number,
    thresholdToOpenPx: number,
    sidebarTogglerClassName: string,
    wrapperId: string
}

export class Sidebar {
    opened: boolean
    startX: number
    diffX: number
    option: sidebarOption
    wrapper: HTMLElement
    backdrop: HTMLElement

    constructor(option: sidebarOption = {
        thresholdToDetectPx: window.innerWidth * 0.2,
        thresholdToOpenPx: window.innerWidth * 0.6,
        sidebarTogglerClassName: 'sidebar-toggler',
        wrapperId: 'grid'
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

        this.wrapper = document.getElementById('grid')
        this.backdrop = this.wrapper.appendChild(backdrop)
        this.backdrop.addEventListener('click', this.backdropf.bind(this))

        document.body.addEventListener('touchstart', this.touchstart.bind(this))
        document.body.addEventListener('touchmove', this.touchmove.bind(this))
        document.body.addEventListener('touchend', this.touchend.bind(this))
        this.registerClick()
    }

    private backdropf() {
        if(this.opened) this.sidebarClose()
    }

    private sidebarOpen() {
        this.wrapper.style.left = '0'
        this.backdrop.style.opacity = '0.2'
        this.backdrop.style.pointerEvents = 'auto'
        this.backdrop.style.visibility = 'visible'
        this.opened = true
    }

    private sidebarClose() {
        this.wrapper.style.left = ''
        this.backdrop.style.opacity = ''
        this.backdrop.style.pointerEvents = ''
        this.backdrop.style.visibility = ''
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
            if(this.startX < 100 && !this.opened) this.sidebarOpen()
        } else if (this.diffX > 0) {
            if(this.startX < 100 && !this.opened) this.wrapper.style.left = `calc(-70vw + ${this.diffX}px)`
        } else if (this.diffX > -120) {
            if(this.startX >= 100 && this.opened) this.wrapper.style.left = `${this.diffX}px`
        } else if (this.diffX <= -120) {
            if(this.startX >= 100 && this.opened) this.sidebarClose()
        }
    }
    private touchend() {
        this.startX = 0
        this.diffX = 0
        if (this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }
}
