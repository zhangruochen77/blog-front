<template>
    <div>
        <div class="header-class">
            <Header></Header>
        </div>
        <div>
<!--            <ArticleDetail></ArticleDetail>-->
            <!-- 默认根路径也是展示 home -->
            <div v-if="this.$route.path === '/'">
                <Home></Home>
            </div>
            <div v-else>
                <router-view/>
            </div>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import Header from "@/views/Header"
    import Footer from "@/views/Footer"
    import Home from "@/components/Home"
    import ArticleDetail from "@/components/ArticleDetail";

    export default {
        name: "Main",
        components: {ArticleDetail, Home, Footer, Header},
        data() {
            return {
                currentPath: '/'  // 设置展示路径 默认为根路径
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
            }
        }
    }
</script>

<style scoped>
    .header-class {
        height: 80px;
        width: 100%;
    }
</style>
