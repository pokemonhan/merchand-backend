<template>
    <div class="container">
        <!-- ------------- 个人报表 ---------------- -->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" class="w100" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" class="w100" v-model="filter.user_id" />
                </li>
                <li>
                    <span>起止时间</span>
                    <Date type="daterange" v-model="filter.dates" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
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
                    <td>{{row.mobile || '--'}}</td>
                    <td>{{row.guid || '--'}}</td>
                    <td>{{row.recharge_sum+'/'+row.recharge_num || '--'}}</td>
                    <td>{{row.withdraw_sum+'/'+row.withdraw_num || '--'}}</td>
                    <td>{{row.bet_sum+'/'+row.bet_num || '--'}}</td>
                    <td>{{row.reduced_sum || '--'}}</td>
                    <td>{{row.effective_bet_sum || '--'}}</td>
                    <td>{{row.commission || '--'}}</td>
                    <td>{{row.activity_sum || '--'}}</td>
                    <td :class="row.game_win_sum-row.bet_sum>0?'green':'red'">
                        <span v-if="row.game_win_sum-row.bet_sum>0">+</span>
                        {{row.game_win_sum-row.bet_sum || '--'}}
                    </td>
                    <td
                        :class="row.game_win_sum-row.bet_sum-row.activity_sum-row.reduced_sum>0?'green':'red'"
                    >{{row.game_win_sum-row.bet_sum-row.activity_sum-row.reduced_sum || '--'}}</td>
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
    </div>
</template>


<script>
export default {
    name: "PersonalReport",
    data() {
        return {
            filter: {
                account: "",
                user_id: "",
                dates: []
            },
            headers: [
                "日期",
                "会员账号",
                "会员ID",
                "入款金额/笔数",
                "出款金额/笔数",
                "总投注/笔数",
                "优惠金额",
                "有效投注额",
                "返利",
                "活动金额",
                "游戏盈亏",
                "实际盈亏"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            menu_list: []
        };
    },
    methods: {
        getList() {
            let report_day = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                report_day = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas = {
                mobile: this.filter.account,
                guid: this.filter.user_id,
                report_day: report_day
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.personal_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
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
        //获取列表
        getMenuList() {
            if (!window.all.tool.getLocal("Authorization")) return;
            if (window.all.tool.getLocal("menu")) {
                this.menu_list = window.all.tool.getLocal("menu");
            }
        },
        exportExcel() {
            // console.log("列表", this.menu_list);
            let firstList = {};
            let childList = {};
            let fatherList = {};
            for (var i = 0; i < this.menu_list.length; i++) {
                firstList = this.menu_list[i].children;
                let fatherTemplate = this.menu_list[i];
                for (var j = 0; j < firstList.length; j++) {
                    if (firstList[j].path == "/report/personalreport") {
                        fatherList = fatherTemplate;
                        childList = firstList[j];
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeader = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.day || "--",
                        item.mobile || "--",
                        item.guid || "--",
                        item.recharge_sum + "/" + item.recharge_num || "--",
                        item.withdraw_sum + "/" + item.withdraw_num || "--",
                        item.bet_sum + "/" + item.bet_num || "--",
                        item.reduced_sum || "--",
                        item.effective_bet_sum || "--",
                        item.commission || "--",
                        item.activity_sum || "--",
                        item.game_win_sum - item.bet_sum,
                        item.game_win_sum -
                            item.bet_sum -
                            item.activity_sum -
                            item.reduced_sum
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "个人报表",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
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
