<template>
    <div>
        <button class="btn-blue" @click="joinRule">参与规则</button>
        <div class="table mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>
                        <button class="btns-blue" @click="edit(row)">编辑</button>
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
        <Dialog :show.sync="dia_show" title="编辑">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>参与方式:</span>
                        <Radio
                            class="mr20"
                            label="当日打码"
                            :value="form.method"
                            val="1"
                            v-model="form.method"
                        />
                        <Radio
                            label="当日充值"
                            :value="form.method"
                            val="0"
                            v-model="form.method"
                        />
                    </li>
                    <li>
                        <span>完成打码:</span>
                        <Input class="w250" v-model="form.code" />
                    </li>
                    <li>
                        <span>奖励金额:</span>
                        <div class="form-money">
                            <Input class="w100" v-model="form.money[0]" />
                            <span style="margin:0 21px;">~</span>
                            <Input class="w100" v-model="form.money[0]" />
                        </div>
                    </li>
                    <li class="btn-group">
                        <button class="btn-plain mr50" @click="dia_show=false">取消</button>
                        <button class="btn-blue">确认</button>
                    </li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>


<script>
export default {
    props: {},
    data() {
        return {
            headers: ['参与方式', '完成条件', '赠金范围', '操作'],
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
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },

            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            dia_show: false,
            form: {
                method: '1',
                code:'',
                money: []
            }
        }
    },
    methods: {
        joinRule() {
            this.dia_status = 'join'
            this.dia_title = '参与规则'
            this.dia_show = true
        },
        edit(row) {
            this.dia_status = 'edit'
            this.dia_title = '编辑'
            this.dia_show = true
        },
        updateNo(val) {
            // this.getList()
        },
        updateSize(val) {
            this.pageNo = 1
            // this.getList()
        }
    },
    mounted() {}
}
</script>

<style scoped>
.form li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form li:first-child{
    margin-top: 0;
}
.form li > span:first-child {
    margin-right: 20px;
}
.form-money {
    display: flex;
    align-items: center;
}
.btn-group {
    display: flex;
    justify-content: center;
}
</style>
