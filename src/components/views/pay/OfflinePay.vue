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
                    <span>添加日期</span>
                    <Input v-model="filter.add_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Input v-model="filter.add_dates[0]" />
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
                    <Input v-model="filter.update_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Input v-model="filter.update_dates[1]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="add">新增线下支付</button>
                </li>
            </ul>
        </div>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
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
        <Dialog :show.sync="dia_show" title="标题标题">
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
                        <li>
                            <span>银行名称:</span>
                            <Select style="width:250px;" v-model="form.bank" :options="bank_opt"></Select>
                        </li>
                        <li>
                            <span>支付方式:</span>
                            <Select style="width:250px;" v-model="form.pay" :options="pay_opt"></Select>
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
                            <Input class="w250" v-model="form.bank_card" />
                        </li>
                        <li>
                            <span>最低入款:</span>
                            <Input class="w250" v-model="form.bank_card" />
                        </li>
                        <li>
                            <span>最高入款:</span>
                            <Input class="w250" v-model="form.bank_card" />
                        </li>
                        <li>
                            <span>入款手续费:</span>
                            <Input class="w250" v-model="form.bank_card" />
                        </li>
                    </ul>
                    <ul class="form">
                        <li>
                            <span>标签选择</span>
                            <AuthorityTree style="width:350px;" :list="menu_list" />
                        </li>
                        <li class="declare">
                            <span>说明:</span>
                            <textarea class="textarea"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="mt20 center-box">
                    <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                    <button class="btn-blue">确认</button>
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
import AuthorityTree from '../../commonComponents/AuthorityTree.vue'
export default {
    components: {
        AuthorityTree: AuthorityTree
    },
    data() {
        return {
            filter: {
                type: '',
                account: '',
                name: '',
                add_dates: [],
                update_person: '',
                update_dates: []
            },
            type_opt: [
                { label: '全部', value: '' },
                { label: '银行卡转账', value: '1' },
                { label: '支付宝转账', value: '2' },
                { label: '银行扫码', value: '3' },
                { label: '支付宝扫码', value: '4' },
                { label: '微信扫码', value: '5' }
            ],
            headers: [
                '入款类型',
                '收款名称',
                '收款姓名',
                '入款账号',
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
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            dia_show: false,
            inconm_opt: [
                { label: '银行卡', value: 0 },
                { label: '支付宝', value: 0 },
                { label: '扫码支付', value: 0 }
            ],
            bank_opt: [
                { label: '银行卡', value: 0 },
                { label: '支付宝', value: 0 },
                { label: '扫码支付', value: 0 }
            ],
            pay_opt: [
                { label: '银行卡', value: 0 },
                { label: '支付宝', value: 0 },
                { label: '扫码支付', value: 0 }
            ],
            form: {
                inconm: '',
                bank: ''
            },
            menu_list: [],

            mod_show: false,
        }
    },
    methods: {
        add() {
            this.dia_status = 'add'
            this.dia_title = '新增线下支付'

            this.dia_show = true
        },
        edit() {
            this.dia_status = 'edit'
            this.dia_title = '修改'

            this.dia_show = true
        },
        del() {
            this.mod_show = true
        },
        modConf() {

        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {
        this.menu_list = window.all.menu_list
    }
}
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
</style>