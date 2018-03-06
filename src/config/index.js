/**
 * Created by yinshipeng on 2018/3/5
 */
import Widget from 'wxos-widget'
import constants from './constants'
import routes from './routes'
import apis from './apis'
import './filters'
import './mixins'
import '../utils'

const storage = weex.requireModule('storage')

/**
 * 获取用户登录Token
 * @returns {Promise}
 */
function getToken () {
    return new Promise((resolve) => {
        storage.getItem('userInfo', event => {
            let userToken = ''
            if (event.data && event.data !== 'undefined') {
                const userInfo = JSON.parse(event.data)
                userToken = userInfo['userToken']
            }
            resolve(userToken)
        })
    })
}

new Widget({
    routes: {
        routes,
        serveModel: constants.SERVE_MODEL,
        bundleDir: constants.BASE_BUNDLE_DIR
    },
    apis: {
        baseUrl: constants.API_BASE_URL,
        apis,
        requestHandler () {
            let options = {
                headers: {
                    'Content-Type': 'application/json',
                    'filter-key': 'filter-header',
                    'x-auth-token': ''
                }
            }

            return getToken().then((token) => {
                options['x-auth-token'] = token
                return options
            })
        },
        responseHandler (result, resolve, reject) {
            if (result.status === 200) {
                if (result.data.status === 0) {
                    resolve(result.data)
                } else {
                    reject(result.data)
                }
            } else {
                modal.toast({
                    message: '网络错误，请稍后重试。'
                })
            }
        }
    }
})