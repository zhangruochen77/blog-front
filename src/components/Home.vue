<template>
    <div class="home-class">
        <h1 class="name-class">张若尘</h1>
        <p class="welcome-class">朋友你好 欢迎来到我的世界</p>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .home-class {
        height: 800px;
        width: 100%;
        background: url("../assets/home/dark.jpg") no-repeat center center;
        animation: frams 30s infinite; /* 调用图片轮换 */
        clear: both;
    }

    /* 图片轮换 */
    @keyframes frams {
        0% {
            background-image: url("../assets/home/dark.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat
        }
        25% {
            background-image: url("../assets/home/boat-girl.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat
        }
        50% {
            background-image: url("../assets/home/car-girl.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat
        }
        75% {
            background-image: url("../assets/home/sun-girl.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat
        }
    }

    .name-class {
        width: 10%;
        text-align: center;
        text-shadow: 1px 1px 0 #ddd, -2px 2px 0 #c8c8c8, -3px 3px 0 #ccc, -4px 4px 0 #b8b8b8, -4px 4px 0 #bbb, 0 1px 1px rgb(0 0 0 / 40%), 0 2px 2px rgb(0 0 0 / 30%), -1px 3px 3px rgb(0 0 0 / 20%), -1px 5px 5px rgb(0 0 0 / 10%), -2px 8px 8px rgb(0 0 0 / 10%), -2px 13px 13px rgb(0 0 0 / 10%);
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        font-weight: bold;
        position: absolute;
        left: 45%;
        top: 30%;
        color: #3d4b68;
        transition: color 2s;
    }

    .name-class:hover {
        color: #ffffff;
        transition: color 2s;
    }

    .welcome-class {
        width: 10%;
        text-align: center;
        display: block;
        font-size: 14px;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        font-weight: bold;
        position: absolute;
        left: 45%;
        top: 40%;
        color: #faf9f9;
    }
</style>