 <template>
    <div class="container">
        <!-- 银行卡反查中心 -->
        <div class="filter ">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.acc" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.id" />
                </li>
                <li>
                    <span>银行名称</span>
                    <Select input style="width:200px;" v-model="filter.bank" :options="bank_opt"></Select>
                </li>
                <li>
                    <span>银行卡号</span>
                    <Input limit="en-num" v-model="filter.card" />
                </li>
                <li>
                    <span>绑定日期</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" />
                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
                </li>
            </ul>
        </div>
        <div class="talbe mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>{{row.owner_name}}</td>
                    <td>{{row.bank_name}}</td>
                    <td>{{row.card_number}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.binding_num}}</td> 
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
import axios from 'axios' 
export default {
    name: 'BankCenter',
    data() {
        return {
            filter: {
                acc: '',
                id: '',
                bank: '',
                card: '',
                dates:[],
            },
            bank_opt: [],
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
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //mod
            mod_show: false,
            curr_row:{},
            jsonList:{},
            bankListData:[]
        }
    },
    methods: {
        //获取json资源
        getJsonData(){
            axios.get('http://pic.397017.com/common/linter.json').then(res=>{
                // console.log('json',res)
                if(res && res.status=='200'){
                    this.jsonList=res.data
                    if(this.jsonList){
                        let bankList=this.jsonList.system_banks_available
                        if(bankList){
                            let bankListPath=bankList.path
                            // console.log('银行地址',bankListPath)
                            axios.get(bankListPath).then(res=>{
                                if(res && res.status=='200'){
                                    this.bankListData=res.data
                                    // console.log('银行列表',this.bankListData)
                                    this.bank_opt=this.backToSelOpt(res.data)
                                }
                            })
                        }
                    }
                }
            })
        },
        backToSelOpt(list=[]){
            let all=[
                {
                    label:"全部",
                    value:""
                }
            ];
            let back_list=list.map(item=>{
                return {label:item.name+'('+item.code+')',value:item.id};
            })
            return all.concat(back_list)
        },
        delclick(row) {
            this.mod_show = true
            this.curr_row=row;

        },
        modConf(row) {
            let data={
                id:this.curr_row.id
            }
            let {method,url}=this.$api.bank_cards_del;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.mod_show=false;
                    this.getList();
                }
            })
        },

        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },
        getList(){
            // let created_at=''
            // if(this.filter.dates[0] && this.filter.dates[1]){
            //     created_at=JSON.stringify([this.filter.dates[0],this.filter.dates[1]])
            // }
            let datas={
                mobile:this.filter.acc,
                user_id:this.filter.id,
                bank_id:this.filter.bank,
                card_number:this.filter.card,
                created_at:JSON.stringify([this.filter.dates[0],this.filter.dates[1]]),
                page:this.pageNo,
                pageSize:this.pageSize
           }
            // console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas) 
            let {method,url}=this.$api.bank_cards_list
            this.$http({method,url,data}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
               }
           })
        },
    },
    mounted() {
        this.getList();
        this.getJsonData();
    }
}
</script>
 
 <style scoped>
 .filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
</style>