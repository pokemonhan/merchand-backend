<template>
    <div class="container">
        <div class="hd-btn">
            <button
                v-for="(item, index) in ['PC网页','H5手机','手机APP']"
                :key="index"
                :class="['head-btns',head_act_btn===index?'btn-blue':'btn-plain']"
                @click="head_act_btn=index"
            >{{item}}</button>
        </div>
        <div class="filter search">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="add">添加公告</button>
                </li>
                <li>
                    <span>公告标题</span>
                    <Input style="width:150px;" v-model="filter.title" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                </li>
            </ul>
        </div>
        <div class="table" style="margin-top:20px;">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>
                        <img width="120" :src="row.a2" alt="无图片" />
                    </td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>
                        <Switchbox v-model="row.a5" @update="switchUpdate(row)" />
                    </td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>
                        <button class="btn-blue" @click="edit(row)">编辑</button>
                        <button class="btn-red" @click="del(row)">删除</button>
                    </td>
                </template>
            </Table>
        </div>
        <!-- 添加公告 , 编辑公告 -->
        <Dialog :show.sync="dia_show" :title="is_edit?'编辑公告':'添加公告'">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>公告名称</span>
                            <Input
                                class="w250"
                                placeholder="最多5个字"
                                v-model="form.name"
                                maxlength="5"
                            />
                        </li>

                        <li>
                            <span>选择图片</span>
                            <div class="upload-pic">
                                <Upload width="170" title="App图片上传" @change="upPicChange($event)" />
                                <button style="width:70px;" class="btn-blue" @click="preview()">预览</button>
                            </div>
                        </li>
                        <li>
                            <span>跳转链接</span>
                            <Input class="w250" v-model="form.link" />
                        </li>
                        <li>
                            <span>开始时间</span>
                            <Date style="width:250px;" v-model="form.dates[0]" />
                        </li>
                        <li>
                            <span>结束时间</span>
                            <Date style="width:250px;" v-model="form.dates[1]" />
                        </li>
                        <li>
                            <span>状态选择</span>
                            <Radio
                                class="radio-left"
                                label="开"
                                :value="form.status"
                                val="on"
                                v-model="form.status"
                            />
                            <Radio
                                class="radio-right"
                                label="关"
                                :value="form.status"
                                val="off"
                                v-model="form.status"
                            />
                        </li>
                    </ul>
                    <div class="form-buttons">
                        <button class="btn-plain-large" @click="dia_show=false">取消</button>
                        <button class="btn-blue-large ml50">保存</button>
                    </div>
                </div>
            </div>
        </Dialog>
         <!-- 图片预览 -->
        <Dialog :show.sync="pic_dia_show" title="预览图片">
            <img width="800" :src="form.pic_src" alt="没有图片" />
        </Dialog>
         <Modal
            :show.sync="show_del_modal"
            title="删除公告"
            content="是否删除该公告"
            @confirm="delConfirm"
        ></Modal>
    </div>
</template>


<script>
export default {
    props: {},
    data() {
        return {
            head_act_btn: 0,
            filter: {
                title: ''
            },
            headers: [
                '公告标题',
                '图片',
                '发布时间',
                '结束时间',
                '状态',
                '发布人',
                '最后跟新人',
                '最后跟新时间',
                '操作'
            ],
            list: [
                {
                    a1: 'aD201909201252',
                    a2:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxdxCKUXf9x4R6LejYNviNYIIxeoKoQ8N752y9QTT-hwkc4c1L',
                    a3: '4561234',
                    a4: '13256689796',
                    a5: '1',
                    a6: '微信充值',
                    a7: '100',
                    a8: '99.9',
                    a9: '已支付',
                    a10: '2019/09/20 12:25:20',
                    a11: '2019/09/20 12:25:20',
                    a12: '2019/09/20 12:25:20'
                },
                {
                    a1: 'aD201909201252',
                    a2: require('../../../assets/image/announce/sysAnnounce.png'),
                    a3: '4561234',
                    a4: '13256689796',
                    a5: '0',
                    a6: '微信充值',
                    a7: '100',
                    a8: '99.9',
                    a9: '已支付',
                    a10: '2019/09/20 12:25:20',
                    a11: '2019/09/20 12:25:20',
                    a12: '2019/09/20 12:25:20'
                }
            ],
            form: {
                name: '',
                link: '',
                pic_src:'',
                dates: [],
                status: 'on'
            },
            dia_show: false,
            is_edit: false,
            pic_dia_show: false,
            // form_pic_src: ''
            show_del_modal: false,    // 删除公告
        }
    },
    methods: {
        switchUpdate(row) {
            // console.log('row: ', row);
        },
         initForm() {
            this.form ={
                name: '',
                link: '',
                dates: [],
                status: 'on'
            }
            this.form.pic_src = ''
        },
        add() {
            this.dia_show = true
            this.is_edit = false
            this.initForm()
        },
        edit() {
            this.dia_show = true
            this.is_edit = true
            this.initForm()
        },
        del(){
            this.show_del_modal = true
        },
        upPicChange(e) {
            let file = e.target.files[0]
            let self = this
            let date = new FormData()
            date.append('uploadimg', file)
            console.log('文件的内容', date)
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onerror = function() {
                return
            }
            reader.onload = function() {
                // self.src[index] = this.result
                self.form.pic_src = this.result
            }
        },
        preview(index) {
            this.pic_dia_show = true
        },
        delConfirm(){
            console.log(this.is_edit);
        }
    },
    created() {
        this.list = this.list.map(item => {
            if (item.a5 === '1') {
                item.a5 = true
            } else {
                item.a5 = false
            }
            return item
        })
    },
    mounted() {
        let self = this
        setTimeout(() => {
            self.list = self.list.map(item => {
                item.a5 = false
                return item
            })
            self.list = self.list
        }, 3000)
    }
}
</script>

<style scoped>
/* .filter 为全局样式 App.vue中  */
.container .search {
    margin-top: 10px;
    padding: 10px;
}
.head-btns:not(:first-child){
    margin-left: 10px;
}
.w250 {
    width: 250px;
}
.dia-inner {
    width: 700px;
}
.dia-inner > div {
    width: 330px;
    margin: 0 auto;
    /* border: 1px solid #000; */
}
.form > li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form > li:nth-child(2) {
    margin-top: 10px;
}
/* .form > li:nth-child(3) {
    margin-top: 0;
} */
.form > li > span:first-child {
    min-width: 5em;
    /* font-weight: bolder; */
    /* margin-right: 8px; */
}
.upload-pic {
    display: flex;
    /* border: 1px solid #000; */
}
.radio-right {
    margin-left: 50px;
}
.form-buttons {
    margin-top: 40px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
</style>
