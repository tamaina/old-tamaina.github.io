class Sidebar {
    constructor(){
        this.wrapper = document.getElementById('grid')
        this.body = document.body
    
        const backdrop = document.createElement('div')
        backdrop.setAttribute('id', 'backdrop')

        this.backdrop = this.wrapper.appendChild(backdrop)
        this.backdrop.addEventListener('click', backdropf.bind(this))
        function backdropf() {
            if(this.opened) this.sidebarClose()
        }

        this.opened = false
        this.startX = 0
        this.diffX = 0

        window.addEventListener('DOMContentLoaded', this.registertouch.bind(this))
        window.addEventListener('DOMContentLoaded', this.registerclick.bind(this))
        document.addEventListener('pjax:content', this.registerclick.bind(this))
        window.addEventListener('pjax:fetch', this.sidebarClose.bind(this))

        window.addEventListener('resize', this.sidebarClose.bind(this))
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

    registerclick() {
        for (const el of Array.from(document.getElementsByClassName('sidebar-toggler'))) {
            el.addEventListener('click', this.sidebartoggle.bind(this))
        }
    }
    sidebartoggle(e) {
        if (!this.opened) this.sidebarOpen()
        else this.sidebarClose()
    }

    registertouch(e){
        this.body.addEventListener('touchstart', this.touchstart.bind(this))
        this.body.addEventListener('touchmove', this.touchmove.bind(this))
        this.body.addEventListener('touchend', this.touchend.bind(this))
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
