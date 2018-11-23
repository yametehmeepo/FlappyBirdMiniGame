//import http from 'http'

(function () {
    "use strict"
    const http = require('http')
    http.createServer((request, response) => {
        let body = ''
        request.on('data', function (chunk) {
            body += chunk
        })
        request.on('end', function () {
            response.end('服务器返回的数据')
            console.log(body)
        })
    }).listen(8181)
})()
