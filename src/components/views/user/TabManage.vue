<template>
    <div class="container">
        <!--  标签管理-->
        <div class="head">
            <button class="btn-blue" @click="addTab">添加标签</button>
        </div>
        <div class="table">
            <Table :headers="table_header" :column="list">
                <!-- '编号','标签名称','禁止取款','禁止登录','禁止游戏','禁止推广','添加时间','操作' -->
                <template v-slot:item="{row,idx}">
                    <td>{{idx+1}}</td>
                    <td>{{row.title}}</td>
                    <td>
                        <i :class="['iconfont',row.no_withdraw===1 ?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.no_login===1 ?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.no_play===1 ?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.no_promote===1 ?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <button class="btn-blue" @click="editTab(row)">编辑</button>
                        <button class="btn-red" @click="delTab(row)">删除</button>
                    </td>
                </template>
            </Table>
        </div>
        <div class="page">
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <!-- <div class="modal-mask" v-if="mod_show">
            <div class="v-modal">
                <div class="mod-head">
                    <span>{{mask_head}}</span>
                    <i class="iconfont iconcuowuguanbi-" @click="mod_show=false"></i>
                </div>
                
            </div>
        </div> -->
        <Dialog class="modal-mask" :show.sync="mod_show" title="编辑">
            <div class="dia-inner">
                <div class="mod-body">
                    <ul class="form">
                        <li>
                            <span>标签名称:</span>
                            <Input size="small" v-model="form.title" />
                        </li>
                        <li>
                            <span>禁止出款:</span>
                            <Switchbox v-model="form.no_withdraw" />
                        </li>
                        <li>
                            <span>禁止登录:</span>
                            <Switchbox v-model="form.no_login" />
                        </li>
                        <li>
                            <span>禁止游戏:</span>
                            <Switchbox v-model="form.no_play" />
                        </li>
                        <li>
                            <span>禁止推广:</span>
                            <Switchbox v-model="form.no_promote" />
                        </li>
                        <li>
                            <button class="btn-plain-large mr100" @click="mod_show=false">取消</button>
                            <button class="btn-blue-large" @click="diaCfm">保存</button>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
        <!-- <div class="modal-mask" v-if="mod_show">
				<div class="v-modal">
					<div @click="mod_show=false">
						<i class="iconfont iconcuowuguanbi-"></i>
					</div>
				
				</div>
        </div>-->
        <!-- 删除-确认框 -->
        <Modal
            :show="show_delete_tab_conf"
            title="标签管理"
            content="是否删除该标签"
            @cancel="show_delete_tab_conf=false"
            @close="show_delete_tab_conf=false"
            @confirm="delTabConf"
        ></Modal>
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
                { label: "禁止取款" },
                { label: "禁止登录" },
                { label: "禁止游戏" },
                { label: "禁止推广" },
                { label: "添加时间" },
                { label: "操作" }
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            mod_show: false,
            mod_status: "",
            mask_head: "",
            tab_name: "",
            show_delete_tab_conf: false,
            curr_row: {},
            form: {}
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
        initForm() {
            this.form = {
                title: "",
                no_withdraw: true,
                no_login: true,
                no_play: true,
                no_promote: true
            };
        },
        addTab() {
            this.initForm();
            this.mask_head = "添加标签";
            this.dia_status = "addTab";
            this.mod_show = true;
            // this.addCfm()
        },
        addCfm() {
            if (!this.checkForm()) return;
            console.log("form", this.form);
            let data = {
                title: this.form.title,
                no_withdraw: this.form.no_withdraw ? 1 : 0,

                no_login: this.form.no_login ? 1 : 0,
                no_play: this.form.no_play ? 1 : 0,
                no_promote: this.form.no_promote ? 1 : 0
            };
            let { url, method } = this.$api.tag_add;
            this.$http({ method, url, data }).then(res => {
                console.log("res", res);
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                }
            });
        },
        checkForm() {
            if (this.form.title === "") {
                this.$toast.warning("标签名称不可为空");
                return false;
            }
            return true;
        },

        editTab(row) {
            // console.log('row: ', row);
            this.mod_show = true;
            this.mask_head = "编辑标签";
            this.dia_status = "editTab";
            this.form = Object.assign({}, row);
            // console.log('row',row)
        },

        editCfm(row) {
            console.log("row", row);
            let data = {
                id: this.form.id,
                title: this.form.title,
                no_withdraw: this.form.no_withdraw ? 1 : 0,
                no_login: this.form.no_login ? 1 : 0,
                no_play: this.form.no_play ? 1 : 0,
                no_promote: this.form.no_promote ? 1 : 0
            };
            let { url, method } = this.$api.tag_edit;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.mod_show = false;
                    this.getList();
                } else {
                    if (res && res.message !== "") {
                        this.$toast.error(res.message);
                    }
                }
            });
        },

        diaCfm() {
            if (this.dia_status === "addTab") {
                // console.log('this.dia_status: ', this.dia_status);
                this.addCfm();
            }
            if (this.dia_status === "editTab") {
                this.editCfm();
            }
        },

        delTab(row) {
            this.curr_row = row;
            this.show_delete_tab_conf = true;
        },
        delTabConf() {
            let data = {
                id: this.curr_row.id
            };
            let { url, method } = this.$api.tag_del;
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === "200") {
                    this.$toast.success(res && res.message);
                    this.show_delete_tab_conf = false;
                    this.getList();
                } else {
                    if (res && res.message !== "") {
                        
                    }
                }
            });
        },
        getList() {
            let para = {
                page:this.pageNo,
                pageSize:this.pageSize
            };
            let params = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.tag_list;
            this.$http({ method, url ,params}).then(res => {
                // console.log("res", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total=res.data.total;
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
/* 公共区 */
/* .container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
} */

.head {
    padding: 12px 10px;
    background: #f2f2f2;
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

/* .modal-mask .iconcuowuguanbi- {
    公共区样式
} */
.mod-body {
    min-width: 600px;
    min-height: 400px;
}
.form {
    /* display: flex; */
    /* justify-content: center; */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}
.form > li {
    display: flex;
    /* justify-content: center; */
    margin-top: 20px;
}
.form > li > span:first-child {
    margin-right: 30px;
}
.form > li:last-child {
    margin-top: 50px;
}

.mr100 {
    margin-right: 100px;
}

.del-label {
    min-width: 450px;
    min-height: 260px;
    position: absolute;

    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 7px;
}
.del-label .inner {
    position: absolute;

    z-index: 2;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    white-space: nowrap;
    text-align: center;
    font-size: 20px;
}
.del-label .btn button {
    margin-top: 70px;
    /* padding: 8px 16px; */
}
.del-label .btn .btn-plain-normal {
    margin-right: 60px;
}
/* .red .green 公共区样式 */
</style>