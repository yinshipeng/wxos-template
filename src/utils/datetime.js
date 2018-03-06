/**
 * Created by yinshipeng on 2018/3/5
 */
export default {

    /**
     * 获取当前日期：'2017年12月30日'
     * @returns {string}
     */
    getCurrentDate () {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '年' + month + '月' + day + '日'
    },

    /**
     * 时间戳转YYYY-MM-DD
     * @returns {string}
     */
    timestampToDate () {
        const date = new Date(timestamp)
        const Y = date.getFullYear() + '-'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        const D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        return Y + M + D
    },

    /**
     * 获得当前年月: '20180112'
     * @returns {string}
     */
    getCurrentYM () {
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        return year + '' + month
    }
}