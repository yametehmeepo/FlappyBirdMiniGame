import DataStore from "../base/DataStore.js"

export default class Score {
    constructor() {
        this.cxt = DataStore.getInstance().cxt
        this.scoreNumber = 0
        this.scoreFlag = true
    }

    draw() {
        this.cxt.font = '25px Arial'
        this.cxt.fillStyle = '#ff5dd2'
        this.cxt.fillText(this.scoreNumber, this.cxt.canvas.width / 2, this.cxt.canvas.height / 18, 1000)
    }
}