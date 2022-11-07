<template>
    <div>
        <el-backtop :bottom="60">
            <div
                    style="{
                        height: 100%;
                        width: 100%;
                        background-color: #a6eaff;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        border-radius: 20px;
                        text-align: center;
                        line-height: 40px;
                        color: #2ec4b6;
                      }">
                <i class="el-icon-top"></i>
            </div>
        </el-backtop>

        <div class="article-detail-header-class">
            <img :src="article.img">
        </div>
        <div>
            <div class="article-detail-info-class">
                <div class="article-detail-title-class">
                    <h1>{{article.title}}</h1>
                </div>
                <div class="article-detail-create-time-class">
                    <p>-- -- -- {{article.createTime}}</p>
                </div>
                <div class="article-detail-description-class">
                    <h2>前言:{{article.description}}</h2>
                </div>
                <div class="article-detail-content-class">
                    <span v-html="article.content"></span>
                </div>
                <div class="article-detail-other-class">
                    <div class="article-detail-comment-class" v-if="article.comments !== null">
                        <el-timeline>
                            <el-timeline-item :timestamp="c.createTime" placement="top" v-for="c in article.comments">
                                <el-card>
                                    <p>{{c.content}}</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <div class="article-like-comment-class">
                        <el-button type="primary" @click="doLikeCount(article.id)">
                            {{article.likeCount}}
                            <i class="el-icon-thumb"></i>顶
                        </el-button>
                        <el-button type="primary" icon="el-icon-chat-dot-round" @click="drawer = true">评 论</el-button>
                        <el-button type="primary" icon="el-icon-back" @click="backArticles">返 回</el-button>
                    </div>
                </div>
            </div>

            <div>
                <el-drawer
                        :visible.sync="drawer"
                        :direction="'btt'"
                        size="50%">
                    <span>
                        <div class="article-detail-comment-body-class">
                            <div class="article-detail-comment-class">
                                <div>
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="想对作者说的..."
                                            v-model="userComment">
                                    </el-input>
                                </div>
                                <div class="submit-comment-class">
                                    <el-button type="primary" @click="submitComment">提 交</el-button>
                                </div>
                            </div>
                        </div>
                    </span>
                </el-drawer>
            </div>
        </div>

        <div class="article-body-class">
            <div class="article-box-body-class">
                <div class="article-box-class" v-for="item in pageArticles">
                    <div>
                        <div class="article-img-class">
                            <img :src="item.img">
                        </div>
                        <div class="article-info-class">
                            <div class="article-tag-class">
                                <div>
                                    <p @click="changeTag(item.tagId)">
                                        {{item.tagValue}}
                                    </p>
                                </div>
                            </div>
                            <div class="article-title-class" @click="showArticle(item.id)">
                                <div>
                                    <h3>{{item.title}}</h3>
                                </div>
                                <div class="article-des-class">
                                    <p>
                                        {{item.description}}
                                    </p>
                                </div>
                            </div>
                            <div class="article-footer-class">
                                <p>
                                    {{item.createTime}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ArticleApi from "@/api/ArticleApi"
    import ArticleCommentApi from "@/api/ArticleCommentApi"

    export default {
        name: "ArticleDetail",
        data() {
            return {
                article: {
                    id: null,
                    title: '',
                    description: '',
                    content: '',
                    likeCount: '',
                    createTime: '',
                    img: '',
                    tagId: null,
                    tagValue: '',
                    comments: [],
                },
                showLike: true,
                drawer: false, /* 是否打开抽屉 */
                userComment: '', /* 用户的评论 */
                pageArticles: []
            }
        },
        created() {
            /* 路由当中获取参数 */
            this.article.id = this.$route.params.id
            this.getArticle(this.article.id)
        }, methods: {
            /* 查看指定的文章 */
            showArticle(id) {
                this.getArticle(id)
                document.body.scrollTop = document.documentElement.scrollTop = 0
            },
            /* 查看指定标签的文章 */
            changeTag(tagId) {
                let path = '/article/' + tagId
                this.$router.push(path)
            },
            /* 获取指定同标签的多个列表 */
            pageArticlesByTag(id, tagId) {
                ArticleApi.pageArticleByTagId(id, tagId).then(resp => {
                    this.pageArticles = resp.data
                })
            },
            /* 获取评论列表 */
            listComments(id) {
                ArticleCommentApi.listComments(id).then(resp => {
                    this.article.comments = resp.data
                })
            },
            /* 用户提交评论 */
            submitComment() {
                if (this.userComment === null || this.userComment === '') {
                    this.$message.info('胡66是不是有首歌叫《空空如也》😉')
                    return
                }
                if (this.userComment.length > 200) {
                    this.$message.info('评论太长了,我的内存都快溢出了😉')
                    return
                }

                ArticleCommentApi.saveArticleComment(this.article.id, this.userComment).then(resp => {
                    this.$message.info(resp.msg)
                    ArticleCommentApi.listComments(this.article.id).then(resp => {
                        this.article.comments = resp.data
                    })
                    this.drawer = false
                    this.userComment = ''
                })
            },
            /* 返回原本文章列表 */
            backArticles() {
                this.$router.back(-1)
            },
            /* 为文章点赞 */
            doLikeCount(id) {
                this.article.likeCount++
                ArticleApi.addLikeCount(id)
            },
            /* 获取文章信息 */
            getArticle(id) {
                ArticleApi.getArticle(id).then(resp => {
                    this.article = resp.data
                    this.pageArticlesByTag(id, this.article.tagId)
                })
            }
        }

    }
</script>

<style>
    .article-detail-header-class {
        height: 500px;
        width: 100%;
        position: relative;
    }

    .article-detail-header-class > img {
        height: 100%;
        width: 100%;
        object-fit: cover; /* 设置图片自适应 */
    }

    .article-detail-info-class {
        margin: 0 auto;
        width: 50%;
    }

    .article-detail-title-class {
        font-size: 1.5em;
        font-weight: 700;
    }

    .article-detail-create-time-class {
        text-align: right;
    }

    .article-detail-description-class {
        text-align: left;
    }

    .article-detail-content-class {
        text-align: left;
    }

    .article-detail-comment-class {
        margin-top: 100px;
        padding: 20px;
        max-height: 500px;
        overflow: auto;
        border-top: 1px solid #fafafa;
        box-shadow: 0 8px 8px #ebeef5;
        text-align: left;
    }

    .article-like-comment-class {
        height: 80px;
        margin-top: 30px;
    }

    .article-detail-comment-body-class {
        margin: 0 auto;
        width: 50%;
    }

    .submit-comment-class {
        margin-top: 20px;
        text-align: right;
    }

    .show-like-class {
        margin-right: 10px;
    }

    .hljs-keyword {
        color: #a878d2;
    }

    .hljs-number {
        color: #d18c4c;
    }

    pre {
        padding: 10px 5px;
        border-radius: 5px;
        background-color: #292c34;
        color: #abb2bf;
        font-size: 16px;
    }


    .article-body-class {
        width: 100%;
        height: 100%;
        margin-top: 15px;
        clear: both;
    }

    .article-box-body-class {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: row;
        box-sizing: border-box;
        flex-wrap: wrap;
        border-radius: 0 0 12px 12px;
    }

    .article-box-class {
        height: 540px;
        width: 390px;
        margin-top: 30px;
        padding: 20px;
    }

    .article-box-class > div {
        border-radius: 5px;
        height: 540px;
        width: 350px;
        margin-top: 20px;
        box-shadow: #ffffff 0 0 0 0;
        transition: margin-top 400ms, box-shadow 400ms;
    }

    .article-box-class > div:hover {
        margin-top: 10px;
        box-shadow: 0 5px 5px #ebeef5;
        transition: margin-top 400ms, box-shadow 400ms;
    }

    .article-img-class {
        height: 250px;
        width: 350px;
        overflow: hidden;
    }

    .article-img-class:hover {
        cursor: pointer;
    }

    .article-box-class > div > div > img {
        border-radius: 10px 10px 0 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .article-tag-class {
        height: 40px;
        width: 100%;
        position: relative;
    }

    .article-info-class {
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        width: 348px;
        height: 290px;
        border-radius: 0 0 8px 8px;
    }

    .article-tag-class > div {
        height: 25px;
        width: 100%;
    }

    .article-tag-class > div {
        cursor: pointer;
    }

    .article-tag-class > div > p {
        background-color: #2ec4b6;
        display: inline-block;
        border-radius: 15px;
        padding: 2px 12px;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
    }

    .article-title-class {
        height: 180px;
        width: 348px;
    }

    .article-title-class:hover {
        cursor: pointer;
    }

    .article-title-class > div {
        width: 80%;
        height: 42px;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .article-title-class > div > h3 {
        height: 30px;
        margin: 0 auto;
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        font-weight: bold;
        text-align: center;
    }

    .article-title-class .article-des-class {
        width: 80%;
        height: 78px;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #303133;
    }
</style>