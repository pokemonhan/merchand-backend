<template>
    <div class="container">
        <!------------------   跑马灯消息  ------------->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <button class="btn-blue" @click="addMarquee">添加跑马灯消息</button>
                </li>
                <li>
                    <span>消息标题</span>
                    <Input v-model="filter.header" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.title}}</td>
                    <td style="max-width:300px;">{{row.content}}</td>
                    <td>{{getDevice(row.device)}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.start_time}}</td>
                    <td>{{row.end_time}}</td>
                    <td>
                        <Switchbox :value="row.status" @update="switchStatus($event,row)" />
                    </td>
                    <td>{{row.author && row.author.name}}</td>
                    <td>{{row.last_editor && row.last_editor.name}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btns-blue" @click="editMarquee(row)">编辑</button>
                        <button class="btns-red" @click="del(row)">删除</button>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>公告名称:</span>
                        <Input class="w250" v-model="form.name" />
                    </li>
                    <li>
                        <span>公告内容:</span>
                        <textarea class="announce-content" v-model="form.content" />
                    </li>
                    <li>
                        <span>设备选择:</span>
                        <div class="equip-check">
                            <Checkbox v-model="form.select_all" label="全选" @update="equipSelectAll"></Checkbox>
                            <Checkbox
                                v-model="equip[0]"
                                label="PC"
                                value="1"
                                @update="equipSelect()"
                            ></Checkbox>
                            <Checkbox
                                v-model="equip[1]"
                                label="H5"
                                value="2"
                                @update="equipSelect()"
                            ></Checkbox>
                            <Checkbox
                                v-model="equip[2]"
                                label="APP"
                                value="3"
                                @update="equipSelect()"
                            ></Checkbox>
                        </div>
                    </li>
                    <li>
                        <span>时间范围:</span>
                        <Date type="datetimerange" style="width:320px;" v-model="form.dates" />
                    </li>
                    <li class="status">
                        <span>状态选择:</span>
                        <Switchbox class="stat-switch" v-model="form.status" />
                    </li>
                </ul>
                <div style="margin-top:50px;text-align:center;">
                    <button class="btn-plain-large mr100" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large" @click="diaCfm">保存</button>
                </div>
            </div>
        </Dialog>
        <Modal
            :show.sync="show_conf"
            title="跑马丁消息"
            content="是否删除该公告!"
            @cancel="show_conf=false"
            @confirm="marqueeDelConf"
        ></Modal>
    </div>
</template>


<script>
export default {
    name: 'Marquee',
    data() {
        return {
            filter: {
                header: ""
            },
            headers: [
                "跑马灯消息标题",
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
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false,

            form: {
                name: "",
                content: "",
                dates: [],
                status: true
            },
            equip: [0, 0, 0],
            show_conf: false,
            dia_status: "",
            dia_title: "",
            curr_row: {},
            device_name: {
                1: "PC",
                2: "H5",
                3: "APP"
            }
        };
    },
    methods: {
        getDevice(device) {
            let device_all = "";
            // console.log("传值", device);
            for (let i = 0; i < device.length; i++) {
                let item = device[i];
                let name = this.device_name[item];
                device_all = device_all + name + ",";
            }
            return device_all.slice(0, -1);
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        equipSelectAll() {
            let bool = this.form.select_all;
            for (let i = 0; i < this.equip.length; i++) {
                this.$set(this.equip, i, bool);
            }
        },
        equipSelect() {
            // 如果都为true 全选为true
            this.form.select_all = this.equip.every(item => item);
        },
        initForm() {
            this.form = {
                name: "",
                content: "",
                dates: [],
                status: false
            };
            this.equip = [0, 0, 0];
        },
        diaCfm() {
            // console.log(2);
            if (this.dia_status == "addMarquee") {
                this.addCfm();
            }
            console.log("dia_status: ", this.dia_status);

            if (this.dia_status == "editMarquee") {
                this.editCfm();
            }
        },
        addMarquee() {
            this.initForm();
            this.dia_status = "addMarquee";
            this.dia_show = true;
            this.dia_title = "添加公告";
        },
        addCfm() {
            let device_opt = [];
            for (let i = 0; i < this.equip.length; i++) {
                if (this.equip[i]) {
                    device_opt.push(i + 1);
                }
            }
            let data = {
                title: this.form.name,
                content: this.form.content,
                device: JSON.stringify(device_opt),
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            let { url, method } = this.$api.announce_marquee_add;
            this.$http({ method, url, data }).then(res => {
                console.log('返回数据',res);
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        switchStatus(val, row) {
            let data = {
                id: row.id,
                status: val ? 1 : 0
            };
            let { url, method } = this.$api.announce_marquee_change_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        editMarquee(row) {
            this.dia_status = "editMarquee";
            this.dia_show = true;
            this.dia_title = "编辑";
            this.initForm();
            let device_status = row.device;
            // console.log(device_status)
            for (let i = 0; i < device_status.length; i++) {
                // console.log('打印',i)
                let item = device_status[i];
                this.equip[item - 1] = true;
            }
            this.form = {
                id: row.id,
                name: row.title,
                content: row.content,
                dates: [row.start_time,row.end_time],
                status: row.status
            };
        },
        editCfm() {
            let device_list = [];
            for (let i = 0; i < this.equip.length; i++) {
                if (this.equip[i]) {
                    device_list.push(i + 1);
                }
            }
            let data = {
                id: this.form.id,
                title: this.form.name,
                content: this.form.content,
                device: JSON.stringify(device_list),
                start_time: this.form.dates[0],
                end_time: this.form.dates[1],
                status: this.form.status
            };
            // console.log('请求数据',data)
            let { url, method } = this.$api.announce_marquee_edit;
            this.$http({ method, url, data }).then(res => {
                // console.log('返回数据',res)
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.dia_show = false;
                    this.getList();
                }
            });
        },
        del(row) {
            this.curr_row = row;
            this.show_conf = true;
        },
        marqueeDelConf() {
            let data = {
                id: this.curr_row.id
            };
            let { url, method } = this.$api.announce_marquee_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res && res.message);
                    this.show_conf = false;
                    this.getList();
                }
            });
        },
        getList() {
            let datas = {
                title: this.filter.header,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { url, method } = this.$api.announce_marquee_list;
            this.$http({ url, method, data }).then(res => {
                // console.log(res)
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>
/* .container    在公共区 App.vue */
/* .modal-mask ---在 App.vue公共区 */
/* .filter    ---在 App.vue公共区 */

.p10 {
    padding: 10px;
}
table {
    border-collapse: collapse;
    width: 100%;
}
.table {
    margin-top: 8px;
    width: 100%;
    overflow-x: auto;
}
.table .v-table {
    min-height: 0;
    width: 2000px;
}
.dia-inner {
    width: 800px;
    height: 500px;
}
.form {
    width: 390px;
    margin: 0 auto;
    /* border: 1px solid #000; */
}
.w250 {
    width: 320px;
}
.form > li {
    display: flex;
    align-items: baseline;
    margin-top: 20px;
}
.form > li > span:first-child {
    min-width:5em;
    margin-right: 5px;
}

.announce-content {
    padding: 10px;
    width: 320px;
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
    margin-left: 20px;
}
.equip-check .v-checkbox:nth-child(4) {
    margin-left: 20px;
}
.status .stat-switch {
    position: relative;
    top: 10px;
}
.mr100 {
    margin-right: 100px;
}
</style>
