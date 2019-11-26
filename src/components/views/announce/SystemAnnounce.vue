<template>
    <div class="container">
        <h4>系统公告</h4>
        <div class="filter">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="addMarquee">添加公告</button>
                </li>
                <li>
                    <span>公告标题</span>
                    <Input class="w100" v-model="filter.header" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>
                        <Switchbox v-model="row.a7" />
                    </td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a7}}</td>
                    <td>
                        <button class="btns-blue" @click="editMarquee">编辑</button>
                        <button class="btns-red" @click="show_conf=true">删除</button>
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
    data() {
        return {
            filter: {
                header: ""
            },
            headers: [ "公告标题", "内容", "设备", "发布时间", "结束时间", "状态", "发布人", "最后更新人", "最后跟新时间", "操作" ],
            list: [ { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: true }, { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: true }, { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: true } ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
        
        };
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        addMarquee() {

        },
        editMarquee() {
            
        }
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
}
.table {
    margin-top: 20px;
}
/* .modal-mask ---在 App.vue公共区 */
.v-modal {
    width: 800px;
    height: 540px;
    position: absolute;
    top: 100px;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 7px;
}
</style>


</style>