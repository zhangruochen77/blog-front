import service from "@/utils/service"

let base = `/front/comment`

export default {
    getAllComments() {
        return service({
            url: `${base}`,
            method: 'get'
        })
    },

    /* 添加评论 */
    saveComment(time, content) {
        let params = {
            time: time,
            content: content
        }

        return service({
            url: `${base}`,
            method: 'put',
            data: params
        })
    }
}