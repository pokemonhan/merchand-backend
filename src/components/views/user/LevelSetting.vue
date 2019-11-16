<template>
    <div class="container">
         <!-- 会员列表 -->

        <div>
            <button class="btn-blue">添加等级</button>
        </div>

        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td style="height:30px">{{row.b}}</td>
                    <td>{{row.a}}</td>
                    <td>{{row.b}}</td>
                    <td>{{row.c}}</td>
                    <td>{{row.d}}</td>
                    <td>{{row.e}}</td>
                    <td>
                        <span class="a" @click="showLevelEdit">编辑</span>
                        <span class="a" @click="showDeleteModal(row)">删除</span>
                    </td>
                </template>
            </Table>
            <Page
                class="page"
                :total="total"
                :pagerCount="pagerCount"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <div class="modal-mask" v-if="edit_modal">
            <div class="v-modal">
                <div @click="edit_modal=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div class="center-box">
                    <ul class="form">
                    <li>
                        <span>晋级方式</span>
                        <Select style="width:216px;" v-model="up_method" :options="up_method_opt"></Select>
                    </li>
                    <li>
                        <span>等级名称</span>
                        <Input class="w216" v-model="lev_name" />
                    </li>
                    <li>
                        <span>额度转换:</span>
                        <Input style="width:95px;margin-right:8px;" v-model="exchange_a" />
                        <span> = </span>
                        <Input style="width:95px;margin-left:8px;" v-model="exchange_b" />
                    </li>
                    <li>
                        <span>晋级经验:</span>
                        <Input class="w216" v-model="up_experience" />
                    </li>
                    <li>
                        <span>晋升奖励:</span>
                        <Input class="w216" v-model="up_bonus" />
                    </li>
                    <li>
                        <span>周奖励:</span>
                        <Input class="w216" v-model="week_bonus" />
                    </li>
                  
                </ul>
                <div style="margin-top:50px;text-align:center;">
                    <button class="btn-plain-normal mr" @click="edit_modal=false">取消</button>
                    <button class="btn-blue-normal" @click="editModalSave">保存</button>
                </div>
                </div>
            </div>
        </div>
        <Modal :show="show_del_modal" title="删除等级" content="是否删除该玩家等级" @cancel="show_del_modal=false" @confirm="delConfirm"></Modal>
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
                { label: "编号" },
                { label: "等级称号" },
                { label: "晋级条件" },
                { label: "晋级彩金" },
                { label: "周奖励" },
                { label: "修改时间" },
                { label: "操作" },
            ],
            list: [
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
                { a: "1", b: "VIP1", c: "0 ~ 1000", d: "----", e: "2019/12/15 12:12:00", },
               
            ],
            total: 0,
            pagerCount: 0,
            //晋级方式
            up_method: '',
            up_method_opt:[
                {label:'充值', value:1},
                {label:'打码量', value:2}
            ],
            edit_modal: false,
            /* ----------  form ------------ */
            lev_name: '',           // 等级名称
            exchange_a: '',         // 额度转换a
            exchange_b: '',         // 额度转换b
            up_experience: '',      // 晋级经验
            up_bonus: '',           // 晋升奖励
            week_bonus: '',         // 周奖励
            /* 删除 */
            show_del_modal: false
        };
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        showLevelEdit() {
            this.edit_modal = true;
        },
        showDeleteModal(row){
            console.log(row)
            this.show_del_modal = true
        },
        editModalSave() {

        },
        delConfirm() {
            console.log('我删除了.')
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


.table {
    margin-top: 15px;
}
.page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
/* modal-mask  --在index.html区域中 */
.v-modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 450px;
    padding: 30px 50px;
    border-radius: 7px;
    background: #fff;
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

.form > li{
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form > li > span:first-child{
   min-width: 5em;
    /* margin-right: 8px; */
}
.w216{
    width: 216px;
}
.center-box{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.mr{
    margin-right: 100px;
}
</style>