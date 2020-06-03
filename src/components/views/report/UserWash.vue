<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" class="w90" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" class="w90" v-model="filter.userId" />
                </li>
                <li>
                    <span>日期</span>
                    <Date type="daterange" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.game_platform" :options="filter.game_platform_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearFilter()">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.day || '--'}}</td>
                    <td>{{row.mobile || '--'}}</td>
                    <td>{{row.game_vendor && row.game_vendor.name || '--'}}</td>
                    <td>{{row.guid || '--'}}</td>
                    <td>{{row.effective_bet || '--'}}</td>
                    <td>{{row.commission || '--'}}</td>
                    <td>
                        <button class="btns-blue" @click="detail(row)">查看</button>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @update="updateNo"
            @updateSize="updateSize"
        />
        <Dialog :show.sync="show_detail" title="明细">
            <UserWashDetail :row="curr_row"></UserWashDetail>
        </Dialog>
    </div>
</template>


<script>
import UserWashDetail from "./UserWashDetail";
export default {
    name: "UserWash",
    components: {
        UserWashDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                userId: "",
                dates: [],
                game_platform: "",
                game_platform_opt: []
            },
            headers: [
                "日期",
                "会员账号",
                "游戏平台",
                "会员ID",
                "当前有效投注",
                "洗码彩金",
                "查看洗码明细"
            ],
            list: [],
            show_detail: false,
            total: 0,
            pageNo: 1,
            pageSize: 25,
            curr_row: {}
        };
    },
    methods: {
        detail(row) {
            this.show_detail = true;
            this.curr_row = row;
        },
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
                guid: this.filter.userId,
                report_day: report_day
            };
            console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.user_wash_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        getSelectOpt() {
            let { url, method } = this.$api.game_search_condition_list;
            this.$http({ url, method }).then(res => {
                // console.log('下拉数据',res)
                if (res && res.code == "200") {
                    this.select = res.data;
                    this.filter.game_platform_opt = this.backToSelOpt(
                        res.data && res.data.gameVendors
                    );
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
        qqUpd(dates) {
            let arr = [dates[0], dates[1]];
            this.$set(this.filter, "dates", arr);
        },
        timeUpdate() {
            this.quick_query = this.filter.dates;
        },
        clearFilter() {
            this.filter = {
                dates: []
            };
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getMenuList() {
            if (!window.all.tool.getLocal("Authorization")) return;
            if (window.all.tool.getLocal("menu")) {
                this.menu_list = window.all.tool.getLocal("menu");
            }
        },
        exportExcel() {
            console.log("列表", this.menu_list);
            let firstList = {};
            let childList = {};
            let fatherList = {};
            for (var i = 0; i < this.menu_list.length; i++) {
                firstList = this.menu_list[i].children;
                let fatherTemplate = this.menu_list[i];
                for (var j = 0; j < firstList.length; j++) {
                    if (firstList[j].path == "/report/userwash") {
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
                        (item.game_vendor && item.game_vendor.name) || "--",
                        item.guid || "--",
                        item.effective_bet || "--",
                        item.commission || "--"
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "会员洗码列表",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
    },
    mounted() {
        this.getSelectOpt();
        this.getList();
        this.getMenuList();
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
.table {
    margin-top: 20px;
}
</style>
