<template>
    <div>
        <div class="about-img-class"></div>
        <div class="about-info-class">
            <h1>哈喽,我是ruo chen</h1>
            <p>
                目前是一名大三在读的 java 学习者,很高兴你能来参观我的博客,如果你对我的博客内容有感兴趣的地方和意见都可以通过邮箱或者是评论与我联系
            </p>
            <p>个人邮箱: <b>924945268@qq.com</b></p>
            <div class="about-to-comment-class">
                <p>comment</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About"
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