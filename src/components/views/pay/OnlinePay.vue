<template>
    <div class="container">
        <!-- 线上金流配置 -->

        <div class="filter">
            <ul class="left">
                <li>
                    <span>商户号</span>
                    <Input v-model="filter.merchant_num" />
                </li>
                <li>
                    <span>创建人</span>
                    <Input v-model="filter.person" />
                </li>
                <li>
                    <span>添加日期</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" />
                </li>
                <li>
                    <span>前端名称</span>
                    <Input v-model="filter.front_name" />
                </li>
                <li>
                    <span>商户编号</span>
                    <Input v-model="filter.merchant_code" />
                </li>
                <li>
                    <span>更新人</span>
                    <Input v-model="filter.update_person" />
                </li>
                <li>
                    <span>更新日期</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.update_dates" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="add">新增线下入款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.channel && row.channel.name}}</td>
                    <td>{{row.merchant_code}}</td>
                    <td>{{row.merchant_no}}</td>
                    <td>{{row.encrypt_mode}}</td>
                    <td>{{row.frontend_name}}</td>
                    <td>{{row.min}}~{{row.max}}</td>
                    <td>{{row.author && row.author.name}}</td>
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
                        <button class="btns-blue" @click="edit(row)">编辑</button>
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
                <ul class="form">
                    <li>
                        <span>支付方式:</span>
                        <Select
                            style="width:250px"
                            v-model="form.pay_method"
                            :options="pay_method_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>前端名称:</span>
                        <Input class="w250" v-model="form.front_name" />
                    </li>
                    <li>
                        <span>商户号:</span>
                        <Input class="w250" v-model="form.merchant_num" />
                    </li>
                    <li>
                        <span>商户编号:</span>
                        <Input class="w250" v-model="form.merchant_code" />
                    </li>
                    <li>
                        <span>密钥方式:</span>
                        <!-- <Input class="w250" v-model="form.screte_key" /> -->
                        <Radio
                            class="mr50"
                            label="密钥方式"
                            :value="form.secret_method"
                            val="1"
                            v-model="form.secret_method"
                            @update="secretUpd"
                        />
                        <Radio
                            class="radio-right"
                            label="证书方式"
                            :value="form.secret_method"
                            val="2"
                            v-model="form.secret_method"
                            @update="secretUpd"
                        />
                    </li>

                    <!-- 1. 密钥方式 -->
                    <li v-if="form.secret_method==='1'">
                        <span>商户密钥:</span>
                        <Input class="w250" v-model="form.merchant_key" />
                    </li>
                    <li v-if="form.secret_method==='1'">
                        <span>商户公钥:</span>
                        <Input class="w250" v-model="form.merchant_public" />
                    </li>
                    <li v-if="form.secret_method==='1'">
                        <span>商户私钥:</span>
                        <Input class="w250" v-model="form.merchant_private" />
                    </li>

                    <!-- 2. 证书 -->
                    <li v-if="form.secret_method=='2'">
                        <span>上传证书</span>
                        <Input v-model="form.certificate_path" style="width:125px;" />
                        <Upload
                            style="width:125px;"
                            title="上传证书"
                            v-model="form.certificate"
                            @change="upLoadChange($event,form)"
                        />
                        <!-- <input type="file"> -->
                    </li>
                    <li>
                        <span>请求地址:</span>
                        <Input class="w250" v-model="form.url" />
                    </li>
                    <li>
                        <span>第三方域名:</span>
                        <Input class="w250" v-model="form.third_href" />
                    </li>
                    <li>
                        <span>终端号:</span>
                        <Input class="w250" v-model="form.terminal" />
                    </li>
                    <li v-clickoutside="tagListShow">
                        <span>标签选择:</span>
                        <div class="tag-choose" @click="tag_show=true">
                            <span
                                class="el-tag"
                                v-for="(item,index) in showTag"
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
                                v-model="form.formtag[item.value]"
                                @change="tagChange(item)"
                            />
                            {{item.label}}
                        </p>
                    </li>
                    <li>
                        <span>支付限额:</span>
                        <Input style="width:114px;" v-model="form.pay_limit[0]" />
                        <span class="mv5">~</span>
                        <Input style="width:114px;" v-model="form.pay_limit[1]" />
                    </li>
                    <li>
                        <span>入款手续费:</span>
                        <Input class="w250" v-model="form.income_charge" />
                    </li>
                    <li>
                        <span>充值说明:</span>
                        <textarea class="textarea form-area" v-model="form.specifcation"></textarea>
                    </li>
                    <li>
                        <span>后台备注:</span>
                        <textarea class="textarea form-area" v-model="form.mark"></textarea>
                    </li>
                    <li class="center-box">
                        <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                        <button class="btn-blue" @click="diaCfm">确认</button>
                    </li>
                </ul>
            </div>
        </Dialog>
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filter: {
                merchant_num: "",
                person: "",
                dates: [],
                update_dates: [],
                front_name: "",
                merchant_code: "",
                update_person: "",
            },

            headers: [
                "入款方式",
                "商户号",
                "商户编号",
                "密钥方式",
                "前端名称",
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

            // dialog
            dia_show: false,
            dia_status: "",
            dia_title: "",
            form: {
                pay_method: "",
                front_name: "",
                merchant_num: "",
                merchant_code: "", // 商户编码
                secret_method: "secret",
                merchant_key: "",
                merchant_public: "",
                merchant_private: "",
                certificate: "",
                certificate_path: "",
                url: "",
                third_href: "",
                terminal: "",
                tag: "",
                pay_limit: [],
                income_charge: "",
                specifcation: "",
                mark: "",
                formtag: []
            },
            pay_method_opt: [],
            // modal
            mod_show: false,
            select: {},
            all_tag: [],
            tag_show: false,
            showTag: []
        };
    },
    methods: {
        getSelectOpt() {
            let { url, method } = this.$api.online_finance_channel_list;
            this.$http({ url, method }).then(res => {
                if (res && res.code == "200") {
                    this.pay_method_opt = this.backToSelOpt(res.data);
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
        diaCfm() {
            if (this.dia_status == "add") {
                this.addCfm();
            }
            if (this.dia_status == "edit") {
                this.editCfm();
            }
        },
        upLoadChange(e, form) {
            let certificate = e.target.files[0];
            let basket = "pay/onlinepay/certificate";
            let formList = new FormData();
            formList.append("file", certificate, certificate.name);
            formList.append("basket", basket);
            let { url, method } = this.$api.update_picture_database;
            let data = formList;
            let headers = { "Content-Type": "multipart/form-data" };
            this.$http({ method, url, data, headers }).then(res => {
                if (res && res.code == "200") {
                    // console.log("路劲返回：", res);
                    this.form.certificate_path = res.data.path;
                }
            });
        },
        addClearAll() {
            this.form = {
                pay_method: "",
                front_name: "",
                merchant_num: "",
                merchant_code: "",
                secret_method: "",
                merchant_key: "",
                merchant_public: "",
                merchant_private: "",
                certificate_path: "",
                url: "",
                third_href: "",
                terminal: "",
                pay_limit: [],
                income_charge: "",
                specifcation: "",
                mark: "",
                formtag: []
            };
            this.showTag = [];
        },
        add() {
            this.dia_status = "add";
            this.dia_title = "新增线下入款";
            this.dia_show = true;
            // this.addClearAll();
        },
        addCfm() {
            let datas = {
                channel_id: this.form.pay_method,
                frontend_name: this.form.front_name,
                merchant_code: this.form.merchant_num,
                merchant_no: this.form.merchant_code,
                encrypt_mode: this.form.secret_method,
                merchant_secret: this.form.merchant_key,
                public_key: this.form.merchant_public,
                private_key: this.form.merchant_private,
                // certificate: this.form.certificate_path,
                request_url: this.form.url,
                vendor_url: this.form.third_href,
                app_id:this.form.terminal,
                tags:JSON.stringify( this.showTag.map(item => {
                        return String(item.value);
                })),
                min: this.form.pay_limit[0],
                max: this.form.pay_limit[1],
                handle_fee: this.form.income_charge,
                desc: this.form.specifcation,
                backend_remark: this.form.mark
            };
            // console.log('添加请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let { url, method } = this.$api.online_finance_add;
            this.$http({ method, url, data }).then(res => {
                // console.log('添加返回数据',res)
                if(res && res.code=='200'){
                    this.dia_show=false;
                    this.getList();
                }
            });
        },
        edit() {
            this.dia_status = "edit";
            this.dia_title = "编辑";
            this.dia_show = true;
        },
        editCfm() {},
        del() {
            this.mod_show = true;
        },
        modConf() {},
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },

        secretUpd() {},
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.online_finance_status_set;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        getTagList() {
            let { url, method } = this.$api.tag_list;
            this.$http({ url, method }).then(res => {
                if (res && res.code == "200") {
                    // console.log("标签列表", res);
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
            this.form.formtag[item.value] = false;
            this.showTag.splice(index, 1);
        },
        tagChange() {
            // console.log(this.form.formtag);
            let show_arr = [];
            for (let key in this.form.formtag) {
                // this.form.formtag[key]
                let item = this.form.formtag[key];
                console.log("item: ", item);
                if (item) {
                    show_arr.push(key);
                }
                // console.log("show_arr: ", show_arr);
                this.showTag = this.all_tag.filter(item => {
                    // console.log("item: ", item);
                    return show_arr.indexOf(String(item.value)) !== -1;
                });
                // console.log("this.showTag: ", this.showTag);
            }
        },
        getList() {
            let created_at=''
            if(this.filter.dates[0] && this.filter.dates[1]){
                created_at=JSON.stringify([this.filter.dates[0],this.filter.dates[1]])
            }
            let updated_at=''
            if(this.filter.update_dates[0] && this.filter.update_dates[1] ){
                updated_at=JSON.stringify([this.filter.update_dates[0],this.filter.update_dates[1]])
            }
            let para = {
                merchant_code: this.filter.merchant_num,
                front_name: this.filter.front_name,
                created_at: created_at,
                updated_at: updated_at,
                author_name: this.filter.person,
                last_editor_name: this.filter.update_person,
                page:this.pageNo,
                pageSize:this.pageSize
            };
            let params = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.online_finance_list;
            this.$http({ method: method, url: url, params: params }).then(
                res => {
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                        this.total = res.data.total;
                    }
                }
            );
        }
    },
    mounted() {
        this.getList();
        this.getSelectOpt();
        this.getTagList();
    }
};
</script>

<style scoped>
.filter {
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
}
.flt-down {
    padding-left: 10px;
    padding-bottom: 10px;
}
.dia-inner {
    max-height: 80vh;
    overflow: auto;
}
.form li {
    display: flex;
    /* justify-content: baseline; */
    align-items: center;
    margin-top: 20px;
}
.form li:first-child {
    margin-top: 0;
}
.form li > span:first-child {
    min-width: 6em;
    margin-right: 10px;
    text-align: right;
}
.form-area {
    width: 250px;
}
.center-box {
    display: flex;
    justify-content: center;
}
.tag-choose {
    width: 250px;
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