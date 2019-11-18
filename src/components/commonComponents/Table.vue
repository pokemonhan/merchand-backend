<template>
    <div class="table-container" :class="css">
        <table>
            <thead>
                <tr>
                    <th v-if="haveCheckbox">
                        <input type="checkbox" class="checkbox" v-model="all_checked" @change="onChange('all', $event)" />
                    </th>
                    <th v-for="(col, index) in headers" :key="index">
                        <!-- <div v-if="col.label.split(',').length!==0"></div> -->
                        <div v-for="(item, index) in col.label.split(',')" :key="index">{{item}}</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(col_row, idx) in column" :key="idx">
                    <!-- <slot name="item" :row="row"></slot> -->
                    <td v-if="haveCheckbox">
                        <input
                            type="checkbox"
                            class="checkbox"
                            v-model="col_row.checked"
                            @change="onChange(idx, $event)"
                        />
                    </td>
                    <slot name="item" :row="col_row"></slot>
                </tr>
                <slot name="tr"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        css: Object,
        headers: Array,
        column: Array,
        haveCheckbox: {
            type:Boolean,
            default:()=>false
        }
    },
    data() {
        return {
            all_checked: false,
            check_list: []
        };
    },
    methods: {
        onChange(index, e) {
            // 全选或全不选
            if (index === "all") {
                // this.check_list = this.check_list.map(item => e.target.checked)
                this.column.forEach(item => {
                    item.checked = this.all_checked;
                });
            } else {
                this.all_checked = this.column.every(item => item.checked);
            }
            
            /**
             *  @param {String,Number}  index               点击的哪个checkbox, 'all'全部;其他index 第几个
             *  @param {Boolean}        e.target.checked    Boolean 是否选中
             *  @param {Array}          this.check_list     存储 checkbox Array 的数组
             *  */
            this.$emit( "checkboxChange", index, e.target.checked, this.check_list );
        }
    },
    mounted() {
        // 初始化 list 得checked都为false
        this.column.forEach(item => {
            item.checked = false;
        });
    }
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

tbody tr:nth-child(2n){
    
    background: rgb(250, 249, 249);
}
tr td {
    text-align: center;
    padding: 8px 4px;
    border: 1px solid rgb(212, 211, 211);
    font-size: 13px;
}
tbody tr:hover {
    background: #eee;
}
.container table th {
    padding: 8px 6px;
    border: 1px solid rgb(212, 211, 211);
    color: #4c8bfc;
    background: #e6f7ff;
}
.checkbox {
    transform: scale(1.5);
    position: relative;
    top: 4px;
}

</style>