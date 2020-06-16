<template>
    <div class="container">
        <!-- 线上金流配置 -->

        <div class="filter">
            <ul class="left">
                <li>
                    <span>商户号</span>
                    <Input limit="en-num" v-model="filter.merchant_num" />
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
                    <Input limit="en-num" v-model="filter.merchant_code" />
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
                    <button class="btn-blue" @click="add">新增线上入款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.channel && row.channel.name}}</td>
                    <td>{{row.merchant_code}}</td>
                    <td>{{row.merchant_no}}</td>
                    <td>{{row.encrypt_mode==1?'密钥模式':'证书模式'}}</td>
                    <td>{{row.frontend_name}}</td>
                    <td>{{row.min_amount}}~{{row.max_amount}}</td>
                    <td>{{row.author}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.last_editor}}</td>
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
        <Dialog :show.sync="dia_show_step" :title="dia_title_step">
            <div class="dia-inner">
                <el-steps :active="active" align-center finish-status="success">
                    <el-step
                        class="pointer"
                        title="支付配置"
                        description="基础信息配置"
                        :status="stepStatus(0)"
                        @click.native="active=0"
                    ></el-step>
                    <el-step
                        class="pointer"
                        title="商户配置"
                        description="商户信息配置"
                        :status="stepStatus(1)"
                        @click.native="active=1"
                    ></el-step>
                    <el-step
                        class="pointer"
                        title="标签配置"
                        description="标签选择"
                        :status="stepStatus(2)"
                        @click.native="active=2"
                    ></el-step>
                </el-steps>
                <div class="edit-form">
                    <!-- 基础内容 -->
                    <ul v-if="active==0" class="form">
                        <li>
                            <span>支付方式：</span>
                            <Select
                                input
                                style="width:250px;display:inline-block;"
                                v-model="form.pay_method"
                                :options="pay_method_opt"
                            ></Select>
                        </li>
                        <li>
                            <span>前端名称：</span>
                            <Input
                                errmsg="内容不可为空"
                                :showerr="errFrontName(form.front_name)"
                                class="w250"
                                v-model="form.front_name"
                            />
                        </li>
                        <li>
                            <span>支付限额：</span>
                            <Input
                                :errmsg="dia_err"
                                :showerr="errPayLimt(form.pay_limit[0],form.pay_limit[1])"
                                limit="number"
                                style="width:114px;"
                                v-model="form.pay_limit[0]"
                            />
                            <span class="mv5">~</span>
                            <Input limit="number" style="width:114px;" v-model="form.pay_limit[1]" />
                        </li>
                        <li>
                            <span>入款手续费：</span>
                            <Input limit="number" class="w250" v-model="form.income_charge" />
                        </li>
                        <li>
                            <span>充值说明：</span>
                            <textarea class="textarea form-area" v-model="form.specifcation"></textarea>
                        </li>
                        <li>
                            <span>后台备注：</span>
                            <textarea class="textarea form-area" v-model="form.mark"></textarea>
                        </li>
                    </ul>
                    <ul v-if="active==1" class="form">
                        <li>
                            <span>商户号：</span>
                            <Input
                                errmsg="不能为空"
                                :showerr="errNum(form.merchant_num)"
                                limit="en-num"
                                class="w250"
                                v-model="form.merchant_num"
                            />
                        </li>
                        <li>
                            <span>商户编号：</span>
                            <Input limit="en-num" class="w250" v-model="form.merchant_code" />
                        </li>
                        <li>
                            <span>密钥方式：</span>
                            <Radio
                                class="mr50"
                                label="密钥模式"
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
                        <li v-if="form.secret_method==='1'">
                            <span>商户密钥：</span>
                            <Input class="w250" v-model="form.merchant_key" />
                        </li>
                        <li v-if="form.secret_method==='1'">
                            <span>商户公钥：</span>
                            <Input class="w250" v-model="form.merchant_public" />
                        </li>
                        <li v-if="form.secret_method==='1'">
                            <span>商户私钥：</span>
                            <Input class="w250" v-model="form.merchant_private" />
                        </li>
                        <li v-if="form.secret_method=='2'">
                            <span>上传证书：</span>
                            <Input v-model="form.certificate_path" style="width:125px;" />
                            <Upload
                                style="width:125px;"
                                title="上传证书"
                                v-model="form.certificate"
                                @change="upLoadChange($event,form)"
                            />
                        </li>
                        <li>
                            <span>请求地址：</span>
                            <Input
                                class="w250"
                                v-model="form.url"
                                required
                                :showerr="errUrlShow(form.url)"
                                errmsg="url格式错误!"
                            />
                        </li>
                        <li>
                            <span>第三方域名：</span>
                            <Input class="w250" v-model="form.third_href" />
                        </li>
                        <li>
                            <span>终端号：</span>
                            <Input class="w250" v-model="form.terminal" />
                        </li>
                    </ul>
                    <ul v-if="active==2" class="form">
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
                        <li>
                            <span
                                v-if="tagErrShow"
                                style="color:red;margin-top:-10px;margin-left:100px;"
                            >标签不可为空</span>
                        </li>
                        <li @click.stop class="chooseTag" style="display:block">
                            <p
                                v-show="tag_show"
                                v-for="(item) in all_tag"
                                :key="item.value"
                                class="allTag-list"
                            >
                                <input
                                    class="choosebox"
                                    type="checkbox"
                                    v-model="form.formtag[item.value]"
                                    @change="tagChange(item)"
                                />
                                <span>{{item.label}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="form-btns">
                    <button v-show="active!==0" class="btn-blue-large" @click="prevStep">上一步</button>
                    <button v-if="active!=2" class="btn-blue-large" @click="nextStep">下一步</button>
                    <button v-else class="btn-blue-large" @click="diaCfm">确定</button>
                </div>
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
import { Steps, step, Step } from "element-ui";
import axios from "axios";
export default {
    name: "OnlinePay",
    components: {
        [Steps.name]: Steps,
        [Step.name]: Step
    },
    data() {
        return {
            tagErrShow: true,
            dia_err: "",
            filter: {
                merchant_num: "",
                person: "",
                dates: [],
                update_dates: [],
                front_name: "",
                merchant_code: "",
                update_person: ""
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
                pay_method: "1",
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
            showTag: [],
            curr_row: {},
            // urlCheck: /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/,
            urlShow: false,
            dia_show_step: false,
            dia_title_step: "",
            active: 0
        };
    },
    methods: {
        getJsonData() {
            axios.get("http://pic.397017.com/common/linter.json").then(res => {
                // console.log("json-res", res);
                if (res && res.status == "200") {
                    if (res.data) {
                        let finance_type = res.data.system_finance_type;
                        // console.log('json数据',finance_type)
                        if (finance_type) {
                            let finance_type_path = finance_type.path;
                            axios.get(finance_type_path).then(res => {
                                if (res && res.status == "200") {
                                    let fiance_type_data = res.data;
                                    // console.log("支付方式", fiance_type_data);
                                    this.pay_method_opt = this.backToSelOpt(
                                        res.data
                                    );
                                }
                            });
                        }
                    }
                }
            });
        },
        backToSelOpt(list = []) {
            let all = [];
            let back_list = list.map(item => {
                // console.log(item)
                return { label: item.name, value: item.id };
            });
            return all.concat(back_list);
        },
        errNum(val) {
            if (!val) {
                return true;
            }
        },
        errPayLimt(min, max) {
            if (!min && !max) return false;
            if (parseInt(min) > parseInt(max)) {
                this.dia_err = "数据错误";
                return true;
            }
        },
        errFrontName(val) {
            if (!val) {
                return true;
            }
        },
        nextStep() {
            if (this.active < 2) {
                this.active++;
            }
        },
        prevStep() {
            this.active--;
        },
        add() {
            this.dia_status = "add";
            this.dia_show_step = true;
            this.dia_title_step = "新增线上入款";
            this.active = 0;
            this.tagErrShow = true;
            this.addClearAll();
        },
        /** 展示 步骤条 状态 */
        stepStatus(stepVal) {
            // wait / process / finish / error / success
            if (this.active === stepVal) {
                return "process";
            } else if (this.active > stepVal) {
                switch (stepVal) {
                    case 0:
                        return this.step0Check() ? "success" : "error";
                        break;
                    case 1:
                        return this.step1Check() ? "success" : "error";
                        break;
                    case 2:
                        return this.step2Check() ? "success" : "error";
                    case 4:
                        break;
                    default:
                        break;
                }
            }
        },
        step0Check() {
            if (
                this.form.pay_method != "" &&
                this.form.pay_limit != "" &&
                this.form.front_name != ""
            ) {
                return true;
            } else {
                return false;
            }
        },
        step1Check() {
            if (
                this.form.merchant_num != "" &&
                this.form.url != "" &&
                this.form.secret_method != ""
            ) {
                return true;
            } else {
                return false;
            }
        },
        step2Check() {
            if (this.tagErrShow) {
                return false;
            } else {
                return true;
            }
        },
        errUrlShow(val) {
            if (!val) return true;
            // ip 正则
            let reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
            return !reg.test(val);
        },
        checkForm() {
            if (this.tagErrShow) return false;
            // console.log('url',this.form.url)
            let urlCheck = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
            let re = new RegExp(urlCheck);
            if (re.test(this.form.url)) {
                return true;
            } else {
                return false;
            }
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
                pay_method: 1,
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

        addCfm() {
            if (!this.checkForm()) return;
            let datas = {
                channel_id: this.form.pay_method,
                frontend_name: this.form.front_name,
                merchant_code: this.form.merchant_num,
                merchant_no: this.form.merchant_code,
                encrypt_mode: this.form.secret_method,
                merchant_secret: this.form.merchant_key,
                public_key: this.form.merchant_public,
                private_key: this.form.merchant_private,
                certificate: this.form.certificate_path,
                request_url: this.form.url,
                vendor_url: this.form.third_href,
                app_id: this.form.terminal,
                tags: JSON.stringify(
                    this.showTag.map(item => {
                        return String(item.value);
                    })
                ),
                min_amount: this.form.pay_limit[0],
                max_amount: this.form.pay_limit[1],
                handle_fee: this.form.income_charge,
                desc: this.form.specifcation,
                backend_remark: this.form.mark
            };
            console.log("添加请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.online_finance_add;
            this.$http({ method, url, data }).then(res => {
                console.log("添加返回数据", res);
                if (res && res.code == "200") {
                    this.dia_show_step = false;
                    this.getList();
                }
            });
        },
        edit(row) {
            this.dia_status = "edit";
            this.dia_title_step = "编辑";
            // this.dia_show = true;
            this.dia_show_step = true;
            this.addClearAll();
            let tagsId = row.tags;
            // console.log("tagsId", tagsId);
            let tagGroup = tagsId.map(item => {
                return item.id;
            });
            // console.log("tagGroup", tagGroup);
            //设置chaeckbox为true 原始传入tags为true
            for (var i = 0; i < tagGroup.length; i++) {
                this.form.formtag[tagGroup[i]] = true;
            }
            //标签选择栏显示原始标签
            this.tagChange();
            this.form = {
                id: row.id,
                pay_method: row.channel && row.channel.id,
                front_name: row.frontend_name,
                merchant_num: row.merchant_code,
                merchant_code: row.merchant_no,
                secret_method: String(row.encrypt_mode),
                merchant_key: row.merchant_secret,
                merchant_public: row.public_key,
                merchant_private: row.private_key,
                certificate_path: row.certificate,
                url: row.request_url,
                third_href: row.vendor_url,
                terminal: row.app_id,
                pay_limit: [String(row.min_amount), String(row.max_amount)],
                income_charge: row.handle_fee,
                specifcation: row.desc,
                mark: row.backend_remark,
                formtag: []
            };
        },
        editCfm() {
            let datas = {
                id: this.form.id,
                channel_id: this.form.pay_method,
                frontend_name: this.form.front_name,
                merchant_code: this.form.merchant_num,
                merchant_no: this.form.merchant_code,
                encrypt_mode: this.form.secret_method,
                merchant_secret: this.form.merchant_key,
                public_key: this.form.merchant_public,
                private_key: this.form.merchant_private,
                certificate: this.form.certificate_path,
                request_url: this.form.url,
                vendor_url: this.form.third_href,
                app_id: this.form.terminal,
                tags: JSON.stringify(
                    this.showTag.map(item => {
                        return String(item.value);
                    })
                ),
                min_amount: this.form.pay_limit[0],
                max_amount: this.form.pay_limit[1],
                handle_fee: this.form.income_charge,
                desc: this.form.specifcation,
                backend_remark: this.form.mark
            };
            let data = window.all.tool.rmEmpty(datas);
            console.log("编辑请求数据", data);
            let { method, url } = this.$api.online_finance_edit;
            this.$http({ method, url, data }).then(res => {
                console.log("编辑返回数据", res);
                if (res && res.code == "200") {
                    this.dia_show_step = false;
                    this.$toast.success(res.message);
                    this.getList();
                }
            });
        },
        del(row) {
            this.mod_show = true;
            this.curr_row = row;
        },
        modConf() {
            let data = {
                id: this.curr_row.id
            };
            let { method, url } = this.$api.online_finance_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.mod_show = false;
                    this.$toast.success(res.message);
                    this.getList();
                }
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
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
            this.tagErrShow = false;
            // console.log(this.form.formtag);
            let show_arr = [];
            for (let key in this.form.formtag) {
                // this.form.formtag[key]
                let item = this.form.formtag[key];
                // console.log("item: ", item);
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
            let created_at = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let updated_at = "";
            if (this.filter.update_dates[0] && this.filter.update_dates[1]) {
                updated_at = JSON.stringify([
                    this.filter.update_dates[0],
                    this.filter.update_dates[1]
                ]);
            }
            let datas = {
                merchant_code: this.filter.merchant_num,
                front_name: this.filter.front_name,
                created_at: created_at,
                updated_at: updated_at,
                author_name: this.filter.person,
                last_editor_name: this.filter.update_person,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            console.log("请求数据", data);
            let { method, url } = this.$api.online_finance_list;
            this.$http({ method: method, url: url, data: data }).then(res => {
                console.log("列表数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        this.getList();
        // this.getSelectOpt();
        this.getTagList();
        this.getJsonData();
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
.form li > span:first-child {
    min-width: 7em;
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
.chooseTag {
    width: 250px;
    min-height: 10px;
    margin-left: 120px;
}
.chooseTag p {
    width: 125px;
}
.allTag-list {
    display: inline-block;
}
.choosebox {
    vertical-align: middle;
}
.err-tips {
    margin-left: 25%;
    margin-top: -50%;
    margin-bottom: -50%;
    color: red;
}
.dia-inner {
    min-width: 670px;
    min-height: 650px;
}
.dia-inner .edit-form {
    height: 250px;
    /* margin-top: 5%; */
    display: flex;
    justify-content: center;
}
.form > li:nth-child(1) {
    display: flex;
    align-items: center;
    margin-top: 25px;
}
.form li {
    display: flex;
    align-items: center;
    margin-top: 25px;
}

.form-btns {
    margin-top: 240px;
    text-align: center;
}

.form .upload-btn > div {
    display: flex;
    margin-top: 10px;
}
</style>