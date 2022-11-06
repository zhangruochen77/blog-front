<template>
    <div>
        <div class="about-img-class"></div>
        <div class="about-info-class">
            <h1>哈喽,我是{{admin.name}}</h1>
            <p>
                {{admin.description}}
            </p>
            <p>个人邮箱: <b>{{admin.email}}</b></p>
            <div class="about-to-comment-class">
                <p>comment</p>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminApi from "@/api/AdminApi"

    export default {
        name: "About",
        data() {
            return {
                admin: {
                    id: '1',
                    username: 'ruoChen',
                    name: '张若尘',
                    description: '目前是一名大三在读的 java 学习者,很高兴你能来参观我的博客,如果你对我的博客内容有感兴趣的地方和意见都可以通过邮箱或者是评论与我联系',
                    email: '924945268@qq.com',
                    birth: '2002-03-15'
                }
            }
        },
        created() {
            this.getInfo()
        },
        methods: {
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
    .about-img-class {
        border-radius: 10px;
        margin: 0 auto;
        height: 600px;
        width: 75%;
        background: url("../assets/home/fire.jpg") no-repeat center center;
        clear: both;
        box-shadow: #111111 0 0 0 0;
        transition: box-shadow 500ms;
    }

    .about-img-class:hover {
        /* 实现四周阴影效果 */
        box-shadow: #111111 0 0 10px 3px;
        transition: box-shadow 500ms;
    }

    .about-info-class {
        margin: 0 auto;
        height: 200px;
        width: 75%;
    }

    .about-to-comment-class {
        position: absolute;
        left: 46%;
        height: 40px;
        width: 8%;
        border-radius: 5px;
        color: #ffffff;
        font-size: 25px;
        background-color: #614d82;
        box-shadow: #111111 0 0 0 0;
        transition: box-shadow 200ms;

    }

    .about-to-comment-class > p {
        height: 20px;
        margin: 5px auto;
    }

    .about-to-comment-class:hover {
        cursor: pointer;
        box-shadow: #111111 0 0 10px 3px;
        transition: box-shadow 200ms;
    }
</style>