class Sidebar {
    constructor(){
        this.opened = false
        this.startX = 0
        this.diffX = 0

        window.addEventListener('DOMContentLoaded', this.registerOnReady.bind(this))

        document.addEventListener('pjax:content', this.registerClick.bind(this))
        window.addEventListener('pjax:fetch', this.sidebarClose.bind(this))

        window.addEventListener('resize', this.sidebarClose.bind(this))
    }

    registerOnReady() {
        const backdrop = document.createElement('div')
        backdrop.setAttribute('id', 'backdrop')

        this.wrapper = document.getElementById('grid')
        this.backdrop = this.wrapper.appendChild(backdrop)
        this.backdrop.addEventListener('click', backdropf.bind(this))
        function backdropf() {
            if(this.opened) this.sidebarClose()
        }

        document.body.addEventListener('touchstart', this.touchstart.bind(this))
        document.body.addEventListener('touchmove', this.touchmove.bind(this))
        document.body.addEventListener('touchend', this.touchend.bind(this))
        this.registerClick()
    }

    sidebarOpen() {
        this.wrapper.style.left = '0'
        this.backdrop.style.opacity = '0.2'
        this.backdrop.style.pointerEvents = 'auto'
        this.backdrop.style.visibility = 'visible'
        this.opened = true
    }

    sidebarClose() {
        this.wrapper.style.left = ''
        this.backdrop.style.opacity = ''
        this.backdrop.style.pointerEvents = ''
        this.backdrop.style.visibility = ''
        this.opened = false
    }

    registerClick() {
        for (const el of Array.from(document.getElementsByClassName('sidebar-toggler'))) {
            el.addEventListener('click', this.sidebarToggle.bind(this))
        }
    }
    sidebarToggle(e) {
        if (!this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }

    touchstart(e) {
        this.startX = e.changedTouches[0].pageX
    }
    touchmove(e) {
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
    touchend(e) {
        this.startX = 0
        this.diffX = 0
        if (this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }
}

new Sidebar()
