import Sprite from "../base/Sprite"
import Director from "../Director.js"
import DataStore from "../base/DataStore.js"

export default class Pencil extends Sprite {
    constructor(img, top) {
        super(img, 0, 0, img.width, img.height, DataStore.getInstance().cxt.canvas.width, top, img.width, img.height)
        this.DataStore = DataStore.getInstance()
        this.cxt = this.DataStore.cxt
        this.x = this.cxt.canvas.width
        this.speed = Director.getInstance().speed
    }

    draw() {
        this.x = this.x - this.speed
        super.draw(this.img, this.imgX, this.imgY, this.imgW, this.imgH, this.x, this.startY, this.imgW, this.imgH)
        // this.cxt.beginPath()
        // this.cxt.lineTo(this.x, this.startY)
        // this.cxt.lineTo(this.x + this.imgW, this.startY)
        // this.cxt.lineTo(this.x + this.imgW, this.startY + this.imgH)
        // this.cxt.lineTo(this.x, this.startY + this.imgH)
        // this.cxt.lineTo(this.x, this.startY)
        // this.cxt.lineWidth = 1
        // this.cxt.strokeStyle = '#eb000e'
        // this.cxt.stroke()
    }
}