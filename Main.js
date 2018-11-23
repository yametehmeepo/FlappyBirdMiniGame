import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import Director from './js/Director.js'
import Background from './js/runtime/Background.js'
import Land from './js/runtime/Land.js'
import Birds from "./js/player/Birds.js"
import StartButton from "./js/player/StartButton.js"
import Score from "./js/player/Score.js"
import ExampleAPI from "./js/base/ExampleAPI.js"

export default class Main {
    constructor() {
        this.canvas = wx.createCanvas()
        this.cxt = this.canvas.getContext('2d')
        this.DataStore = DataStore.getInstance()
        this.Director = Director.getInstance()
        const loader = new ResourceLoader()
        loader.onLoaded(res => this.onResourceFirstLoaded(res))
        wx.onTouchStart(() => {
            if (this.Director.isGameOver) {
                if (this.DataStore.get('canClickStartButton')) {
                    this.init()
                    this.createBackgroundMusic()
                }
            } else {
                this.DataStore.get('birds').vy = -5.8
            }
        })
    }

    onResourceFirstLoaded(res) {
        this.DataStore.cxt = this.cxt
        this.DataStore.res = res
        this.createBackgroundMusic()
        //const exampleApi = new ExampleAPI()
        //exampleApi.getUserInfo()
        //exampleApi.login()
        //exampleApi.httprequest()
        //exampleApi.download()
        this.init()
    }

    createBackgroundMusic() {
        const innerAudioContext = wx.createInnerAudioContext()
        this.DataStore.innerAudioContext = innerAudioContext
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
        innerAudioContext.src = 'audios/13_a_pleasant_encounter.mp3'
    }

    init() {
        this.Director.isGameOver = false
        this.DataStore
            .put('score', Score)
            .put('canClickStartButton', false)
            .put('startbutton', StartButton)
            .put('birds', Birds)
            .put('pencils', [])
            .put('background', Background)
            .put('land', Land)
        this.Director.createPencil()
        this.Director.run()
    }
}