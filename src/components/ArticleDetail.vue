<template>
    <div>
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
                userComment: '' /* 用户的评论 */
            }
        },
        created() {
            /* 路由当中获取参数 */
            this.article.id = this.$route.params.id
            this.getArticle(this.article.id)
        }, methods: {
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
                }
                if (this.userComment.length > 200) {
                    this.$message.info('评论太长了,我的内存都快溢出了😉')
                }
                console.log(this.userComment)
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
</style>