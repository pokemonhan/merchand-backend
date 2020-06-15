<template>
    <div class="container">
        <!-- 游戏报表 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>平台名称</span>
                    <Select
                        input
                        style="width:200px;"
                        v-model="filter.account"
                        :options="game_vendors_opt"
                    ></Select>
                </li>
                <li>
                    <span style="margin-left:10px ">起始时间</span>
                    <Date type="daterange"  v-model="filter.dates" />
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
                    <td>{{row.day}}</td>
                    <td>{{row.game_vendor_name}}</td>
                    <td>{{row.effective_bet}}</td>
                    <td>{{row.tax}}</td>
                    <td>{{row.bet_money }}</td>
                    <td>{{row.commission}}</td>
                    <td :class="row.win_money-row.bet_money>0?'green':'red'">
                        <span v-if="row.win_money-row.bet_money>0">+</span>
                        {{row.win_money-row.bet_money}}
                    </td>
                    <td>
                        <button class="btns-blue" @click="detail(row)">详情</button>
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
        <Dialog :show.sync="show_detail" title="详情">
            <div class="dia-inner">
                <GameReportDetail :row="curr_row" ></GameReportDetail>
            </div>
        </Dialog>
    </div>
</template>


<script>
import GameReportDetail from "./GameReoprtDetail";
import axios from "axios";
export default {
    name: "GameReport",
    components: {
        GameReportDetail
    },
    data() {
        return {
            filter: {
                account: "",
                dates: []
            },
            headers: [
                "日期",
                "平台名称",
                "有效下注",
                "游戏税收",
                "总投注额",
                "佣金/返利",
                "游戏盈亏",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            show_detail: false,
            jsonList: {},
            gameVendorData: {},
            game_vendors_opt: [],
            curr_row: {}
        };
    },
    methods: {
        detail(row) {
            this.show_detail = true;
            this.curr_row = row;
        },
        //获取json资源 下拉框数据
        getJsonData() {
            axios.get("http://pic.397017.com/common/linter.json").then(res => {
                // console.log('json',res)
                if (res && res.status == "200") {
                    this.jsonList = res.data;
                    if (this.jsonList) {
                        let gameVendor = this.jsonList.game_vendors__games;
                        if (gameVendor) {
                            let gameVendorPath = gameVendor.path;
                            // console.log('厂商',gameVendorPath)
                            axios.get(gameVendorPath).then(res => {
                                if (res && res.status == "200") {
                                    this.gameVendorData = res.data;
                                    // console.log('厂商',this.gameVendorData)
                                    this.game_vendors_opt = this.backToSelOpt(
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
            let all = [
                {
                    label: "全部",
                    value: ""
                }
            ];
            let back_list = list.map(item => {
                return { label: item.name, value: item.name };
            });
            return all.concat(back_list);
        },
        getList() {
            let project_data = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                project_data = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas = {
                game_vendor_name: this.filter.account,
                report_day: project_data
            };
            console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.game_report_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
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
            let firstList = {};
            let childList = {};
            let fatherList = {};
            for (var i = 0; i < this.menu_list.length; i++) {
                firstList = this.menu_list[i].children;
                let fatherTemplate = this.menu_list[i];
                for (var j = 0; j < firstList.length; j++) {
                    if (firstList[j].path == "/report/gamereport") {
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
                        item.game_vendor_name || "--",
                        item.effective_bet || "--",
                        item.tax || "--",
                        item.bet_money || "--",
                        item.commission || "--",
                        item.win_money || "--"
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "游戏报表",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
    },
    mounted() {
        this.getJsonData();
        this.getList();
        this.getMenuList();
    }
};
</script>

<style scoped>
.ph5 {
    margin-left: 5px;
    margin-right: 5px;
}
.table {
    margin-top: 20px;
}
</style>
