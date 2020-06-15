<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>游戏名称</span>
                    <Input class="w100" v-model="filter.account" />
                </li>
                <li>
                    <span>起止时间</span>
                    <Date type="daterange" v-model="filter.dates" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button
                        class="btn-blue"
                        style="margin-left:10px;"
                        @click="exportExcel()"
                    >导出Excel</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.day || '--'}}</td>
                    <td>{{row.game_name || '--'}}</td>
                    <td>{{row.effective_bet || '--'}}</td>
                    <td>{{row.tax || '--'}}</td>
                    <td>{{row.bet_money || '--'}}</td>
                    <td>{{row.commission || '--'}}</td>
                    <td :class="row.win_money-row.bet_money>0? 'green':'red'">
                        <span v-if="row.win_money-row.bet_money>0" >+</span>
                        {{row.win_money-row.bet_money}}
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        
    </div>
</template>


<script>
export default {
    name: "GameReportDetail",
    props: {
        row: Object
    },
    data() {
        return {
            filter: {
                account: "",
                dates: []
            },
            headers: [
                "日期",
                "游戏名称",
                "有效下注",
                "游戏税收",
                "总投注额",
                "佣金/返利",
                "游戏盈亏"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            menu_list:[],
        };
    },
    methods: {
        getList() {
            // console.log('row',this.row)
            let project_day = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                project_day = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas = {
                game_vendor_sign: this.row.game_vendor_sign,
                game_name: this.filter.account,
                report_day: project_day
            };
            // console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.game_report_list_detail;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.list=res.data.data
                    this.total=res.data.total
                }
            });
        },
        //获取列表
        getMenuList(){
            if(!window.all.tool.getLocal('Authorization')) return
            if(window.all.tool.getLocal('menu')){
                this.menu_list=window.all.tool.getLocal('menu')
            }
        },
        exportExcel() {
            // console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/report/platformbet'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeader = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.day || '--',
                        item.game_name || '--',
                        item.effective_bet || '--',
                        item.tax || '--',
                        item.bet_money || '--',
                        item.commission || '--',
                        item.win_money-item.bet_money || '--',
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "游戏报表-详情",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
    },
    mounted() {
        this.getList();
        this.getMenuList();
    }
};
</script>

<style scoped>
.ph5 {
    padding-left: 5px;
    padding-right: 5px;
}
.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
}
</style>