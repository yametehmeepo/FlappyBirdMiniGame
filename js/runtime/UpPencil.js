import Pencil from "./Pencil.js"
import Sprite from "../base/Sprite.js"


export default class UpPencil extends Pencil {
    constructor(top) {
        const img = Sprite.getImage('pie_up')
        super(img, top - img.height)
    }
}