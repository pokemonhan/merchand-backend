<template>
    <div class="container">
        <!-- 线下支付配置 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>入款类型</span>
                    <Select v-model="filter.type" :options="type_opt"></Select>
                </li>
                <li>
                    <span>入款账号</span>
                    <Input v-model="filter.account" />
                </li>
                <li>
                    <span>收款姓名</span>
                    <Input v-model="filter.name" />
                </li>
                <li>
                    <span>添加人</span>
                    <Input v-model="filter.add_author" />
                </li>
                <li>
                    <span>添加日期</span>
                    <Date v-model="filter.add_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.add_dates[1]" />
                </li>
            </ul>
        </div>
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span style="width:4em;">更新人</span>
                    <Input style="width:110px;" v-model="filter.update_person" />
                </li>
                <li>
                    <span>更新日期:</span>
                    <Date v-model="filter.update_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.update_dates[1]" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="add">新增线下支付</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.type_id}}</td>
                    <td>{{row.name}}</td>
                    <td>{{row.username}}</td>
                    <td>{{row.account}}</td>
                    <td>{{row.min}}~{{row.max}}</td>
                    <td>{{row.author.name}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.last_editor && row.last_editor.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.status"
                            @update="switchStatus($event,row)"
                        />
                    </td>
                    <td>
                        <button class="btns-blue" @click="edit(row)">修改</button>
                        <button class="btns-red" @click="del(row)">删除</button>
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
                <div class="flex">
                    <ul class="form">
                        <li>
                            <span>入款方式:</span>
                            <Select
                                style="width:250px;"
                                v-model="form.inconm"
                                :options="inconm_opt"
                            ></Select>
                        </li>
                        <li v-show="form.inconm == 1">
                            <span>所属银行:</span>
                            <Select style="width:250px;" v-model="form.bank" :options="bank_opt"></Select>
                        </li>
                        <li>
                            <span>名称:</span>
                            <Input class="w250" v-model="form.accountName" />
                        </li>
                        <li>
                            <span>二维码:</span>
                            <Input v-model="form.qrcode" style="width:126px" />
                            <Upload
                                style="width:120px;margin:0 auto;"
                                title="选择二维码"
                                @change="upQRcode($event, form)"
                                type="file"
                            />
                        </li>
                        <li>
                            <span>账号:</span>
                            <Input class="w250" v-model="form.accountNumber" />
                        </li>
                        <li>
                            <span>姓名:</span>
                            <Input class="w250" v-model="form.name" />
                        </li>
                        <li>
                            <span>银行卡号:</span>
                            <Input class="w250" v-model="form.bank_card" />
                        </li>
                        <li>
                            <span>开户地址:</span>
                            <Input class="w250" v-model="form.bank_address" />
                        </li>
                        <li>
                            <span>最低入款:</span>
                            <Input class="w250" v-model="form.minimum_deposit" />
                        </li>
                        <li>
                            <span>最高入款:</span>
                            <Input class="w250" v-model="form.maxmum_deposit" />
                        </li>
                        <li>
                            <span>入款手续费:</span>
                            <Input class="w250" v-model="form.deposit_fee" />
                        </li>
                    </ul>
                    <ul class="form">
                        <li v-clickoutside="tagListShow">
                            <span>标签选择:</span>
                            <div class="tag-choose" @click="tag_show=true">
                                <span
                                    class="el-tag"
                                    v-for="(item,index) in showTage"
                                    :key="index"
                                    @click="closeTag(item,index)"
                                >{{item.label}}</span>
                            </div>
                        </li>
                        <li @click.stop>
                            <p
                                v-show="tag_show"
                                v-for="(item) in all_tag"
                                :key="item.value"
                                class="allTag-list"
                            >
                                <input
                                    type="checkbox"
                                    v-model="formtag[item.value]"
                                    @change="tagChange(item)"
                                />
                                {{item.label}}
                            </p>
                        </li>
                        <li class="declare">
                            <span>说明:</span>
                            <textarea class="textarea" v-model="form.description"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="mt20 center-box">
                    <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                    <button class="btn-blue" @click="diaCfm">确认</button>
                </div>
            </div>
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除该线下支付"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            filter: {
                type: "",
                account: "",
                name: "",
                add_dates: [],
                update_person: "",
                update_dates: []
            },
            type_opt: [],
            headers: [
                "入款类型",
                "收款名称",
                "收款姓名",
                "入款账号",
                "支付限额",
                "创建人",
                "创建时间",
                "最后更新人",
                "最后更新时间",
                "状态",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            dia_show: false, // TODO:
            select: {},
            inconm_opt: [],
            bank_opt: [],
            bankSelect: {},
            form: {
                inconm: 1,
                bank: "",
                accountName: "",
                qrcode: "",
                accountNumber: "",
                name: "",
                bank_card: "",
                bank_address: "",
                minimum_deposit: "",
                maxmum_deposit: "",
                deposit_fee: "",
                description: ""
            },
            formtag: {},
            menu_list: [],
            tag_show: false, // TODO  改为false
            all_tag: [],
            showTage: [], // 要展示的tag 数组
            mod_show: false,
            dia_title:'',
        };
    },
    methods: {
        getSelectOpt() {
            let { url, method } = this.$api.offline_finance_types_list;
            this.$http({ url, method }).then(res => {
                // console.log('下拉数据：',res);
                if (res && res.code == "200") {
                    this.select = res.data;
                    this.type_opt = this.backToSelOpt(res.data);
                    this.inconm_opt = this.backToSelOpt(res.data);
                }
            });
        },
        backToSelOpt(list = []) {
            let all = [
                {
                    label: "全部",
                    value: ""
                }
            ];
            let back_list = list.map(item => {
                return { label: item.name, value: item.id };
            });
            return all.concat(back_list);
        },
        getBankSelOpt() {
            let { url, method } = this.$api.offline_finance_bank_list;
            this.$http({ url, method }).then(res => {
                // console.log('银行列表：',res);
                if (res && res.code == "200") {
                    this.bankSelect = res.data;
                    this.bank_opt = this.backToBankSelOpt(res.data);
                }
            });
        },
        backToBankSelOpt(list = []) {
            let all = [];
            let bank_list = list.map(item => {
                return { label: item.name, value: item.id };
            });
            return all.concat(bank_list);
        },
        getTagList() {
            let { url, method } = this.$api.tag_list;
            this.$http({ url, method }).then(res => {
                if (res && res.code == "200") {
                    // console.log('标签列表',res)
                    if (
                        res.data &&
                        res.data.data &&
                        Array.isArray(res.data.data)
                    ) {
                        let arr = [];
                        for (var i = 0; i < res.data.data.length; i++) {
                            let item = res.data.data[i];
                            // console.log(item);
                            arr.push({ label: item.title, value: item.id });
                        }
                        // console.log(arr);
                        this.all_tag = arr;
                        // console.log('all_tag: ', all_tag);
                    }
                }
            });
        },
        tagListShow() {
            this.tag_show = false;
        },
        closeTag(item, index) {
            this.formtag[item.value] = false;
            this.showTage.splice(index, 1);
        },
        tagChange() {
            console.log(this.formtag);
            let show_arr = [];
            for (let key in this.formtag) {
                // this.formtag[key]
                let item = this.formtag[key];
                console.log("item: ", item);
                if (item) {
                    show_arr.push(key);
                }
                console.log("show_arr: ", show_arr);
                this.showTage = this.all_tag.filter(item => {
                    // console.log("item: ", item);
                    return show_arr.indexOf(String(item.value)) !== -1;
                });
                // console.log("this.showTage: ", this.showTage);
            }
        },
        diaCfm(){
            if(this.dia_status==='add'){
                this.addCfm()
            }
            if(this.dia_status=='edit'){
                this.editCfm()
            }
        },
        addClearAll() {
            this.form = {
                inconm: 1,
                bank: 1,
                accountName: "",
                qrcode: "",
                accountNumber: "",
                name: "",
                bank_card: "",
                bank_address: "",
                minimum_deposit: "",
                maxmum_deposit: "",
                deposit_fee: "",
                description: "",
                tag_show: false
            };
        },
        add() {
            this.dia_status = "add";
            this.dia_title = "新增线下支付";
            this.dia_show = true;
            this.addClearAll();
        },
        upQRcode(e, form) {
            console.log("form:", form);
            console.log("event:", e);
            let pic = e.target.files[0];
            let basket = "pay/offinePay/uploads";
            var qrcode = "";
            let formList = new FormData();
            formList.append("file", pic, pic.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                if (res && res.code == "200") {
                    // console.log("图片返回",res)
                    this.form.qrcode = res.data.path;
                }
            });
        },
        addCfm() {
            let data = {
                type_id: this.form.inconm,
                bank_id: this.form.bank,
                name: this.form.accountName,
                qrcode: this.form.qrcode,
                account: this.form.accountNumber,
                username: this.form.name,
                account: this.form.bank_card,
                branch: this.form.bank_address,
                min: this.form.minimum_deposit,
                max: this.form.maxmum_deposit,
                fee: this.form.deposit_fee,
                tags: JSON.stringify(
                    this.showTage.map(item => {
                        return String(item.value);
                    })
                ),
                reamrk: this.form.description
            };
            // console.log('请求条件',data)
            let { url, method } = this.$api.offline_finance_add;
            this.$http({ method, url, data }).then(res => {
                console.log("res:", res);
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        switchStatus(val,row){
            let data={
                id:row.id,
                status:val ? 1 : 0
            };
            let {url,method} = this.$api.offline_finance_status_set;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            })
        },
        edit(row) {
            this.dia_status = "edit";
            this.dia_title = "修改";
            this.dia_show = true;
            this.form={
                inconm:row.type_id,
                bank:row.bank_id,
                accountName:row.username,
                qrcode:row.qrcode,
                accountNumber:row.account,
                name:row.username,
                bank_card:row.account,
                bank_address:row.branch,
                minimum_deposit:row.min,
                maxmum_deposit:row.max,
                deposit_fee:row.fee,
                description:row.remark,
            }
        },
        del() {
            this.mod_show = true;
        },
        modConf() {},
        updateNo(val) {},
        updateSize(val) {},
        getList() {
            let para = {
                type_id: this.filter.type,
                account: this.filter.account,
                username: this.filter.name,
                author_name: this.filter.add_author,
                created_at: [
                    this.filter.add_dates[0],
                    this.filter.add_dates[1]
                ],
                last_editor_name: this.filter.update_person,
                updated_at: [
                    this.filter.update_dates[0],
                    this.filter.update_dates[1]
                ]
            };
            let params = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.offline_finance_list;
            this.$http({ method: method, url: url, params: params }).then(
                res => {
                    // console.log('返回数据：',res)
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                        this.total = res.data.total;
                    } else {
                        if (res && res.message !== "") {
                            this.toast.error(res.message);
                        }
                    }
                }
            );
        }
    },
    mounted() {
        this.getList();
        this.menu_list = window.all.menu_list;
        this.getSelectOpt();
        this.getBankSelOpt();
        this.getTagList();
    }
};
</script>

<style scoped>
.form li {
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.form li:first-child {
    margin-top: 0;
}
.form li > span:first-child {
    min-width: 6em;
    text-align: right;
    margin-right: 10px;
}
.form .declare {
    align-items: baseline;
}
/* .textarea 有部分全局样式 */
.declare .textarea {
    width: 350px;
}
.dia-inner {
    max-height: 80vh;
    overflow: auto;
}
.center-box {
    display: flex;
    justify-content: center;
}
.form-textarea {
    margin-left: 94px;
    margin-top: -10px;
    width: 350px;
}
.tag-choose {
    width: 350px;
    min-height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.el-tag {
    background-color: #ecf5ff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.allTag-list {
    margin-left: 95px;
}
</style>