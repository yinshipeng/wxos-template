const argv = JSON.parse(process.env.npm_config_argv)
const params = (argv.original && argv.original[2]) || 'prod'

// api接口地址
const apiPrefix = {
    dev: 'https://hulu.houbank.net/offlineloan',
    sm: 'https://hulu.houbank.com/offlineloan',
    prod: 'https://hulu.houbank.com/offlineloan',
}

// assets静态文件地址
const assetsUrls = {
    dev: 'http://p3eprano9.bkt.clouddn.com',
    sm: 'http://p3eprano9.bkt.clouddn.com',
    prod: 'http://p3eprano9.bkt.clouddn.com',
}

// 动态更新URL
const downloadUrls = {
    dev: 'https://apigateway.houbank.net/restapi/versionmanager/getLastAppVersion?appid=hulu&currentVersion=',
    sm: 'https://apigateway.houbank.net/restapi/versionmanager/getLastAppVersion?appid=hulu&currentVersion=',
    prod: 'https://apigateway.houbank.com/restapi/versionmanager/getLastAppVersion?appid=hulu&currentVersion=',
}

if (!apiPrefix[params]) {
    throw new Error('npm命令参数不正确，请检查参数！可选参数["dev", "sm", "prod"]，默认prod')
}

/**
 * 上线执行npm run prod时执行该文件
 * 功能：替换constant.js配置文件
 */

const fs = require('fs')
const CONSTANTS_FILE_PATH = __dirname + '/src/config/constants.js'
const CONSTANTS = require(CONSTANTS_FILE_PATH)

CONSTANTS.PROD_ENV = params === 'dev' ? false : true
CONSTANTS.SERVE_ASSETS = assetsUrls[params]
CONSTANTS.SERVE_BODUNLE = 'APP_FILE'
CONSTANTS.URL_PREFIX = apiPrefix[params]
CONSTANTS.DYNAMIC_UPDATE_URL = downloadUrls[params]

console.log('请求API地址=' + CONSTANTS.URL_PREFIX)

// 组装文件内容
const constantsFileContent = 'module.exports =  ' + JSON.stringify(CONSTANTS)


fs.copyFileSync(CONSTANTS_FILE_PATH, CONSTANTS_FILE_PATH + '.copy')
console.log('constants.js文件复制成功并重命名为constants.js.copy')

fs.writeFile(CONSTANTS_FILE_PATH, constantsFileContent, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('替换constant文件内容成功')
    }
})



