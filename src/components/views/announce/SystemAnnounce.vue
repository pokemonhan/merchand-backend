<template>
    <div class="container">
        <!-------------------- 系统公告 ----------------->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="add">添加公告</button>
                </li>
                <li>
                    <span>公告标题</span>
                    <Input style="width:150px;" v-model="filter.header" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                </li>
            </ul>
            <div class="right">
                <i class="iconfont iconjinggao1-"></i>
                <div class="pic">
                    <span class="head-2">前端页面: 消息-系统消息</span>
                    <img
                        class="image"
                        width="600"
                        src="../../../assets/image/announce/sysAnnounce.png"
                        alt="loading"
                    />
                </div>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>
                        <img width="40" :src="row.a2[0]" alt="加载中" />
                        <img width="40" :src="row.a2[1]" alt="加载中" />
                        <img width="40" src="../../../assets/image/user/neko.png" alt="加载中" />
                    </td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>
                        <Switchbox v-model="row.a7" />
                    </td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a7}}</td>
                    <td>
                        <button class="btns-blue" @click="edit">编辑</button>
                        <button class="btns-red" @click="show_conf=true">删除</button>
                    </td>
                </template>
            </Table>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div>
                    <ul class="form">
                        <li>
                            <span>公告标题</span>
                            <Input class="w250" placeholder="最多5个字" v-model="form.title" maxlength="5" />
                        </li>

                        <li>
                            <span>公告内容</span>
                            <div class="upload-btn">
                                <div>
                                    <Upload width="170" title="App图片上传" @change="upPicChange($event,0)" />
                                    <button style="width:70px;" class="btn-blue" @click="preview(0)">预览</button>
                                </div>
                               
                                <div>
                                    <Upload width="170" title="PC图片上传" @change="upPicChange($event,1)" />
                                    <button style="width:70px;" class="btn-blue" @click="preview(1)">预览</button>
                                </div>
                               
                                <div>
                                    <Upload width="170" title="H5图片上传" @change="upPicChange($event,2)" />
                                    <button style="width:70px;" class="btn-blue" @click="preview(2)">预览</button>
                                </div>
                               
                            </div>
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
        <Dialog :show.sync="pic_dia_show" title="预览图片">
             <img class="max-w800" :src="src[curr_pic_idx]" alt="未选择图片" />
        </Dialog>
    </div>
</template>


<script>
export default {
    data() {
        return {
            filter: {
                header: ''
            },
            headers: [
                '公告标题',
                '图片',
                '设备',
                '发布时间',
                '结束时间',
                '状态',
                '发布人',
                '最后更新人',
                '最后跟新时间',
                '操作'
            ],
            list: [
                {
                    a1: 'D456123456789',
                    a2: [
                        require('../../../assets/image/user/neko.png'),
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmHjVlVE9Ur6b1UlUBG1g5fmrvK7SDrCmEcOFmYEuNLMsWmHbB'
                    ],
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                },
                {
                    a1: 'D456123456789',
                    a2: [
                        require('../../../assets/image/user/neko.png'),
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmHjVlVE9Ur6b1UlUBG1g5fmrvK7SDrCmEcOFmYEuNLMsWmHbB'
                    ],
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                },
                {
                    a1: 'D456123456789',
                    a2: [
                        require('../../../assets/image/user/neko.png'),
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmHjVlVE9Ur6b1UlUBG1g5fmrvK7SDrCmEcOFmYEuNLMsWmHbB'
                    ],
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false,
            dia_title: '添加公告',
            form: {
                title: '',
                content: '',
                dates: [],
                status: ''
            },
            src: [],
            pic_dia_show: false,
            curr_pic_idx: -1
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        upFileChange(e) {
            console.log('e: ', e)
        },
        upPicChange(e,index) {
            console.log('res: ')
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
                self.src.splice(index, 1, this.result)
            }
        },
        preview(index){
            this.pic_dia_show = true
            this.curr_pic_idx = index
        },
        initForm() {
            this.form ={
                title: '',
                content: '',
                dates: [],
                status: ''
            }
            this.pic_show=[false, false, false],
            this.src = []
        },
        add() {
            this.dia_show = true
            this.initForm()
        },

        edit() {
            this.dia_show = true
            this.initForm()
        }
    },
    mounted() {}
}
</script>

<style scoped>
/* .modal-mask ---在 App.vue公共区 */
/* .filter ---在 App.vue公共区 */
.p10 {
    padding: 10px;
}
.iconjinggao1- {
    color: #4c8bfd;
    font-size: 24px;
}
.iconjinggao1-:hover {
    color: #6d9efa;
}
.filter .right {
    position: relative;
}
.filter .iconjinggao1-:hover + .pic {
    display: block;
    /* max-height: 400px; */
    /* transition: all .3s; */
}
.filter .right .pic {
    display: none;
    /* max-height: 0; */
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 3;
    /* border: 1px solid #000; */
    background: #4c8bfd;
    overflow: hidden;
    box-shadow: 0 0 10px 3px rgb(112, 119, 124);
}
.pic .head-2 {
    display: inline-block;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: #4c8bfd;
    /* padding: 10px; */
    /* background: #fff; */
}
.pic .image {
    position: relative;
    bottom: -4px;
}
.table {
    margin-top: 20px;
}
/* .modal-mask ---在 App.vue公共区 */
.dia-inner {
    width: 660px;
    min-height: 450px;
    display: flex;
    justify-content: center;
}
.form > li {
    display: flex;
    align-items: baseline;
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
.form .upload-btn > div {
    display: flex;
    margin-top: 10px;
}
.w250 {
    width: 250px;
}
.radio-right {
    margin-left: 40px;
}
.form-buttons {
    display: flex;
    justify-content: center;
    /* width: 250px; */
    margin-top: 20px;
}
.ml50 {
    margin-left: 50px;
}
.max-w800{
    max-width: 800px;
}
</style>