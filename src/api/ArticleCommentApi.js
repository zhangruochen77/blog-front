import service from "@/utils/service"

let base = `/front/article/comment`

export default {

    /* 查看具体文章的所有评论 */
    listComments(id) {
        return service({
            url: `${base}/list/${id}`,
            method: 'get'
        })
    },

    /* 用户添加文章评论 */
    saveArticleComment(id, comment) {
        let params = {
            id: id,
            comment: comment
        }
        return service({
            url: `${base}`,
            method: 'post',
            data: params
        })
    }

}