import {Resources} from './Resources.js'


export default class ResourceLoader {
    constructor() {
        this.res = new Map(Resources)
        for (let [key, value] of this.res) {
            let img = wx.createImage()
            img.src = value
            this.res.set(key, img)
        }
    }

    onLoaded(callback) {
        let count = 0;
        for (let value of this.res.values()) {
            value.onload = () => {
                count++
                if (count >= this.res.size) {
                    callback(this.res)
                }
            }
        }
    }

}