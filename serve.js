const express = require('express')
const ip = require('ip').address()
const chalk = require('chalk')
const http = require('http')
const path = require('path')
const constants = require('./src/config/constants.js')

const app = express()
app.set('port', constants.DEV_PORT)
app.use(express.static(path.join(__dirname, 'dist'), {
    etag: false,
    lastModified: true,
}))

http.createServer(app).listen(app.get('port'), function () {
    const url = 'http://' + ip + ':' + app.get('port') + '/' + constants.BASE_BUNDLE_DIR +'/index.js'
    console.log('静态资源服务器已启动 ' + chalk.green(url))
})