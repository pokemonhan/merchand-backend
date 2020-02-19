<template>
    <div class="container">
        <!------------------   跑马灯消息  ------------->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="addMarquee">添加公告</button>
                </li>
                <li>
                    <span>公告标题</span>
                    <Input v-model="filter.header" />
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
        <!-- <div v-if="dia_show" class="modal-mask">
            <div class="v-modal">
                <div @click="dia_show=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>

            </div>
        </div>-->
        <Dialog :show.sync="dia_show" title="标题标题">
            <div class="dia-inner">
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
                        <div class="equip-check">
                            <Checkbox v-model="form.select_all" label="全选" @update="equipSelectAll"></Checkbox>
                            <Checkbox v-model="equip[0]" label="iOS" @update="equipSelect()"></Checkbox>
                            <Checkbox v-model="equip[1]" label="Android" @update="equipSelect()"></Checkbox>
                            <Checkbox v-model="equip[2]" label="PC" @update="equipSelect()"></Checkbox>
                            <Checkbox v-model="equip[3]" label="H5" @update="equipSelect()"></Checkbox>
                        </div>
                    </li>
                    <li>
                        <span>开始时间:</span>
                        <Date style="width:250px;" />
                    </li>
                    <li>
                        <span>结束时间:</span>
                        <Date style="width:250px;" />
                    </li>
                    <li class="status">
                        <span>状态选择:</span>
                        <Switchbox class="stat-switch" v-model="form.status" />
                    </li>
                </ul>
                <div style="margin-top:50px;text-align:center;">
                    <button class="btn-plain-large mr100" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large">保存</button>
                </div>
            </div>
        </Dialog>
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
                header: ''
            },
            headers: [
                '公告标题',
                '内容',
                '设备',
                '添加时间',
                '开始时间',
                '结束时间',
                '状态',
                '发布人',
                '最后更新人',
                '最后跟新时间',
                '操作'
            ],
            list: [
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                },
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                },
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '2019/09/20 12:25:20',
                    a6: 'admin',
                    a7: true
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false,

            form: {
                name: '',
                content: '',
                status: true
            },
            equip: [0, 0, 0, 0],
            show_conf: false
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        equipSelectAll() {
            let bool = this.form.select_all
            for (let i = 0; i < this.equip.length; i++) {
                this.$set(this.equip, i, bool)
            }
        },
        equipSelect() {
            // 如果都为true 全选为true
            this.form.select_all = this.equip.every(item => item)
        },
        initForm() {
            this.form = {
                name: '',
                content: '',
                status: false
            }
            this.equip = [0, 0, 0, 0]
        },
        addMarquee() {
            this.dia_show = true
            this.initForm()
        },
        editMarquee() {
            this.dia_show = true
            this.initForm()
        },
        marqueeDelConf() {
            console.log('确认删除')
        }
    },
    mounted() {}
}
</script>

<style scoped>
/* .container    在公共区 App.vue */
/* .modal-mask ---在 App.vue公共区 */
/* .filter    ---在 App.vue公共区 */

.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
}
.td-switch {
    width: 42px;
    margin: 0 auto;
}

.dia-inner {
    width: 800px;
    height: 500px;
}
.form {
    width: 370px;
    margin: 0 auto;
    /* border: 1px solid #000; */
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
.equip-check {
    display: flex;
    flex-wrap: wrap;
    width: 280px;
}
.equip-check .v-checkbox:nth-child(2),
.equip-check .v-checkbox:nth-child(3) {
    margin-left: 30px;
}
.equip-check .v-checkbox:nth-child(4) {
    margin-top: 10px;
}
.equip-check .v-checkbox:nth-child(5) {
    margin-left: 40px;
    margin-top: 10px;
}

.status .stat-switch {
    position: relative;
    top: 10px;
}
.mr100 {
    margin-right: 100px;
}
</style>
