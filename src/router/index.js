import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/Main"
import Home from "@/components/Home"
import About from "@/components/About"
import Comment from "@/components/Comment"
import Life from "@/components/Life"
import Article from "@/components/Article"
import ArticleDetail from "@/components/ArticleDetail";

Vue.use(VueRouter)

const routes = [
    {
        // 默认去向主页面
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                /* 进入博客展示信息的主页面 */
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                /* 进入个人信息展示界面 */
                path: 'about',
                name: 'about',
                component: About
            },
            {
                /* 文章信息 */
                path: 'article',
                name: 'article',
                component: Article
            },
            {
                /* 评论信息 */
                path: 'comment',
                name: 'comment',
                component: Comment
            },
            {
                /* 个人生活数据信息 */
                path: 'life',
                name: 'life',
                component: Life
            },
            {
                /* 文章详情界面 */
                path: 'articleDetail/:id',
                name: 'articleDetail',
                component: ArticleDetail
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
