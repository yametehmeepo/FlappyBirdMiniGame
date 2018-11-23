//所有资源绘制的基础
import DataStore from './DataStore.js'

export default class Sprite {
    constructor(
        img = null,
        imgX = 0,
        imgY = 0,
        imgW = 0,
        imgH = 0,
        startX = 0,
        startY = 0,
        canvasW = 0,
        canvasH = 0
    ) {
        this.DataStore = DataStore.getInstance()
        this.cxt = this.DataStore.cxt
        this.img = img
        this.imgX = imgX
        this.imgY = imgY
        this.imgW = imgW
        this.imgH = imgH
        this.startX = startX
        this.startY = startY
        this.canvasW = canvasW
        this.canvasH = canvasH
    }

    static getImage(key) {
        return DataStore.getInstance().res.get(key)
    }

    draw(
        img = this.img,
        imgX = this.imgX,
        imgY = this.imgY,
        imgW = this.imgW,
        imgH = this.imgH,
        startX = this.startX,
        startY = this.startY,
        canvasW = this.canvasW,
        canvasH = this.canvasH
    ) {
        this.cxt.drawImage(
            img,
            imgX,
            imgY,
            imgW,
            imgH,
            startX,
            startY,
            canvasW,
            canvasH
        )
    }
}