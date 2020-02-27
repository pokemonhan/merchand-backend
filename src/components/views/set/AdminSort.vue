<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <!-- <button class="btn-blue">查找</button> -->
                    <button class="btn-blue" @click="addsort">创建分组</button>
                </li>
            </ul>
        </div>
        <div class="cont">
            <div class="cont-left">
                <ul>
                    <li v-for="(group,index) in group_list" :key="index">
                        <div class="li-left">
                            <p class="li-hd">
                                <span @click="check(group)">{{group.group_name}}</span>
                            </p>
                            <span>{{group.id!==1?group.created_at:''}}</span>
                        </div>

                        <div class="li-right">
                            <span v-if="group.id!==1" class="a" @click="del(group)">删除</span>
                            <span v-if="group.id!==1" class="a" @click="edit(group)">编辑</span>
                        </div>
                    </li>
                </ul>
                <div class="vertical-line"></div>
            </div>
            <!-- 右边的 页面 -->
            <div class="cont-right">
                <div class="edit-form">
                    <div>
                        <span
                            class="cont-r-hd"
                        >{{right_show==='add'?'创建组':right_show==='check'?'查看组':right_show==='edit'?'编辑组':right_show}}</span>
                    </div>
                    <div class="edit-name">
                        <p class="mb10">组名称:</p>
                        <Input style="width:300px;" v-model="form.group_name" />
                        <span v-show="!form.group_name" class="err-tips">组名称不可为空</span>
                    </div>
                    <div class="edit-authority">
                        <p class="mb10">选择组权限:</p>
                        <AuthorityTree :menutree="menu_tree" v-model="authority_list" />
                    </div>

                    <div v-if="!(curr_group.id===1 &&right_show!=='add')" class="mt50 t-center">
                        <button class="btn-plain-large" @click="cancel">取消</button>

                        <button
                            v-if="right_show==='add'"
                            class="btn-blue-large ml30"
                            @click="groupAddCfm"
                        >确定创建</button>

                        <button
                            v-if="right_show==='edit'"
                            class="btn-blue-large ml30"
                            @click="groupSetCfm"
                        >确定修改</button>

                        <button
                            v-if="right_show==='check'"
                            class="btn-blue-large ml30"
                            @click="groupSetCfm"
                        >确定</button>
                    </div>
                </div>
                <!-- 查看check之下面内容 -->
                <div v-if="right_show==='check'" class="mt20">
                    <!-- table 内容 -->
                    <div class="table">
                        <AdminTable :group_id="admin_id" />
                    </div>
                </div>
            </div>
        </div>

        <Modal :show.sync="mod_show" :title="mod_title" :content="mod_cont" @confirm="modConf"></Modal>
    </div>
</template>

<script>
import AuthorityTree from '../../commonComponents/AuthorityTree'
import Tree from '../../commonComponents/Tree'
import AdminTable from './AdminSortDir/AdminTable'
export default {
    components: {
        Tree: Tree,
        AdminTable: AdminTable,
        AuthorityTree: AuthorityTree
    },
    data() {
        return {
            right_show: 'add', // 默认右侧为添加组
            // filter: {
            //     group: ''
            // },
            group_list: [], // 展示列表
            form: {
                group_name: ''
            },
            tree_list: [],
            authority_list: [],
            tree_show: false,

            // table
            admin_id: '',

            // 启用 禁用modal
            mod_show: false,
            curr_group: {},
            mod_status: '',
            mod_title: '',
            mod_cont: '',

            menu_tree: [],
        }
    },
    computed: {},
    methods: {
        // 初始化tree 使其无选中项
        initTree(tree) {
            let arr = tree.map(item => {
                item.checked = false
                if (item.child) {
                    item.child = this.initTree(item.child)
                }
                return item
            })
            return arr
        },

        // 初始化mod 内容
        initMod() {
            this.mod_show = false
            this.curr_group = {}
            this.mod_status = ''
            this.mod_title = ''
            this.mod_cont = ''
        },

        // 创建按钮
        addsort() {
            this.right_show = 'add'
            this.form.group_name = ''
            this.authority_list = []
            // this.initTree(this.tree_list)
            // this.getAuthorityList()
        },

        // 查看其中一组
        check(group) {
            // console.log('group: ', group);
            this.right_show = 'check'
            this.curr_group = Object.assign({}, group)

            this.form.group_name = group.group_name
            this.admin_id = group.id
            // this.treeSelectShow(group)
            this.authority_list = (group.detail||[]).map(item =>item.menu_id)
            // console.log('this.authority_list: ', this.authority_list);
        },

        // 删除分组列表 按钮
        del(group) {
            this.mod_show = true
            this.curr_group = group // 存储当前点击的组
            this.mod_status = 'del'
            this.mod_title = '删除'
            this.mod_cont = '是否确认删除该分组！'
        },
        edit(group) {
            // console.log('group: ', group);
            this.right_show = 'edit'
            this.curr_group = group // 存储当前点击的组
            this.form.group_name = group.group_name
            this.authority_list = (group.detail||[]).map(item =>item.menu_id)
            // this.treeSelectShow(group)
        },

        // 后台res 转化为 tree 数组
        resToTree(list) {
            let arr = []
            arr = Object.keys(list).map(key => {
                let item = {}

                item.label = list[key].label
                item.id = list[key].id
                item.checked = false
                if (list[key].child) {
                    item.child = this.resToTree(list[key].child)
                }
                return item
            })
            return arr
        },

        // 获取后台所有权限树
        getTreeList() {
           
            let self = this
            let { url, method } = this.$api.current_admin_menu
            this.$http({
                method: method,
                url: url
            }).then(res => {
                // console.log('所有权限树: ', res)
                if (res && res.code === '200') {
                    this.total = res.data.total
                    // this.tree_list = this.resToTree(res.data)
                    this.menu_tree = this.resToTree(res.data)
                    // console.log('this.menu_tree: ', this.menu_tree);
                }
            })
        },
     
        cancel() {
            let group = Object.assign({}, this.curr_group)
            this.form.group_name = group.group_name
            this.admin_id = group.id
            this.authority_list = (group.detail||[]).map(item =>item.menu_id)
        },
        // 创建分组 ——确认
        groupAddCfm() {
            if (this.form.group_name === '') {
                return this.$toast.error('组名称不可以为空！')
            }

            let role = this.authority_list
            let data = {
                group_name: this.form.group_name,
                role: '[' + role.join(',') + ']'
            }

            let { url, method } = this.$api.admin_group_add
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === '200') {
                    this.$toast.success(res.message)
                    this.getGroupList() // 刷新分组列表
                }
            })
        },

        //  编辑 确认, 查看确认
        groupSetCfm() {
            if (this.form.group_name === '') {
                return this.$toast.error('组名称不可以为空！')
            }

            let role = this.authority_list
            let data = {
                id: this.curr_group.id,
                group_name: this.form.group_name,
                role: '[' + role.join(',') + ']'
            }
            let { method, url } = this.$api.admin_group_set
            this.$http({ method, url, data }).then(res => {
                if (res.code === '200') {
                    this.$toast.success(res.message)
                }
                this.getGroupList() // 刷新分组列表
            })
        },

        // 确认禁用,确认启用, 确认删除
        modConf() {
            // console.log('mod_确认');
            let group = this.curr_group
            switch (this.mod_status) {
                case 'del':
                    this.delGroup(group)
                    break

                // default:
                //     break;
            }
        },

        // 删除群组
        delGroup(group) {
            let data = {
                id: group.id,
                group_name: group.group_name
            }
            let { method, url } = this.$api.admin_group_del
            this.$http({ method, url, data }).then(res => {
                if (res.code === '200') {
                    this.$toast.success(res.message)
                    this.initMod()
                    this.getGroupList()
                }
            })
        },

        // 获取群组列表 (左侧的列表)
        getGroupList() {
            let { url, method } = this.$api.admin_group_list

            this.$http({ method, url }).then(res => {
                // console.log('res: ', res)
                if (res && res.code === '200') {
                    this.group_list = res.data
                }
            })
        }
    },
    mounted() {
        this.getGroupList()
        this.getTreeList()
    }
}
</script>

<style scoped>
.cont {
    display: flex;
    margin-top: 20px;
}
.cont-left {
    display: flex;
    /* todo */
    margin-left: 40px;
}
.cont .cont-left li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 50px;
    padding: 10px;
}
.cont-left li:nth-child(2n) {
    background: #e5f7ff;
}
.cont-left li:nth-child(2n-1) {
    background: #f9fbfc;
}
.cont .li-left .li-hd span {
    font-size: 16px;
    font-weight: bold;
    color: #4c8bfd;
    cursor: pointer;
}
.cont .li-left .li-hd span:active {
    color: red;
}
.vertical-line {
    width: 1px;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    background: #ededed;
}
.edit-form {
    width: 550px;
}
.err-tips {
    font-size: 12px;
    margin-left: 10px;
    color: red;
}
.cont-r-hd {
    font-size: 16px;
    font-weight: bold;
    color: #4c8bfd;
    border-bottom: 2px solid #4c8bfd;
}
.mt25 {
    margin-top: 25px;
}
.mb10 {
    margin-bottom: 10px;
}
.edit-name {
    /* width: 300px; */
    margin-top: 25px;
}
.edit-authority {
    margin-top: 20px;
}
/* 选择组权限 */
.show-selected {
    /* display: flex; */
    /* flex-wrap: wrap; */
    min-height: 165px;
    border: 1px solid #d9ecff;
    padding: 0 10px 10px 0;
    border-radius: 5px;
}

.sel-item {
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    padding: 3px 10px;

    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    background-color: #ecf5ff;
}
.iconcuowuguanbi- {
    width: 12px;
    vertical-align: middle;
    cursor: pointer;
    transform: scale(1);
}
.iconcuowuguanbi-:hover {
    color: red;
}
/* 选择组 下拉list */
.drop-list {
    margin-top: 10px;
    padding-top: 10px;
    padding-left: 50px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
}
/* 编辑组 确定取消 */
.mt50 {
    margin-top: 30px;
}
.t-center {
    text-align: center;
}
.ml30 {
    margin-left: 30px;
}

.mt20 {
    margin-top: 20px;
}
/* table 内容*/
.table {
    margin-top: 20px;
}
</style>
