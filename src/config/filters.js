/**
 * Created by yinshipeng on 2018/3/5
 */

const filters = {

    /**
     * 13422334455 转 134 2233 4455
     * @param mobile
     * @returns {string}
     */
    mobileAddSpace (mobile) {
        return mobile.toString().replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3')
    }
}

for (let key of Object.keys(filters)) {
    Vue.filter(key, filters[key])
}

