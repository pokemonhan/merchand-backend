<template>
    <div class="withhold">
        <QuickQuery :data="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left withhold-filter">
                <li>
                    <span>会员账号</span>
                    <Input style="width:100px;" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>游戏ID</span>
                    <Input style="width:100px;" limit="en-num" v-model="filter.game_id" />
                </li>
                <li>
                    <span>操作时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.offcial_acc" :options="official_opt"></Select>
                </li>
                <li>
                    <span>礼金类型</span>
                    <Select v-model="filter.gift_type" :options="gift_opt"></Select>
                </li>
                <li class="right">
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExccel()">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                    <button class="btn-blue" @click="eventGiftAdd">人工操作活动礼金</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
                    <td>{{row}}</td>
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
        <Dialog :show.sync="dia_show" title="活动礼金">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>会员账号/ID</span>
                        <Input limit="en-num" class="w250" v-model="form.account" />
                    </li>
                    <li>
                        <span>礼金类型</span>
                        <Select
                            style="width:250px;"
                            v-model="form.gift_type"
                            :options="gift_type_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>礼金金额</span>
                        <Input limit="number" class="w250" v-model="form.gift_amount" />
                    </li>
                    <li>
                        <span>备注</span>
                        <textarea
                            style="width:250px;height:100px;"
                            name="textarea"
                            class="textarea"
                            v-model="form.remark"
                        ></textarea>
                    </li>
                </ul>
                <div class="dia-buttons">
                    <button class="btn-plain-large" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large ml50" @click="eventGiftAddCfm"  >确定</button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                game_id: "",
                dates: [],
                offcial_acc: "",
                gift_type: ""
            },
            gift_opt: [],
            official_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            headers: [
                "订单号",
                "会员账号",
                "会员ID",
                "礼金类型",
                "正式账号",
                "礼金金额",
                "账户余额",
                "操作时间",
                "操作人",
                "备注"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show:false,
            form:{
                account:'',
                gift_type:'',
                gift_amount:'',
                remark:''
            },
            gift_type_opt:[],
        };
    },
    methods: {
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        qqUpd(dates) {
            //同步时间筛选值
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "dates", arr);
        },
        timeUpdate() {
            //同步快捷查询时间
            this.quick_query = this.filter.dates;
        },
        clearFilter() {
            this.filter = {
                account: "",
                game_id: "",
                dates: [],
                offcial_acc: "",
                withhold_type: ""
            };
        },
        clearForm() {
            this.form = {
                account: "",
                withhold_type: "",
                withhold_amount: "",
                remark: ""
            };
        },
        getList() {},
        getMenuList(){
            if(!window.all.tool.getLocal('Authorization')) return
            if(window.all.tool.getLocal('menu')){
                this.menu_list=window.all.tool.getLocal('menu')
            }
        },
        exportExccel() {
            console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/funds/manualaccess'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            import("../../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        //to do
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename:fatherList.label+'-'+  "人工活动礼金记录",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });

        },
        eventGiftAdd() {
            this.dia_show=true
        },
        eventGiftAddCfm(){

        },
    },
    mounted() {
        this.getList();
        this.getMenuList();
    }
};
</script>
<style  scoped>
.filter {
    padding-bottom: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
}
.withhold-filter li {
    margin-top: 10px;
}
.dia-inner {
    width: 700px;
    height: 350px;
}
.dia-inner .form {
    width: 360px;
    margin: 0 auto;
}
.dia-inner .form li {
    display: flex;
    margin-top: 20px;
}
.form li{
    align-items: center;
}
.form li > span:first-child {
    min-width: 80px;
    text-align: right;
    margin-right: 10px;
}
.w250 {
    width: 250px;
}
.dia-buttons {
    margin-top: 50px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
</style>