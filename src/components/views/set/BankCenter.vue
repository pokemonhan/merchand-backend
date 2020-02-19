 <template>
    <div class="container">
        <!-- 银行卡反查中心 -->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input v-model="filter.acc" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input v-model="filter.id" />
                </li>
                <li>
                    <span>银行名称</span>
                    <Select v-model="filter.bank" :options="bank_opt"></Select>
                </li>
                <li>
                    <span>银行卡号</span>
                    <Input v-model="filter.card" />
                </li>
                <li>
                    <span>绑定日期</span>
                    <Date type="daterange" v-model="filter.dates[0]" />
                </li>
            </ul>
        </div>
        <div class="talbe mt20">
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
                    <td>
                        <button class="btns-red" @click="delclick(row)">删除</button>
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
                acc: '',
                id: '',
                bank: '',
                card: '',
                dates: ['', '']
            },
            bank_opt: [
                { label: '全部', value: 0 },
                { label: '测试', value: 1 }
            ],
            headers: [
                '会员账号',
                '会员ID',
                '真实姓名',
                '银行名称',
                '绑定银行卡号',
                '绑定日期',
                '单卡绑定次数',
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
            //mod
            mod_show: false,
        }
    },
    methods: {
        delclick(row) {
            this.mod_show = true
        },
        modConf() {},
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>
 
 <style scoped>
</style>