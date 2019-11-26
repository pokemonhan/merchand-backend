<template>
    <div class="contain">
        <div style="margin-top:20px;"></div>
        <div v-for="(row, index) in column" :key="index">
            <table class="first-table">
                <thead>
                    <tr>
                        <th @click="expand(index)">
                            <i :class="['iconfont',is_show[index]?'iconjianshao':'icontianjia']"></i>
                        </th>
                        <th v-for="(th, th_index) in headers[0]" :key="th_index">{{th.label?th.label:th}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <slot name="tdOne" :row="row"></slot>
                    </tr>
                    <slot name="tr1"></slot>
                </tbody>
            </table>

            <div class="second-table" :ref="'table_'+index">
                <table>
                    <thead>
                        <tr>
                            <th v-for="(th, index) in headers[1]" :key="index">{{th.label?th.label:th}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <slot name="tdTwo" :row="row"></slot>
                        </tr>
                        <slot name="tr2"></slot>
                    </tbody>
                </table>
            </div>
        </div>

       <!-- <slot name="" -->
       
    </div>
</template>

<script>
export default {
    props: {
        css: Object,
        headers: Array,
        column: Array,

    },
    data() {
        return {
            is_show: [],
        };
    },
    methods: {
        expand(i) {
            this.is_show.splice(i, 1, !this.is_show[i]);
            $(this.$refs["table_" + i]).slideToggle(200);
        },
    },
    mounted() {}
};
</script>

<style scoped>
/* .container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
} */
table {
    border-collapse: collapse;
    width: 100%;
}

tbody tr:nth-child(2n) {
    background: rgb(250, 249, 249);
}
tr td {
    text-align: center;
    padding: 8px 4px;
    /* border: 1px solid rgb(238, 238, 238); */
    font-size: 13px;
}
tbody tr:hover {
    background: rgb(253, 250, 247);
}
.container .first-table th {
    padding: 8px 6px;
    /* border: 1px solid rgb(230, 229, 229); */
    font-weight: 400;
    color: #4c8bfc;
    background: #e6f7ff;
}
.second-table {
    display: none;
    box-shadow: 0 -1px 7px -1px rgb(197, 222, 245) inset;
}

.container .second-table th {
    padding: 2px 6px;
    /* border: 1px solid rgb(230, 229, 229); */
    font-weight: 400;
    color: #6d93db;
    background: #eef7fc;
}

.total-table table tr td {
    border: none;
}
.total-table table tr th {
    padding: 6px 8px;
    color: #6d93db;
    background: #eef7fc;
    font-weight: 400;
}


</style>