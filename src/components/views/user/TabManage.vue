<template>
    <div class="container">
        <!--  标签管理-->
        <div class="head">
            <button class="btn-blue" @click="add_tab">添加标签</button>
        </div>
        <div class="table">
            <Table :headers="table_header" :column="list">
                <!-- '编号','标签名称','禁止取款','禁止登录','禁止游戏','禁止推广','添加时间','操作' -->
                <template v-slot:item="{row,idx}">
                    <td>{{idx+1}}</td>
                    <td>{{row.a}}</td>
                    <td>
                        <i :class="['iconfont',row.b==='1'?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.c==='1'?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.d==='1'?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>
                        <i :class="['iconfont',row.e==='1'?'icongou green':'iconcha red']"></i>
                    </td>
                    <td>{{row.f}}</td>
                    <td>
                        <span class="a" @click="editTab">编辑</span>
                        <span class="a" @click="delTab">删除</span>
                    </td>
                </template>
            </Table>
        </div>
        <div class="page">
             <Page class="table-page" :total="total" :pageNo.sync="pageNo" :pageSize.sync="pageSize" @updateNo="updateNo" @updateSize="updateSize"/>
           
            
        </div>
        <div class="modal-mask" v-if="show_mask">
            <div class="v-modal">
                <div class="mod-head">
                    <span>{{mask_head}}</span>
                    <i class="iconfont iconcuowuguanbi-" @click="show_mask=false"></i>
                </div>
                <div class="mod-body">
           <ul class="form">
                    <li>
                        <span>标签名称:</span>
                        <Input size="small" v-model="tab_name" />
                    </li>
                    <li>
                        <span>禁止出款:</span>
                        <Switchbox />
                    </li>
                    <li>
                        <span>禁止登录:</span>
                        <Switchbox />
                    </li>
                    <li>
                        <span>禁止游戏:</span>
                        <Switchbox />
                    </li>
                    <li>
                        <span>禁止推广:</span>
                        <Switchbox />
                    </li>
                    <li>
                        <button class="btn-plain-large  mr100" @click="show_mask=false">取消</button>
                        <button class="btn-blue-large">保存</button>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        <!-- <div class="modal-mask" v-if="show_mask">
            <div class="v-modal">
                <div @click="show_mask=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
             
            </div>
        </div> -->
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
            user_acc: '',
            funds_type: '',
            funds_type_option: [
                { label: 'ds', value: '2' },
                { label: 'one', value: '3' },
                { label: 'sdfdsf', value: '4' }
            ],
            game_id: '',
            table_header: [
                { label: '编号' },
                { label: '标签名称' },
                { label: '禁止取款' },
                { label: '禁止登录' },
                { label: '禁止游戏' },
                { label: '禁止推广' },
                { label: '添加时间' },
                { label: '操作' }
            ],
            list: [
                {
                    a: '一般会员',
                    b: '1',
                    c: '1',
                    d: '1',
                    e: '1',
                    f: '2019/11/02 12:30:23'
                },
                {
                    a: '钻石会员',
                    b: '0',
                    c: '0',
                    d: '0',
                    e: '0',
                    f: '2019/11/02 12:30:23'
                }
            ],
            total:0,
            pageNo: 1,
            pageSize: 25,
            show_mask: false,
            mask_head: '',
            tab_name: '',
            show_delete_tab_conf: false
        }
    },
    methods: {
        sclick() {},
        updateNo(val) {},
        updateSize(val) {},
        add_tab() {
            this.show_mask = true
            this.mask_head = '添加标签'
        },
        editTab() {
            this.show_mask = true
            this.mask_head = '编辑标签'
        },
        delTab() {
            this.show_delete_tab_conf = true
        },
        delTabConf() {}
    },
    mounted() {}
}
</script>

<style scoped>
/* 公共区 */
/* .container {
    padding: 20px 8px 20px 8px;
    background: #fff;
    border-radius: 5px;
    border-top-left-radius: 0;
} */

.head{
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
/* .modal-mask .iconcuowuguanbi- {
    公共区样式
} */

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
.del-label .btn button {
    margin-top: 70px;
    /* padding: 8px 16px; */
}
.del-label .btn .btn-plain-normal {
    margin-right: 60px;
}
/* .red .green 公共区样式 */
</style>