<template>
    <div class="container">
        <!--------------------   发邮件   ----------------->
        <div class="body">
            <div class="left">
                <!-- <div class="hd-btn">
                    <button class="btn-plain" @click="sendNow">立即发送</button>
                    <button class="btn-plain ml20" @click="sendAtTime">定时发送</button>
                </div>-->
                <ul class="form">
                    <li v-show="recipient_show">
                        <span>收件人：</span>
                        <Input
                            class="w500"
                            placeholder="例子:  联系人1, 联系人2, 联系人3"
                            v-model="receivers"
                            @input="recipientUpd"
                        />
                    </li>
                    <li>
                        <span>标题:</span>
                        <Input class="w500" v-model="title" />
                    </li>
                    <li>
                        <Upload style="width:90px;" title="选择图片" @change="upPicChange" />

                        <span class="ml50">
                            <Checkbox
                                label="邮件发至总控"
                                v-model="is_head"
                                @update="isHeadChange"
                            />
                        </span>
                    </li>
                    <li>
                        <span>内容:</span>
                        <!-- <textarea class="textarea" v-model="content"></textarea> -->
                        <div v-show="!dia_show" ref="editor" style="width:100%"></div>
                    </li>
                    <li>
                        <span>发件人：</span>
                        <span class="blue">{{senderInformation}}</span>
                    </li>
                    <li>
                        <button class="btn-plain" @click="sendNow">立即发送</button>
                        <button class="btn-plain ml20" @click="sendAtTime">定时发送</button>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="recent-contact">
                    <div class="head">
                        <span>最近联系人</span>
                        <span>清空</span>
                    </div>
                    <ul class="cont">
                        <li>
                            <span>我在吃火锅55</span>
                            <span>18967200</span>
                            <i
                                class="iconfont icontianjia contact-add"
                                @click="addContact('18967200')"
                            ></i>
                        </li>
                        <li>
                            <span>我在吃火锅</span>
                            <span>6917753</span>
                        </li>
                        <li class="flex">
                            <!-- <Checkbox label="文字文字" /> -->
                            <span>我在吃火锅</span>
                            <span>5252452</span>
                        </li>
                    </ul>
                </div>
                <div class="contact">
                    <div class="head">
                        <span>联系人</span>
                    </div>
                    <div v-show="contact_show" class="cont">
                        <Tree style="width:420px;" class="ml20" :list="tree_list" @change="treeUpd" />
                    </div>
                </div>
            </div>
        </div>
        <Dialog :show.sync="dia_show" title="定时发送">
            <div class="dia-inner">
                <div>
                    <div class="title">选择定时发送的时间:</div>
                    <div class="date-pick mt20">
                        <Select v-model="send_time[0]" :options="year_opt"></Select>
                        <span>年</span>
                        <Select v-model="send_time[1]" :options="month_opt"></Select>
                        <span>月</span>
                        <Select v-model="send_time[2]" :options="date_opt"></Select>
                        <span>日</span>
                        <Select v-model="send_time[3]" :options="hour_opt"></Select>
                        <span>时</span>
                        <Select v-model="send_time[4]" :options="minute_opt"></Select>
                        <span>分</span>
                    </div>
                    <div class="fs15 mt20">
                        <span>该邮件将在</span>
                        <span class="green">{{date_show}}</span>
                        <span>发送到对方</span>
                    </div>
                </div>
                <div class="mt80">
                    <button class="btn-plain-large" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large ml20" @click="sendEmail">发送</button>
                </div>
            </div>
        </Dialog>
    </div>
</template>


<script>
import Tree from '../../commonComponents/Tree.vue'
import E from 'wangeditor'
import { mapState } from 'vuex'
export default {
    name: 'SendEmail',
    components: {
        Tree: Tree
    },
    data() {
        return {
            receivers: '', // 收件人.邮箱
            is_head: false, // 是否发往总控
            recipient_show: true, // 联系人下拉 选择后隐藏收件人
            title: '', // 邮件标题
            pic_data: '', //
            content: '', //邮件内容
            is_timing: 1,
            contact_show: true, // 有收件人就隐藏联系人下拉
            protocol: window.location.protocol,
            tree_list: [
                {
                    label: '厅主群主',
                    child: [{ label: '全部厅主' }]
                },
                {
                    label: '厅主列表',
                    child: [
                        { label: '江湖互娱1' },
                        { label: '江湖互娱2' },
                        { label: '江湖互娱3' },
                        { label: '江湖互娱4' }
                    ]
                }
            ],
            dia_show: false,
            send_time: ['2020', '01', '01', '00', '00', '00'],
            year_opt: [],
            // date_opt: [],
            month_opt: [],
            hour_opt: [],
            minute_opt: [],
            editor: {},
            editorContent: '',
            senderInformation:{},
        }
    },
    computed: {
        ...mapState(['picPrefix']),
        date_opt() {
            let year = this.send_time[0]
            let month = parseInt(this.send_time[1])
            let day_mount = this.getMonthDays(year, month - 1)
            let date_arr = []
            for (var i = 1; i <= day_mount; i++) {
                let item = '0' + i
                date_arr.push(item.slice(-2))
            }
            let opt = this.arrToOpt(date_arr)
            return opt
        },

        date_show() {
            let date =
                this.send_time[0] +
                '-' +
                this.send_time[1] +
                '-' +
                this.send_time[2] +
                ' ' +
                this.send_time[3] +
                ':' +
                this.send_time[4] +
                ':' +
                this.send_time[5]
            let time = new Date(date)
            return time.toLocaleString()
        }
    },
    methods: {
        getSenddetail(){
            this.senderInformation=window.all.tool.getSession('email')
            // console.log('邮箱',this.senderInformation)
        },
        initTime() {
            let date = window.all.tool.formatDate(
                new Date().valueOf() + 1 * 60 * 1000,
                true
            )
            this.send_time = [
                date.slice(0, 4),
                date.slice(5, 7),
                date.slice(8, 10),
                date.slice(11, 13),
                date.slice(14, 16),
                date.slice(17, 18)
            ]
        },
        initForm() {
            this.receivers = ''
            this.is_head = ''
            this.title = ''
            this.editorContent = ''
            this.is_timing = 0
            // this.send_time = ['2020', '01', '01', '00', '00', '00']
            // this.initTime()
            this.editor.txt.clear()
        },
        checkForm() {
            if (!this.is_head && !this.receivers) {
                this.$toast.warning('非总控邮件,收件人不可为空')
                return false
            }
            if (this.title === '') {
                this.$toast.warning('标题不可为空')
                return false
            }
            if (this.editorContent === '') {
                this.$toast.warning('内容不可为空')
                return false
            }
            return true
        },
        sendNow() {
            this.is_timing = 0
            this.sendEmail()
        },
        sendEmail() {
            if (!this.checkForm()) return
            let formateReceiver = function(str = '') {
                if (!str) {
                    return ''
                }
                str = str.replace('，', ',')
                str = str.replace(/\s+/g, '')
                return JSON.stringify(str.split(','))
            }
            let date =
                this.send_time[0] +
                '-' +
                this.send_time[1] +
                '-' +
                this.send_time[2] +
                ' ' +
                this.send_time[3] +
                ':' +
                this.send_time[4] +
                ':00'
            let data = {
                receivers: formateReceiver(this.receivers),
                is_head: this.is_head ? 1 : 0,
                title: this.title,
                content: this.editorContent,
                is_timing: this.is_timing,
                send_time: this.is_timing ? date : ''
            }
            // 如果发给总控,个人发送列表为空.
            if(this.is_head) {
                data.receivers = ''
            }
            data = window.all.tool.rmEmpty(data)
            this.getContent()
            let { url, method } = this.$api.email_send
            this.$http({ method, url, data }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.$toast.success(res && res.message)
                    this.dia_show = false
                    // this.initForm()
                }
            })
        },
        addContact(name) {
            if (!name) return
            if (!this.receivers) {
                this.receivers = name
            } else {
                let receiversArray = this.receivers.split(',')
                if (receiversArray.indexOf(name) === -1) {
                    this.receivers += ',' + name
                }
            }
        },
        sendAtTime() {
            this.is_timing = 1
            this.dia_show = true
            this.initTime()
        },
        recipientUpd(val) {
            this.contact_show = !val
            if (val) {
                val = val.replace('，', ',')
                val = val.replace(/[^\d,]/g, '')
                this.$nextTick(() => {
                    this.receivers = val
                })
            }
        },
        upPicChange(e) {
            let pic = e.target.files[0]
            let basket = 'email/sendemail/uploads'
            let formData = new FormData()
            formData.append('file', pic, pic.name)
            formData.append('basket', basket)
            let { url, method } = this.$api.update_picture_database
            let data = formData
            let headers = { 'Content-Type': 'multipart/form-data' }
            this.$http({ method, url, data, headers }).then(res => {
                if (res && res.code == '200') {
                    this.pic_data = res.data.path
                    let imgHtml = `<img src="${this.picPrefix}${this.pic_data}" alt="图片加载失败">`
                    this.editor.txt.append(imgHtml)
                }
            }) 
            // let reader = new FileReader()
            // reader.readAsDataURL(file)
            // reader.onerror = function() {
            //     return
            // }
            // reader.onload = function() {
            //     // self.src[index] = this.result
            //     self.pic_data = this.result
            // }
        },
        // 是否发给总控
        isHeadChange(val) {
            this.recipient_show = !val
            // if(val) {
            //     this.receivers = ''
            // }
        },
        clearPic() {
            this.pic_data = ''
        },
        // 数组变成 select 的 opt
        arrToOpt(arr) {
            let opt = []
            opt = arr.map(year => {
                return { label: year, value: year }
            })
            return opt
        },
        //  获得某月的天数
        getMonthDays(year, myMonth) {
            var monthStartDate = new Date(year, myMonth, 1)
            var monthEndDate = new Date(year, myMonth + 1, 1)
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
            return days
        },
        // 初始化时间下拉 options
        initOpts() {
            // 年
            let year_arr = [
                '2020',
                '2021',
                '2022',
                '2023',
                '2024',
                '2025'
            ]
            this.year_opt = this.arrToOpt(year_arr)
            // 月
            let month_arr = [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12'
            ]
            this.month_opt = this.arrToOpt(month_arr)

            // 日 根据月份变化, 在computed中

            // 时
            let hour_arr = []
            for (var i = 0; i < 24; i++) {
                let item = '0' + i
                hour_arr.push(item.slice(-2))
            }
            this.hour_opt = this.arrToOpt(hour_arr)
            // 分
            let minute_arr = []
            for (var i = 0; i < 60; i++) {
                let item = '0' + i
                minute_arr.push(item.slice(-2))
            }
            this.minute_opt = this.arrToOpt(minute_arr)
        },
        treeUpd(bool, idx, list) {
            console.log('list: ', list)
            console.log('bool: ', bool)
            // 获取是否有选中项
            let have_checked = list.some(item => {
                //遍历子项 查看是否有选中项
                if (item.child) {
                    let child_bool = item.child.some(child => {
                        return child.checked
                    })
                    if (child_bool) return true
                } else {
                    return item.checked
                }
            })
            if (have_checked) {
                this.recipient_show = false
            } else {
                this.recipient_show = true
            }
        },
        getContent: function() {
            console.log('this.editorContent: ', this.editorContent)
        }
    },
    created() {
        this.initOpts()
    },
    mounted() {
        this.getSenddetail();
        this.receivers = this.$route.query && this.$route.query.platform_sign

        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.menus = [
            'head', // 标题
            'bold', // 粗体
            'italic', // 字号
            'underline', // 斜体
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'image', // 插入图片
            'undo' // 撤销
        ]

        this.editor.customConfig.onchange = html => {
            this.editorContent = html
        }
        // this.editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        // https://www.kancloud.cn/wangfupeng/wangeditor3/335782  上传到图片 文档
        this.editor.create()
        this.editor.txt.append()
        let editorDom = this.$refs.editor || {}
        let header = editorDom.children[0] || {}
        header.style.padding = '6px 0'
    }
}
</script>

<style scoped>
.body {
    display: flex;
    justify-content: space-around;
}
.left {
    /* width: 560px; */
    width: 43rem;
    min-width: 560px;
    height: 100%;
}
.hd-btn {
    display: flex;
    background: #f2f2f2;
    padding: 10px;
}
.w500 {
    /* width: 500px; */
    width: 40rem;
    min-width: 500px;
}
.p10 {
    padding: 10px;
}
.form > li {
    display: flex;
    align-items: baseline;
    margin-top: 20px;
}
.form > li > span:first-child {
    width: 4.5em;
}
.li-pic {
    display: flex;
    /* border: 1px solid #000; */
    align-items: center;
}
/* 图片 */
.img-show {
    max-width: 250px;
    max-height: 100px;
    margin-left: 20px;
}
.pic-show {
    user-select: text;
}
.form .textarea {
    width: 500px;
    height: 330px;
}
.ml10 {
    margin-left: 10px;
}

.right {
    width: 500px;
    margin-left: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    user-select: text;
}
/* 最近联系人 */
.right .recent-contact {
    height: 185px;
    overflow: auto;
}
.right .recent-contact .head,
.right .contact .head {
    padding: 12px 10px;
    font-size: 16px;
    /* color: #4c8bfd; */
    background: #f2f2f2;
    border-bottom: 1px solid #ccc;
}
.right .contact .head {
    border-top: 1px solid #ccc;
}
.recent-contact .head span:nth-child(2) {
    font-size: 14px;
    margin-left: 160px;
    text-decoration: underline;
    color: #4c8bfd;
    cursor: pointer;
}
.recent-contact .cont {
    padding-left: 30px;
}
.recent-contact .cont > li {
    margin-top: 10px;
    white-space: nowrap;
}
.recent-contact .cont > li > span:first-child {
    display: inline-block;
    width: 130px;
}

/* 联系人 */
/* .contact {
    border: 1px solid red;
} */
.contact .cont {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
}
.contact-add:hover {
    color: #4c8bfd;
    cursor: pointer;
}
.dia-inner {
    position: relative;
    min-width: 600px;
    height: 320px;
    padding-top: 80px;
    z-index: 200002;
}
.dia-inner .title {
    font-size: 15px;
}
.fs15 {
    font-size: 15px;
}
.mt80 {
    margin-top: 8s0px;
    text-align: right;
}
/* .ml20 {
    margin-left: 20px;
} */
.dia-inner .date-pick {
    display: flex;
    align-items: center;
}
.dia-inner .date-pick span {
    margin: 0 5px;
}
</style>
