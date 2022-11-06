<template>
    <div class="header-class">
        <div>
            <div class="nav-header-class">
                <img src="../assets/header/header_icon.jpg" style="height: 50px; width: 50px;">
            </div>
            <div class="nav-class" @click="updatePath('/home')">Home</div>
            <div class="nav-class" @click="updatePath('/article')">Article</div>
            <div class="nav-class" @click="updatePath('/life')">Life</div>
            <div class="nav-class" @click="updatePath('/about')">About</div>
            <div class="nav-comment-class" @click="updatePath('/comment')" title="comment">
                <img src="../assets/header/comment_icon.png" alt="评论">
            </div>
            <!--            <div>-->
            <!--                <audio autoplay controls loop>-->
            <!--                    <source src="../assets/music/space-x.mp3" type='audio/ogg'>-->
            <!--                </audio>-->
            <!--            </div>-->
            <div title="github">
                <a href="https://github.com/zhangruochen77" class="github-corner" aria-label="View source on GitHub">
                    <svg width="80" height="80" viewBox="0 0 250 250"
                         style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
                         aria-hidden="true">
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                              fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                              fill="currentColor" class="octo-body"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminApi from "@/api/AdminApi"

    export default {
        name: "Header",
        data() {
            return {
                github: 'https://github.com/zhangruochen77'
            }
        },
        created() {

        },
        methods: {
            /* 获取用户数据 并做缓存 */
            getInfo() {
                let adminStr = window.sessionStorage.getItem('admin')
                if (adminStr !== null && adminStr.length > 0) {
                    let admin = JSON.parse(adminStr)
                    this.github = admin.github
                } else {
                    AdminApi.getInfo().then(resp => {
                        this.github = resp.data.github
                        window.sessionStorage.setItem("admin", JSON.stringify(resp.data))
                    })
                }
            },
            /* 更新路径 根据指定路径进行跳转操作 */
            updatePath(path) {
                this.$router.replace(path)
            }
        }
    }
</script>

<style scoped>
    .header-class {
        width: 100%;
        height: 80px;
        font-size: 20px;
        color: #071f36;
        text-align: center;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
        display: inline;
    }

    .nav-header-class {
        height: 50px;
        width: 50px;
        border-radius: 25px;
        border: 50px;
        float: left;
        padding-left: 20%;
        padding-top: 10px;
    }

    .nav-class {
        float: left;
        margin-left: 50px;
        cursor: pointer;
        margin-top: 30px;
    }

    .nav-class:hover {
        color: #498bc2;
        transition: color 500ms;
    }

    .nav-comment-class {
        float: right;
        margin-right: 140px;
        margin-top: 30px;
        cursor: pointer;
    }


    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {
        0%, 100% {
            transform: rotate(0)
        }
        20%, 60% {
            transform: rotate(-25deg)
        }
        40%, 80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width: 500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }

        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }
</style>