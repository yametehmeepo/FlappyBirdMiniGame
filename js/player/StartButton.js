import Sprite from "../base/Sprite.js"
import DataStore from "../base/DataStore.js"

export default class StartButton extends Sprite {
    constructor() {
        const img = Sprite.getImage('start_button')
        super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    }

    draw() {
        super.draw(this.img, this.imgX, this.imgY, this.imgW, this.imgH,
            (DataStore.getInstance().cxt.canvas.width - this.imgW) / 2, (DataStore.getInstance().cxt.canvas.height - this.imgH) / 2.5, this.imgW, this.imgH)
    }
}