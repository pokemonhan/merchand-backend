<template>
    <div class="container">
        <!-- 登录记录 -->
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:100px;" limit="en-num" v-model="filter.mobile" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.uniqueld" />
                </li>
                <li>
                    <span>登录日期</span>
                    <Date type="datetimerange" v-model="filter.dates" style="width:300px" />
                </li>
                <li>
                    <span>登录IP</span>
                    <Input style="width:100px" v-model="filter.lastLoginIp" />
                </li>
                <li>
                    <span>
                        <button class="btn-blue" @click="getList">查询</button>
                    </span>
                    <span>
                        <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.mobile}}</td>
                    <td>{{row.uid}}</td>
                    <td>{{row.last_login_ip}}</td>
                    <td>{{row}}</td>
                    <td>{{row.last_login_device}}</td>
                    <td>{{row.last_login_time}}</td>
                </template>
            </Table>
            <Page
                class="page"
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
    name: "LoginLog",
    data() {
        return {
            // game_plant: "2",
            // game_plant_option: [
            //     { label: "全部", value: "2" },
            //     { label: "甲", value: "3" }
            // ],
            // user_id: "",
            filter: {
                mobile: "",
                uniqueld: "",
                dates: [],
                login_ip: ""
            },
            headers: [
                "会员账号",
                "会员ID",
                "登录IP",
                "登录网址",
                "登录设备",
                "登录日期"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            menu_list:[],
        };
    },
    methods: {
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        },
        getList() {
            let createdAt = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createdAt = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let para = {
                mobile: this.filter.mobile,
                guid: this.filter.uniqueld,
                created_at: createdAt,
                last_login_ip: this.filter.lastLoginIp,
                page:this.pageNo,
                pageSize:this.pageSize

            };
            let data = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.user_login_log_list;
            this.$http({ method: method, url: url, data }).then(
                res => {
                    // console.log("res", res);
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                    }
                }
            );
        },
        //获取列表
        getMenuList(){
            if(!window.all.tool.getLocal('Authorization')) return
            if(window.all.tool.getLocal('menu')){
                this.menu_list=window.all.tool.getLocal('menu')
            }
        },
        exportExcel() {
            console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/user/loginlog'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeader = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.mobile,
                        item.uid,
                        item.last_login_ip,
                        item.a4,
                        item.last_login_device,
                        item.last_login_time
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename:fatherList.label+'-'+"登录记录",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
    },
    mounted() {
        this.getList();
        this.getMenuList()
    }
};
</script>

<style scoped>
/* .container .filter 公共区 App.vue */
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

.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>