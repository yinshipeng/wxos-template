/**
 * Created by yinshipeng on 2018/3/5
 */

import datetime from './datetime'
import tools from 'wxos-widget/src/tools'

let lastTime = 0
const utils = {

    /**
     * 解决modal.toast频繁点击频繁弹出问题
     */
    toast (option) {
        let duration = 3
        if (option.hasOwnProperty('duration')) {
            duration = option['duration']
        }
        let now = new Date().getTime()
        if (now - lastTime > duration * 1000) {
            modal.toast(option)
            lastTime = now
        }
    }
}

const Utils = Object.create(null)
Utils.install = (Vue) => {
    Vue.prototype.$utils = Object.assign(utils, datetime, tools)
}

Vue.use(Utils)