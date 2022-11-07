import service from "@/utils/service"

let base = `/front/tag`

export default {
    /* 获取所有的标签信息 */
    getTags() {
        return service({
            url: `${base}`,
            method: 'get'
        })
    }
}
