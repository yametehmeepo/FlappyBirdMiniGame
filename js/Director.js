import DataStore from './base/DataStore.js'
import DownPencil from "./runtime/DownPencil.js"
import UpPencil from "./runtime/UpPencil.js"

export default class Director {
    constructor() {
        this.DataStore = DataStore.getInstance()
        this.speed = 2
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance
    }

    createPencil() {
        const minTop = DataStore.getInstance().cxt.canvas.height / 8
        const maxTop = DataStore.getInstance().cxt.canvas.height / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.DataStore.get('pencils').push(new DownPencil(top))
        this.DataStore.get('pencils').push(new UpPencil(top))
    }

    run() {
        if (!this.isGameOver) {
            this.DataStore.get('background').draw()
            const pencils = this.DataStore.get('pencils')
            const birds = this.DataStore.get('birds')
            const score = this.DataStore.get('score')
            if (pencils[0].x + pencils[0].imgW <= 0 && pencils.length === 4) {
                pencils.shift()
                pencils.shift()
                score.scoreFlag = true
            }
            if (pencils[0].x <= (DataStore.getInstance().cxt.canvas.width - pencils[0].imgW) / 2 && pencils.length === 2) {
                this.createPencil()
            }
            this.DataStore.get('pencils').map(value => {
                value.draw()
            })
            this.DataStore.get('land').draw()
            if (birds.x > pencils[0].x + pencils[0].imgW && score.scoreFlag) {
                score.scoreFlag = false
                score.scoreNumber += 1
            }
            score.draw()
            this.DataStore.get('birds').draw()
            let timer = requestAnimationFrame(() => this.run())
            this.DataStore.put('time', timer)
        } else {
            wx.vibrateLong({
                success: () => {
                    //console.log('震动+1分')
                }
            })
            this.DataStore.innerAudioContext.stop()
            cancelAnimationFrame(this.DataStore.get('timer'))
            this.DataStore.get('startbutton').draw()
            this.DataStore.destroy()
            wx.triggerGC()
            clearTimeout(this.DataStore.get('clickTimer'))
            let clickTimer = setTimeout(() => {
                this.DataStore.put('canClickStartButton', true)
            }, 500)
            this.DataStore.put('clickTimer', clickTimer)
        }
    }
}