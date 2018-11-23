export default class ExampleAPI {
    getUserInfo() {
        wx.getUserInfo({
            success: function (res) {
                console.log(res)
            }
        })
    }

    login() {
        wx.login({
            success: function (res) {
                console.log(res)
            }
        })
    }

    httprequest() {
        wx.request({
            url: 'http://127.0.0.1:8181',
            method: 'POST',
            data: 'myData',
            success: function (res) {
                console.log(res)
            }
        })
    }

    download() {
        wx.downloadFile({
            url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542951672687&di=69a0190702f5a781238bff0c0c0f771a&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20166_13_5%2Fa6ve1s6423528336855.jpg',
            success: function (res) {
                console.log(JSON.stringify(res))
            }
        })
    }
}