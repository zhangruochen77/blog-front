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
        <div class="article-header-class">
            <p class="article-total-class">100 articles waiting for you</p>
            <p class="article-view-class">total: {{admin.totalView}} today: {{admin.todayView}}</p>
            <img src="../assets/article/fire.jpg">
        </div>
        <div class="article-body-class">

            <div class="article-box-body-class">
                <div class="article-box-class" v-for="item in pageArticles.articles">
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
            <div class="article-page-class">
                <div class="block">
                    <el-pagination
                            layout="prev, pager, next"
                            :total="pageArticles.total"
                            @current-change="changePage">
                    </el-pagination>
                </div>
                <div>
                    <div class="tag-box-class">
                        <el-tag type="success" class="tag-class"
                                v-for="tag in tags" @click="changeTag(tag.id)">
                            {{tag.value}}
                        </el-tag>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import AdminApi from "@/api/AdminApi"
    import ArticleApi from "@/api/ArticleApi"
    import TagApi from "@/api/TagApi";

    export default {
        name: "Article",
        data() {
            return {
                admin: {
                    id: '1',
                    username: 'ruoChen',
                    name: '张若尘',
                    description: '目前是一名大三在读的 java 学习者,很高兴你能来参观我的博客,如果你对我的博客内容有感兴趣的地方和意见都可以通过邮箱或者是评论与我联系',
                    email: '924945268@qq.com',
                    birth: '2002-03-15',
                    todayView: 0,
                    totalView: 0
                },
                pageArticles: {
                    articles: [], /* 文章列表 */
                    total: 0
                },
                tags: [], /* 标签列表 */
                tagId: null
            }
        },
        created() {
            let tagId = this.$route.params.tagId;
            this.getInfo()
            if (tagId == 0) {
                this.pageListArticles(1, null)
            } else {
                this.pageListArticles(1, tagId)
            }
            this.getTags()
        },
        methods: {
            /* 更改 tag */
            changeTag(id) {
                this.tagId = id
                this.pageListArticles(1, id)
            },
            /* 获取所有标签信息 */
            getTags() {
                TagApi.getTags().then(resp => {
                    this.tags = []
                    this.tags.push({id: null, value: '全部'})
                    resp.data.forEach(t => {
                        this.tags.push(t)
                    })
                })
            },
            /* 页码发生改变 */
            changePage(page) {
                this.pageListArticles(page, null)
            },
            /* 展示文章信息 */
            showArticle(id) {
                let path = '/articleDetail/' + id
                this.$router.push(path)
            },
            /* 分页获取文章列表信息 */
            pageListArticles(page = 1, tagId = null) {
                ArticleApi.pageListArticles(page, 9, tagId).then(resp => {
                    this.pageArticles.articles = resp.data.records
                    this.pageArticles.total = resp.data.total
                    console.log(resp.data.total)
                })
            },
            /* 获取用户信息 */
            getInfo() {
                let adminStr = window.sessionStorage.getItem('admin')
                if (adminStr !== null && adminStr.length > 0) {
                    this.admin = JSON.parse(adminStr)
                } else {
                    AdminApi.getInfo().then(resp => {
                        this.admin = resp.data
                        window.sessionStorage.setItem("admin", JSON.stringify(resp.data))
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .article-header-class {
        height: 500px;
        width: 100%;
        position: relative;
    }

    .article-header-class > img {
        height: 100%;
        width: 100%;
        object-fit: cover; /* 设置图片自适应 */
    }

    .article-total-class {
        position: absolute;
        left: 45%;
        top: 38%;
        font-size: 20px;
        color: #faf9f9;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
    }

    .article-view-class {
        position: absolute;
        right: 1%;
        top: 4%;
        font-size: 20px;
        color: #faf9f9;
        font-weight: 700;
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

    .article-footer-class {
        border-top: 1px solid #ebeef5;
    }

    .article-footer-class > p {
        color: #959292;
        font-size: 16px;
    }

    .article-page-class {
        margin: 15px auto;
        height: 40px;
        width: 70%;
    }

    .tag-box-class {
        text-align: left;
    }

    .tag-class {
        margin-left: 30px;
    }

    .tag-class:hover {
        cursor: pointer;
    }

</style>