<template>
    <div class="container">
        <h4>跑马灯消息</h4>
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
                    <td>{{row.a6}}</td>
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
        <div v-if="show_modal" class="modal-mask">
            <div class="v-modal">
                <div @click="show_modal=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <div>
                    <ul class="form">
                        <li>
                            <span>公告名称:</span>
                            <Input class="w250" v-model="form.name" />
                        </li>
                        <li>
                            <span>公告内容:</span>
                            <textarea class="announce-content" />
                        </li>
                        <li>
                            <span>设备选择:</span>
                            <Checkbox v-model="form.select_all" label="全选" @update="equipSelectAll"></Checkbox>
                            <Checkbox
                                style="margin-left:20px"
                                v-for="(item, index) in ['IOS', 'Android', 'PC', 'H5']"
                                :key="index"
                                v-model="form.equip[index]"
                                :label="item"
                                @update="equipSelect(item,index)"
                            ></Checkbox>
                        </li>
                        <li>
                            <span>开始时间:</span>
                            <Date style="width:250px;" />
                        </li>
                        <li>
                            <span>结束时间:</span>
                            <Date style="width:250px;" />
                        </li>
                        <li class="status-radio">
                            <span>状态选择</span>
                            <Radio
                                class="radio-left"
                                label="开"
                                :value="form.status"
                                val="on"
                                v-model="form.status"
                            />
                            <Radio
                                class="radio-right"
                                label="关"
                                :value="form.status"
                                val="off"
                                v-model="form.status"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal
            :show="show_conf"
            title="跑马丁消息"
            content="是否删除该公告!"
            @cancel="show_conf=false"
            @confirm="marqueeDelConf"
        ></Modal>
    </div>
</template>


<script>
export default {
    data() {
        return {
            filter: {
                header: ""
            },
            headers: [
                "公告标题",
                "内容",
                "设备",
                "添加时间",
                "开始时间",
                "结束时间",
                "状态",
                "发布人",
                "最后更新人",
                "最后跟新时间",
                "操作"
            ],
            list: [
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: true
                },
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: true
                },
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: true
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            show_modal: false,
            form: {
                name: "",
                content: "",
                equip: [0, 0, 0, 0],
                status: ""
            },
            show_conf: false
        };
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        equipSelectAll() {
            for (let i = 0; i < this.form.equip.length; i++) {
                this.form.equip[i] = this.form.select_all;
            }
        },
        equipSelect(item, index) {
            // 如果都为true 全选为true
            this.form.select_all = this.form.equip.every(item => item);
        },
        addMarquee() {
            this.show_modal = true;
            // 初始化对象
            this.form = {
                name: "",
                content: "",
                equip: [0, 0, 0, 0],
                status: ""
            };
        },
        editMarquee() {
            this.show_modal = true;
        },
        marqueeDelConf() {
            console.log("确认删除");
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
.form {
    /* display: flex; */
    /* justify-content: center; */
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}
.w250 {
    width: 250px;
}
.form > li {
    display: flex;
    align-items: baseline;
    margin-top: 20px;
}
.form > li > span:first-child {
    margin-right: 30px;
}

.announce-content {
    padding: 10px;
    width: 250px;
    min-height: 130px;
    border-radius: 4px;
    border: 1px solid #ddd;
}
.status-radio .radio-right {
    margin-left: 80px;
}
</style>
