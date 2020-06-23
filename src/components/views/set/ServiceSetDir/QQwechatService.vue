<template>
    <div class="cont">
        <Table :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <!-- '客服名称','客服类型','客服号码','聊天链接','操作' -->
                <td>{{row.name}}</td>
                <td>{{row.version==2?'微信客服':'QQ客服'}}</td>
                <td>{{row.number}}</td>
                <td>{{row.link}}</td>
                <td>
                    <button class="btns-blue" @click="editClick(row)">编辑</button>
                    <button class="btns-red" @click="delClick(row)">删除</button>
                </td>
            </template>
        </Table>

        <!-- <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />-->
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <div class="form">
                    <ul>
                        <li>
                            <span>客服名称:</span>
                            <Input class="w210" v-model="form.name" />
                            <span v-show="!form.name" class="err-tips">内容不可为空！</span>
                        </li>
                        <li>
                            <span>客服类型:</span>
                            <Radio class="radio" label="微信客服" :val="2" v-model="form.version" />
                            <Radio class="ml20" label="QQ客服" :val="1" v-model="form.version" />
                        </li>
                        <li>
                            <span>{{form.version=='2'?'微信号码:':'QQ号码:'}}</span>
                            <Input class="w210" limit="number" v-model="form.number" />
                            <span v-show="!form.number" class="err-tips">内容不可为空！</span>
                        </li>
                        <li>
                            <span>聊天链接:</span>
                            <Input class="w210" v-model="form.link" />
                            <span v-show="!form.link" class="err-tips">内容不可为空！</span>
                        </li>
                        <li>
                            <span>二维码:</span>
                            <Input style="width:80px;" v-model="form.pic_path" />
                            <span v-show="!form.pic_path" class="err-tips">请选择上传二维码！</span>
                            <Upload
                                style="width:130px;"
                                title="选择二维码上传"
                                v-model="form.qrcode"
                                @change="qrcodeClick($event)"
                            />
                        </li>
                        <li class="form-btn">
                            <button class="btn-plain-large" @click="dia_show=false">取消</button>
                            <button class="btn-blue-large ml50" @click="diaCfm">确认</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否确认删除该客服号!"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: ['客服名称', '客服类型', '客服号码', '聊天链接', '操作'],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dia
            dia_show: false,
            dia_title: '',
            dia_status: '',

            curr_row: {},
            form: {

                name: '',
                version: 2,
                number: '',
                link: '',
                qrcode: '',
                pic_path:'',
            },
            // modal
            mod_show: false,
            // dialog
        }
    },
    methods: {
        // 父组件点击添加按钮
        addclick() {
            this.form = {
                name: '',
                version: 2,
                number: '',
                link: '',
                qrcode: '',
                pic_path:'',
            }
            this.dia_status = 'add'
            this.dia_title = '添加'
            this.dia_show = true
        },
        editClick(row) {
            this.curr_row = row
            this.dia_status = 'edit'
            this.dia_title = '编辑'
            this.dia_show = true
            this.form = {
                name: row.name,
                version: row.version,
                number: row.number,
                link: row.link,
                // pic_path:row.pic
            }
        },
        delClick(row) {
            this.curr_row = row
            this.mod_show = true
            
        },
        modConf() {
            let data = {
                id: this.curr_row.id,
            }
            
            let { url, method } = this.$api.customer_service_del
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === '200') {
            
                    this.$toast.success(res && res.message)
                    this.mod_show=false
                    this.getList()
                } else {
                    if (res && res.message !== '') {
                        this.$toast.error(res.message)
                    }
                }
            })
        },
        diaCfm() {
            if (this.dia_status === 'add') {
                this.addCfm()
            }
            if (this.dia_status === 'edit') {
                this.editCfm()
            }
        },
        checkForm() {
            let toastTxt = ''
            if(this.form.name==='') {
                toastTxt = '客服名称不可为空'
            }else if(this.form.number===''){
                toastTxt = '号码不可为空'
            }else if(this.form.link===''){
                toastTxt = '聊天链接不可为空'
            }else if(this.form.pic_path===''){
                toastTxt = '未上传二维码'
            }
            if(toastTxt){
                this.$toast.warning(toastTxt)
                return false
            }
            return true
        },
        addCfm() {
            if(!this.checkForm()) return
            let data = {
                name: this.form.name,
                link: this.form.link,
                number: this.form.number,
                type: 1,
                version: this.form.version,
                // pic:this.form.pic_path,
            }
            // console.log('请求数据',data)
            let { url, method } = this.$api.customer_service_add
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === '200') {
                    this.$toast.success(res && res.message)
                    this.dia_show = false
                    this.getList()
                }
            })
        },
        editCfm() {
            if(!this.checkForm()) return
            let data = {
                id: this.curr_row.id,

                name: this.form.name,
                link: this.form.link,
                number: this.form.number,
                type: 1,
                version: this.form.version,
                // pc:this.form.pic_path,
            }

            let { url, method } = this.$api.customer_service_set
            this.$http({ method, url, data }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    this.$toast.success(res && res.message)
                    this.dia_show = false
                    this.getList()
                }
            })
        },
        getList() {
            let para = {
                type: 1,
                pageSize: this.pageSize,
                page: this.pageNo
            }
            let params = window.all.tool.rmEmpty(para)

            let { url, method } = this.$api.customer_service_list
            this.$http({ method, url, params }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    // this.total = res.data.t
                    this.list = res.data
                }
            })
        },
        qrcodeClick(e) {
            let pic = e.target.files[0];
            let basket = "set/serviceset/uploads";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.$set(this.form, "pic_path", res.data.path);
                }
            });
        },
        updateNo(val) {
            this.getList()
        },
        updateSize(val) {
            this.pageNo = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: center;
}
.form ul > li {
    display: flex;
    position: relative;
    line-height: 30px;
    margin-top: 20px;

}
.form ul > li > span:first-child {
    min-width: 5em;
    text-align: right;
    margin-right: 10px;
}
.form-btn {
    width: fit-content;
    margin: 0 auto;
}
.w210{
    width: 213px;
}
.err-tips {
    position: absolute;
    top: 1.8em;
    left: 6em;
    color: red;
}
</style>