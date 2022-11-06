import service from "@/utils/service"

let base = `/front/article`

export default {
    /* 分页获取文章信息 */
    pageListArticles(page, limit, tagId) {
        if (null === tagId) {
            return service({
                url: `${base}/page/${page}/${limit}`,
                method: 'post',
            })
        } else {
            return service({
                url: `${base}/page/${page}/${limit}`,
                method: 'post',
                data: tagId
            })
        }
    },

    /* 获取文章详细信息 */
    getArticle(id) {
        return service({
            url: `${base}/${id}`,
            method: 'get'
        })
    },

    /* 用户为文章点赞 */
    addLikeCount(id) {
        return service({
            url: `${base}/${id}`,
            method: 'put'
        })
    }

}
