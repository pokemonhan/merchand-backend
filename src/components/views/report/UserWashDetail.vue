<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>游戏名称</span>
                    <Input v-model="filter.account" />
                </li>
                <li style="width:220px;">
                    <span>日期</span>
                    <Date v-model="filter.dates" />
                    <span v-show="!filter.dates" style="color:red;margin-left:10px;">不能为空!</span>
                </li>
                <li>
                    <button class="btn-blue" @click="getListAgain">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.game && row.game.name || '--'}}</td>
                    <td>{{row.bet || '--'}}</td>
                    <td>{{row.effective_bet || '--'}}</td>
                    <td>{{row.commission || '--'}}</td>
                    <td>{{row.day || '--'}}</td>
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
    </div>
</template>

<script>
export default {
    props: {
        row: Object
    },
    data() {
        return {
            filter: {
                account: "",
                dates: []
            },
            headers: ["游戏名称", "下注额度", "有效投注", "洗码金额", "日期"],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        };
    },
    methods: {
        getListAgain() {
            // console.log('传入数据',this.row)
            if (!this.filter.dates) return;
            let report_day = "";
            if (this.filter.dates) {
                report_day = JSON.stringify([this.filter.dates]);
            }
            let datas = {
                guid: this.row.guid,
                game_vendor_sign: this.row.game_vendor_sign,
                game_name: this.filter.account,
                report_day: report_day
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.user_wash_detail;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        getList() {
            // console.log('传入数据',this.row)
            let datas = {
                guid: this.row.guid,
                game_vendor_sign: this.row.game_vendor_sign,
                game_name: this.filter.account,
                report_day: JSON.stringify([this.row.day])
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.user_wash_detail;
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
                        (item.game && item.game.name) || "--",
                        item.bet || "--",
                        item.effective_bet || "--",
                        item.commission || "--",
                        item.day || "--"
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fatherList.label + "-" + "会员洗码详情列表",
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
.table {
    margin-top: 20px;
}
</style>
