/**
 * Created by yinshipeng on 2018/3/5
 */
import constants from './constants'

const mixins = {
    methods: {
        /**
         * 图片文件夹路径
         * @param  {String} folderPath [description]
         * @return {String}            [description]
         */
        getImageSrc (folderPath) {
            if (weex.config.env.rem) {
                return folderPath
            }
            return constants.SERVE_ASSETS + folderPath
        },

        /**
         * 跳转页面
         * @param  {String|Object} route
         * @return null
         */
        go (route, bool = false) {
            this.$router.push(route, bool)
        },

        /**
         * 页面返回上一级
         * @return {[type]} [description]
         */
        back () {
            this.$router.back()
        },

        /**
         * 初始化字体文件
         */
        initIconFont () {
            let domModule = weex.requireModule('dom')
            domModule.addRule('fontFace', {
                'fontFamily': 'iconfont',
                'src': 'url(\'http://p3eprano9.bkt.clouddn.com/iconfont.ttf\')'
            })
        },
    },
    created () {
        this.initIconFont()
    }
}
Vue.mixin(mixins)