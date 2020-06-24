<template>
    <div class="cont email-detail">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="goBack">返回</button>
                    <button v-if="!isSend" class="btn-blue ml10" @click="reply">回复</button>
                    <button class="btn-red ml10" @click="delClick">删除</button>
                </li>
            </ul>
            <div class="right">
                <span class="page-indicate">{{list_idx}}/{{total}}</span>
                <button :class="[list_idx>1?'btn-plain':'btn-disabled']" @click="prevEmail">上一封</button>
                <button :class="[list_idx<total?'btn-plain':'btn-disabled']" @click="nextEmail">下一封</button>
            </div>
        </div>
        <div class="body">
            <div class="top">
                <ul>
                    <li>
                        <span class="head">{{content.title}}</span>
                    </li>
                    <li>
                        <span>发件人:</span>
                        <span>{{content.sender}}</span>
                    </li>
                    <li>
                        <span>发送时间:</span>
                        <span>{{content.created_at}}</span>
                    </li>
                    <li v-if="isSend">
                        <span>收件人:</span>
                        <div>
                            <span
                                class="ml10"
                                v-for="(item, index) in (content.receivers||[])"
                                :key="index"
                            >{{item}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 内容 -->
            <div class="content">
                <span class="p" v-html="$xss(content.content)"></span>
            </div>
        </div>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除选中邮件"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>


<script>
export default {
    props: {
        isSend: Boolean, // 是否是已发邮件(true: 已发邮件, false:收件箱)
        row: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            content: {
                title: '', //标题
                sender: '', // 发件人
                created_at: '', // 发送时间
                receivers: [], // 收件人
                content: '',
            },
            list_idx: 1, // 第几个
            content_obj: {}, // 已经读取过则不再读取
            receive_id_obj: {}, // 根据下标保存 其id
            pageNo: 1,
            pageSize: 25,
            total: 0,

            mod_show: false,
        }
    },
    methods: {
        reply() {
            this.$router.push({
                path: '/email/sendemail',
                query: {
                    platform_sign: this.content.platform_sign
                }
            })
        },
        delClick() {
            this.mod_show = true
        },
        goBack() {
            this.$emit('close')
        },

        getList() {
            if (this.isSend) {
                this.getSentList()
            } else {
                if(this.receive_id_obj[this.list_idx]) {
                    this.getReceiveList(this.receive_id_obj[this.list_idx])
                }else {
                    this.useIndexFindId()
                }
               
            }
        },
        // 确认删除
        modConf() {
            // console.log('🍣 this.isSend: ', this.isSend);
            // console.log('🌯 this.content.id: ', this.content.id);
            
            let id = this.isSend ? this.content.id : this.content.email_id
            let data = {
                email_id: JSON.stringify([id])
            }
            let url
            let method
            if(this.isSend) {
                url = this.$api.email_sent_del.url
                method = this.$api.email_sent_del.method
            } else {
                url = this.$api.email_received_del.url
                method = this.$api.email_received_del.method
            }
            this.$http({ method, url, data }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.$toast.success(res.message)
                    this.mod_show = false
                    this.$emit('close','getList')
                }
            })
        },
        // 根据收件箱index 序列找到id (需要用读邮件接口,方便知道邮件已读)
        useIndexFindId() {
            let para = {
                pageSize: this.pageSize,
                page: Math.ceil(this.list_idx / this.pageSize)
            }
            let params = window.all.tool.rmEmpty(para)
            let { url, method } = this.$api.email_received

            this.$http({ method, url, params }).then(res => {
                if (res && res.code === '200') {
                    let list = res.data && res.data.data
                    list.forEach((item, index) => {
                        // 后台数据的第几个,存入content_obj 中.
                        let idx = (para.page - 1) * this.pageSize + index + 1
                        // this.content_obj[String(idx)] = item
                        // console.log('🍗 item: ', item);
                        this.receive_id_obj[idx] = item.email_id
                        // console.log('😘 this.receive_id_obj[idx]: ', this.receive_id_obj[idx]);
                    })
                    this.getReceiveList(this.receive_id_obj[this.list_idx])
                }
            })
        },
        // 获取 收件箱
        getReceiveList(email_id) {
            // console.log('获取');
            let data = {
                id: email_id,
            }
            let { url, method } = this.$api.email_read_list
            this.$http({ method, url, data }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200'&&res.data) {
                    this.content = res.data
                    this.content_obj[this.list_idx] = res.data
                }
            })
        },
        // 获取 已发邮件
        getSentList() {
            let para = {
                pageSize: this.pageSize,
                page: Math.ceil(this.list_idx / this.pageSize)
            }
            let params = window.all.tool.rmEmpty(para)
            let { url, method } = this.$api.email_sent
            this.$http({ method, url, params }).then(res => {
                if (res && res.code === '200') {
                    let list = res.data && res.data.data

                    list.forEach((item, index) => {
                        // 后台数据的第几个,存入content_obj 中.
                        let idx = (para.page - 1) * this.pageSize + index + 1
                        // console.log('idx: ', idx);
                        this.content_obj[String(idx)] = item
                    })
                    this.content = this.content_obj[this.list_idx] || {}
                }
            })
        },
        prevEmail() {
            if (this.list_idx <= 1) return
            this.list_idx--

            // 判断是否在其中, 在就获取内部, 2. 不在就getList
            this.content = {}
            let email = this.content_obj[this.list_idx]||{}
            if (Object.keys(email).length) {
                this.content = this.content_obj[this.list_idx]
            } else {
                this.getList()
            }
        },
        nextEmail() {
            // 判断是否在其中, 在就获取内部, 2. 不在就getList
            if (this.list_idx >= this.total) return
            this.content = {}
            this.list_idx++
            if (this.content_obj[this.list_idx]) {
                this.content = this.content_obj[this.list_idx]
            } else {
                this.getList()
            }
        }
    },
    mounted() {
        this.total = this.row.total
        // 这是后端数据的第几条
        this.list_idx = (this.row.pageNo - 1) * this.row.pageSize + this.row.index + 1
        // 1. 已发邮件
        if (this.isSend) {
            this.content = this.row
            // console.log('😊  this.content: ',  this.content);

            // 2. 收件箱
        } else {
            // this.content = this.row
            console.log('this.row: ', this.row);
            this.receive_id_obj[this.list_idx] = this.row.email_id
            this.getReceiveList(this.row.email_id) // 触发读邮件
        }
        
    }
}
</script>

<style scoped>
/* p10 ml10 全局css样式 App.vue中 */
.email-detail {
    height: 100%;
    /* min-height: 600px; */
    /* width: 100%; */
    padding: 10px;
    border: 1px solid #4c8bfd;
    overflow: auto;
    
}
.btn-disabled {
    padding: 4px 15px;
    color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
}
.page-indicate {
    vertical-align: center;
    line-height: 28px;
    margin-right: 5px;
}
.body {
    /* max-height: 50%; */
    min-height: 600px;
    padding: 30px 20px;
    margin-top: 20px;
    background: #f2f2f2;
    overflow: auto;
}
.body .top {
    color: #4c8bfd;
}
.top > ul > li {
    margin-top: 8px;
}
.body .top .head {
    font-size: 16px;
    font-weight: bold;
}
.content {
    margin-top: 50px;
    /* height: 770px; */
    overflow: auto;
}
.p {
    text-indent: 2em;
}
</style>
