import Sprite from '../base/Sprite.js'
import Director from "../Director.js"
import DataStore from "../base/DataStore.js"


export default class Land extends Sprite {
    constructor() {
        const img = Sprite.getImage('land')
        super(img, 0, 0, img.width, img.height, 0, DataStore.getInstance().cxt.canvas.height - img.height, img.width, img.height)
        this.landX = 0
        this.landXspeed = Director.getInstance().speed
    }

    draw() {
        this.landX = this.landX + this.landXspeed
        if (this.landX > this.img.width - DataStore.getInstance().cxt.canvas.width) {
            this.landX = 0
        }
        super.draw(this.img, this.imgX, this.imgY, this.imgW, this.imgH, -this.landX, this.startY, this.canvasW, this.canvasH)
    }
}