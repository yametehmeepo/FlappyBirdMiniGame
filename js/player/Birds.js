import Sprite from "../base/Sprite.js"
import Director from "../Director.js"
import DataStore from "../base/DataStore.js"

export default class Birds extends Sprite {
    constructor() {
        const img = Sprite.getImage('birds')
        const land = Sprite.getImage('land')
        super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
        this.Director = Director.getInstance()
        this.DataStore = DataStore.getInstance()
        this.index = 0
        this.eachBirdX = [8, 60, 113]
        this.birdW = 32
        this.birdH = 24
        this.birdY = 11
        this.g = 0.28
        this.vy = -5
        this.y = this.DataStore.cxt.canvas.height / 3
        //this.y = 0
        this.x = this.DataStore.cxt.canvas.width / 4
        this.maxY = this.DataStore.cxt.canvas.height - land.height - this.birdH
    }

    isTouchAnything() {
        //检测是否碰撞地板
        if (this.y >= this.maxY) {
            this.y = this.maxY
            this.Director.isGameOver = true
            return
        }
        //检测是否碰撞天花板
        if (this.y <= 0) {
            this.y = 0
            this.Director.isGameOver = true
            return
        }
        //检测是否碰撞铅笔, 最简单碰撞检测算法
        const pencils = this.DataStore.get('pencils')
        // for (let i = 0; i < pencils.length; i++) {
        //     const isTouched = this.x > pencils[i].x + pencils[i].imgW ||//小鸟左边大于铅笔后侧
        //         this.x < pencils[i].x - this.birdW || //小鸟右边小于铅笔左侧
        //         this.y > pencils[i].startY + pencils[i].imgH || //小鸟上边大于铅笔底部
        //         this.y < pencils[i].startY - this.birdH //小鸟下边小于铅笔上部
        //     if (!isTouched) {//和铅笔发生碰撞
        //         this.Director.isGameOver = true
        //         return
        //     }
        // }

        //检测是否碰撞铅笔, 复杂的碰撞检测算法
        const arrH = 69//笔尖倾斜部分的高度
        for (let i = 0; i < pencils.length; i++) {

            if (i % 2) {//上铅笔
                const upPencilCornerY = pencils[i].startY + pencils[i].imgH - arrH
                if (this.y <= upPencilCornerY - this.birdH) {//小鸟下边在铅笔拐点之上
                    if (this.x > pencils[i].x - this.birdW && this.x < pencils[i].x + pencils[i].imgW) {
                        this.Director.isGameOver = true
                        return
                    }
                } else if (this.y >= pencils[i].startY + pencils[i].imgH) {//小鸟上边在铅笔尖之下,肯定无碰撞

                } else {//小鸟处于拐点部分
                    let uparrhalfW = (arrH - this.y + upPencilCornerY) * 24 / arrH//笔尖范围碰撞X轴方向的长度的一半
                    if (this.x > pencils[i].x + pencils[i].imgW / 2 - uparrhalfW - this.birdW && this.x < pencils[i].x + pencils[i].imgW / 2 + uparrhalfW) {
                        this.Director.isGameOver = true
                        return
                    }
                }
            } else {//下铅笔
                const downPencilCornerY = pencils[i].startY + arrH
                if (this.y >= downPencilCornerY) {//小鸟上边在拐点之下
                    if (this.x > pencils[i].x - this.birdW && this.x < pencils[i].x + pencils[i].imgW) {
                        this.Director.isGameOver = true
                        return
                    }
                } else if (this.y <= pencils[i].startY - this.birdH) {//小鸟下边在铅笔尖之上, 肯定无碰撞

                } else {//小鸟处于拐点部分
                    let downarrhalfW = (this.y + this.birdH - pencils[i].startY) * 24 / arrH//笔尖范围碰撞X轴方向的长度的一半
                    if (this.x > pencils[i].x + pencils[i].imgW / 2 - downarrhalfW - this.birdW && this.x < pencils[i].x + pencils[i].imgW / 2 + downarrhalfW) {
                        this.Director.isGameOver = true
                        return
                    }
                }
            }
        }
    }

    draw() {
        this.isTouchAnything()
        super.draw(this.img, this.eachBirdX[Math.floor(this.index)], this.birdY, this.birdW, this.birdH, this.x, this.y, this.birdW, this.birdH)
        this.y += this.vy
        this.vy += this.g
        this.index += 0.1
        if (Math.floor(this.index) > 2) {
            this.index = 0
        }
    }
}