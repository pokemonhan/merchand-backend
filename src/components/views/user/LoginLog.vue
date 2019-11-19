<template>
    <div class="container">

         <!-- 登录记录 -->
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:110px" class="game-account" />
                </li>
                <li>
                    <span>游戏ID</span>
                    <Input style="width:110px" class="game-id"  />
                </li>
                <li>
                    <span>登录日期</span>
                    <Date />
                </li>
            </ul>
            <div class="right">
                <span>
                    <button class="btn-blue">查询</button>
                </span>
                <span>
                    <button class="btn-blue">导出Excel</button>
                </span>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td style="height:30px">{{row.b}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.d}}</td>
                </template>
            </Table>
             <Page class="page" :total="total" :pageNo.sync="pageNo" :pageSize.sync="pageSize" @updateNo="updateNo" @updateSize="updateSize"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            game_plant: "2",
            game_plant_option: [
                { label: "全部", value: "2" },
                { label: "甲", value: "3" }
            ],
            user_id: "",
            headers: [
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "登录IP" },
                { label: "登录网址" },
                { label: "登录设备" },
                { label: "登录日期" }
            ],
            list: [
                {
                    a: "1",
                    b: "2",
                    c: "192.168.1.1(中国.广州）",
                    d: "2019/12/15 12:12:00"
                },
                {
                    a: "1",
                    b: "2",
                    c: "192.168.1.1(中国.广州）",
                    d: "2019/12/15 12:12:00"
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
        };
    },
    methods: {
      
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
}
.filter {
    /* display: flex; */
    line-height: 30px;
}
/* .filter > ul > li {
    margin-right: 15px;
    line-height: 28px;
}
.filter {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
} */
.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>