<template> 
    <div class="container">
        
        <!--  标签管理-->
        <div>
            <button class="btn-blue" @click="add_tab">添加标签</button>
        </div>
        <div class="table">
            <Table :headers="table_header" :column="list">
                <template v-slot:item="{row}">
                    <td style="height:30px">{{row.a}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.d}}</td>
                    <td>{{row.e}}</td>
                    <td>{{row.f}}</td>
                    <td>
                        <span class="a"  @click="editTab">编辑</span>
                        <span class="a" @click="delTab">删除</span>
                    </td>
                </template>
            </Table>
        </div>
        <div class="page">
            <Page
                :total="total"
                :pagerCount="pagerCount"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <div class="modal-mask" v-if="show_mask">
            <div class="v-modal">
                 <div @click="show_mask=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <ul class="form">
                    <li>
                        <span>标签名称:</span>
                        <Input size="small" v-model="tab_name" />
                    </li>
                    <li>
                        <span>是否允许出款:</span>
                        <Switchbox/>
                    <li>
                        <span>是否允许登录:</span>
                         <Switchbox/>
                    </li>
                    <li>
                        <span>是否允许游戏:</span>
                        <Switchbox/>
                    </li>
                    <li>
                        <span>是否允许推广:</span>
                           <Switchbox/>
                    </li>
                    <li >
                        <button class="btn-plain p8-20 mr50" @click="show_mask=false">取消</button>
                        <button class="btn-blue p8-20">保存</button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 删除-确认框 -->
        <Modal :show="show_delete_tab_conf" 
            title="标签管理" content="是否删除该标签" 
            @cancel="show_delete_tab_conf=false" 
            @confirm="delTabConf">
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user_acc: "",
            funds_type: "",
            funds_type_option: [
                { label: "ds", value: "2" },
                { label: "one", value: "3" },
                { label: "sdfdsf", value: "4" }
            ],
            game_id: "",
            table_header: [
                { label: "编号" },
                { label: "标签名称" },
                { label: "允许取款" },
                { label: "允许登录" },
                { label: "允许游戏" },
                { label: "允许推广" },
                { label: "修改时间" },
                { label: "操作" }
            ],
            list: [
                {
                    a: "1",
                    b: "一般会员",
                    c: "是",
                    d: "是",
                    e: "是",
                    f: "2019/11/02 12:30:23"
                },
                {
                    a: "1",
                    b: "危险の会员",
                    c: "是",
                    d: "是",
                    e: "是",
                    f: "2019/11/02 12:30:23"
                }
            ],
            total: 0,
            pagerCount: 0,
            show_mask: false,
            tab_name: '',
            show_delete_tab_conf: false
        };
    },
    methods: {
        sclick() {},
        updateNo(val) {},
        updateSize(val) {},
        add_tab(){
            this.show_mask = true
        },
        editTab(){
            this.show_mask = true
        },
        delTab(){
            this.show_delete_tab_conf =true
        },
        delTabConf(){

        }
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
    height: 37px;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 0 10px;
}
.filter > ul {
    display: flex;
}
.filter > ul > li {
    display: flex;
    margin-right: 15px;
    line-height: 28px;
}
.filter > ul > li > span:first-child {
    padding-right: 8px;
}

.table {
    margin-top: 15px;
}
.a {
    font-weight: border;
    text-decoration: underline;
    cursor: pointer;
    color: #4c8bfd;
    margin-left: 8px;
}
.a:active {
    color: red;
}
/* .modal-mask   已转移到公共css*/
.v-modal {
    min-width: 500px;
    height: 400px;
    position: absolute;
    top: 100px;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 7px;
}
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}

.modal-mask .iconcuowuguanbi-:hover {
    color: #749ff0;
    cursor: pointer;
}
.form{
    /* display: flex; */
    /* justify-content: center; */
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
    white-space: nowrap;
}
.form>li{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.form>li>span:first-child{
    margin-right: 30px;
}
.form>li:last-child{
    margin-top: 50px;
}
.p8-20{
    padding: 8px 20px;
}
.mr50{
    margin-right: 50px;
}

.del-label {
    min-width: 450px;
    min-height: 260px;
    position: absolute;
    top: 50%;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 7px;
}
.del-label .inner {
    position: absolute;
    top: 50%;
    z-index: 2;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    white-space: nowrap;
    text-align: center;
    font-size: 20px;
}
.del-label .btn button{
    margin-top: 70px;
    /* padding: 8px 16px; */
}
.del-label .btn .btn-plain-normal{
    margin-right: 60px;
}
</style>