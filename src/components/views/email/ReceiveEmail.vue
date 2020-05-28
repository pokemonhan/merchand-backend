<template>
    <div class="container">
        <!----------------        收件箱          ----->
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <!-- filter 筛选 -->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>发件人</span>
                    <Input class="w100" v-model="filter.sender" />
                </li>
                <li>
                    <span>收件日期</span>
                    <!-- <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin: 0 5px;">~</span>
                    <Date v-model="filter.dates[1]" @update="timeUpdate()" />-->
                    <Date type="daterange" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                </li>
            </ul>
        </div>
        <div style="margin-top:20px;">
            <!-- 控制栏 -->
            <div class="tab-control">
                <div class="left">
                    <button class="btn-plain" @click="del">删除</button>
                </div>
                <div class="right">
                    <span>{{pageNo}}/{{Math.ceil(total/pageSize)}}</span>
                    <button
                        :disabled="pageNo<2"
                        :class="[pageNo>1?'btn-plain':'btn-disabled']"
                        @click="prevPage"
                    >上一页</button>
                    <button
                        :class="[pageNo<Math.ceil(total/pageSize)?'btn-plain':'btn-disabled']"
                        @click="nextPage"
                    >下一页</button>
                </div>
            </div>
            <!-- table -->
            <div style="margin-top:5px;"></div>
            <Table
                ref="table"
                :headers="headers"
                :column="list"
                @checkboxChange="checkboxChange"
                hadCheckbox
            >
                <template v-slot:item="{row,idx}">
                    <td
                        class="pointer"
                        style="width:100px;"
                        @click="showDetail(row,idx)"
                    >{{row.title}}</td>
                    <td
                        class="pointer"
                        style="width:760px;padding:5px;"
                        @click="showDetail(row,idx)"
                        v-html="getText(row.content)"
                    ></td>
                    <td>{{row.sender}}</td>
                    <td class="pointer" @click="showDetail(row,idx)">{{row.created_at}}</td>
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
        <!-- 详情 -->
        <Dialog class="dialog" :show.sync="dia_show" title="收件箱详情">
            <div class="dia-inner">
                <Detail :row="curr_row" @close="dialogClose" />
            </div>
        </Dialog>
        <!-- 删除确认 -->
        <Modal
            :show.sync="mod_show"
            title="删除"
            content="是否删除选中邮件"
            @cancel="mod_show=false"
            @confirm="modConf"
        ></Modal>
    </div>
</template>


<script>
import Detail from './EmailDetail'
export default {
    name: 'ReceiveEmail',
    components: {
        Detail: Detail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                sender: '',
                dates: []
            },
            headers: ['标题', '内容', '发件人', '收件日期'],
            list: [],
            /** 是否全选 */

            total: 0,
            pageNo: 1,
            pageSize: 25,

            curr_row: {},
            dia_show: false,
            mod_show: false,
            mod_status: ''
        }
    },
    methods: {
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.dates
        },
        qqUpd(dates) {
            //同步时间筛选值
            this.$set(this.filter, 'dates', dates)
        },
        clearFilter() {
            this.filter = {
                sender: '',
                dates: []
            }
        },
        del() {
            this.mod_status = 'del'
            this.mod_show = true
        },
        prevPage() {
            if (this.pageNo > 1) {
                this.pageNo--
                this.getList()
            }
        },
        nextPage() {
            // 总页数
            let pagesNum = Math.ceil(Number(this.total) / this.pageSize)
            if (this.pageNo < pagesNum) {
                this.pageNo++
                this.getList()
            }
        },
        checkboxChange(index, e) {
            // console.log('e: ', e);
            // console.log('index: ', index);
            // console.log(this.list);
        },
        showDetail(row, index) {
            this.curr_row = row

            this.curr_row.pageSize = this.pageSize
            this.curr_row.pageNo = this.pageNo
            this.curr_row.total = this.total
            this.curr_row.index = index

            this.dia_show = true
        },
        dialogClose(command) {
            // console.log('🦀 command: ', command)
            this.dia_show = false
            if (command === 'getList') {
                this.getList()
            }
        },
        modConf() {
            console.log('确认删除')
            if (this.mod_status === 'del') {
                this.delConfirm()
            }
        },
        delConfirm() {
            // this.list
            let delIdArray = (this.list || []).filter(item => {
                return item.checked
            })
            delIdArray = delIdArray.map(item => item.email_id)
            if (delIdArray.length === 0) {
                this.$toast.info('未选中任何邮件')
                return
            }
            // console.log('delIdArray: ', delIdArray)
            let data = {
                email_id: JSON.stringify(delIdArray)
            }
            // console.log('🍰 删除的内容: ', data)
            let { url, method } = this.$api.email_received_del
            this.$http({ method, url, data }).then(res => {
                if (res && res.code === '200') {
                    this.$toast.success(res.message)
                    this.mod_show = false
                    this.getList()
                    let tableEle = this.$refs.table || {}
                    tableEle.initAllChecked()
                }
            })
        },
        getText(content) {
            let divLink = document.createElement('div')
            divLink.innerHTML = content
            return divLink.innerText
        },
        getList() {
            let created_at = ''
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = JSON.stringify(this.filter.dates)
            }
            let para = {
                sender: this.filter.sender, // 发件人
                send_time: created_at, // 接收日期
                pageSize: this.pageSize,
                page: this.pageNo
            }
            let data = window.all.tool.rmEmpty(para)
            // console.log('🍺 para: ', para);

            let { url, method } = this.$api.email_received
            this.$http({ method, url, data }).then(res => {
                // console.log('列表: ', res)
                if (res && res.code === '200') {
                    this.total = res.data.total
                    this.list = res.data.data
                }
            })
        },
        updateNo() {
            this.getList()
        },
        updateSize() {
            this.pageNo = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
/* .p10 {
    padding: 10px;
} */
.tab-control {
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px;
    background: #d8e2f5;
}
.btn-disabled {
    padding: 5px 15px;
    color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
}
.pointer {
    cursor: pointer;
}
.dia-inner {
    min-width: 1000px;
    max-width: 80vw;
    /* min-height: 600px; */
    max-height: 80vh;
    overflow: auto;
}
</style>
