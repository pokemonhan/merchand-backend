<template>
    <div class="container">
        <!-- 线上金流配置 -->

        <div class="filter p10">
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
                    <Date v-model="filter.dates[0]" />
                    <span class="mv5">~</span>
                    <Date v-model="filter.dates[1]" />
                </li>
                <li>
                    <span>前端名称</span>
                    <Input v-model="filter.front_name" />
                </li>
                <li>
                    <span>商户编号</span>
                    <Input v-model="filter.merchant_code" />
                </li>
            </ul>
        </div>
        <div class="filter flt-down">
            <ul class="left">
                <li>
                    <span>更新人</span>
                    <Input v-model="filter.update_person" />
                </li>
                <li>
                    <span>更新日期</span>
                    <Input v-model="filter.update_dates[0]" />
                    <span class="mv5">~</span>
                    <Input v-model="filter.update_dates[1]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="add">新增线下入款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>
                        <Switchbox v-model="row.status" />
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
                        <Select style="width:250px" v-model="form.pay_method" :options="pay_method"></Select>
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
                            val="secret"
                            v-model="form.secret_method"
                            @update="secretUpd"
                        />
                        <Radio
                            class="radio-right"
                            label="证书方式"
                            :value="form.secret_method"
                            val="certificate"
                            v-model="form.secret_method"
                            @update="secretUpd"
                        />
                    </li>

                    <!-- 1. 密钥方式 -->
                    <li v-if="form.secret_method==='secret'">
                        <span>商户密钥:</span>
                        <Input class="w250" v-model="form.merchant_key" />
                    </li>
                    <li v-if="form.secret_method==='secret'">
                        <span>商户公钥:</span>
                        <Input class="w250" v-model="form.merchant_public" />
                    </li>
                    <li v-if="form.secret_method==='secret'">
                        <span>商户私钥:</span>
                        <Input class="w250" v-model="form.merchant_private" />
                    </li>

                    <!-- 2. 证书 -->
                    <li v-if="form.secret_method!=='secret'">
                        <span>上传证书</span>
                        <Upload
                            style="width:250px;"
                            title="上传证书"
                            v-model="form.certificate"
                            @change="upLoadChange"
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
                    <li>
                        <span>标签选择:</span>
                        <Input class="w250" v-model="form.tag" />
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
                        <button class="btn-blue">确认</button>
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
                merchant_num: '',
                person: '',
                dates: [],
                front_name: '',
                merchant_code: '',
                update_person: '',
                update_dates: []
            },

            headers: [
                '入款方式',
                '商户号',
                '商户编号',
                '密钥方式',
                '前端名称',
                '支付限额',
                '创建人',
                '创建时间',
                '最后更新人',
                '最后更新时间',
                '状态',
                '操作'
            ],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: true
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: false
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            // dialog
            dia_show: false,
            dia_status: '',
            dia_title: '',
            form: {
                pay_method: '',
                front_name: '',
                merchant_num: '',
                merchant_code: '', // 商户编码
                secret_method: 'secret',
                certificate: '',
                url: '',
                third_href: '',
                terminal: '',
                tag: '',
                pay_limit: [],
                income_charge: '',
                specifcation: '',
                mark: ''
            },
            pay_method: [
                { label: '支付宝', value: 0 },
                { label: '微信', value: 0 }
            ],
            // modal
            mod_show: false,
        }
    },
    methods: {
        add() {
            this.dia_status = 'add'
            this.title = '新增线下入款'
            this.dia_show = true
        },
        edit() {
            this.dia_status = 'edit'
            this.dia_title = '编辑'
            this.dia_show = true
        },
        del() {
            this.mod_show = true
        },
        modConf() {

        },
        updateNo(val) {},
        updateSize(val) {},

        secretUpd() {
            // this.
        },
        upLoadChange(e) {
            console.log(e)
        }
    },
    mounted() {}
}
</script>

<style scoped>
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
</style>