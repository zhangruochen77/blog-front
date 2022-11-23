<template>
    <div>
        <div class="life-header-class">
            <img src="../assets/home/rabbit.jpg">
        </div>
        <div class="life-comment-body-class">
            <div class="life-detail-comment-class">
                <el-timeline>
                    <el-timeline-item :timestamp="c.createTime" placement="top" v-for="c in comments">
                        <el-card>
                            <p>游客: {{c.content}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
            <div>
                <div class="comment-body-class">
                    <div class="comment-class">
                        <div>
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="想对作者说的..."
                                    v-model="commentInfo">
                            </el-input>
                        </div>
                        <div class="submit-comment-class">
                            <el-button type="primary" @click="submitComment">留 言</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentApi from "@/api/CommentApi"
    import {Loading} from 'element-ui'

    export default {
        name: "Comment",
        data() {
            return {
                commentInfo: '',
                comments: [],
                time: 0,
            }
        },
        created() {
            const Loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })

            this.getComments()
            let timeStr = window.sessionStorage.getItem('time')
            if (timeStr !== null) {
                this.time = JSON.parse(timeStr)
                setTimeout(() => {
                    this.time--
                    window.sessionStorage.setItem('time', JSON.stringify(this.time))
                }, 120000)
            }

            Loading.close()
        }, methods: {
            /* 提交评论 */
            submitComment() {
                if (this.commentInfo === null || this.commentInfo === '') {
                    this.$message.info('胡66是不是有首歌叫《空空如也》😉')
                    return
                }
                if (this.commentInfo.length > 200) {
                    this.$message.info('评论太长了,我的内存都快溢出了😉')
                    return
                }
                if (this.time > 3) {
                    this.$message.info('评论太频繁了,我拿什么抵抗啊')
                    return
                }

                CommentApi.saveComment(this.time, this.commentInfo).then(resp => {
                    this.$message.info(resp.msg)
                    this.time++
                    this.commentInfo = ''
                    window.sessionStorage.setItem('time', JSON.stringify(this.time))
                    setTimeout(() => {
                        this.time--
                        window.sessionStorage.setItem('time', JSON.stringify(this.time))
                    }, 120000)
                    this.getComments()
                })
            },
            /* 获取所有的评论 */
            getComments() {
                CommentApi.getAllComments().then(resp => {
                    this.comments = resp.data
                })
            }
        }
    }
</script>

<style scoped>
    .life-header-class {
        height: 500px;
        width: 100%;
        position: relative;
    }

    .life-header-class > img {
        height: 100%;
        width: 100%;
        object-fit: cover; /* 设置图片自适应 */
    }

    .life-comment-body-class {
        margin: 20px auto;
        width: 95%;
        max-width: 600px;
    }

    .life-detail-comment-class {
        margin-top: 100px;
        padding: 20px;
        max-height: 500px;
        overflow: auto;
        border-top: 1px solid #fafafa;
        box-shadow: 0 8px 8px #ebeef5;
        text-align: left;
    }

    .comment-body-class {
        margin: 10px auto;
    }

    .comment-class {

    }

    .submit-comment-class {

    }
</style>