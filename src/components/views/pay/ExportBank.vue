<template>
    <div class="container">
        <!-- 出款银行管理 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>银行名称</span>
                    <Input v-model="filter.acc" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList()">查询</button>
                </li>
            </ul>
        </div>
        <div class="talbe mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.bank}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.last_editor}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <button class="btn-blue" v-if="row.status===0" @click="enable(row)">启用</button>
                        <button class="btn-red" v-if="row.status===1" @click="disable(row)">禁用</button>
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
        <Modal
            :show.sync="mod_show"
            :title="dia_title"
            :content="dia_content"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>
<script>
export default {
    name: "ExportBank",
    data() {
        return {
            filter: {
                acc: "",
                status: ""
            },
            status_opt: [
                { label: "全部", value: "" },
                { label: "启用", value: 1 },
                { label: "禁用", value: 0 }
            ],
            headers: [
                "编号",
                "银行名称",
                "状态",
                "最后更新人",
                "最后更新时间",
                "操作"
            ],
            list: [
                {
                    a1: "64646466",
                    a2: "sdfsdfdsf",
                    a3: "充支好礼",
                    a4: "1",
                    a5: "2019-02-02 21:30",
                    status: 1
                },
                {
                    a1: "64646466",
                    a2: "sdfsdfdsf",
                    a3: "充支好礼",
                    a4: "1",
                    a5: "2019-02-02 21:30",
                    status: 0
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            mod_show: false,
            dia_status: "",
            dia_title: "",
            dia_content: "",
            curr_row: {}
        };
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        getList() {
            let datas = {
                bank: this.filter.acc,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.payment_bank_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data;
                    this.total = res.data.length;
                }
            });
        },
        modConf() {
            if (this.dia_status == "enable") {
                this.enableCfm();
            }
            if (this.dia_status == "disable") {
                this.disableCfm();
            }
        },
        enable(row) {
            this.dia_status = "enable";
            this.mod_show = true;
            this.dia_title = "启用";
            this.dia_content = "是否启用该银行";
            this.curr_row = row;
        },
        enableCfm() {
            let data = {
                id: this.curr_row.id,
                status: 1
            };
            let { method, url } = this.$api.payment_bank_status;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        disable(row) {
            this.dia_status = "disable";
            this.mod_show = true;
            this.dia_title = "禁用";
            this.dia_content = "是否禁用该银行";
            this.curr_row = row;
        },
        disableCfm() {
            let data = {
                id: this.curr_row.id,
                status: 0
            };
            let { method, url } = this.$api.payment_bank_status;
            this.$http({ method, url, data }).then(res => {
                console.log("返回信息", res);
                if (res && res.code == "200") {
                    this.$toast.success(res.message);
                    this.mod_show = false;
                    this.getList();
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
</style>