import Pencil from "./Pencil.js"
import Sprite from "../base/Sprite.js"
import DataStore from "../base/DataStore.js"

export default class DownPencil extends Pencil {
    constructor(top) {
        const img = Sprite.getImage('pie_down')
        const gap = DataStore.getInstance().cxt.canvas.height / 5
        super(img, top + gap)
    }
}