import service from "@/utils/service"

let base = `/front/admin`

export default {

    /* 获取站点用户信息 */
    getInfo() {
        return service({
            url: `${base}/info`,
            method: 'get'
        })
    }
}