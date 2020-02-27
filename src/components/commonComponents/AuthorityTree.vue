<template>
    <div>
        <!-- 展示tab [x] -->
        <div class="show-selected" @click="openTree">
            <span
                class="sel-item"
                v-for="(item, index) in tagShow.filter(item=>tagShowObj[item])"
                :key="index"
                @click.stop
            >
                <span>{{tagShowObj[item]}}</span>
                <i class="iconfont iconcuowuguanbi-" @click.stop="tabClose(item,index)"></i>
            </span>
        </div>

        <!-- 树 -->
        <div v-show="tree_show" ref="tree" class="drop-list" v-clickoutside="closeTree">
            <Tree style="width:fit-content" :list="tree_list" @change="treeUpd" />
        </div>
    </div>
</template>

<script>
import Tree from '../commonComponents/Tree'
export default {
    name: 'AuthorityTree',
    components: {
        Tree: Tree
    },
    props: {
        menutree: {
            type: Array,
            default: []
        },
        value: {
            type: Array,
            default: []
        }
    },
    model: {
        prop: 'value',
        event: 'update'
    },
    data() {
        return {
            tree_show: false,
            tagShow: [],
            tree_list: [],
            tagShowObj: {}, //id为key ,名字为值,方便展示
            isShow: true //是否需要重新展示 当watch为false 就不会再次设置图形变化
        }
    },
    methods: {
        // 点击组权限框, 下拉打开 tree
        openTree() {
            if (!this.tree_show) {
                setTimeout(() => {
                    this.tree_show = true
                    $(this.$refs.tree).slideDown(200)
                }, 0)
            }
        },
        // 关闭 tree 下拉内容
        closeTree() {
            if (!this.tree_show) return
            this.tree_show = false
        },
        // 关闭 tab 框(点击tab里那个叉叉时触发..)
        tabClose(closeId, index) {
            this.tagShow = this.tagShow.filter(item => item !== closeId)
            this.treeSelectShow(this.tagShow)
            this.isShow = false
            this.$emit('update', this.tagShow)
        },

        // tree 点击更新时
        treeUpd(bool, index, list) {
            // 重新赋值让其能检测到
            this.tree_list = list.slice()
            this.getTabList()
        },

        // 返回已选中权限数组 （有[x]的tab框子）
        getTabList() {
            let tabShowList = []
            function getCheckedArr(arr) {
                arr.forEach(item => {
                    if (!item.child) {
                        // 没有子项，就是路由,当选中，放入 tabShowList中，方便展示
                        item.checked && tabShowList.push(item.id)
                    } else {
                        item.child && getCheckedArr(item.child)
                    }
                })
            }
            getCheckedArr(this.tree_list)
            this.isShow = false
            this.$emit('update', tabShowList)
            return tabShowList
        },

        // 子集全选,则父级选中 。
        // isChildSelAll() {
        //     let isSelectAll = function(arr) {
        //         arr.forEach(item => {
        //             if (item.child) {
        //                 item.checked = item.child.every(item => item.checked)
        //                 isSelectAll(item.child)
        //             }
        //         })
        //     }
        //     isSelectAll(this.tree_list)
        //     this.tree_list = this.tree_list.slice()
        // },

        /**
         * @description 根据选中的数组 展示勾选 tree中此项
         * @param {Array} arr 选中的id数组
         */
        treeSelectShow(arr) {
            // console.log('tree 更新');
            // 当前权限数组
            let authority_arr = arr

            // id 是否在选择项数组中
            function isSelect(id) {
                return authority_arr.indexOf(id) !== -1
            }

            function setMenuChecked(list) {
                return list.map(item => {
                    item.checked = isSelect(item.id)
                    if (item.child) {
                        setMenuChecked(item.child)
                        // 子项是否全部选中
                        item.checked = item.child.every(item => item.checked)
                    }
                    return item
                })
            }
            this.tree_list = setMenuChecked(this.tree_list).slice()
        },
        // 获取和id对应的中文对象
        setTabObj(list) {
            let temp_obj = {}
            function setObj(arr) {
                arr.forEach(item => {
                    if (!item.child) {
                        // 没有子项，就是路由,当选中，放入 temp_obj中
                        temp_obj[item.id] = item.label
                    } else {
                        item.child && setObj(item.child)
                    }
                })
            }
            setObj(list)
            this.tagShowObj = temp_obj
        }
    },
    watch: {
        value(val) {
            // console.log('watch val: ', val)
            this.tagShow = this.value.slice()
            // console.log('this.isShow: ', this.isShow);
            if (this.isShow) {
                
                this.treeSelectShow(val)
            } else {
                this.isShow = true
            }
        },
        menutree(list) {
            // console.log('list: ', list);
            this.tree_list = list
            this.setTabObj(list)
        }
    },
    mounted() {

        this.tree_list = this.menutree
        this.setTabObj(this.tree_list)

        this.tagShow = this.value.slice()
        this.treeSelectShow(this.tagShow)
    }
}
</script>

<style scoped>
/* 选择组权限 */
.show-selected {
    /* display: flex; */
    /* flex-wrap: wrap; */
    width: 100%;
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
</style>
