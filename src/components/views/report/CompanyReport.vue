<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>起止时间:</span>
                    <Date
                        type="daterange"
                        styleLeft="85px"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.day || '--'}}</td>
                    <td>{{row.withdraw_sum || '--'}}</td>
                    <td>{{row.recharge_sum || '--'}}</td>
                    <td>{{row.reduced_sum || '--'}}</td>
                    <td>{{row.activity_sum || '--'}}</td>
                    <td
                        :class="row.recharge_sum-row.withdraw_sum-row.reduced_sum-row.activity_sum>0?'green':'red'"
                    >
                        <span
                            v-if="row.recharge_sum-row.withdraw_sum-row.reduced_sum-row.activity_sum>0"
                        >+</span>
                        {{row.recharge_sum-row.withdraw_sum-row.reduced_sum-row.activity_sum}}
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
    </div>
</template>


<script>
export default {
    name: "CompanyReport",
    data() {
        return {
            quick_query: [],
            filter: {
                dates: []
            },
            headers: [
                "日期",
                "提款金额",
                "充值金额",
                "优惠金额",
                "活动金额",
                "盈利金额"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
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
                report_day: report_day
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.company_report_list;
            this.$http({ method, url, data }).then(res => {
                console.log("公司报表", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        timeUpdate() {
            this.quick_query = this.filter.dates;
        },
        qqUpd(dates) {
            let arr = [dates[0], dates[1]];
            this.$set(this.filter, "dates", arr);
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        clearFilter() {
            this.filter = {
                dates: []
            };
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
                    if (firstList[j].path == "/report/companyreport") {
                        fatherList = fatherTemplate;
                        childList = firstList[j];
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeader = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.day || '--',
                        item.withdraw_sum || '--',
                        item.recharge_sum || '--',
                        item.reduced_sum || '--',
                        item.activity_sum || '--',
                        item.recharge_sum-item.withdraw_sum-item.reduced_sum-item.activity_sum
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "公司报表",
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
.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
}
</style>
